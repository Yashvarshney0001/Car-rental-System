'use client';

import { useState } from 'react';

interface ContactFormProps {
  onSubmit: () => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // Save to localStorage (simulating database)
      const contact = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      };

      const existingContacts = JSON.parse(localStorage.getItem('rentawheelContacts') || '[]');
      existingContacts.push(contact);
      localStorage.setItem('rentawheelContacts', JSON.stringify(existingContacts));

      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      onSubmit();
    }, 1000);
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
      
      <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+91-XXXXXXXXXX"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <div className="relative">
            <select
              name="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              required
            >
              <option value="">Select a subject</option>
              <option value="booking">Booking Inquiry</option>
              <option value="pricing">Pricing Information</option>
              <option value="support">Technical Support</option>
              <option value="complaint">Complaint</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
            <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
            maxLength={500}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Tell us how we can help you..."
            required
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {formData.message.length}/500 characters
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <i className="ri-information-line text-blue-600 text-lg mr-3 mt-0.5"></i>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Contact Yash Varshney directly:</p>
            <p>For urgent matters, you can reach out to our founder directly at yash@rent-a-wheel.com or call +91-9876543210</p>
          </div>
        </div>
      </div>
    </div>
  );
}

