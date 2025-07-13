import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Puzzle, ShoppingCart, User, FileText, Settings } from 'lucide-react';
import { StepProps } from '../types';
import { StepNavigation } from '../components/StepNavigation';
import { SelectionCard } from '../components/SelectionCard';

const appTypes = [
  { id: 'web-app', title: 'Web Application', description: 'Single Page App', icon: <Monitor size={32} /> },
  { id: 'mobile-app', title: 'Mobile Application', description: 'iOS/Android', icon: <Smartphone size={32} /> },
  { id: 'browser-extension', title: 'Browser Extension', description: 'Chrome/Firefox/Edge', icon: <Puzzle size={32} /> },
  { id: 'desktop-app', title: 'Desktop Application', description: 'Using Electron', icon: <Monitor size={32} /> },
  { id: 'ecommerce', title: 'E-commerce Website', description: 'Online store', icon: <ShoppingCart size={32} /> },
  { id: 'portfolio', title: 'Portfolio / Landing Page', description: 'Showcase website', icon: <User size={32} /> },
  { id: 'blog-cms', title: 'Blog / CMS', description: 'Content management', icon: <FileText size={32} /> },
  { id: 'other', title: 'Other', description: 'Custom application type', icon: <Settings size={32} /> }
];

export const Step2TechSpecs: React.FC<StepProps> = ({ data, updateData, onNext, onBack, isValid }) => {
  const addComponent = (component: string) => {
    if (component.trim() && !data.customComponents.includes(component.trim())) {
      updateData({ 
        customComponents: [...data.customComponents, component.trim()] 
      });
    }
  };

  const removeComponent = (index: number) => {
    updateData({ 
      customComponents: data.customComponents.filter((_, i) => i !== index) 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      addComponent(input.value);
      input.value = '';
    }
  };

  const isFormValid = data.appType !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-slide-up"
    >
      <div className="text-center mb-8">
        <h1 className="orbitron text-4xl font-bold gradient-text mb-4">
          Define Your Project's DNA
        </h1>
        <p className="text-gray-400 text-lg">
          Let's get technical about your application
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="form-group">
          <label className="form-label text-xl mb-6">Application Type *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {appTypes.map((type) => (
              <SelectionCard
                key={type.id}
                title={type.title}
                description={type.description}
                icon={type.icon}
                selected={data.appType === type.id}
                onClick={() => updateData({ appType: type.id })}
              />
            ))}
          </div>
          
          {data.appType === 'other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <input
                type="text"
                className="form-input"
                value={data.customAppType}
                onChange={(e) => updateData({ customAppType: e.target.value })}
                placeholder="Describe your custom application type"
              />
            </motion.div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label text-xl mb-6">Key Components/Features</label>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="componentSelection"
                  checked={data.componentSelection === 'ai-suggest'}
                  onChange={() => updateData({ componentSelection: 'ai-suggest' })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-300">Let AI Suggest Components (Recommended)</span>
              </label>
            </div>
            
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="componentSelection"
                  checked={data.componentSelection === 'manual'}
                  onChange={() => updateData({ componentSelection: 'manual' })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-300">I Will Specify Components</span>
              </label>
            </div>

            {data.componentSelection === 'manual' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder="Type a component and press Enter (e.g., User Login, Dashboard, Payment Gateway)"
                  onKeyPress={handleKeyPress}
                />
                
                {data.customComponents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.customComponents.map((component, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                      >
                        {component}
                        <button
                          onClick={() => removeComponent(index)}
                          className="hover:text-red-300 transition-colors"
                        >
                          ×
                        </button>
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label text-xl mb-4">Other Pertinent Information</label>
          <textarea
            className="form-input form-textarea"
            value={data.additionalInfo}
            onChange={(e) => updateData({ additionalInfo: e.target.value })}
            placeholder="Add any other technical requirements, user stories, or specific functionalities..."
            rows={6}
          />
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        nextLabel="Next: Upload Assets"
        isNextDisabled={!isFormValid}
      />
    </motion.div>
  );
};
