"use client";

import ClientLayout from '@/components/ClientLayout';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { FileText, Scan, Printer, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      icon: FileText,
      title: t('howItWorks.step1'),
      description: t('howItWorks.step1Desc'),
      color: '#4CAF50',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80'
    },
    {
      number: '02',
      icon: Scan,
      title: t('howItWorks.step2'),
      description: t('howItWorks.step2Desc'),
      color: '#2196F3',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80'
    },
    {
      number: '03',
      icon: Printer,
      title: t('howItWorks.step3'),
      description: t('howItWorks.step3Desc'),
      color: '#FF9800',
      image: 'https://images.unsplash.com/photo-1614866242622-9f5a4e4c8c5f?w=600&q=80'
    },
    {
      number: '04',
      icon: Heart,
      title: t('howItWorks.step4'),
      description: t('howItWorks.step4Desc'),
      color: '#E2725B',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80'
    }
  ];

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50]/10 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t('howItWorks.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${step.color}20` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: step.color }} />
                      </div>
                      <span 
                        className="text-6xl font-bold opacity-10"
                        style={{ fontFamily: 'Poppins, sans-serif', color: step.color }}
                      >
                        {step.number}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {step.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {index === 0 && (
                      <Link href="/contact">
                        <Button 
                          className="mt-4" 
                          style={{ backgroundColor: step.color }}
                        >
                          Start Your Consultation
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            What to Expect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Free initial consultation and assessment',
              'Transparent pricing with no hidden costs',
              'Custom-fitted prosthetic designed for your pet',
              'Follow-up support and adjustments included',
              'Rehabilitation guidance and training',
              'Lifetime warranty on manufacturing defects'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-6 rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#4CAF50] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Start the Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Book your free consultation today and take the first step towards giving your pet mobility and freedom.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-[#4CAF50] hover:bg-gray-100 font-semibold px-8 py-6">
              Book Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <WhatsAppWidget />
    </ClientLayout>
  );
}