const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();


// ==================== PROXY SETTING ====================

app.set('trust proxy', 1);
// ==================== SECURITY MIDDLEWARE ====================

// 1. Helmet - sets secure HTTP headers
app.use(helmet());

// 2. Compression - compress responses
app.use(compression());

// 3. Morgan - HTTP request logging
app.use(morgan('dev'));

// 4. CORS - restrict to allowed origins in production
const allowedOrigins = ['https://softveratech.its.bd', 'https://www.softveratech.its.bd'];
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');
}
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true // jodi cookes/headers pathan
};
app.use(cors(corsOptions));

// 4b. Static file serving for uploaded images
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// different origin from this API (for example during local development).
const publicUploadHeaders = helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } });


app.use('/uploads', publicUploadHeaders, express.static(uploadsDir));
app.use('/api/uploads', publicUploadHeaders, express.static(uploadsDir));

// 5. Body parser - with size limits to prevent DOS attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 6. Data sanitization against NoSQL injection
app.use(mongoSanitize());

// 7. Data sanitization against XSS
app.use(xss());

// 8. Prevent parameter pollution
app.use(hpp());


const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Stricter rate limit for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
});
app.use('/api/admin/login', authLimiter);

// ==================== DATABASE CONNECTION ====================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB Connected Successfully to Cloud Atlas');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};
connectDB();

// ==================== MODELS ====================

// Admin User Schema (for future admin panel)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  serviceName: { type: String, required: true },
  package: {
    name: { type: String, required: true },
    price: { type: String, required: true },
    id: { type: String, required: true },
    features: [String],
  },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, index: true },
    company: String,
  },
  projectDetails: {
    description: { type: String, required: true },
    deadline: Date,
    specialRequirements: String,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'completed', 'cancelled'],
    default: 'new',
  },
  adminNotes: String,
  createdAt: { type: Date, default: Date.now },
  orderNumber: { type: String, unique: true },
  source: { type: String, enum: ['website', 'admin'], default: 'website' },
  totalAmount: { type: Number, required: true },
});
const Order = mongoose.model('Order', orderSchema);

// Notification Schema
const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['new_order', 'email_received', 'status_update', 'admin_alert'],
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  data: {
    orderId: mongoose.Schema.Types.ObjectId,
    orderNumber: String,
    customerEmail: String,
    customerName: String,
    serviceType: String,
    packageName: String,
    contactId: mongoose.Schema.Types.ObjectId,
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
const Notification = mongoose.model('Notification', notificationSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, default: '' },
  service: { type: String, default: '' },
  budget: { type: String, default: '' },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new',
  },
  source: {
    type: String,
    enum: ['contact_form', 'quote_request', 'general_inquiry'],
    default: 'contact_form',
  },
  ipAddress: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
  respondedAt: Date,
  notes: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// ==================== HELPER FUNCTIONS ====================

function generateOrderNumber() {
  return `SRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

const createNotification = async (type, title, message, data = {}) => {
  try {
    const notification = new Notification({ type, title, message, data, read: false });
    await notification.save();
    console.log(`📢 Notification created: ${title}`);
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'mail.softveratech.its.bd',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};


// Portfolio Project Schema
const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Web Development', 'Video Editing', 'Digital Service', 'App Development', 'AI / Automation', 'Graphic Design', 'Other'],
    required: true,
  },
  tags:       [String],
  image:      { type: String, default: '' },    // image URL or base64
  link:       { type: String, default: '' },    // live demo link
  featured:   { type: Boolean, default: false },
  order:      { type: Number, default: 0 },     // for manual sorting
  createdAt:  { type: Date, default: Date.now },
});
const Project = mongoose.model('Project', projectSchema);

// Academy Course / Content Schema
const academyCourseSchema = new mongoose.Schema({
  hub: {
    type: String,
    enum: ['css', 'skill'],   // 'css' = CSS Hub, 'skill' = Skill Hub
    required: true,
  },
  type: {
    type: String,
    enum: ['live', 'recorded', 'project', 'suggestion'],
    required: true,
  },
  title:          { type: String, required: true },
  description:    { type: String, default: '' },
  youtubeLink:    { type: String, default: '' },    // single video or playlist
  thumbnail:      { type: String, default: '' },    // auto from YouTube or custom
  level:          { type: String, default: 'All Levels' },
  category:       { type: String, default: '' },    // for skill hub
  videos:         { type: Number, default: 0 },
  duration:       { type: String, default: '' },
  rating:         { type: Number, default: 0 },
  students:       { type: Number, default: 0 },
  tags:           [String],
  isLive:         { type: Boolean, default: false },
  liveDate:       { type: String, default: '' },   // e.g. "প্রতি শুক্রবার রাত ৯টা"
  comingSoon:     { type: Boolean, default: false },
  icon:           { type: String, default: '📚' },
  color:          { type: String, default: 'from-blue-500 to-indigo-500' },
  order:          { type: Number, default: 0 },
  active:         { type: Boolean, default: true },
  createdAt:      { type: Date, default: Date.now },
});
const AcademyCourse = mongoose.model('AcademyCourse', academyCourseSchema);

// Site Settings Schema — singleton document holding header/footer/contact/social config
const siteSettingsSchema = new mongoose.Schema({
  siteName:          { type: String, default: 'SoftVera Technologies' },
  tagline:           { type: String, default: 'Digital Solutions & IT Services' },
  logo:              { type: String, default: '' },
  favicon:           { type: String, default: '' },
  ctaText:           { type: String, default: 'Book Now' },
  ctaLink:           { type: String, default: '/contact' },
  navLinks: {
    type: [{
      label: { type: String, required: true },
      path:  { type: String, required: true },
      order: { type: Number, default: 0 },
      _id: false,
    }],
    default: () => ([
      { label: 'Home',      path: '/',          order: 0 },
      { label: 'About',     path: '/about',     order: 1 },
      { label: 'Portfolio', path: '/portfolio', order: 2 },
      { label: 'Academy',   path: '/academy',   order: 3 },
      { label: 'Service',   path: '/service',   order: 4 },
      { label: 'Contact',   path: '/contact',   order: 5 },
    ]),
  },
  footerDescription: {
    type: String,
    default: 'SoftVera Technologies is a comprehensive digital solutions provider offering AI & automation, web & app development, video editing, graphic design, digital marketing, virtual assistance, and professional training through SoftVera Academy.',
  },
  footerLinks: {
    type: [{
      label: { type: String, required: true },
      path:  { type: String, required: true },
      order: { type: Number, default: 0 },
      _id: false,
    }],
    default: () => ([
      { label: 'AI & n8n Solutions',      path: '/ai',           order: 0 },
      { label: 'Web & App Development',   path: '/web',          order: 1 },
      { label: 'Video Editing',           path: '/videoservice', order: 2 },
      { label: 'Digital Services',        path: '/digital',      order: 3 },
      { label: 'Virtual Assistance',      path: '/virtual',      order: 4 },
      { label: 'SoftVera Academy',        path: '/academy',      order: 5 },
    ]),
  },
  contact: {
    address:     { type: String, default: '338/A East Nakhalpara, Dhaka, Bangladesh' },
    email:       { type: String, default: 'support@softveratech.its.bd' },
    phone:       { type: String, default: '+880 1306-904282' },
    whatsapp:    { type: String, default: '' },
    mapEmbedUrl: { type: String, default: '' },
  },
  socials: {
    facebook:  { type: String, default: 'https://www.facebook.com/softveratechnologies' },
    youtube:   { type: String, default: 'https://www.youtube.com/@SoftveraTechnologies' },
    linkedin:  { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter:   { type: String, default: '' },
    website:   { type: String, default: 'https://www.softveratech.its.bd' },
  },
  updatedAt: { type: Date, default: Date.now },
});
const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

// Home Hero Schema — singleton document
const heroSchema = new mongoose.Schema({
  eyebrow:          { type: String, default: 'Digital Innovation Partner' },
  headingLine1:     { type: String, default: 'SoftVera Technologies -' },
  headingLine2:     { type: String, default: 'Your Complete Digital Innovation Partner' },
  subheading:       { type: String, default: 'SoftVera Technologies is your premier IT partner for cutting-edge digital solutions. We specialize in web & app development, graphic design, video editing, data entry, digital marketing, automation, website management, AI solutions, n8n, and comprehensive IT courses.' },
  primaryCtaText:   { type: String, default: 'Get Started' },
  primaryCtaLink:   { type: String, default: '/contact' },
  secondaryCtaText: { type: String, default: 'Explore Services' },
  secondaryCtaLink: { type: String, default: '#services' },
  heroImage:        { type: String, default: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80' },
  badge1Title:      { type: String, default: 'Secure & Reliable' },
  badge1Subtitle:   { type: String, default: 'Enterprise-grade security' },
  badge2Title:      { type: String, default: 'Fast Delivery' },
  badge2Subtitle:   { type: String, default: 'Rapid deployment' },
  stats: {
    type: [{
      label: { type: String, required: true },
      value: { type: Number, required: true },
      suffix: { type: String, default: '+' },
      _id: false,
    }],
    default: () => ([
      { label: 'Years Experience', value: 4, suffix: '+' },
      { label: 'Projects Delivered', value: 500, suffix: '+' },
      { label: 'Happy Clients', value: 200, suffix: '+' },
      { label: 'Automations Built', value: 1200, suffix: '+' },
    ]),
  },
  updatedAt: { type: Date, default: Date.now },
});
const Hero = mongoose.model('Hero', heroSchema);

// Service Schema — powers the Home services teaser, the Services listing grid,
// and (via slug) the individual service detail pages
const serviceSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  slug:          { type: String, required: true, unique: true },
  description:   { type: String, default: '' },
  icon:          { type: String, default: '' },
  color:         { type: String, default: 'blue' },
  link:          { type: String, required: true },
  bannerTitle:    { type: String, default: '' },
  bannerSubtitle: { type: String, default: '' },
  overview:       { type: String, default: '' },
  features:       [String],
  stats: [{
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    _id: false,
  }],
  servicesGrid: [{
    icon:        { type: String, default: '' },
    title:       { type: String, default: '' },
    description: { type: String, default: '' },
    _id: false,
  }],
  whyChooseHeading: { type: String, default: '' },
  whyChoosePoints: [{
    icon:        { type: String, default: '' },
    title:       { type: String, default: '' },
    description: { type: String, default: '' },
    _id: false,
  }],
  ctaTitle:    { type: String, default: '' },
  ctaSubtitle: { type: String, default: '' },
  order:         { type: Number, default: 0 },
  active:        { type: Boolean, default: true },
  createdAt:     { type: Date, default: Date.now },
});
const Service = mongoose.model('Service', serviceSchema);

// Service pricing package — belongs to a Service via slug
const servicePackageSchema = new mongoose.Schema({
  serviceSlug: { type: String, required: true },
  name:        { type: String, required: true },
  price:       { type: String, required: true },
  duration:    { type: String, default: '' },
  features:    [String],
  popular:     { type: Boolean, default: false },
  category:    { type: String, default: '' }, // optional sub-filter tag, e.g. 'ai' | 'n8n' | 'automation'
  order:       { type: Number, default: 0 },
});
const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema);

// FAQ Schema
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  category: { type: String, default: 'General' },
  order:    { type: Number, default: 0 },
  active:   { type: Boolean, default: true },
});
const Faq = mongoose.model('Faq', faqSchema);

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  role:        { type: String, default: '' },
  company:     { type: String, default: '' },
  content:     { type: String, required: true },
  rating:      { type: Number, default: 5 },
  avatar:      { type: String, default: '' },
  avatarColor: { type: String, default: 'from-blue-500 to-indigo-500' },
  category:    { type: String, default: '' },
  project:     { type: String, default: '' },
  duration:    { type: String, default: '' },
  benefits:    [String],
  order:       { type: Number, default: 0 },
  active:      { type: Boolean, default: true },
});
const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// About page content — singleton document
const aboutSchema = new mongoose.Schema({
  heroTitle1:    { type: String, default: 'Softvera' },
  heroTitle2:    { type: String, default: 'Technologies' },
  heroSubtitle:  { type: String, default: 'Pioneering digital transformation since 2022 with commitment to innovation, expertise, and excellence.' },
  stats: {
    type: [{ label: String, value: String, _id: false }],
    default: () => ([
      { label: 'Projects Completed', value: '500+' },
      { label: 'Satisfied Clients', value: '120+' },
      { label: 'Expert Team', value: '45+' },
      { label: 'Countries Served', value: '10+' },
    ]),
  },
  missionText:   { type: String, default: 'Empowering businesses through innovative digital solutions that drive growth, enhance efficiency, and create lasting impact.' },
  missionPoints: { type: [String], default: () => (['Drive digital transformation across industries', 'Foster innovation through continuous learning', 'Deliver measurable business outcomes', 'Build long-term partnerships based on trust']) },
  visionText:    { type: String, default: 'To be the global leader in shaping the future of technology through solutions that transform businesses, driven by innovation, integrity, and forward-thinking approaches.' },
  visionHighlights: {
    type: [{ label: String, value: String, _id: false }],
    default: () => ([
      { label: 'Global Reach', value: '2025 Target' },
      { label: 'Innovation Hub', value: 'R&D Centers' },
      { label: 'Talent Development', value: '10,000+ Trained' },
      { label: 'Sustainability', value: 'Green Tech Focus' },
    ]),
  },
  timeline: {
    type: [{ year: String, title: String, description: String, icon: String, _id: false }],
    default: () => ([
      { year: '2022', title: 'Foundation', description: 'Softvera Technologies founded with a vision to revolutionize digital solutions.', icon: 'Rocket' },
      { year: '2023', title: 'First Major Client', description: 'Partnership with a leading e-commerce brand marked our breakthrough success.', icon: 'Target' },
      { year: '2024', title: 'Softvera Academy', description: 'Launched training division to empower next-gen tech professionals.', icon: 'GraduationCap' },
      { year: '2025', title: 'International Expansion', description: 'Started serving clients in 10+ countries worldwide.', icon: 'Globe' },
    ]),
  },
  growthMetrics: {
    type: [{ year: String, projects: Number, clients: Number, team: Number, _id: false }],
    default: () => ([
      { year: '2022', projects: 25, clients: 12, team: 8 },
      { year: '2023', projects: 85, clients: 45, team: 25 },
      { year: '2024', projects: 200, clients: 120, team: 45 },
    ]),
  },
  team: {
    type: [{
      name: String, role: String, department: String, experience: String,
      expertise: [String], avatar: String, color: String, bio: String, projects: Number, _id: false,
    }],
    default: () => ([]),
  },
  partners: {
    type: [{ name: String, logo: String, type: { type: String }, _id: false }],
    default: () => ([]),
  },
  chairmanName:  { type: String, default: '' },
  chairmanRole:  { type: String, default: 'Chairman & Founder' },
  chairmanPhoto: { type: String, default: '' },
  chairmanQuote: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});
const About = mongoose.model('About', aboutSchema);


// ==================== AUTHENTICATION MIDDLEWARE (for future admin) ====================

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ==================== FILE UPLOAD (multer) ====================

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const upload = multer({
  storage: uploadStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  },
});

// ==================== PUBLIC ROUTES ====================


// GET all projects (with optional category filter)
app.get('/api/projects', async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    const projects = await Project.find(query).sort({ featured: -1, order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
});

// ── Academy Content ──

// GET academy content (hub + type filter)
app.get('/api/academy', async (req, res) => {
  try {
    const { hub, type } = req.query;
    const query = { active: true };
    if (hub)  query.hub  = hub;
    if (type) query.type = type;
    const courses = await AcademyCourse.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch academy content' });
  }
});


// GET site settings (header/footer/contact/social config) — creates defaults on first call
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
});

// GET home hero content — creates defaults on first call
app.get('/api/hero', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) hero = await Hero.create({});
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch hero content' });
  }
});

// GET service cards (Home teaser + Services listing grid)
app.get('/api/service-cards', async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
});

// GET a single service card by slug (for service detail pages)
app.get('/api/service-cards/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, active: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch service' });
  }
});

// GET pricing packages for a service
app.get('/api/service-packages/:slug', async (req, res) => {
  try {
    const packages = await ServicePackage.find({ serviceSlug: req.params.slug }).sort({ order: 1 });
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch packages' });
  }
});

// GET FAQs
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await Faq.find({ active: true }).sort({ order: 1, _id: 1 });
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch FAQs' });
  }
});

// GET testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({ order: 1, _id: 1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
});

// GET about page content — creates defaults on first call
app.get('/api/about', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch about content' });
  }
});

// Test route to verify server is running
app.get('/api/test', (req, res) => {
  console.log('🟢 TEST ROUTE HIT at', new Date().toISOString());
  res.json({ success: true, message: 'Server is alive' });
});

// Get all services with detailed packages
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 'digital-services',
      name: 'Digital Services',
      icon: '🖥️',
      description: 'Logo design, graphic design, data entry, digital marketing & more',
      packages: [
        {
          id: 'basic-digital',
          name: 'Basic Digital Service',
          price: '৳999',
          features: [
            'Logo Design (2 concepts)',
            'Business Card Design',
            'Social Media Banner',
            '3 Revisions',
            'Source Files'
          ]
        },
        {
          id: 'standard-digital',
          name: 'Standard Digital Package',
          price: '৳2499',
          features: [
            'Complete Brand Identity',
            'Logo + Stationery Design',
            'Social Media Kit (5 posts)',
            'Digital Marketing Strategy',
            '5 Revisions',
            'Priority Support'
          ]
        },
        {
          id: 'premium-digital',
          name: 'Premium Digital Suite',
          price: '৳4999',
          features: [
            'Full Branding Package',
            'Website Graphics',
            'Social Media Management (1 month)',
            'Marketing Materials',
            'Unlimited Revisions',
            '24/7 Support'
          ]
        },
        {
          id: 'custom-digital',
          name: 'Custom Digital Solution',
          price: 'Custom Quote',
          features: [
            'Tailored to Your Needs',
            'Multiple Services',
            'Long-term Partnership',
            'Dedicated Account Manager'
          ]
        }
      ]
    },
    {
      id: 'video-editing',
      name: 'Video Editing',
      icon: '🎬',
      description: 'Professional video editing with packages & pricing',
      packages: [
        {
          id: 'basic-video',
          name: 'Basic Video Editing',
          price: '৳599',
          features: [
            'Up to 5 minutes video',
            'Basic transitions',
            'Music addition',
            'Color correction',
            '720p resolution',
            '2 revisions'
          ]
        },
        {
          id: 'standard-video',
          name: 'Standard Video Package',
          price: '৳1299',
          features: [
            'Up to 10 minutes video',
            'Advanced transitions',
            'Background music',
            'Color grading',
            '1080p resolution',
            'Motion graphics',
            '4 revisions'
          ]
        },
        {
          id: 'premium-video',
          name: 'Premium Video Production',
          price: '৳2499',
          features: [
            'Up to 30 minutes video',
            'Professional transitions',
            'Custom sound design',
            'Advanced color grading',
            '4K resolution',
            '2D animations',
            'Unlimited revisions'
          ]
        },
        {
          id: 'youtube-video',
          name: 'YouTube Special Package',
          price: '৳3999/month',
          features: [
            '8 videos per month',
            'Complete YouTube optimization',
            'Thumbnail design',
            'SEO optimization',
            'Analytics report',
            'Channel management'
          ]
        }
      ]
    },
    {
      id: 'web-development',
      name: 'Web & App Development',
      icon: '💻',
      description: 'Responsive websites and mobile applications',
      packages: [
        {
          id: 'basic-website',
          name: 'Basic Website',
          price: '৳4999',
          features: [
            '5 Pages Website',
            'Responsive Design',
            'Contact Form',
            'Basic SEO',
            '1 Month Support'
          ]
        },
        {
          id: 'business-website',
          name: 'Business Website',
          price: '৳12999',
          features: [
            '10 Pages Website',
            'CMS Integration',
            'SEO Optimization',
            'Google Analytics',
            '6 Months Support',
            'Mobile App (Optional)'
          ]
        },
        {
          id: 'ecommerce-website',
          name: 'E-commerce Website',
          price: '৳29999',
          features: [
            'Full E-commerce Solution',
            'Payment Gateway Integration',
            'Admin Panel',
            'Inventory Management',
            '1 Year Support',
            'Mobile App Included'
          ]
        },
        {
          id: 'custom-webapp',
          name: 'Custom Web Application',
          price: 'Custom Quote',
          features: [
            'Custom Requirements',
            'Advanced Features',
            'API Integration',
            'Scalable Architecture',
            'Dedicated Developer'
          ]
        }
      ]
    },
    {
      id: 'ai-n8n',
      name: 'AI & n8n Solutions',
      icon: '🤖',
      description: 'AI integration and n8n automation workflows - Everything in one page',
      packages: [
        {
          id: 'basic-ai',
          name: 'Basic AI Integration',
          price: '৳2,999',
          originalPrice: '৳4,999',
          description: 'Perfect for startups and small businesses starting with AI',
          color: 'from-blue-500 to-cyan-500',
          duration: '7-10 days',
          features: [
            'ChatGPT API Integration',
            'Basic AI Chatbot Setup',
            '1 Custom AI Workflow',
            'Training Session (2 hours)',
            'Basic Documentation',
            '1 Month Support',
            'Email Integration'
          ],
          bestFor: ['Startups', 'Small Businesses', 'Beginner Projects'],
          popular: true
        },
        {
          id: 'standard-ai',
          name: 'Standard AI Solution',
          price: '৳7,999',
          originalPrice: '৳12,999',
          description: 'For growing businesses needing multiple AI solutions',
          color: 'from-purple-500 to-pink-500',
          duration: '15-20 days',
          features: [
            'Multiple AI Models Integration',
            'Custom AI Chatbot Development',
            '3-5 Custom Workflows',
            'Advanced Training (5 hours)',
            'API Integration',
            'Database Connection',
            '3 Months Support',
            'WhatsApp/Telegram Bot'
          ],
          bestFor: ['Growing Businesses', 'E-commerce', 'Service Providers'],
          popular: false
        },
        {
          id: 'enterprise-ai',
          name: 'Enterprise AI Package',
          price: '৳19,999',
          originalPrice: '৳29,999',
          description: 'Complete AI transformation for large organizations',
          color: 'from-orange-500 to-red-500',
          duration: '30-45 days',
          features: [
            'Custom AI Model Development',
            'Multi-channel AI Assistant',
            'Unlimited Workflows',
            'Complete System Integration',
            'Advanced Analytics Dashboard',
            'Dedicated Support Team',
            '6 Months Premium Support',
            '24/7 Monitoring',
            'Custom Training Program'
          ],
          bestFor: ['Large Enterprises', 'Corporations', 'Government Projects'],
          popular: false
        },
        {
          id: 'basic-n8n',
          name: 'Basic Automation',
          price: '৳1,999',
          originalPrice: '৳3,499',
          description: 'Simple automation for repetitive tasks',
          color: 'from-green-500 to-emerald-500',
          duration: '5-7 days',
          features: [
            '1 Process Automation',
            'Basic Workflow Design',
            'Email Automation',
            'Data Entry Automation',
            'Google Sheets Integration',
            '1 Month Maintenance',
            'Basic Training'
          ],
          bestFor: ['Freelancers', 'Small Teams', 'Basic Automation'],
          popular: true
        },
        {
          id: 'standard-n8n',
          name: 'Standard Automation',
          price: '৳4,999',
          originalPrice: '৳7,999',
          description: 'Advanced automation for business processes',
          color: 'from-indigo-500 to-blue-500',
          duration: '10-15 days',
          features: [
            '3-5 Process Automations',
            'Custom Workflow Design',
            'Multi-platform Integration',
            'CRM/ERP Integration',
            'Database Automation',
            '3 Months Maintenance',
            'API Development',
            'Advanced Training'
          ],
          bestFor: ['Medium Businesses', 'Agencies', 'Service Companies'],
          popular: false
        },
        {
          id: 'enterprise-n8n',
          name: 'Enterprise Automation',
          price: '৳14,999',
          originalPrice: '৳24,999',
          description: 'Complete business process automation',
          color: 'from-red-500 to-pink-500',
          duration: '20-30 days',
          features: [
            'Complete System Automation',
            'Custom Dashboard Development',
            'Real-time Monitoring',
            'Multi-system Integration',
            'Custom API Development',
            '6 Months Maintenance',
            'Priority Support',
            'Team Training',
            'Process Optimization'
          ],
          bestFor: ['Large Organizations', 'Factories', 'Corporate Offices'],
          popular: false
        }
      ],
      videoTypes: [
        {
          title: 'AI Chatbots',
          description: 'Intelligent customer support chatbots for websites and apps',
          icon: '💬',
          color: 'bg-blue-100 text-blue-700'
        },
        {
          title: 'Content Generation',
          description: 'Automated content creation, rewriting, and optimization',
          icon: '📝',
          color: 'bg-green-100 text-green-700'
        },
        {
          title: 'Data Analysis',
          description: 'AI-powered data insights and predictive analytics',
          icon: '📊',
          color: 'bg-purple-100 text-purple-700'
        },
        {
          title: 'Email Marketing',
          description: 'Automated email campaigns and lead nurturing',
          icon: '📧',
          color: 'bg-red-100 text-red-700'
        },
        {
          title: 'CRM Automation',
          description: 'Automatic lead management and customer follow-ups',
          icon: '👥',
          color: 'bg-indigo-100 text-indigo-700'
        },
        {
          title: 'Social Media Automation',
          description: 'Automated posting, monitoring, and engagement',
          icon: '🌐',
          color: 'bg-blue-100 text-blue-700'
        }
      ]
    },
    {
      id: 'automation',
      name: 'Automation Services',
      icon: '⚙️',
      description: 'All types of business process automation',
      packages: [
        {
          id: 'basic-auto',
          name: 'Basic Automation',
          price: '৳1999',
          features: [
            '1 Process Automation',
            'Basic Workflow Design',
            'Email Automation',
            'Data Entry Automation'
          ]
        },
        {
          id: 'standard-auto',
          name: 'Standard Automation',
          price: '৳4999',
          features: [
            '3 Process Automations',
            'Custom Workflow Design',
            'Multi-platform Integration',
            '1 Month Maintenance'
          ]
        },
        {
          id: 'enterprise-auto',
          name: 'Enterprise Automation',
          price: '৳14999',
          features: [
            'Complete System Automation',
            'Custom Dashboard',
            'Real-time Monitoring',
            '3 Months Maintenance',
            'Priority Support'
          ]
        }
      ]
    },
    {
      id: 'academy',
      name: 'SoftVera Academy',
      icon: '🎓',
      description: 'Comprehensive IT courses & training programs',
      packages: [
        {
          id: 'basic-course',
          name: 'Single Course',
          price: '৳1999',
          features: [
            'Choose 1 Course',
            'Video Lectures',
            'Practice Materials',
            'Certificate of Completion'
          ]
        },
        {
          id: 'standard-course',
          name: 'Course Bundle',
          price: '৳4999',
          features: [
            '3 Courses Bundle',
            'Live Sessions',
            'Project Guidance',
            'Job Placement Assistance'
          ]
        },
        {
          id: 'premium-course',
          name: 'Premium Learning',
          price: '৳9999',
          features: [
            'All Access Pass',
            '1-on-1 Mentoring',
            'Internship Opportunity',
            'Portfolio Building',
            'Lifetime Access'
          ]
        },
        {
          id: 'corporate-training',
          name: 'Corporate Training',
          price: 'Custom Quote',
          features: [
            'Custom Curriculum',
            'Team Training',
            'On-site/Online Sessions',
            'Progress Reports'
          ]
        }
      ]
    },
    {
      id: 'virtual-assistant',
      name: 'Virtual Assistance',
      icon: '👨‍💼',
      description: 'Reliable virtual support for business productivity',
      packages: [
        {
          id: 'part-time-va',
          name: 'Part-time VA',
          price: '৳4999/month',
          features: [
            '20 hours/month',
            'Email Management',
            'Calendar Management',
            'Data Entry',
            'Basic Research'
          ]
        },
        {
          id: 'full-time-va',
          name: 'Full-time VA',
          price: '৳9999/month',
          features: [
            '40 hours/month',
            'Complete Admin Support',
            'Social Media Management',
            'Customer Support',
            'Report Generation'
          ]
        },
        {
          id: 'dedicated-va',
          name: 'Dedicated VA',
          price: '৳14999/month',
          features: [
            'Dedicated Assistant',
            'Project Management',
            'Content Creation',
            'Market Research',
            'Priority Tasks'
          ]
        }
      ]
    },
    {
      id: 'packages',
      name: 'Full Package Solutions',
      icon: '📦',
      description: 'Complete IT transformation packages',
      packages: [
        {
          id: 'startup-package',
          name: 'Startup Package',
          price: '৳24999',
          features: [
            'Website Development',
            'Logo & Branding',
            'Social Media Setup',
            'Basic SEO',
            '3 Months Support'
          ]
        },
        {
          id: 'business-package',
          name: 'Business Growth Package',
          price: '৳49999',
          features: [
            'Website + Mobile App',
            'Complete Branding',
            'Digital Marketing',
            'CRM Setup',
            '6 Months Support'
          ]
        },
        {
          id: 'enterprise-package',
          name: 'Enterprise Solution',
          price: '৳99999',
          features: [
            'Full IT Infrastructure',
            'Custom Software',
            'Automation System',
            'Team Training',
            '1 Year Support'
          ]
        }
      ]
    }
  ];

  res.json({ success: true, data: services });
});

// Get AI & n8n specific packages
app.get('/api/ai-n8n/packages', (req, res) => {
  const aiPackages = [
    {
      id: 'basic-ai',
      name: 'Basic AI Integration',
      price: '৳2,999',
      originalPrice: '৳4,999',
      description: 'Perfect for startups and small businesses starting with AI',
      color: 'from-blue-500 to-cyan-500',
      duration: '7-10 days',
      features: [
        'ChatGPT API Integration',
        'Basic AI Chatbot Setup',
        '1 Custom AI Workflow',
        'Training Session (2 hours)',
        'Basic Documentation',
        '1 Month Support',
        'Email Integration'
      ],
      bestFor: ['Startups', 'Small Businesses', 'Beginner Projects'],
      popular: true,
      type: 'ai'
    },
    {
      id: 'standard-ai',
      name: 'Standard AI Solution',
      price: '৳7,999',
      originalPrice: '৳12,999',
      description: 'For growing businesses needing multiple AI solutions',
      color: 'from-purple-500 to-pink-500',
      duration: '15-20 days',
      features: [
        'Multiple AI Models Integration',
        'Custom AI Chatbot Development',
        '3-5 Custom Workflows',
        'Advanced Training (5 hours)',
        'API Integration',
        'Database Connection',
        '3 Months Support',
        'WhatsApp/Telegram Bot'
      ],
      bestFor: ['Growing Businesses', 'E-commerce', 'Service Providers'],
      popular: false,
      type: 'ai'
    },
    {
      id: 'enterprise-ai',
      name: 'Enterprise AI Package',
      price: '৳19,999',
      originalPrice: '৳29,999',
      description: 'Complete AI transformation for large organizations',
      color: 'from-orange-500 to-red-500',
      duration: '30-45 days',
      features: [
        'Custom AI Model Development',
        'Multi-channel AI Assistant',
        'Unlimited Workflows',
        'Complete System Integration',
        'Advanced Analytics Dashboard',
        'Dedicated Support Team',
        '6 Months Premium Support',
        '24/7 Monitoring',
        'Custom Training Program'
      ],
      bestFor: ['Large Enterprises', 'Corporations', 'Government Projects'],
      popular: false,
      type: 'ai'
    }
  ];

  const n8nPackages = [
    {
      id: 'basic-n8n',
      name: 'Basic Automation',
      price: '৳1,999',
      originalPrice: '৳3,499',
      description: 'Simple automation for repetitive tasks',
      color: 'from-green-500 to-emerald-500',
      duration: '5-7 days',
      features: [
        '1 Process Automation',
        'Basic Workflow Design',
        'Email Automation',
        'Data Entry Automation',
        'Google Sheets Integration',
        '1 Month Maintenance',
        'Basic Training'
      ],
      bestFor: ['Freelancers', 'Small Teams', 'Basic Automation'],
      popular: true,
      type: 'n8n'
    },
    {
      id: 'standard-n8n',
      name: 'Standard Automation',
      price: '৳4,999',
      originalPrice: '৳7,999',
      description: 'Advanced automation for business processes',
      color: 'from-indigo-500 to-blue-500',
      duration: '10-15 days',
      features: [
        '3-5 Process Automations',
        'Custom Workflow Design',
        'Multi-platform Integration',
        'CRM/ERP Integration',
        'Database Automation',
        '3 Months Maintenance',
        'API Development',
        'Advanced Training'
      ],
      bestFor: ['Medium Businesses', 'Agencies', 'Service Companies'],
      popular: false,
      type: 'n8n'
    },
    {
      id: 'enterprise-n8n',
      name: 'Enterprise Automation',
      price: '৳14,999',
      originalPrice: '৳24,999',
      description: 'Complete business process automation',
      color: 'from-red-500 to-pink-500',
      duration: '20-30 days',
      features: [
        'Complete System Automation',
        'Custom Dashboard Development',
        'Real-time Monitoring',
        'Multi-system Integration',
        'Custom API Development',
        '6 Months Maintenance',
        'Priority Support',
        'Team Training',
        'Process Optimization'
      ],
      bestFor: ['Large Organizations', 'Factories', 'Corporate Offices'],
      popular: false,
      type: 'n8n'
    }
  ];

  res.json({ success: true, data: { aiPackages, n8nPackages } });
});

// Contact form submission - WITH VALIDATION & SANITIZATION
app.post(
  '/api/contact',
  [
    body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').trim().isMobilePhone('any').withMessage('Valid phone number required'),
    body('company').optional().trim().escape(),
    body('service').optional().trim().escape(),
    body('budget').optional().trim().escape(),
    body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  ],
  async (req, res) => {
    console.log('📥 [1] Request received at /api/contact');
    console.log('Request body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ [2] Validation errors:', errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    console.log('✅ [3] Validation passed');

    try {
      const { name, email, phone, company, service, budget, message } = req.body;
      const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];

      console.log('✅ [4] Creating Contact document');
      const newContact = new Contact({
        name,
        email,
        phone,
        company: company || '',
        service: service || '',
        budget: budget || '',
        message,
        ipAddress,
        userAgent,
        status: 'new',
        source: 'contact_form'
      });

      console.log('✅ [5] Saving to database...');
      await newContact.save();
      console.log('✅ [6] Contact saved with ID:', newContact._id);

      console.log('✅ [7] Creating notification...');
      await createNotification(
        'email_received',
        '📧 New Contact Form Submission',
        `New message from ${name} regarding ${service || 'general inquiry'}`,
        {
          contactId: newContact._id,
          name,
          email,
          service,
          message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
        }
      );
      console.log('✅ [8] Notification created');

      // Email to admin
      console.log('✅ [9] Preparing admin email...');
      const adminMailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: `📧 New Contact Form: ${name} - ${service || 'General Inquiry'}`,
          html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">📧 New Contact Form Submission</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3498db;">
            <h3 style="color: #2c3e50; margin-top: 0;">📋 Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #3498db;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #3498db;">${phone}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${company}</td>
              </tr>
              ` : ''}
              ${service ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service Interested:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><span style="background: #3498db; color: white; padding: 2px 8px; border-radius: 4px;">${service}</span></td>
              </tr>
              ` : ''}
              ${budget ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Budget:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${budget}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2980b9;">
            <h3 style="color: #2c3e50; margin-top: 0;">💬 Message</h3>
            <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #ddd;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; font-size: 14px; color: #7f8c8d;">
            <p><strong>📊 Technical Details:</strong></p>
            <p>Submitted at: ${new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>IP Address: ${ipAddress}</p>
            <p>Contact ID: ${newContact._id}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <a href="mailto:${email}" style="background: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">📧 Reply to ${name}</a>
            <a href="tel:${phone}" style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">📞 Call ${name}</a>
          </div>
        </div>
      `,
      };

      console.log('✅ [10] Sending admin email...');
      await sendEmail(adminMailOptions);
      console.log('✅ [11] Admin email sent');

      console.log('✅ [12] Preparing client email...');
      const clientMailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: '✅ Thank You for Contacting SoftVera Technologies',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin-bottom: 10px;">Thank You, ${name}!</h1>
            <p style="color: #7f8c8d;">We have received your message and will get back to you soon.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0; border: 1px solid #e9ecef;">
            <h2 style="color: #3498db; margin-top: 0;">📋 Your Inquiry Summary</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><strong>Reference ID:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-family: monospace;">${newContact._id}</td>
              </tr>
              ${service ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><strong>Service:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${service}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><strong>Submitted:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
            
            <div style="background: #e8f4fd; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <h3 style="color: #2c3e50; margin-top: 0; font-size: 16px;">⏳ What Happens Next?</h3>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Our team will review your message within <strong>2 hours</strong></li>
                <li>We'll contact you to discuss your requirements in detail</li>
                <li>If applicable, we'll provide a customized proposal and quote</li>
                <li>We'll work together to start your project</li>
              </ol>
            </div>
          </div>
          
          <div style="margin: 30px 0;">
            <h3 style="color: #2c3e50;">📞 Contact Information</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
              <div style="flex: 1; min-width: 200px; background: white; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef;">
                <div style="color: #3498db; font-weight: bold; margin-bottom: 5px;">📞 Phone Support</div>
                <div>+880 1306-904282</div>
                <div>+880 1670-123456</div>
              </div>
              <div style="flex: 1; min-width: 200px; background: white; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef;">
                <div style="color: #3498db; font-weight: bold; margin-bottom: 5px;">📧 Email</div>
                <div>info@softveratech.com</div>
                <div>support@softveratech.com</div>
              </div>
            </div>
          </div>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">💡 While You Wait...</h3>
            <p>You might find these resources helpful:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><a href="https://softveratech.com/services" style="color: #3498db;">View Our Complete Services</a></li>
              <li><a href="https://softveratech.com/portfolio" style="color: #3498db;">Check Out Our Portfolio</a></li>
              <li><a href="https://softveratech.com/pricing" style="color: #3498db;">See Our Pricing Packages</a></li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d; font-size: 14px;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} SoftVera Technologies. All rights reserved.</p>
            <p>338/A East Nakhalpara, Dhaka 1215, Bangladesh</p>
          </div>
        </div>
      `,

      };

      console.log('✅ [13] Sending client email...');
      await sendEmail(clientMailOptions);
      console.log('✅ [14] Client email sent');

      console.log('✅ [15] Sending success response');
      res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully! We will contact you soon.',
        data: {
          contactId: newContact._id,
          name,
          email,
          submittedAt: newContact.createdAt
        },
      });

    } catch (error) {
      console.error('❌ [CATCH] Error submitting contact form:');
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Full error object:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again later.',
      });
    }
  }
);
// Order submission endpoint - WITH VALIDATION
app.post(
  '/api/orders',
  [
    body('customer.name').trim().isLength({ min: 2, max: 50 }).withMessage('Name required'),
    body('customer.email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('customer.phone').trim().isMobilePhone('any').withMessage('Valid phone required'),
    body('customer.company').optional().trim().escape(),
    body('serviceType').trim().notEmpty().withMessage('Service type required'),
    body('serviceName').trim().notEmpty().withMessage('Service name required'),
    body('package.id').trim().notEmpty().withMessage('Package ID required'),
    body('package.name').trim().notEmpty().withMessage('Package name required'),
    body('package.price').trim().notEmpty().withMessage('Package price required'),
    body('projectDetails.description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
    body('totalAmount').isNumeric().withMessage('Total amount must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const orderData = req.body;
      const orderNumber = generateOrderNumber();

      const newOrder = new Order({
        serviceType: orderData.serviceType,
        serviceName: orderData.serviceName || orderData.serviceType,
        package: {
          id: orderData.package.id,
          name: orderData.package.name,
          price: orderData.package.price || 'Custom Quote',
          features: orderData.package.features || []
        },
        customer: {
          name: orderData.customer.name,
          phone: orderData.customer.phone,
          email: orderData.customer.email,
          company: orderData.customer.company || ''
        },
        projectDetails: {
          description: orderData.projectDetails.description || '',
          deadline: orderData.projectDetails.deadline,
          specialRequirements: orderData.projectDetails.specialRequirements || ''
        },
        orderNumber,
        totalAmount: orderData.totalAmount || 0,
        source: 'website'
      });

      await newOrder.save();

      await createNotification(
        'new_order',
        '📦 New Booking',
        `Client ordered "${orderData.package.name}" package. Email: ${orderData.customer.email}`,
        {
          orderId: newOrder._id,
          orderNumber,
          customerEmail: orderData.customer.email,
          customerName: orderData.customer.name,
          serviceType: orderData.serviceType,
          packageName: orderData.package.name
        }
      );

      // Email to admin
      const adminMailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: `📦 New Order Request - ${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">📦 New Booking</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #3498db; margin-top: 0;">Order Summary</h3>
              <p><strong>Order #:</strong> ${orderNumber}</p>
              <p><strong>Service:</strong> ${orderData.serviceType}</p>
              <p><strong>Selected Package:</strong> ${orderData.package.name}</p>
              <p><strong>Package Price:</strong> ${orderData.package.price || 'Custom Quote'}</p>
              <p><strong>Total Amount:</strong> ৳${orderData.totalAmount?.toLocaleString() || '0'}</p>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #3498db; margin-top: 0;">Customer Information</h3>
              <p><strong>Name:</strong> ${orderData.customer.name}</p>
              <p><strong>Email:</strong> <span style="color: #e74c3c;">${orderData.customer.email}</span></p>
              <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
              ${orderData.customer.company ? `<p><strong>Company:</strong> ${orderData.customer.company}</p>` : ''}
            </div>
            
            ${orderData.projectDetails?.description ? `
            <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #3498db; margin-top: 0;">Project Details</h3>
              <p><strong>Description:</strong></p>
              <p>${orderData.projectDetails.description}</p>
              ${orderData.projectDetails?.deadline ? `<p><strong>Deadline:</strong> ${new Date(orderData.projectDetails.deadline).toLocaleDateString()}</p>` : ''}
              ${orderData.projectDetails?.specialRequirements ? `<p><strong>Special Requirements:</strong> ${orderData.projectDetails.specialRequirements}</p>` : ''}
            </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #7f8c8d; font-size: 14px;">Order placed at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      };

      // Email to client
      const clientMailOptions = {
        from: `"SoftVera Technologies" <${process.env.ADMIN_EMAIL}>`,
        to: orderData.customer.email.trim(),
        subject: `✅ Order Confirmation - ${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #27ae60;">Thank You for Your Booking!</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c3e50; margin-top: 0;">Order Details</h3>
              <p><strong>Booking Number:</strong> ${orderNumber}</p>
              <p><strong>Service:</strong> ${orderData.serviceType}</p>
              <p><strong>Package:</strong> ${orderData.package.name}</p>
              <p><strong>Amount:</strong> ${orderData.package.price || 'Custom Quote'}</p>
              <p><strong>Total:</strong> ৳${orderData.totalAmount ? orderData.totalAmount.toLocaleString() : '0'}</p>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c3e50; margin-top: 0;">What Happens Next?</h3>
              <ol style="line-height: 1.8;">
                <li>Our team will review your booking within 24 hours</li>
                <li>We will contact you to discuss project details</li>
                <li>Project timeline and milestones will be finalized</li>
                <li>Work will begin according to the agreed schedule</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p>If you have any questions, feel free to contact us.</p>
              <p style="color: #7f8c8d; font-size: 14px;">Thank you for choosing our services!</p>
            </div>
          </div>
        `,
      };

      await sendEmail(adminMailOptions);
      await sendEmail(clientMailOptions);

      res.status(201).json({
        success: true,
        message: 'Order submitted successfully',
        orderNumber,
        data: {
          orderNumber,
          serviceType: newOrder.serviceType,
          serviceName: newOrder.serviceName,
          package: newOrder.package,
          customer: {
            name: newOrder.customer.name,
            email: newOrder.customer.email
          },
          totalAmount: newOrder.totalAmount,
          createdAt: newOrder.createdAt
        },
      });
    } catch (error) {
      console.error('❌ Error submitting order:', error);
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Order number already exists. Please try again.',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Failed to submit order',
      });
    }
  }
);

// ==================== ADMIN AUTHENTICATION ROUTES (for future admin panel) ====================


app.post('/api/admin/register', authLimiter, async (req, res) => {
  try {
    const adminCount = await User.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({ success: false, message: 'Registration is disabled - an admin account already exists' });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ success: true, message: 'Admin created' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating admin' });
  }
});

// Admin login
app.post('/api/admin/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// ==================== PROTECTED ADMIN ROUTES (all require JWT) ====================
app.use('/api/admin', protect);

// Update the logged-in admin's own email/password (requires current password)
app.put('/api/admin/account', async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;
    if (!currentPassword) {
      return res.status(400).json({ success: false, message: 'Current password is required' });
    }
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }
    if (newEmail) user.email = newEmail;
    if (newPassword) {
      if (newPassword.length < 8) {
        return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });
      }
      user.password = await bcrypt.hash(newPassword, 12);
    }
    await user.save();
    res.json({ success: true, data: { email: user.email } });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'That email is already in use' });
    }
    res.status(500).json({ success: false, message: 'Failed to update account' });
  }
});

// Update site settings (creates the singleton doc if it doesn't exist yet)
app.put('/api/admin/settings', async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: new Date() };
    delete update._id;
    const settings = await SiteSettings.findOneAndUpdate({}, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    });
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

// Upload an image.  Return the /api URL so it also works behind a proxy that
// forwards API routes but serves the frontend application at the site root.
app.post('/api/admin/upload', protect, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    res.json({ success: true, url: `/api/uploads/${req.file.filename}` });
  });
});

// ── Hero (Home page) ──

app.put('/api/admin/hero', async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: new Date() };
    delete update._id;
    const hero = await Hero.findOneAndUpdate({}, update, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true });
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update hero content' });
  }
});

// ── About page ──

app.put('/api/admin/about', async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: new Date() };
    delete update._id;
    const about = await About.findOneAndUpdate({}, update, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true });
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update about content' });
  }
});

// ── Service cards ──

app.get('/api/admin/service-cards', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
});

app.post('/api/admin/service-cards', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.code === 11000 ? 'Slug already in use' : 'Failed to create service' });
  }
});

app.put('/api/admin/service-cards/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.code === 11000 ? 'Slug already in use' : 'Failed to update service' });
  }
});

app.delete('/api/admin/service-cards/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
});

// ── Service pricing packages ──

app.get('/api/admin/service-packages', async (req, res) => {
  try {
    const query = req.query.slug ? { serviceSlug: req.query.slug } : {};
    const packages = await ServicePackage.find(query).sort({ serviceSlug: 1, order: 1 });
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch packages' });
  }
});

app.post('/api/admin/service-packages', async (req, res) => {
  try {
    const pkg = await ServicePackage.create(req.body);
    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create package' });
  }
});

app.put('/api/admin/service-packages/:id', async (req, res) => {
  try {
    const pkg = await ServicePackage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
    res.json({ success: true, data: pkg });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update package' });
  }
});

app.delete('/api/admin/service-packages/:id', async (req, res) => {
  try {
    await ServicePackage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete package' });
  }
});

// ── FAQs ──

app.get('/api/admin/faqs', async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1, _id: 1 });
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch FAQs' });
  }
});

app.post('/api/admin/faqs', async (req, res) => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create FAQ' });
  }
});

app.put('/api/admin/faqs/:id', async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
    res.json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update FAQ' });
  }
});

app.delete('/api/admin/faqs/:id', async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete FAQ' });
  }
});

// ── Testimonials ──

app.get('/api/admin/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, _id: 1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
});

app.post('/api/admin/testimonials', async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create testimonial' });
  }
});

app.put('/api/admin/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update testimonial' });
  }
});

app.delete('/api/admin/testimonials/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial' });
  }
});

// Dashboard statistics
app.get('/api/admin/dashboard/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const newOrders = await Order.countDocuments({ status: 'new' });
    const totalCustomers = await Order.distinct('customer.email').countDocuments();
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const completedOrders = await Order.find({ status: 'completed' });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const aiOrders = await Order.countDocuments({ serviceName: 'AI Solutions' });
    const n8nOrders = await Order.countDocuments({ serviceName: 'n8n Automation' });

    res.json({
      success: true,
      data: {
        totalOrders,
        newOrders,
        totalCustomers,
        totalContacts,
        newContacts,
        totalRevenue,
        aiOrders,
        n8nOrders,
        percentageAI: totalOrders ? Math.round((aiOrders / totalOrders) * 100) : 0,
        percentageN8n: totalOrders ? Math.round((n8nOrders / totalOrders) * 100) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
});



// ── Portfolio Admin ──

// CREATE project
app.post('/api/admin/projects', protect, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create project' });
  }
});

// UPDATE project
app.put('/api/admin/projects/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
});

// DELETE project
app.delete('/api/admin/projects/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
});

// GET all projects (admin — no filter)
app.get('/api/admin/projects', protect, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
});

// ── Academy Admin ──

// CREATE course/content
app.post('/api/admin/academy', protect, async (req, res) => {
  try {
    const course = new AcademyCourse(req.body);
    await course.save();
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create academy content' });
  }
});

// UPDATE course/content
app.put('/api/admin/academy/:id', protect, async (req, res) => {
  try {
    const course = await AcademyCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ success: false, message: 'Content not found' });
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update academy content' });
  }
});

// DELETE course/content
app.delete('/api/admin/academy/:id', protect, async (req, res) => {
  try {
    const course = await AcademyCourse.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Content not found' });
    res.json({ success: true, message: 'Content deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete academy content' });
  }
});

// GET all academy content (admin)
app.get('/api/admin/academy', protect, async (req, res) => {
  try {
    const { hub, type } = req.query;
    const query = {};
    if (hub)  query.hub  = hub;
    if (type) query.type = type;
    const courses = await AcademyCourse.find(query).sort({ hub: 1, type: 1, order: 1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch academy content' });
  }
});

// Get all orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// Update an order's status / admin notes
app.put('/api/admin/orders/:id', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const update = {};
    if (status) update.status = status;
    if (adminNotes !== undefined) update.adminNotes = adminNotes;
    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order' });
  }
});

// Delete an order
app.delete('/api/admin/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete order' });
  }
});

// Get all contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
});

// Get single contact
app.get('/api/admin/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact' });
  }
});

// Update contact status
app.put('/api/admin/contacts/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updateData = { status };
    if (status === 'replied') updateData.respondedAt = new Date();
    if (notes) updateData.notes = notes;
    const contact = await Contact.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update contact' });
  }
});

// Bulk update contacts status
app.put('/api/admin/contacts/bulk-status', async (req, res) => {
  try {
    const { ids, status } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Contact IDs required' });
    }
    const updateData = { status };
    if (status === 'replied') updateData.respondedAt = new Date();
    const result = await Contact.updateMany({ _id: { $in: ids } }, updateData);
    res.json({ success: true, message: `${result.modifiedCount} contacts updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update contacts' });
  }
});

// Delete contact
app.delete('/api/admin/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete contact' });
  }
});

// Bulk delete contacts
app.delete('/api/admin/contacts/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'Contact IDs required' });
    }
    const result = await Contact.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: `${result.deletedCount} contacts deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete contacts' });
  }
});

// Contact statistics
app.get('/api/admin/contacts/stats', async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const replied = await Contact.countDocuments({ status: 'replied' });
    const read = await Contact.countDocuments({ status: 'read' });
    const archived = await Contact.countDocuments({ status: 'archived' });
    const last7Days = await Contact.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    const last30Days = await Contact.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });

    res.json({
      success: true,
      data: { total, new: newContacts, replied, read, archived, last7Days, last30Days }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// Export contacts to CSV
app.get('/api/admin/contacts/export/csv', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    let csv = 'Name,Email,Phone,Company,Service,Budget,Message,Status,Created At\n';
    contacts.forEach(c => {
      csv += `"${c.name}","${c.email}","${c.phone}","${c.company}","${c.service}","${c.budget}","${c.message.replace(/"/g, '""')}","${c.status}","${c.createdAt.toISOString()}"\n`;
    });
    res.header('Content-Type', 'text/csv');
    res.attachment('contacts-export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to export contacts' });
  }
});

// Notifications
app.get('/api/admin/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
});

app.put('/api/admin/notifications/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notification' });
  }
});

app.put('/api/admin/notifications/read-all', async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notifications' });
  }
});

app.get('/api/admin/notifications/unread-count', async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get unread count' });
  }
});

// Search orders by email
app.get('/api/admin/orders/search/email/:email', async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.email': { $regex: req.params.email, $options: 'i' } }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to search orders' });
  }
});

// Get orders by customer email
app.get('/api/admin/orders/customer/:email', async (req, res) => {
  try {
    const orders = await Order.find({ 'customer.email': req.params.email }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch customer orders' });
  }
});

// ==================== ERROR HANDLING MIDDLEWARE ====================

// 404 handler - catch all unmatched routes (FIXED: changed from // 404 handler - catch all unmatched routes (FIXED for Express 5)
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Global error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔒 Security middleware active`);
  console.log(process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32
    ? `🔑 JWT_SECRET is set`
    : `⚠️  JWT_SECRET is missing or too short — set a strong random value in .env`);
  console.log(`📧 Email configured for ${process.env.ADMIN_EMAIL}`);
});
