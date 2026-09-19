import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  ArrowLeft, Check, X, Loader2, Phone, User, 
  Briefcase, CalendarDays, MessageSquare, FileText, 
  ShieldCheck, Clock, Mail, Sparkles, Package,
  CreditCard, Globe, Smartphone, Palette,
  Cpu, Zap, GraduationCap, Headphones,
  CheckCircle, Shield, Star
} from "lucide-react";

const OrderProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  
  // ✅ Vite এনভায়রনমেন্ট ভেরিয়েবল
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      phone: "",
      email: "",
      company: ""
    },
    projectDetails: {
      description: "",
      deadline: "",
      specialRequirements: ""
    }
  });

  const [errors, setErrors] = useState({});

  // Load services
  useEffect(() => {
    fetchServices();
  }, []);

  // Set service if coming from specific service page
  useEffect(() => {
    if (serviceId && services.length > 0) {
      const foundService = services.find(s => s.id === serviceId);
      if (foundService) {
        setSelectedService(foundService);
        setStep(2);
      }
    } else if (location.state?.service) {
      setSelectedService(location.state.service);
      setStep(2);
    }
  }, [services, serviceId, location]);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      const result = await response.json();
      if (result.success) {
        setServices(result.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 11;
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters';
      case 'phone':
        if (!value.trim()) return 'Phone is required';
        if (!validatePhone(value)) return 'Valid phone number required (at least 10 digits)';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email';
        return '';
      case 'description':
        return value.trim().length >= 10 ? '' : 'Description must be at least 10 characters';
      default:
        return '';
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    const nameError = validateField('name', formData.customer.name);
    if (nameError) newErrors.name = nameError;
    
    const phoneError = validateField('phone', formData.customer.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    const emailError = validateField('email', formData.customer.email);
    if (emailError) newErrors.email = emailError;
    
    const descError = validateField('description', formData.projectDetails.description);
    if (descError) newErrors.description = descError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    // Clear error for this field
    setErrors(prev => ({ ...prev, [field]: "" }));
    
    // Update form data
    if (field === 'name' || field === 'phone' || field === 'email' || field === 'company') {
      setFormData(prev => ({
        ...prev,
        customer: { ...prev.customer, [field]: value }
      }));
      // Real-time validation
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    } else if (field === 'description' || field === 'deadline' || field === 'specialRequirements') {
      setFormData(prev => ({
        ...prev,
        projectDetails: { ...prev.projectDetails, [field]: value }
      }));
      if (field === 'description') {
        const error = validateField('description', value);
        setErrors(prev => ({ ...prev, description: error }));
      }
    }
  };

  const handleBlur = (field, value) => {
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) || 
                     document.querySelector(`[name="customer.${firstErrorField}"]`) ||
                     document.querySelector(`[name="projectDetails.${firstErrorField}"]`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!selectedPackage) {
      alert("Please select a package");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      serviceType: selectedService.name,
      serviceName: selectedService.name,
      package: selectedPackage,
      totalAmount: parseFloat(selectedPackage.price.replace(/[^0-9.]/g, "")) || 0,
      customer: formData.customer,
      projectDetails: formData.projectDetails
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setOrderNumber(result.orderNumber);
        setShowSuccess(true);
        setStep(4);
        
        // Reset form
        setFormData({
          customer: { name: "", phone: "", email: "", company: "" },
          projectDetails: { description: "", deadline: "", specialRequirements: "" }
        });
        setErrors({});
      } else if (response.status === 400 && result.errors) {
        // Backend validation errors – map to our fields
        const backendErrors = {};
        result.errors.forEach(err => {
          // err.path might be "customer.name", "customer.email", "projectDetails.description"
          const field = err.path.split('.').pop(); // get last part: name, email, description
          if (field === 'name' || field === 'phone' || field === 'email' || field === 'description') {
            backendErrors[field] = err.msg;
          } else {
            // fallback to generic message
            backendErrors.general = err.msg;
          }
        });
        setErrors(backendErrors);
        
        // Show general error if any
        if (backendErrors.general) {
          alert(backendErrors.general);
        }
      } else {
        alert(result.message || "Failed to submit order");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Service icons mapping
  const serviceIcons = {
    "digital-services": Palette,
    "video-editing": Smartphone,
    "web-development": Globe,
    "ai-solutions": Cpu,
    "automation": Zap,
    "academy": GraduationCap,
    "virtual-assistant": Headphones,
    "packages": Package
  };

  // Step 1: Service Selection
  const renderServiceSelection = () => (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Choose Your Service
        </h1>
        <p className="text-slate-400 text-lg">
          Select from our range of professional IT services
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = serviceIcons[service.id] || Package;
            return (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedService(service);
                  setSelectedPackage(null);
                  setStep(2);
                }}
                className="bg-navy-900 rounded-2xl shadow-lg border border-white/10 p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">
                    View Packages
                  </span>
                  <ArrowLeft className="w-4 h-4 text-blue-600 rotate-180" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Step 2: Package Selection
  const renderPackageSelection = () => {
    if (!selectedService) return null;
    
    const IconComponent = serviceIcons[selectedService.id] || Package;
    
    return (
      <div className="max-w-6xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setStep(1)}
            className="flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{selectedService.name}</h2>
              <p className="text-slate-400">{selectedService.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {selectedService.packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedPackage(pkg);
                setStep(3);
              }}
              className={`relative border-2 rounded-2xl p-8 cursor-pointer transition-all ${
                selectedPackage?.id === pkg.id
                  ? "border-blue-500 bg-blue-500/10 shadow-lg"
                  : "border-white/10 hover:border-white/15 hover:shadow-md"
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {pkg.name}
                </h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {pkg.price}
                </div>
                {pkg.price.includes("Custom") ? (
                  <p className="text-slate-400">Contact for pricing</p>
                ) : (
                  <p className="text-slate-500">One-time payment</p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                selectedPackage?.id === pkg.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white/5 text-white hover:bg-gray-200"
              }`}>
                {selectedPackage?.id === pkg.id ? "✓ Selected" : "Select Package"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Step 3: Client Information
  const renderClientInfo = () => (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setStep(2)}
          className="flex items-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Packages
        </button>
        
        <div className="text-center">
          <div className="text-sm text-blue-600 font-medium">
            Selected Package
          </div>
          <div className="text-lg font-bold">
            {selectedPackage?.name} - {selectedPackage?.price}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Trust Badges */}
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-white/10">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">Quality Guarantee</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium">Expert Team</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-navy-900 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Your Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.customer.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={(e) => handleBlur("name", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.name ? "border-red-500" : "border-white/15"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.customer.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={(e) => handleBlur("phone", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.phone ? "border-red-500" : "border-white/15"
                }`}
                placeholder="+880 1XXX XXX XXX"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.customer.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={(e) => handleBlur("email", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.email ? "border-red-500" : "border-white/15"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Company (Optional)
              </label>
              <input
                type="text"
                name="company"
                value={formData.customer.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Your Company Name"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-navy-900 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Project Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.projectDetails.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                onBlur={(e) => handleBlur("description", e.target.value)}
                rows="5"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                  errors.description ? "border-red-500" : "border-white/15"
                }`}
                placeholder="Describe your project requirements in detail. Include all necessary information for us to understand your needs."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <CalendarDays className="w-4 h-4 inline mr-2" />
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.projectDetails.deadline}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                  className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Special Requirements (Optional)
              </label>
              <textarea
                name="specialRequirements"
                value={formData.projectDetails.specialRequirements}
                onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Any specific files, preferences, or additional information you want to share..."
              />
            </div>
          </div>
        </div>

        {/* Terms and Submit */}
        <div className="bg-navy-900 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1"
              disabled={isSubmitting}
            />
            <label htmlFor="terms" className="text-sm text-slate-400">
              I agree that Softvera Technologies will contact me via email and phone to discuss project details. I understand that my email is required for order confirmation and communication.
            </label>
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-8 py-4 border-2 border-white/15 text-slate-300 font-bold rounded-xl hover:bg-navy-900 transition-colors flex-1"
              disabled={isSubmitting}
            >
              Back
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex-1 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing order...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Submit Order
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );

  // Step 4: Success
  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500/15 to-emerald-500/15 flex items-center justify-center mx-auto mb-8"
      >
        <Check className="w-16 h-16 text-green-600" />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-white mb-6">
        Order Confirmed! 🎉
      </h1>
      
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-8 mb-8 border border-white/10">
        <div className="text-3xl font-bold text-blue-800 mb-4">
          {orderNumber}
        </div>
        <p className="text-blue-700 text-lg mb-4">
          Your order for <strong>{selectedService?.name}</strong> has been submitted successfully.
        </p>
        <div className="bg-navy-900 rounded-xl p-4 inline-block">
          <p className="text-white">
            Package: <strong>{selectedPackage?.name}</strong>
          </p>
          <p className="text-white">
            Amount: <strong>{selectedPackage?.price}</strong>
          </p>
        </div>
      </div>
      
      <div className="space-y-6 mb-10">
        <div className="flex items-center justify-center gap-4 p-4 bg-navy-900 rounded-xl">
          <Mail className="w-6 h-6 text-blue-600" />
          <div className="text-left">
            <p className="font-medium">Thank you for your order!</p>
            <p className="text-sm text-slate-400">Our team will review your order within 24 hours</p>
            <p className="text-sm text-slate-400">We will contact you to discuss project details</p>
            <p className="text-sm text-slate-400">Project timeline and milestones will be finalized</p>
            <p className="text-sm text-slate-400">Work will begin according to the agreed schedule</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            setStep(1);
            setShowSuccess(false);
            setSelectedService(null);
            setSelectedPackage(null);
            navigate("/order");
          }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex-1"
        >
          Place Another Order
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 border-2 border-white/15 text-slate-300 font-bold rounded-xl hover:bg-navy-900 transition-colors flex-1"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  // Progress Bar
  const ProgressBar = () => (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 -z-10 transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4].map((stepNum) => (
          <div key={stepNum} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
              step > stepNum 
                ? "bg-green-500" 
                : step === stepNum 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg" 
                : "bg-gray-300"
            }`}>
              {step > stepNum ? (
                <Check className="w-6 h-6" />
              ) : (
                stepNum
              )}
            </div>
            <span className="text-sm font-medium mt-2">
              {stepNum === 1 && "Service"}
              {stepNum === 2 && "Package"}
              {stepNum === 3 && "Details"}
              {stepNum === 4 && "Confirmation"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-950 bg-grid pt-[110px] pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {step < 4 && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Place Your Order
              </h1>
              <p className="text-slate-400 mt-2">
                Complete the following steps to place your order
              </p>
            </div>
            <ProgressBar />
          </>
        )}
        
        <div className="mt-8">
          {step === 1 && renderServiceSelection()}
          {step === 2 && renderPackageSelection()}
          {step === 3 && renderClientInfo()}
          {step === 4 && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default OrderProcess;