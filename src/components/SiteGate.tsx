// src/components/SiteGate.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Lock } from 'lucide-react';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface SiteGateProps {
  onVerified: () => void;
}

const SiteGate: React.FC<SiteGateProps> = ({ onVerified }) => {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user has already been verified in this session
    const isVerified = sessionStorage.getItem('recaptcha_verified');
    if (isVerified === 'true') {
      onVerified();
      return;
    }

    // Check if reCAPTCHA is loaded
    if (window.grecaptcha && window.grecaptcha.render) {
      setRecaptchaLoaded(true);
    } else {
      window.onRecaptchaLoad = () => {
        setRecaptchaLoaded(true);
      };
    }
  }, [onVerified]);

  const handleRecaptchaChange = useCallback(async (token: string | null) => {
    if (!token) {
      setError('Please complete the verification.');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Verify with your Cloudflare Worker
      const response = await fetch('https://recaptcha-verifier.anishkajan2005.workers.dev/verify-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        // Store verification in session storage
        sessionStorage.setItem('recaptcha_verified', 'true');
        onVerified();
      } else {
        setError('Verification failed. Please try again.');
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } finally {
      setIsVerifying(false);
    }
  }, [onVerified]);

  useEffect(() => {
    if (recaptchaLoaded && window.grecaptcha) {
      // Render reCAPTCHA when component mounts
      const recaptchaContainer = document.getElementById('site-gate-recaptcha');
      if (recaptchaContainer && !recaptchaContainer.hasChildNodes()) {
        window.grecaptcha.render('site-gate-recaptcha', {
          sitekey: '6Lf0daArAAAAAB6wXguJeGjdRncJA--7cId-9n2Z',
          theme: 'dark',
          callback: handleRecaptchaChange,
          'expired-callback': () => {
            setError('Verification expired. Please try again.');
          },
          'error-callback': () => {
            setError('Verification error. Please refresh and try again.');
          }
        });
      }
    }
  }, [recaptchaLoaded, handleRecaptchaChange]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-black/80 backdrop-blur-sm border-2 border-cyan-400 rounded-2xl p-8 shadow-2xl shadow-cyan-400/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Shield className="w-16 h-16 text-cyan-400" />
                <Lock className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Security Verification</h1>
            <p className="text-gray-300">
              Please verify you're human to access this website
            </p>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center mb-6">
            {recaptchaLoaded ? (
              <div id="site-gate-recaptcha"></div>
            ) : (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                <span className="ml-3 text-gray-300">Loading verification...</span>
              </div>
            )}
          </div>

          {/* Status messages */}
          {isVerifying && (
            <div className="flex items-center justify-center mb-4 text-blue-300">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300 mr-2"></div>
              Verifying...
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-400">
            <p>Protected by reCAPTCHA</p>
            <p className="mt-1">
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                Privacy
              </a>
              {' · '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                Terms
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteGate;