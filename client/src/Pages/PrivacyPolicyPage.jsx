import { Shield, Lock, FileText, CheckCircle, Mail, Heart, Eye, MessageSquare } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-navy-950 bg-grid text-white py-12 pt-[130px]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-gray-400 text-lg">
            SoftVera Technologies
          </p>
        </div>

        {/* Confidentiality Banner */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl border border-emerald-500/20 p-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Heart className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-bold text-emerald-300">100% Confidentiality Guarantee</h2>
          </div>
          <p className="text-gray-300 text-lg">
            We never share, sell, or compromise your project details. Your ideas and code remain 100% confidential.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Overview Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Overview & Commitment</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-300">
                Welcome to our Privacy Policy. This document outlines our commitment to protecting your information 
                and maintaining absolute confidentiality of your project details.
              </p>
              
              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">Our Core Promise</h3>
                <p className="text-gray-300">
                  <strong>We do not store any personal data beyond what is necessary for communication.</strong> 
                  Your contact information is used solely for follow-up purposes and is never shared, sold, 
                  or used for marketing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20">
                  <h4 className="font-bold text-lg mb-3 text-blue-300">No User Accounts</h4>
                  <p className="text-gray-300">
                    We do not require user registration or login. No passwords, no profiles, no tracking.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20">
                  <h4 className="font-bold text-lg mb-3 text-purple-300">Simple Contact</h4>
                  <p className="text-gray-300">
                    Only email addresses and messages for communication. That's all we need.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Handling Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold">Data Handling Policy</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-green-300 mb-4">What We Collect (Minimal)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <div className="text-3xl font-bold text-green-300 mb-3">1</div>
                    <h4 className="font-bold text-lg mb-3">Email Address</h4>
                    <p className="text-gray-300">
                      Only when you contact us. Used exclusively for follow-up communication.
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-300 mb-3">2</div>
                    <h4 className="font-bold text-lg mb-3">Message Content</h4>
                    <p className="text-gray-300">
                      Your project details and requirements. Treated with utmost confidentiality.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-red-300 mb-4">What We DO NOT Collect</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Phone numbers  (unless you provide in contact)</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Location data</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Tracking cookies</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Social media data</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10">
                <h4 className="font-bold text-xl mb-4 text-green-300">Data Retention</h4>
                <p className="text-gray-300">
                  Contact emails and messages are retained only until the project is completed and delivered. 
                  After successful project completion and your confirmation, we permanently delete all communication 
                  related to your project unless you request otherwise.
                </p>
              </div>
            </div>
          </div>

          {/* Confidentiality Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Absolute Confidentiality Promise</h2>
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">Project Protection</h3>
                <p className="text-gray-300 text-lg">
                  <strong>Your project ideas, code, and business concepts are 100% confidential and proprietary.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20">
                    <h4 className="font-bold text-lg mb-3 text-blue-300">No Code Sharing</h4>
                    <p className="text-gray-300">
                      Your custom code is never shared, sold, or reused for other clients.
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20">
                    <h4 className="font-bold text-lg mb-3 text-purple-300">No Idea Theft</h4>
                    <p className="text-gray-300">
                      Your unique concepts and business ideas remain exclusively yours.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-xl border border-green-500/20">
                    <h4 className="font-bold text-lg mb-3 text-green-300">No Reselling</h4>
                    <p className="text-gray-300">
                      We never resell or license your project to third parties.
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20">
                    <h4 className="font-bold text-lg mb-3 text-red-300">Legal Protection</h4>
                    <p className="text-gray-300">
                      All work is protected under intellectual property agreements.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-yellow-300 mb-4">Non-Disclosure Guarantee</h3>
                <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">No project discussion with others</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">No portfolio use without permission</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">All communication confidential</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">No source code retention</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold">Contact & Communication</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Follow-Up Communication</h3>
                <p className="text-gray-300 mb-6">
                  We only use your provided email address for:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                    <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
                    <h4 className="font-bold text-lg mb-3">Project Updates</h4>
                    <p className="text-gray-300 text-sm">Progress reports and milestone completions</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                    <MessageSquare className="w-8 h-8 text-purple-400 mb-4" />
                    <h4 className="font-bold text-lg mb-3">Clarifications</h4>
                    <p className="text-gray-300 text-sm">Questions about your requirements</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <MessageSquare className="w-8 h-8 text-green-400 mb-4" />
                    <h4 className="font-bold text-lg mb-3">Delivery</h4>
                    <p className="text-gray-300 text-sm">Final project delivery and support</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10">
                <h4 className="font-bold text-xl mb-4">Opt-Out Any Time</h4>
                <p className="text-gray-300 mb-4">
                  You can request to stop communications at any time by:
                </p>
                <div className="bg-black/20 rounded-lg p-4 inline-block">
                  <p className="font-mono text-cyan-300">replying "STOP" to any email</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                  <h4 className="font-bold text-lg mb-3 text-blue-300"> Marketing</h4>
                  <p className="text-gray-300">
                    We may add you to mailing lists or send promotional content.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <h4 className="font-bold text-lg mb-3 text-green-300">Project-Only</h4>
                  <p className="text-gray-300">
                    Communication is strictly limited to your specific project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Commitment */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl border border-emerald-500/20 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 bg-emerald-500/20 rounded-2xl">
                <Shield className="w-16 h-16 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">Our Unbreakable Promise</h3>
                <p className="text-gray-300 text-lg mb-4">
                  <strong>Your trust is our most valuable asset.</strong> We understand that your projects represent 
                  your business, ideas, and hard work. We treat them with the same confidentiality we would expect 
                  for our own proprietary information.
                </p>
                <p className="text-gray-400">
                  This privacy policy is legally binding. By working with us, you have our word that your 
                  information and project details are safe, secure, and completely confidential.
                </p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;