import { Cookie, Shield, EyeOff, Lock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const CookiesPolicyPage = () => {
  return (
    <div className="min-h-screen bg-navy-950 bg-grid text-white py-12 pt-[130px]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl">
              <Cookie className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Cookies Policy</h1>
          </div>
          <p className="text-gray-400 text-lg">
           SoftVera Technologies
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl border border-amber-500/20 p-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <AlertCircle className="w-8 h-8 text-amber-400" />
            <h2 className="text-2xl font-bold text-amber-300">Important Notice</h2>
          </div>
          <p className="text-gray-300 text-lg">
            We use <strong>ZERO tracking cookies</strong> and <strong>NO analytics cookies</strong> on our website. 
            Your privacy is our priority.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Overview Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold">Our Cookies Philosophy</h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-300">
                Unlike most websites, we believe in minimal data collection and maximum privacy. 
                We do not use cookies to track your browsing behavior, collect personal information, 
                or analyze your activity.
              </p>
              
              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                <h3 className="text-xl font-bold text-green-300 mb-4">Privacy-First Approach</h3>
                <p className="text-gray-300">
                  <strong>We respect your right to browse privately.</strong> Our website is designed to 
                  function perfectly without requiring any cookies that compromise your privacy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h4 className="font-bold text-lg">What We Don't Do</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>• No user tracking</li>
                    <li>• No behavior analysis</li>
                    <li>• No personalized ads</li>
                    <li>• No data selling</li>
                  </ul>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h4 className="font-bold text-lg">What We Do</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Respect your privacy</li>
                    <li>• Use essential cookies only</li>
                    <li>• No third-party cookies</li>
                    <li>• Transparent practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Essential Cookies Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Essential Cookies We Use</h2>
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-300">Session Cookie (If Any)</h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Essential</span>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-gray-400 mb-1">Purpose</h4>
                      <p className="text-gray-300">Website functionality</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-400 mb-1">Duration</h4>
                      <p className="text-gray-300">Session only</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-400 mb-1">Data Collected</h4>
                      <p className="text-gray-300">None</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    This cookie (if used) is essential for the website to function properly. 
                    It is automatically deleted when you close your browser.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-300 mb-4">Why We Keep It Minimal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                    <h4 className="font-bold text-lg mb-3 text-emerald-300">Privacy Respect</h4>
                    <p className="text-gray-300">
                      We believe you should control your data, not websites.
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-500/20">
                    <h4 className="font-bold text-lg mb-3 text-amber-300">Simple Functionality</h4>
                    <p className="text-gray-300">
                      Our website works perfectly without invasive tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Don't Use Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold">Cookies We DO NOT Use</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20 text-center">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 text-red-300">Analytics Cookies</h4>
                  <p className="text-gray-300 text-sm">
                    No Google Analytics, Mixpanel, or similar tracking
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-6 h-6 text-orange-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 text-orange-300">Advertising Cookies</h4>
                  <p className="text-gray-300 text-sm">
                    No Facebook Pixel, Google Ads, or ad tracking
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 text-purple-300">Social Media Cookies</h4>
                  <p className="text-gray-300 text-sm">
                    No social media tracking or sharing widgets
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10">
                <h4 className="font-bold text-xl mb-4 text-green-300">Why We Avoid These Cookies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">They invade your privacy</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">They slow down websites</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">They collect data without consent</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">They're often unnecessary</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">They create security risks</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">They benefit companies, not users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Browser Control Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <EyeOff className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold">Your Browser Controls</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">Managing Cookies</h3>
                <p className="text-gray-300 mb-6">
                  Even though we use minimal cookies, you have full control over cookies in your browser:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                    <h4 className="font-bold text-lg mb-3 text-cyan-300">Chrome</h4>
                    <p className="text-gray-300 text-sm">
                      Settings → Privacy and Security → Cookies and Site Data
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                    <h4 className="font-bold text-lg mb-3 text-blue-300">Firefox</h4>
                    <p className="text-gray-300 text-sm">
                      Options → Privacy & Security → Cookies and Site Data
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10">
                    <h4 className="font-bold text-lg mb-3 text-gray-300">Safari</h4>
                    <p className="text-gray-300 text-sm">
                      Preferences → Privacy → Cookies and Website Data
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10">
                <h4 className="font-bold text-xl mb-4">Private Browsing</h4>
                <p className="text-gray-300 mb-4">
                  For maximum privacy, you can use private/incognito mode. This automatically deletes 
                  all cookies when you close the browser window.
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
                  <div className="px-3 py-1 bg-white/10 rounded whitespace-nowrap">Chrome: Ctrl+Shift+N</div>
                  <div className="px-3 py-1 bg-white/10 rounded whitespace-nowrap">Firefox: Ctrl+Shift+P</div>
                  <div className="px-3 py-1 bg-white/10 rounded whitespace-nowrap">Safari: Cmd+Shift+N</div>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Services Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">No Embedded Third-Party Content</h3>
                <p className="text-gray-300">
                  We do not embed third-party content (like YouTube videos, social media widgets, 
                  or external commenting systems) that could place cookies on your device without 
                  our control.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <h4 className="font-bold text-lg mb-3 text-green-300">External Links</h4>
                  <p className="text-gray-300">
                    When you click external links, those websites may use cookies. 
                    We recommend reviewing their privacy policies.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                  <h4 className="font-bold text-lg mb-3 text-blue-300">Contact Forms</h4>
                  <p className="text-gray-300">
                    Our contact forms do not use tracking. Information is only collected 
                    when you voluntarily submit it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Updates & Contact */}
          <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl border border-amber-500/20 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 bg-amber-500/20 rounded-2xl">
                <Cookie className="w-16 h-16 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-300 mb-4">Policy Updates</h3>
                <p className="text-gray-300 text-lg mb-4">
                  If we ever need to change our cookies policy (to use even fewer cookies, 
                  for example), we will update this page immediately.
                </p>
                <p className="text-gray-400">
                  We are committed to maintaining a cookie-light, privacy-focused website 
                  that respects your right to browse freely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="mt-12 p-8 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10 text-center">
          <h3 className="text-2xl font-bold text-green-300 mb-4">Simple Summary</h3>
          <p className="text-gray-300 text-lg">
            <strong>No tracking.</strong> <strong>No analytics.</strong> <strong>No ads.</strong> 
            <br />
            Just essential functionality when absolutely necessary.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full">✓ Privacy First</div>
            <div className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full">✓ No Tracking</div>
            <div className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full">✓ Transparent</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CookiesPolicyPage;