import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/analyzer', label: 'Analyzer' },
    { href: '/templates', label: 'Templates' },
    { href: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-white border-b border-foreground/5 sticky top-0 z-50 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-[100rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-[12px] flex items-center justify-center">
              <span className="font-heading text-lg text-primary-foreground">RB</span>
            </div>
            <span className="font-heading text-xl text-foreground">ResumeBoost</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-paragraph text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-primary font-bold'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/analyzer">
              <button className="bg-primary text-primary-foreground font-heading text-sm px-6 py-3 rounded-[12px] hover:bg-primary/90 transition-colors shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                Analyze Resume
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-paragraph text-sm transition-colors ${
                      isActive(link.href)
                        ? 'text-primary font-bold'
                        : 'text-foreground/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/analyzer" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-primary text-primary-foreground font-heading text-sm px-6 py-3 rounded-[12px] shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    Analyze Resume
                  </button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
