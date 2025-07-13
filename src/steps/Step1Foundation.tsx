import React from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '../types';
import { StepNavigation } from '../components/StepNavigation';

export const Step1Foundation: React.FC<StepProps> = ({ data, updateData, onNext, isValid }) => {
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = data.name.trim() && 
                     data.email.trim() && 
                     validateEmail(data.email) &&
                     data.appName.trim() && 
                     data.description.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-slide-up"
    >
      <div className="text-center mb-8">
        <h1 className="orbitron text-4xl font-bold gradient-text mb-4">
          Let's Start with the Basics
        </h1>
        <p className="text-gray-400 text-lg">
          Tell us about yourself and your project vision
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="form-group">
          <label className="form-label">Your Name *</label>
          <input
            type="text"
            className="form-input"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Your Email *</label>
          <input
            type="email"
            className="form-input"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="your.email@example.com"
          />
          {data.email && !validateEmail(data.email) && (
            <p className="text-red-400 text-sm mt-1">Please enter a valid email address</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Your Phone Number</label>
          <input
            type="tel"
            className="form-input"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label className="form-label">What is the name of your new application? *</label>
          <input
            type="text"
            className="form-input"
            value={data.appName}
            onChange={(e) => updateData({ appName: e.target.value })}
            placeholder="My Awesome App"
          />
        </div>

        <div className="form-group">
          <label className="form-label">In a few sentences, what should your application do? *</label>
          <textarea
            className="form-input form-textarea"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Describe your application's main purpose and key features..."
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {data.description.length}/500 characters
          </div>
        </div>
      </div>

      <StepNavigation
        onNext={onNext}
        nextLabel="Next: Tech Specs"
        isNextDisabled={!isFormValid}
        showBack={false}
      />
    </motion.div>
  );
};
