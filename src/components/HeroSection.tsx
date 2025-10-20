"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-[#4CAF50]/10 via-white to-[#E2725B]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto"
                >
                  {t('hero.cta1')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/success-stories">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-[#E2725B] text-[#E2725B] hover:bg-[#E2725B] hover:text-white font-semibold px-8 py-6 text-lg w-full sm:w-auto"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {t('hero.cta2')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                alt="Happy dog with prosthetic leg"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Meet Alita
                </p>
                <p className="text-sm opacity-90">Running again with her 3D-printed leg</p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-6 shadow-xl">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4CAF50]" style={{ fontFamily: 'Poppins, sans-serif' }}>500+</p>
                <p className="text-xs text-gray-600 font-medium">Pets Helped</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#4CAF50]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#E2725B]/20 rounded-full blur-3xl" />
    </section>
  );
}