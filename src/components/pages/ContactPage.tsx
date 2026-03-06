import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="w-full max-w-[100rem] mx-auto px-6 py-16 min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="font-paragraph text-sm text-foreground/70 max-w-2xl mx-auto">
              Have questions about our ATS analysis? Need help with your resume? We're here to assist you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-8 border border-foreground/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-heading text-2xl text-foreground">Send us a Message</h2>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <p className="font-paragraph text-sm text-foreground">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-heading text-sm text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-foreground/10 rounded-xl font-paragraph text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-heading text-sm text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-foreground/10 rounded-xl font-paragraph text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-heading text-sm text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-foreground/10 rounded-xl font-paragraph text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="resume-help">Resume Help</option>
                    <option value="templates">Template Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-heading text-sm text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-foreground/10 rounded-xl font-paragraph text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-heading text-base transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-foreground/10 text-foreground/40 cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Email */}
              <div className="bg-white rounded-xl p-8 border border-foreground/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-foreground">Email Us</h3>
                    <p className="font-paragraph text-sm text-foreground/70">We'll respond within 24 hours</p>
                  </div>
                </div>
                <a
                  href="mailto:support@resumeboost.com"
                  className="font-paragraph text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  support@resumeboost.com
                </a>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-xl p-8 border border-foreground/5">
                <h3 className="font-heading text-xl text-foreground mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-heading text-sm text-foreground mb-2">
                      How accurate is the ATS analysis?
                    </h4>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Our analysis is based on industry-standard ATS requirements and has been tested with major platforms like Workday, Greenhouse, and Lever.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm text-foreground mb-2">
                      Can I analyze multiple resumes?
                    </h4>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Yes! You can analyze as many resumes as you need. Each analysis is independent and provides detailed insights.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm text-foreground mb-2">
                      Are the templates really ATS-friendly?
                    </h4>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Absolutely. Our templates are designed specifically to pass ATS filters with simple layouts, standard fonts, and proper formatting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20">
                <h3 className="font-heading text-xl text-foreground mb-4">Support Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-paragraph text-sm text-foreground/70">Monday - Friday</span>
                    <span className="font-heading text-sm text-foreground">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-paragraph text-sm text-foreground/70">Saturday</span>
                    <span className="font-heading text-sm text-foreground">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-paragraph text-sm text-foreground/70">Sunday</span>
                    <span className="font-heading text-sm text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
