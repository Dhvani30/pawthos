"use client";

import ClientLayout from '@/components/ClientLayout';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { IndianRupee, Clock, Heart, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForPetOwnersPage() {
  const benefits = [
    {
      icon: IndianRupee,
      title: 'Affordable Pricing',
      description: 'Starting from ₹8,000 - far below traditional prosthetics. Flexible payment plans available.',
      color: '#4CAF50'
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: '7-10 days from consultation to fitting. We understand your pet needs help fast.',
      color: '#2196F3'
    },
    {
      icon: Heart,
      title: 'Custom Fitted',
      description: 'Every prosthetic is designed specifically for your pet\'s body, weight, and activity level.',
      color: '#E2725B'
    },
    {
      icon: Shield,
      title: 'Lifetime Support',
      description: 'Free adjustments, rehabilitation guidance, and lifetime warranty on defects.',
      color: '#FF9800'
    }
  ];

  const faqs = [
    {
      question: 'How much does a prosthetic cost?',
      answer: 'Our prosthetics start from ₹8,000 and can go up to ₹25,000 depending on the complexity and size. This includes consultation, design, printing, fitting, and follow-up support. We also offer payment plans for those who need them.'
    },
    {
      question: 'What types of pets can you help?',
      answer: 'We primarily work with dogs and cats, but have also created prosthetics for birds, rabbits, and other small animals. Each case is unique, and we assess feasibility during the free consultation.'
    },
    {
      question: 'How long does the process take?',
      answer: 'From initial consultation to fitting typically takes 7-10 days. This includes assessment (1 day), 3D scanning and design (2-3 days), printing (2-3 days), and fitting/adjustment (1-2 days).'
    },
    {
      question: 'Will my pet accept the prosthetic?',
      answer: 'Most pets adapt within 1-2 weeks with proper training and rehabilitation. We provide detailed guidance and support throughout the adjustment period. Our success rate is over 95%.'
    },
    {
      question: 'Do you offer warranties?',
      answer: 'Yes! All prosthetics come with a lifetime warranty against manufacturing defects. We also provide free adjustments for the first 6 months as your pet grows or their needs change.'
    },
    {
      question: 'What if my pet is in a rural area?',
      answer: 'We serve all of India! For remote locations, we can work with local veterinarians to facilitate the scanning and fitting process. Transportation costs may apply.'
    },
    {
      question: 'How do I care for the prosthetic?',
      answer: 'Basic cleaning with mild soap and water is all that\'s needed. We provide a detailed care guide and are always available for questions. Most prosthetics last 2-3 years with proper care.'
    },
    {
      question: 'Can my pet swim or run with the prosthetic?',
      answer: 'Yes! Our prosthetics are designed for full mobility. While not waterproof for extended submersion, they can handle light water exposure. We can create sport-specific designs for active pets.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Basic',
      price: '₹8,000',
      description: 'For small pets (cats, small dogs)',
      features: [
        'Free consultation',
        'Custom 3D design',
        'Basic prosthetic',
        'One fitting session',
        'Care guide',
        '6-month support'
      ]
    },
    {
      name: 'Standard',
      price: '₹15,000',
      description: 'For medium dogs and complex cases',
      features: [
        'Everything in Basic',
        'Advanced materials',
        'Multiple fittings',
        'Rehabilitation plan',
        '1-year support',
        'Free adjustments'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '₹25,000',
      description: 'For large dogs and athletes',
      features: [
        'Everything in Standard',
        'Sport-grade materials',
        'Activity-specific design',
        'Extended training',
        'Lifetime support',
        'Replacement discount'
      ]
    }
  ];

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50]/10 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              For Pet Owners
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about getting a prosthetic for your beloved companion
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Why Choose Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${benefit.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              No hidden costs. Payment plans available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`p-8 ${tier.popular ? 'ring-2 ring-[#4CAF50] shadow-2xl' : 'shadow-lg'}`}>
                {tier.popular && (
                  <div className="bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {tier.price}
                  </span>
                  <span className="text-gray-600"> / prosthetic</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-[#4CAF50] hover:bg-[#45a049]' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#4CAF50]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#4CAF50] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Help Your Pet?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Book a free consultation and let us assess how we can help your furry friend.
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