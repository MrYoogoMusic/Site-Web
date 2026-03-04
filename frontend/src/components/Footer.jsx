import React from 'react';
import { Music2, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music2 className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-white">RockZone</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Votre destination ultime pour découvrir le meilleur du rock, hard rock et metal. 
              Explorez les albums légendaires et restez connectés avec vos artistes préférés.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-red-500 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#albums" className="text-gray-400 hover:text-red-500 transition-colors">
                  Albums
                </a>
              </li>
              <li>
                <a href="#artists" className="text-gray-400 hover:text-red-500 transition-colors">
                  Artistes
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-400 hover:text-red-500 transition-colors">
                  Actualités
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4 text-red-600" />
                <a href="mailto:contact@rockzone.fr" className="hover:text-red-500 transition-colors">
                  contact@rockzone.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} RockZone. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-red-500 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Conditions
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
