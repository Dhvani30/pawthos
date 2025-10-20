"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.howItWorks', href: '/how-it-works' },
    { key: 'nav.stories', href: '/success-stories' },
    { key: 'nav.petOwners', href: '/for-pet-owners' },
    { key: 'nav.shelters', href: '/for-shelters' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#E2725B] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🐾</span>
            </div>
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Paws & Progress
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#4CAF50] hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}