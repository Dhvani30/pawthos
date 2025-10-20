"use client";

import ClientLayout from '@/components/ClientLayout';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Target, Users, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    {
      name: 'Dr. Priya Mehta',
      role: 'Founder & Veterinarian',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: '15+ years in veterinary medicine. Founded Paws & Progress after treating Alita, a dog who inspired this mission.'
    },
    {
      name: 'Rahul Sharma',
      role: 'Lead Engineer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Biomedical engineer specializing in 3D printing and prosthetics design. 50+ custom prosthetics designed.'
    },
    {
      name: 'Anjali Desai',
      role: 'Rehabilitation Specialist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      bio: 'Certified animal physiotherapist helping pets adapt to their new prosthetics with compassion and expertise.'
    },
    {
      name: 'Vikram Reddy',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: 'Ensures smooth operations from consultation to delivery. Passionate about making prosthetics accessible to all.'
    }
  ];

  const milestones = [
    { year: '2021', event: 'Founded after treating Alita, our inspiration', icon: Heart },
    { year: '2022', event: 'First 50 pets fitted with prosthetics', icon: Target },
    { year: '2023', event: 'Expanded to 15 cities across India', icon: Users },
    { year: '2024', event: 'Reached 500+ pets helped milestone', icon: Award }
  ];

  const values = [
    {
      title: 'Compassion First',
      description: 'Every decision we make is guided by empathy for animals and their families.',
      icon: Heart,
      color: '#E2725B'
    },
    {
      title: 'Affordability',
      description: 'We believe cost should never be a barrier to giving a pet a better life.',
      icon: Target,
      color: '#4CAF50'
    },
    {
      title: 'Innovation',
      description: 'Using cutting-edge 3D printing to create custom, high-quality prosthetics.',
      icon: Award,
      color: '#2196F3'
    },
    {
      title: 'Community',
      description: 'Building a network of pet owners, shelters, and vets working together.',
      icon: Users,
      color: '#FF9800'
    }
  ];

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50]/10 via-white to-[#E2725B]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              About Paws & Progress
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Born from love, driven by technology, united by a mission to give every disabled pet a second chance at life.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                The Alita Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In 2021, Dr. Priya Mehta, a veterinarian in Mumbai, met Alita—a spirited three-year-old dog who had lost her front leg in a road accident. Her family was heartbroken, and traditional prosthetics were prohibitively expensive at ₹80,000.
                </p>
                <p>
                  Dr. Mehta refused to accept that cost should determine a pet's quality of life. Partnering with biomedical engineer Rahul Sharma, she explored 3D printing as an affordable alternative. Six months later, Alita took her first steps with a custom-printed prosthetic costing just ₹8,000.
                </p>
                <p>
                  Watching Alita run again sparked a revelation: if technology could help one pet, why not hundreds? That moment gave birth to <strong>Paws & Progress</strong>—a mission to make mobility accessible to every disabled animal in India.
                </p>
                <p className="text-[#4CAF50] font-semibold">
                  Today, Alita is our mascot, ambassador, and constant reminder of why we do this work.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                  alt="Alita - The inspiration behind Paws & Progress"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-2xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Meet Alita
                  </p>
                  <p className="text-sm opacity-90">Our inspiration and ambassador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="w-14 h-14 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-[#4CAF50]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide affordable, high-quality 3D-printed prosthetics to disabled pets across India, ensuring that every animal—regardless of their owner's financial situation—has access to mobility, dignity, and a full life.
              </p>
            </Card>

            <Card className="p-8">
              <div className="w-14 h-14 bg-[#E2725B]/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-[#E2725B]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A world where disability is never a death sentence or surrender reason for a pet. Where technology and compassion work together to create a society that values and cares for all animals.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${value.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Our Journey
          </h2>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={index} className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-bold text-[#4CAF50]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Card className="p-4">
                      <p className="text-gray-700 font-medium">{milestone.event}</p>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              Passionate professionals united by love for animals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {member.name}
                  </h3>
                  <p className="text-[#4CAF50] font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Join Us in Making a Difference
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Whether you need help for your pet or want to support our mission, we would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#4CAF50] hover:bg-gray-100 font-semibold px-8 py-6">
                Get Help for Your Pet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/for-shelters">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#4CAF50] font-semibold px-8 py-6">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppWidget />
    </ClientLayout>
  );
}