// src/components/ContactForm.tsx
import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  useEffect(() => {
    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha && window.grecaptcha.render) {
      setRecaptchaLoaded(true);
    } else {
      // Add a global callback for when reCAPTCHA loads
      window.onRecaptchaLoad = () => {
        setRecaptchaLoaded(true);
      };
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Verifying...' });

    // Get reCAPTCHA token
    const token = window.grecaptcha?.getResponse();
    if (!token) {
      setStatus({ type: 'error', message: 'Please complete the CAPTCHA verification.' });
      return;
    }

    try {
      // Verify reCAPTCHA with your Cloudflare Worker
      // IMPORTANT: Replace this URL with your actual Cloudflare Worker URL
      const verifyResponse = await fetch('YOUR-WORKER-URL-HERE.workers.dev/verify-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setStatus({ type: 'error', message: 'CAPTCHA verification failed. Please try again.' });
        resetRecaptcha();
        return;
      }

      // If CAPTCHA is verified, you can now process the form
      // For now, we'll just simulate success
      setStatus({ type: 'loading', message: 'Sending message...' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      resetRecaptcha();

    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      resetRecaptcha();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-black/50 border-2 border-cyan-400 rounded-xl p-8 shadow-lg shadow-cyan-400/30">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="text-cyan-400" size={28} />
          <h3 className="text-2xl font-bold text-cyan-400">Get In Touch</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-vertical"
              placeholder="Tell me about your project or just say hello!"
            />
          </div>

          {/* reCAPTCHA - Force challenge mode */}
          <div className="flex justify-center">
            <div 
              className="g-recaptcha" 
              data-sitekey="6Lf0daArAAAAAB6wXguJeGjdRncJA--7cId-9n2Z"
              data-theme="dark"
              data-size="normal"
            />
          </div>

          {/* Status Message */}
          {status.type !== 'idle' && (
            <div className={`flex items-center gap-2 p-4 rounded-lg ${
              status.type === 'success' ? 'bg-green-900/50 border border-green-500 text-green-300' :
              status.type === 'error' ? 'bg-red-900/50 border border-red-500 text-red-300' :
              'bg-blue-900/50 border border-blue-500 text-blue-300'
            }`}>
              {status.type === 'success' && <CheckCircle size={20} />}
              {status.type === 'error' && <AlertCircle size={20} />}
              {status.type === 'loading' && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status.type === 'loading' || !recaptchaLoaded}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} />
            {status.type === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;