import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Facebook, Youtube, MessageCircle, Send } from 'lucide-react';
import logo from '@/assets/logo.png';

const footerLinks = {
  discover: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about' },
    { label: 'Blog', href: '/learn' },
    { label: 'Press', href: '/about' },
    { label: 'Careers', href: '/about' },
  ],
  support: [
    { label: 'Track Order', href: '/track' },
    { label: 'Plant SOS', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact', href: '/contact' },
  ],
  policies: [
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/rasilina', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/rasilina', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/rasilina', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://wa.me/919876543210', label: 'WhatsApp' },
];

export const Footer = () => {
  return (
    <footer className="bg-accent-earth text-accent-earth-foreground">
      {/* Newsletter Section */}
      <div className="bg-sage-light">
        <div className="container-custom py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-2xl md:text-3xl mb-2 block">🌿</span>
            <h3 className="text-xl md:text-2xl font-serif text-foreground mb-2">
              Join 10,000+ Plant Parents
            </h3>
            <p className="text-muted-foreground mb-6">
              Get weekly care tips, seasonal guides, and exclusive offers
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-card"
              />
              <Button type="submit" className="gap-2">
                Subscribe <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Discover */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent-gold">
              Discover
            </h4>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-earth-foreground/80 hover:text-accent-earth-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent-gold">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-earth-foreground/80 hover:text-accent-earth-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent-gold">
              Policies
            </h4>
            <ul className="space-y-2">
              {footerLinks.policies.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-earth-foreground/80 hover:text-accent-earth-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent-gold">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-accent-earth-foreground/10 hover:bg-accent-earth-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-accent-earth-foreground/20 text-center">
          <img src={logo} alt="Rasilina" className="h-16 mx-auto mb-4 brightness-0 invert opacity-90" />
          <p className="text-sm text-accent-earth-foreground/80 italic mb-2">
            Rooted in Confidence, Growing with You
          </p>
          <p className="text-xs text-accent-earth-foreground/60">
            © 2024 Rasilina Plants. Hyderabad, India
          </p>
        </div>
      </div>
    </footer>
  );
};
