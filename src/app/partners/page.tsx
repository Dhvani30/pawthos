"use client";

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2, AlertCircle, Building2, Users, Heart } from 'lucide-react';

export default function PartnersPage() {
  const { t } = useLanguage();
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

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4CAF50]/10 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Partner With Us
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our mission to help disabled animals across India
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're an animal shelter, veterinary clinic, NGO, or individual rehabilitator, 
            we'd love to collaborate with you to bring affordable prosthetics to more animals in need.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Partnership Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Discounted Pricing
              </h3>
              <p className="text-gray-600">
                Access special bulk pricing for multiple prosthetics, making it more affordable to help more animals.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Priority Support
              </h3>
              <p className="text-gray-600">
                Get dedicated support from our team with faster response times and technical assistance.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Make Greater Impact
              </h3>
              <p className="text-gray-600">
                Together we can help more disabled animals live full, active lives across India.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 shadow-xl">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#4CAF50]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Partnership Request Submitted!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in partnering with us. Our team will review your application 
                  and contact you within 48 hours to discuss next steps.
                </p>
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                  }}
                  className="bg-[#4CAF50] hover:bg-[#45a049]"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Partnership Registration Form
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below to begin your partnership journey with us
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="shelterName" className="text-gray-700 font-semibold">
                      Shelter/Clinic Name <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="shelterName" 
                      name="shelterName"
                      value={formData.shelterName}
                      onChange={handleInputChange}
                      required 
                      className="mt-2" 
                      placeholder="e.g., Paws & Hope Animal Shelter"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-gray-700 font-semibold">
                      Type <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    >
                      <option value="">Select type</option>
                      <option value="Animal Shelter">Animal Shelter</option>
                      <option value="Veterinary Clinic">Veterinary Clinic</option>
                      <option value="NGO">NGO</option>
                      <option value="Individual Rehabilitator">Individual Rehabilitator</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contactName" className="text-gray-700 font-semibold">
                        Your Full Name <span className="text-red-500">*</span>
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
                        Role (optional)
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
                        Phone <span className="text-red-500">*</span>
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
                      Location (City, State) <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="location" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required 
                      className="mt-2" 
                      placeholder="e.g., Mumbai, Maharashtra"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="websiteUrl" className="text-gray-700 font-semibold">
                        Website URL (optional)
                      </Label>
                      <Input 
                        id="websiteUrl" 
                        name="websiteUrl"
                        type="url"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        className="mt-2" 
                        placeholder="https://yourwebsite.org"
                      />
                    </div>

                    <div>
                      <Label htmlFor="animalsServedYearly" className="text-gray-700 font-semibold">
                        Animals Served Yearly (optional)
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
                  </div>

                  <div>
                    <Label htmlFor="story" className="text-gray-700 font-semibold">
                      Share your story (optional)
                    </Label>
                    <Textarea 
                      id="story" 
                      name="story"
                      value={formData.story}
                      onChange={handleInputChange}
                      className="mt-2" 
                      rows={5}
                      placeholder="Tell us about your organization, the animals you help, and why you'd like to partner with us..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-6"
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
              </>
            )}
          </Card>
        </div>
      </section>

      <WhatsAppWidget />
    </ClientLayout>
  );
}