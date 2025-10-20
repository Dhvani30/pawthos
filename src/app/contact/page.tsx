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
import { Upload, CheckCircle, Loader2, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseId, setCaseId] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    species: '',
    location: '',
    injuryDescription: '',
    phone: '',
    email: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.slice(0, 3);
      
      // Check file size (50MB max)
      const oversizedFiles = validFiles.filter(file => file.size > 50 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setError('Some files exceed 50MB limit');
        return;
      }
      
      setFiles(validFiles);
      setError(null);
    }
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    return phoneRegex.test(phone);
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

    try {
      // TODO: Upload files to cloud storage and get URLs
      // For now, we'll use empty array for mediaUrls
      const mediaUrls: string[] = [];
      
      // Submit consultation
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerName: formData.ownerName,
          petName: formData.petName,
          species: formData.species,
          location: formData.location,
          injuryDescription: formData.injuryDescription,
          phone: formData.phone,
          email: formData.email || null,
          mediaUrls: mediaUrls
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit consultation');
      }

      setCaseId(data.caseId);
      setIsSuccess(true);

      // Reset form
      setFormData({
        ownerName: '',
        petName: '',
        species: '',
        location: '',
        injuryDescription: '',
        phone: '',
        email: ''
      });
      setFiles([]);

      // TODO: Send WhatsApp confirmation via API

    } catch (err: any) {
      setError(err.message || 'Failed to submit consultation. Please try again.');
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
            Book a Free Consultation
          </h1>
          <p className="text-xl text-gray-600">
            We'll reach out within 24 hours
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Get in Touch
                </h2>
                <p className="text-gray-600">
                  We're here to help your pet. Reach out to us through any of these channels.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 6 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">hello@pawsandprogress.org</p>
                    <p className="text-sm text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">Mumbai, Maharashtra</p>
                    <p className="text-sm text-gray-500">Serving all of India</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Quick Response
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Need immediate assistance? Chat with us on WhatsApp for instant support.
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white text-[#4CAF50] hover:bg-gray-100 w-full"
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Consultation Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-xl">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#4CAF50]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Request Submitted Successfully!
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Our team will contact you within 24 hours
                    </p>
                    <p className="text-lg font-semibold text-[#4CAF50] mb-6">
                      Case ID: {caseId}
                    </p>
                    <Button
                      onClick={() => {
                        setIsSuccess(false);
                        setCaseId('');
                      }}
                      className="bg-[#4CAF50] hover:bg-[#45a049]"
                    >
                      Submit Another Request
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
                        <Label htmlFor="ownerName" className="text-gray-700 font-semibold">
                          Your Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="ownerName" 
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          required 
                          className="mt-2" 
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="petName" className="text-gray-700 font-semibold">
                          Your Pet's Name <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="petName" 
                          name="petName"
                          value={formData.petName}
                          onChange={handleInputChange}
                          required 
                          className="mt-2" 
                          placeholder="Your pet's name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="species" className="text-gray-700 font-semibold">
                          Species <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="species"
                          name="species"
                          value={formData.species}
                          onChange={handleInputChange}
                          required
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        >
                          <option value="">Select species</option>
                          <option value="dog">Dog</option>
                          <option value="cat">Cat</option>
                          <option value="bird">Bird</option>
                          <option value="rabbit">Rabbit</option>
                          <option value="other">Other</option>
                        </select>
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
                          placeholder="e.g., Mumbai, Delhi"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="injuryDescription" className="text-gray-700 font-semibold">
                        Injury/Disability Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea 
                        id="injuryDescription" 
                        name="injuryDescription"
                        value={formData.injuryDescription}
                        onChange={handleInputChange}
                        required 
                        className="mt-2" 
                        rows={4}
                        placeholder="Describe the injury or disability in detail"
                      />
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
                          Email (optional)
                        </Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-2" 
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="files" className="text-gray-700 font-semibold">
                        Upload Images/Video (optional)
                      </Label>
                      <p className="text-sm text-gray-500 mt-1 mb-2">
                        Max 3 images or 1 video (up to 50MB)
                      </p>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#4CAF50] transition-colors">
                        <input
                          id="files"
                          name="files"
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label htmlFor="files" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                        </label>
                        {files.length > 0 && (
                          <div className="mt-4 text-left">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Selected files:
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {files.map((file, index) => (
                                <li key={index}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
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
                        'Submit Consultation Request'
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppWidget />
    </ClientLayout>
  );
}