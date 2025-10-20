"use client";

import ClientLayout from '@/components/ClientLayout';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, TrendingDown, Heart, Handshake, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForSheltersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    shelterName: '',
    type: '',
    contactName: '',
    role: '',
    phone: '',
    email: '',
    location: '',
    websiteUrl: '',
    animalsServedYearly: '',
    story: ''
  });

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      setError('Invalid phone format. Must be: +91[6-9]XXXXXXXXX (e.g., +919876543210)');
      setIsSubmitting(false);
      return;
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Invalid email format');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shelterName: formData.shelterName,
          type: formData.type,
          contactName: formData.contactName,
          role: formData.role || null,
          phone: formData.phone,
          email: formData.email,
          location: formData.location,
          websiteUrl: formData.websiteUrl || null,
          animalsServedYearly: formData.animalsServedYearly ? parseInt(formData.animalsServedYearly) : null,
          story: formData.story || null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit partnership request');
      }

      setIsSuccess(true);

      // Reset form
      setFormData({
        shelterName: '',
        type: '',
        contactName: '',
        role: '',
        phone: '',
        email: '',
        location: '',
        websiteUrl: '',
        animalsServedYearly: '',
        story: ''
      });

    } catch (err: any) {
      setError(err.message || 'Failed to submit partnership request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      icon: TrendingDown,
      title: 'Bulk Pricing',
      description: 'Up to 40% discount on multiple prosthetics for registered shelters and rescue organizations.',
      color: '#4CAF50'
    },
    {
      icon: Users,
      title: 'Priority Support',
      description: 'Dedicated support team and faster turnaround times for shelter partners.',
      color: '#2196F3'
    },
    {
      icon: Heart,
      title: 'Adoption Support',
      description: 'Help disabled pets find homes faster with restored mobility and quality of life.',
      color: '#E2725B'
    },
    {
      icon: Handshake,
      title: 'Flexible Terms',
      description: 'Payment plans, sponsorship matching, and pro-bono cases for exceptional circumstances.',
      color: '#FF9800'
    }
  ];

  const partnershipTiers = [
    {
      title: 'Basic Partnership',
      discount: '20% off',
      features: [
        '20% discount on all prosthetics',
        'Priority consultation scheduling',
        'Quarterly case reviews',
        'Marketing materials',
        'Basic training for staff'
      ]
    },
    {
      title: 'Premium Partnership',
      discount: '30% off',
      features: [
        '30% discount on all prosthetics',
        'Dedicated account manager',
        'Monthly case reviews',
        'Co-branded materials',
        'Advanced staff training',
        '2 pro-bono cases per year'
      ],
      popular: true
    },
    {
      title: 'Elite Partnership',
      discount: '40% off',
      features: [
        '40% discount on all prosthetics',
        'Premium support 24/7',
        'Weekly consultations',
        'Joint fundraising campaigns',
        'Comprehensive staff certification',
        '5 pro-bono cases per year',
        'Research collaboration'
      ]
    }
  ];

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E2725B]/10 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              For Shelters & Veterinarians
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Partner with us to provide life-changing prosthetics for disabled animals. 
              Together, we can help more pets find their forever homes.
            </p>
            <Link href="#partnership-form">
              <Button size="lg" className="bg-[#E2725B] hover:bg-[#d56552] text-white font-semibold px-8 py-6">
                Become a Partner
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#4CAF50] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>50+</p>
              <p className="text-gray-600 font-medium">Partner Shelters</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#4CAF50] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>300+</p>
              <p className="text-gray-600 font-medium">Shelter Pets Helped</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#4CAF50] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>85%</p>
              <p className="text-gray-600 font-medium">Adoption Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#4CAF50] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>₹30L+</p>
              <p className="text-gray-600 font-medium">Saved in Costs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Partnership Benefits
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

      {/* Partnership Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Partnership Programs
            </h2>
            <p className="text-lg text-gray-600">
              Choose the partnership level that fits your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => (
              <Card key={index} className={`p-8 ${tier.popular ? 'ring-2 ring-[#E2725B] shadow-2xl' : 'shadow-lg'}`}>
                {tier.popular && (
                  <div className="bg-[#E2725B] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {tier.title}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#E2725B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {tier.discount}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section id="partnership-form" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Register as a Partner
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and our partnership team will contact you within 48 hours
            </p>
          </div>

          <Card className="p-8 shadow-xl">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#4CAF50]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Thank You for Your Interest!
                </h3>
                <p className="text-gray-600 mb-6">
                  We have received your partnership request and will review your application. 
                  Our team will contact you within 48 hours.
                </p>
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                  }}
                  className="bg-[#E2725B] hover:bg-[#d56552]"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="shelterName" className="text-gray-700 font-semibold">
                      Organization Name <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="shelterName" 
                      name="shelterName"
                      value={formData.shelterName}
                      onChange={handleInputChange}
                      required 
                      className="mt-2" 
                      placeholder="Your shelter/clinic name" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-gray-700 font-semibold">
                      Organization Type <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
                    >
                      <option value="">Select type</option>
                      <option value="Animal Shelter">Animal Shelter</option>
                      <option value="Rescue Organization">Rescue Organization</option>
                      <option value="Veterinary Clinic">Veterinary Clinic</option>
                      <option value="Animal Hospital">Animal Hospital</option>
                      <option value="NGO">NGO</option>
                      <option value="Individual Rehabilitator">Individual Rehabilitator</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactName" className="text-gray-700 font-semibold">
                      Contact Person <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="contactName" 
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required 
                      className="mt-2" 
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-gray-700 font-semibold">
                      Designation
                    </Label>
                    <Input 
                      id="role" 
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="mt-2" 
                      placeholder="e.g., Director, Manager" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                      className="mt-2" 
                      placeholder="+91 98765 43210" 
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: +91[6-9]XXXXXXXXX</p>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="mt-2" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-gray-700 font-semibold">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required 
                    className="mt-2" 
                    placeholder="City, State" 
                  />
                </div>

                <div>
                  <Label htmlFor="websiteUrl" className="text-gray-700 font-semibold">
                    Website (if any)
                  </Label>
                  <Input 
                    id="websiteUrl" 
                    name="websiteUrl"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    className="mt-2" 
                    placeholder="https://yourwebsite.com" 
                  />
                </div>

                <div>
                  <Label htmlFor="animalsServedYearly" className="text-gray-700 font-semibold">
                    Approximate number of animals you care for yearly
                  </Label>
                  <Input 
                    id="animalsServedYearly" 
                    name="animalsServedYearly"
                    type="number"
                    value={formData.animalsServedYearly}
                    onChange={handleInputChange}
                    className="mt-2" 
                    placeholder="e.g., 500" 
                  />
                </div>

                <div>
                  <Label htmlFor="story" className="text-gray-700 font-semibold">
                    Tell us about your organization and why you want to partner
                  </Label>
                  <Textarea 
                    id="story" 
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    className="mt-2" 
                    rows={4} 
                    placeholder="Share your story..." 
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-[#E2725B] hover:bg-[#d56552] text-white font-semibold py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Partnership Request'
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      <WhatsAppWidget />
    </ClientLayout>
  );
}