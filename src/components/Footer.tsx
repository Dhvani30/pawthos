"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#E2725B] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🐾</span>
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Paws & Progress
              </span>
            </div>
            <p className="text-gray-400 text-sm">{t("footer.tagline")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-400 hover:text-[#4CAF50] text-sm"
                >
                  {t("nav.howItWorks")}
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-gray-400 hover:text-[#4CAF50] text-sm"
                >
                  {t("nav.stories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/for-pet-owners"
                  className="text-gray-400 hover:text-[#4CAF50] text-sm"
                >
                  {t("nav.petOwners")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#4CAF50] text-sm"
                >
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@pawsandprogress.org</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("footer.followUs")}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                className="text-gray-400 hover:text-[#4CAF50] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="text-gray-400 hover:text-[#4CAF50] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/"
                className="text-gray-400 hover:text-[#4CAF50] transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Paws & Progress. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}