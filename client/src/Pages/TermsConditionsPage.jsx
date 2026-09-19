import { Scale, FileText, CheckCircle, AlertCircle, Shield, Handshake, Zap, Clock } from 'lucide-react';

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-navy-950 bg-grid text-white py-12 pt-[130px]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Scale className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-gray-400 text-lg">
            SoftVera Technologies
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 p-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <AlertCircle className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-blue-300">Important Legal Agreement</h2>
          </div>
          <p className="text-gray-300 text-lg">
            Please read these terms carefully before proceeding with any project or service.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Agreement Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Handshake className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold">Agreement & Acceptance</h2>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                <p className="text-gray-300">
                  By contacting us through our website, email, or any other means, you agree to be bound by these 
                  Terms & Conditions. If you do not agree with any part of these terms, please do not proceed with 
                  any project or communication.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <div className="text-2xl font-bold text-green-300 mb-3">Mutual Understanding</div>
                  <p className="text-gray-300 text-sm">
                    Clear communication and transparency throughout the project
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-300 mb-3">Scope Definition</div>
                  <p className="text-gray-300 text-sm">
                    All requirements clearly defined before commencement
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-300 mb-3">Professional Conduct</div>
                  <p className="text-gray-300 text-sm">
                    Professional standards maintained throughout engagement
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Services & Deliverables</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-green-300 mb-4">What We Provide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-black/20 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Custom Development</h4>
                        <p className="text-gray-300 text-sm">Tailored solutions based on your requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-black/20 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Source Code Delivery</h4>
                        <p className="text-gray-300 text-sm">Complete, documented source code</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-black/20 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Technical Support</h4>
                        <p className="text-gray-300 text-sm">Post-delivery support as agreed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-black/20 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Limited Revisions</h4>
                        <p className="text-gray-300 text-sm">Revisions within agreed scope</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-red-300 mb-4">What We DO NOT Provide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Project reselling to third parties</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Unlimited scope changes</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Hosting or domain services</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
                      <span className="text-red-400">✗</span>
                    </div>
                    <span className="text-gray-300">Legal or business consulting</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10">
                <h4 className="font-bold text-xl mb-4">Scope Changes</h4>
                <p className="text-gray-300">
                  Any changes to the originally agreed scope, features, or requirements may result in 
                  additional charges and timeline adjustments. All scope changes must be agreed upon in 
                  writing before implementation.
                </p>
              </div>
            </div>
          </div>

          {/* Confidentiality Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold">Confidentiality & Ownership</h2>
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">Intellectual Property Rights</h3>
                <p className="text-gray-300 text-lg">
                  <strong>Upon full payment, you own 100% of the custom code developed for your project.</strong> 
                  We transfer all rights, title, and interest in the delivered work to you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-blue-300">Your Ownership Includes:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Complete source code</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">All custom features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Project documentation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Design elements created for you</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-purple-300">Our Commitments:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">No ownership of your project</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">No resale rights</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">No portfolio use without permission</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">No license retention</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Payment Terms</h2>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 text-center">
                  <div className="text-4xl font-bold text-green-300 mb-3">50%</div>
                  <h4 className="font-bold text-lg mb-3">Initial Deposit</h4>
                  <p className="text-gray-300 text-sm">Required to begin work</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 text-center">
                  <div className="text-4xl font-bold text-blue-300 mb-3">40%</div>
                  <h4 className="font-bold text-lg mb-3">Milestone Payment</h4>
                  <p className="text-gray-300 text-sm">After milestone completion</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 text-center">
                  <div className="text-4xl font-bold text-purple-300 mb-3">10%</div>
                  <h4 className="font-bold text-lg mb-3">Final Payment</h4>
                  <p className="text-gray-300 text-sm">Before source code delivery</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10">
                <h4 className="font-bold text-xl mb-4 text-red-300">Important Payment Notes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-400 mt-1" />
                    <span className="text-gray-300">All payments are non-refundable once work begins</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-400 mt-1" />
                    <span className="text-gray-300">Late payments may delay project timeline</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-400 mt-1" />
                    <span className="text-gray-300">Source code delivered after full payment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-400 mt-1" />
                    <span className="text-gray-300">Additional features require separate agreement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Limitations Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold">Limitations & Liability</h2>
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-bold text-red-300 mb-4">Liability Limitations</h3>
                <p className="text-gray-300">
                  Our liability is limited to the amount paid for the services. We are not liable for:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10">
                    <h4 className="font-bold mb-3 text-gray-300">Indirect Damages</h4>
                    <p className="text-gray-400 text-sm">
                      Lost profits, business interruption, or consequential damages
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10">
                    <h4 className="font-bold mb-3 text-gray-300">Third-Party Issues</h4>
                    <p className="text-gray-400 text-sm">
                      Problems from third-party services, APIs, or platforms
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10">
                    <h4 className="font-bold mb-3 text-gray-300">Data Loss</h4>
                    <p className="text-gray-400 text-sm">
                      Loss of data not backed up by client
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10">
                    <h4 className="font-bold mb-3 text-gray-300">Market Factors</h4>
                    <p className="text-gray-400 text-sm">
                      Business outcomes or competitive factors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Agreement */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 bg-blue-500/20 rounded-2xl">
                <Handshake className="w-16 h-16 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4">Mutual Agreement</h3>
                <p className="text-gray-300 text-lg mb-4">
                  By proceeding with any project or service, both parties acknowledge and agree to these 
                  Terms & Conditions. These terms represent the complete agreement between us regarding 
                  the services provided.
                </p>
                <p className="text-gray-400">
                  For any questions or clarifications about these terms, please contact us before 
                  beginning any project.
                </p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default TermsConditionsPage;