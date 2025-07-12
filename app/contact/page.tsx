'use client';

import Header from '../../components/Header';
import ContactForm from './ContactForm';
import { useState } from 'react';

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about our services? Need help with a booking? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-xl text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91-9876543210</p>
                    <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-xl text-green-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">yash@rent-a-wheel.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-xl text-purple-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Main Office</h3>
                    <p className="text-gray-600">Pari Chowk, Greater Noida<br />Uttar Pradesh, India 201310</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-xl text-orange-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Business Hours</h3>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                      <p className="text-blue-600 font-medium">24/7 Emergency Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Our Locations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Main Office</span>
                  <span className="text-gray-600">Pari Chowk, Greater Noida</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Delhi Airport</span>
                  <span className="text-gray-600">Terminal 3</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Connaught Place</span>
                  <span className="text-gray-600">New Delhi</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sector 18</span>
                  <span className="text-gray-600">Noida</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cyber City</span>
                  <span className="text-gray-600">Gurgaon</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm onSubmit={handleFormSubmit} />

            {showSuccess && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-check-circle-fill text-green-500 text-xl mr-3"></i>
                  <div>
                    <h4 className="text-green-800 font-semibold">Message Sent!</h4>
                    <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2503633219757!2d77.47436731507658!3d28.629158182413756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef8b0f3e3f8f%3A0x7d4d4c8b0a7c8b8b!2sPari%20Chowk%2C%20Greater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rent-A-Wheel Location - Pari Chowk, Greater Noida"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
