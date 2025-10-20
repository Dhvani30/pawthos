"use client";

import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ClientLayout from '@/components/ClientLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <ClientLayout>
      <HeroSection />
      <StatsSection />
      
      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our Mission: Every Pet Deserves Mobility
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe that disability shouldn't stop a pet from living a full, joyful life. 
              Using affordable 3D-printing technology, we create custom prosthetics that restore 
              mobility and dignity to pets across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                For Pet Owners
              </h3>
              <p className="text-gray-600 mb-4">
                Affordable, custom-fitted prosthetics for your beloved companion. Free consultations and flexible payment plans.
              </p>
              <Link href="/for-pet-owners">
                <Button variant="link" className="text-[#4CAF50] p-0 hover:text-[#45a049]">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-[#E2725B]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-[#E2725B]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                For Shelters
              </h3>
              <p className="text-gray-600 mb-4">
                Bulk pricing and partnership programs to help more rescued animals find their forever homes.
              </p>
              <Link href="/for-shelters">
                <Button variant="link" className="text-[#E2725B] p-0 hover:text-[#d56552]">
                  Partner With Us <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Stethoscope className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                For Veterinarians
              </h3>
              <p className="text-gray-600 mb-4">
                Collaborate with us to provide cutting-edge prosthetic solutions for your patients.
              </p>
              <Link href="/for-shelters">
                <Button variant="link" className="text-blue-500 p-0 hover:text-blue-600">
                  Get Started <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to Give Your Pet a Second Chance?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Book a free consultation today. Our team will assess your pet's needs and provide a custom solution.
          </p>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-white text-[#4CAF50] hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
            >
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