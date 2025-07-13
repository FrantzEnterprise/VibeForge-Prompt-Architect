import React from 'react';
import { motion } from 'framer-motion';
import { Minimize2, Zap, Building, Palette, Square, Settings } from 'lucide-react';
import { StepProps } from '../types';
import { StepNavigation } from '../components/StepNavigation';
import { SelectionCard } from '../components/SelectionCard';

const designStyles = [
  { id: 'minimalist', title: 'Minimalist & Clean', icon: <Minimize2 size={32} /> },
  { id: 'futuristic', title: 'Futuristic & Dark', icon: <Zap size={32} /> },
  { id: 'corporate', title: 'Corporate & Professional', icon: <Building size={32} /> },
  { id: 'playful', title: 'Playful & Creative', icon: <Palette size={32} /> },
  { id: 'brutalist', title: 'Brutalist & Raw', icon: <Square size={32} /> },
  { id: 'custom', title: 'Custom', icon: <Settings size={32} /> }
];

const colorSchemes = [
  { id: 'cyber-glow', name: 'Cyber Glow', colors: ['#1A1A2E', '#00BFFF', '#FF007F'] },
  { id: 'solar-flare', name: 'Solar Flare', colors: ['#2E2E2E', '#FFA500', '#FFFF00'] },
  { id: 'oceanic-deep', name: 'Oceanic Deep', colors: ['#0F172A', '#34D399', '#60A5FA'] },
  { id: 'neon-nights', name: 'Neon Nights', colors: ['#1A1A1A', '#FF6B6B', '#4ECDC4'] },
  { id: 'royal-purple', name: 'Royal Purple', colors: ['#2D1B69', '#8B5CF6', '#F59E0B'] },
  { id: 'custom', name: 'Custom Colors', colors: [] }
];

const typographyOptions = [
  { id: 'modern-safe', name: 'Roboto (Headings) & Open Sans (Body)', description: 'Modern & Safe' },
  { id: 'stylish-clean', name: 'Montserrat (Headings) & Lato (Body)', description: 'Stylish & Clean' },
  { id: 'futuristic-readable', name: 'Space Grotesk (Headings) & Inter (Body)', description: 'Futuristic & Readable' },
  { id: 'elegant-classic', name: 'Playfair Display (Headings) & Lora (Body)', description: 'Elegant & Classic' }
];

const animationOptions = [
  { id: 'subtle', name: 'Subtle & Professional', description: 'Gentle fades and smooth transitions' },
  { id: 'dynamic', name: 'Dynamic & Engaging', description: 'Slide-ins, bounces, and scale effects' },
  { id: 'cinematic', name: 'Cinematic & Bold', description: 'Dramatic entrances and parallax effects' },
  { id: 'minimal', name: 'Minimal & Clean', description: 'Simple opacity and position changes' },
  { id: 'none', name: 'No Animations', description: 'Static design with instant transitions' }
];

export const Step4Design: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  const isFormValid = data.designStyle !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-slide-up"
    >
      <div className="text-center mb-8">
        <h1 className="orbitron text-4xl font-bold gradient-text mb-4">
          Choose Your Vibe
        </h1>
        <p className="text-gray-400 text-lg">
          Define the visual identity of your application
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="form-group">
          <label className="form-label text-xl mb-6">General Style *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designStyles.map((style) => (
              <SelectionCard
                key={style.id}
                title={style.title}
                icon={style.icon}
                selected={data.designStyle === style.id}
                onClick={() => updateData({ designStyle: style.id })}
              />
            ))}
          </div>
          
          {data.designStyle === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <input
                type="text"
                className="form-input"
                value={data.customStyle}
                onChange={(e) => updateData({ customStyle: e.target.value })}
                placeholder="Describe your custom design style"
              />
            </motion.div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label text-xl mb-6">Color Palette</label>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorSchemes.map((scheme) => (
                <motion.div
                  key={scheme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`selection-card ${data.colorScheme === scheme.id ? 'selected' : ''}`}
                  onClick={() => updateData({ colorScheme: scheme.id })}
                >
                  <h3 className="font-semibold text-lg mb-3">{scheme.name}</h3>
                  {scheme.colors.length > 0 && (
                    <div className="flex gap-2 justify-center">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-gray-600"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {data.colorScheme === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="glass-effect p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4">Custom Color Selection</h3>
                <div className="color-picker-group">
                  <div className="color-picker">
                    <label className="text-sm text-gray-400">Primary Color</label>
                    <input
                      type="color"
                      className="color-input"
                      value={data.primaryColor}
                      onChange={(e) => updateData({ primaryColor: e.target.value })}
                    />
                  </div>
                  <div className="color-picker">
                    <label className="text-sm text-gray-400">Secondary Color</label>
                    <input
                      type="color"
                      className="color-input"
                      value={data.secondaryColor}
                      onChange={(e) => updateData({ secondaryColor: e.target.value })}
                    />
                  </div>
                  <div className="color-picker">
                    <label className="text-sm text-gray-400">Accent Color</label>
                    <input
                      type="color"
                      className="color-input"
                      value={data.accentColor}
                      onChange={(e) => updateData({ accentColor: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label text-xl mb-6">Typography</label>
          <div className="space-y-3">
            {typographyOptions.map((option) => (
              <motion.label
                key={option.id}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                  data.typography === option.id 
                    ? 'bg-blue-600/20 border-2 border-blue-500' 
                    : 'bg-slate-800 border-2 border-transparent hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="typography"
                  value={option.id}
                  checked={data.typography === option.id}
                  onChange={(e) => updateData({ typography: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-gray-200">{option.name}</div>
                  <div className="text-sm text-gray-400">{option.description}</div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label text-xl mb-6">Animation Style</label>
          <div className="space-y-3">
            {animationOptions.map((option) => (
              <motion.label
                key={option.id}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                  data.animationStyle === option.id 
                    ? 'bg-blue-600/20 border-2 border-blue-500' 
                    : 'bg-slate-800 border-2 border-transparent hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="animationStyle"
                  value={option.id}
                  checked={data.animationStyle === option.id}
                  onChange={(e) => updateData({ animationStyle: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium text-gray-200">{option.name}</div>
                  <div className="text-sm text-gray-400">{option.description}</div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        nextLabel="Generate My Prompt!"
        isNextDisabled={!isFormValid}
      />
    </motion.div>
  );
};
