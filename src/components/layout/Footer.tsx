import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns & Refunds', href: '/returns' },
];

export const Footer = () => {
  return (
    <footer className="bg-accent-earth text-white border-t border-white/10 pt-16 pb-8">
      <div className="container-custom">
        {/* Changed grid to 3 columns since Business Hours is removed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* 1. Brand & Socials */}
          <div className="space-y-6">
            {/* Logo Placeholder - User will replace with img from public */}
            <div className="mb-6">
               <img 
  src="/logo.png" 
  alt="Rasilina Logo" 
  className="h-24 md:h-28 lg:h-32 w-auto object-contain opacity-90"
/>

               <h2 className="text-3xl font-serif text-white hidden">RASTLINA</h2>
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-sm">
              Rooted in Confidence, Growing with You. We provide premium plants and care essentials to elevate your living spaces.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/rastlina2025?igsh=dnI4NGZtNTBta29n&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-accent-gold hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent-gold hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent-gold hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-medium text-accent-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-white/80 hover:text-accent-gold transition-colors block"
                  >
                    {/* Hyphens removed */}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-medium text-accent-gold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent-gold mt-0.5 shrink-0" />
                <span>+91 99154 73575</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent-gold mt-0.5 shrink-0" />
                <span>info.rastlina@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-gold mt-0.5 shrink-0" />
                <span>4th Floor, Lake View Towers,<br/>Safari Nagar, Kondapur,<br/>Hyderabad, 500084</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-white/40">
          <p>© 2025 Rasilina Plants. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};