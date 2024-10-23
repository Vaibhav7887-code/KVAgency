'use client';

import React, { useState } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function CTA() {
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      {/* Sticky CTA Button - Hidden on larger screens */}
      <div className="fixed bottom-8 right-4 sm:right-8 z-50 md:hidden">
        <button className="bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out transform">
          Contact Us
        </button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Ready to Start?</h2>
        <div className="max-w-xl mx-auto">
          {!isFormLoaded ? (
            <div className="space-y-4 sm:space-y-6">
              <LoadingSkeleton type="text" className="h-12" />
              <LoadingSkeleton type="text" className="h-12" />
              <LoadingSkeleton type="text" className="h-32" />
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <LoadingSkeleton type="button" className="w-full sm:w-2/3 h-12" />
                <LoadingSkeleton type="button" className="w-full sm:w-1/3 h-12" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 sm:py-4 glassmorphism focus:outline-none focus:ring-2 ${
                      errors.name ? 'focus:ring-red-500 border-red-500' : 'focus:ring-orange-600'
                    } text-gray-800 rounded-lg`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full px-4 py-3 sm:py-4 glassmorphism focus:outline-none focus:ring-2 ${
                      errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-orange-600'
                    } text-gray-800 rounded-lg`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 sm:py-4 glassmorphism focus:outline-none focus:ring-2 ${
                      errors.message ? 'focus:ring-red-500 border-red-500' : 'focus:ring-orange-600'
                    } text-gray-800 rounded-lg resize-none`}
                    rows={5}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full sm:w-2/3 px-6 py-3 sm:py-4 bg-orange-600 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out transform text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubmitting ? 'animate-pulse' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                <button 
                  type="button"
                  className="w-full sm:w-1/3 px-6 py-3 sm:py-4 border-2 border-orange-600 text-orange-600 font-semibold rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm sm:text-base"
                >
                  Schedule Call
                </button>
              </div>

              {submitSuccess && (
                <div className="text-center text-green-600 font-medium animate-fade-in">
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              <p className="text-center text-sm text-gray-500 mt-4">
                We&apos;ll get back to you within 24 hours
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
