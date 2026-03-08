import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground text-background py-16">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="https://static.wixstatic.com/media/2e45bf_c35b83c7f7df469894a67d21b4e73e19~mv2.png" 
                alt="ResumeBoost Logo" 
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="font-heading text-xl text-background">ResumeBoost</span>
            </div>
            <p className="font-paragraph text-sm text-background/70">
              AI-powered ATS resume analysis to help you land your dream job.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-heading text-base text-background mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/analyzer" className="font-paragraph text-sm text-background/70 hover:text-background transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/templates" className="font-paragraph text-sm text-background/70 hover:text-background transition-colors">
                  ATS Templates
                </Link>
              </li>
              <li>
                <Link to="/#features" className="font-paragraph text-sm text-background/70 hover:text-background transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-base text-background mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="font-paragraph text-sm text-background/70 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="font-paragraph text-sm text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-paragraph text-sm text-background/70 hover:text-background transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-base text-background mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-background" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-background" />
              </a>
              <a
                href="mailto:support@resumeboost.com"
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-background" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-background/70">
              © {currentYear} ResumeBoost. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-background/70">
              Built with precision for career success.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
