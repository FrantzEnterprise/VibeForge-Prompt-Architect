import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, RotateCcw, CheckCircle } from 'lucide-react';
import { ProjectData } from '../types';

interface Step5FinalPromptProps {
  data: ProjectData;
  onStartOver: () => void;
}

export const Step5FinalPrompt: React.FC<Step5FinalPromptProps> = ({ data, onStartOver }) => {
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const appTypeMap: { [key: string]: string } = {
      'web-app': 'Web Application (Single Page App)',
      'mobile-app': 'Mobile Application (iOS/Android)',
      'browser-extension': 'Browser Extension (Chrome/Firefox/Edge)',
      'desktop-app': 'Desktop Application (using Electron)',
      'ecommerce': 'E-commerce Website',
      'portfolio': 'Portfolio / Landing Page',
      'blog-cms': 'Blog / Content Management System (CMS)',
      'other': data.customAppType || 'Custom Application'
    };

    const styleMap: { [key: string]: string } = {
      'minimalist': 'Minimalist & Clean',
      'futuristic': 'Futuristic & Dark',
      'corporate': 'Corporate & Professional',
      'playful': 'Playful & Creative',
      'brutalist': 'Brutalist & Raw',
      'custom': data.customStyle || 'Custom Style'
    };

    const colorSchemeMap: { [key: string]: string } = {
      'cyber-glow': 'Cyber Glow (#1A1A2E, #00BFFF, #FF007F)',
      'solar-flare': 'Solar Flare (#2E2E2E, #FFA500, #FFFF00)',
      'oceanic-deep': 'Oceanic Deep (#0F172A, #34D399, #60A5FA)',
      'neon-nights': 'Neon Nights (#1A1A1A, #FF6B6B, #4ECDC4)',
      'royal-purple': 'Royal Purple (#2D1B69, #8B5CF6, #F59E0B)',
      'custom': `Custom Colors (Primary: ${data.primaryColor}, Secondary: ${data.secondaryColor}, Accent: ${data.accentColor})`
    };

    const typographyMap: { [key: string]: string } = {
      'modern-safe': 'Roboto (Headings) & Open Sans (Body) - Modern & Safe',
      'stylish-clean': 'Montserrat (Headings) & Lato (Body) - Stylish & Clean',
      'futuristic-readable': 'Space Grotesk (Headings) & Inter (Body) - Futuristic & Readable',
      'elegant-classic': 'Playfair Display (Headings) & Lora (Body) - Elegant & Classic'
    };

    const animationMap: { [key: string]: string } = {
      'subtle': 'Subtle & Professional - Gentle fades and smooth transitions',
      'dynamic': 'Dynamic & Engaging - Slide-ins, bounces, and scale effects',
      'cinematic': 'Cinematic & Bold - Dramatic entrances and parallax effects',
      'minimal': 'Minimal & Clean - Simple opacity and position changes',
      'none': 'No Animations - Static design with instant transitions'
    };

    let prompt = `# AI Developer Persona & Instructions

You are an elite senior full-stack developer and UI/UX designer with 15+ years of experience building production-grade applications. You have expertise in:

- **Frontend Mastery**: React, Vue, Angular, TypeScript, modern CSS frameworks, responsive design
- **Backend Excellence**: Node.js, Python, databases, APIs, cloud architecture
- **Design Systems**: Creating cohesive, accessible, and visually stunning interfaces
- **Performance Optimization**: Code splitting, lazy loading, SEO, Core Web Vitals
- **Best Practices**: Clean code, testing, security, scalability, maintainability

Your approach is methodical, detail-oriented, and focused on creating applications that feel polished and professional. You write clean, well-documented code and always consider user experience, accessibility, and performance from the start.

---

# ${data.appName} - Development Brief

## Project Overview
**Application Name:** ${data.appName}
**Application Type:** ${appTypeMap[data.appType] || data.appType}
**Description:** ${data.description}

## Client Information
**Name:** ${data.name}
**Email:** ${data.email}`;

    if (data.phone) {
      prompt += `\n**Phone:** ${data.phone}`;
    }

    prompt += `\n\n## Technical Specifications`;

    if (data.componentSelection === 'ai-suggest') {
      prompt += `\n**Components:** Please suggest appropriate components based on the application description and type.`;
    } else if (data.customComponents.length > 0) {
      prompt += `\n**Required Components:**`;
      data.customComponents.forEach(component => {
        prompt += `\n- ${component}`;
      });
    }

    if (data.additionalInfo) {
      prompt += `\n\n**Additional Technical Requirements:**\n${data.additionalInfo}`;
    }

    prompt += `\n\n## Design & Aesthetics
**Design Style:** ${styleMap[data.designStyle] || data.designStyle}
**Color Palette:** ${colorSchemeMap[data.colorScheme] || data.colorScheme}
**Typography:** ${typographyMap[data.typography] || data.typography}`;

    if (data.animationStyle) {
      prompt += `\n**Animation Style:** ${animationMap[data.animationStyle] || data.animationStyle}`;
    }

    if (data.referenceFiles.length > 0) {
      prompt += `\n\n## Reference Materials
**Documents Provided:** ${data.referenceFiles.length} file(s)`;
      data.referenceFiles.forEach(file => {
        prompt += `\n- ${file.name}`;
      });
    }

    if (data.logoFiles.length > 0) {
      prompt += `\n\n## Brand Assets
**Logo Files:** ${data.logoFiles.length} file(s)`;
      data.logoFiles.forEach(file => {
        prompt += `\n- ${file.name}`;
      });
    }

    if (data.backgroundFile) {
      prompt += `\n**Background Image:** ${data.backgroundFile.name}`;
    }

    prompt += `\n\n## Development Instructions
As an expert developer, please create a modern, responsive, and production-ready ${appTypeMap[data.appType] || data.appType} that meets all the specifications above. Ensure the application is:

1. **Fully Functional:** All features should be implemented and working perfectly
2. **Responsive Design:** Flawlessly optimized for desktop, tablet, and mobile devices
3. **Modern Tech Stack:** Use current best practices and cutting-edge technologies
4. **Clean Architecture:** Well-structured, commented, and maintainable code with proper separation of concerns
5. **Exceptional UX:** Intuitive navigation, smooth interactions, and delightful user experience
6. **Performance Optimized:** Fast loading, smooth operation, and efficient resource usage
7. **Accessibility First:** Following WCAG guidelines for inclusive design
8. **Production Ready:** Robust error handling, loading states, and edge case management

## Animation & Interaction Guidelines`;

    if (data.animationStyle && data.animationStyle !== 'none') {
      prompt += `
- **Typography Animations:** Implement ${data.animationStyle} animations for text elements (headings, paragraphs, labels)
- **Image Animations:** Apply ${data.animationStyle} effects for image loading and transitions
- **Block/Component Animations:** Use ${data.animationStyle} animations for cards, sections, and UI components
- **Page Transitions:** Create smooth ${data.animationStyle} transitions between different views/pages
- **Interactive Elements:** Add ${data.animationStyle} hover effects and click feedback`;
    } else {
      prompt += `
- **No Animations:** Focus on instant, snappy transitions without motion effects
- **Static Design:** Prioritize immediate visual feedback and fast interactions`;
    }

    prompt += `\n\n## Quality Standards
- Implement comprehensive error handling and loading states
- Include form validation where applicable
- Use semantic HTML and proper SEO practices
- Ensure cross-browser compatibility
- Add meaningful hover effects and smooth transitions
- Make the design visually stunning and professional
- Write TypeScript for type safety (if applicable)
- Include proper commenting and documentation
- Test all user flows and edge cases
- Optimize images and assets for web performance

## Success Criteria
The final application should feel like a premium, professionally-built product that users would be excited to use. Every detail should be polished, from micro-interactions to error messages. The code should be clean enough that another senior developer could easily understand and extend it.

---
*Generated by VibeForge Prompt Architect*`;

    return prompt;
  };

  const prompt = generatePrompt();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.appName.replace(/\s+/g, '_')}_prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-slide-up"
    >
      <div className="text-center mb-8">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="orbitron text-4xl font-bold gradient-text mb-4"
        >
          Your Perfect Prompt is Ready!
        </motion.h1>
        <p className="text-gray-400 text-lg">
          Copy this comprehensive prompt and use it with your AI coding platform
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-200">Generated Prompt</h2>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="btn-primary flex items-center gap-2"
              >
                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadPrompt}
                className="btn-secondary flex items-center gap-2"
              >
                <Download size={20} />
                Download as .txt
              </motion.button>
            </div>
          </div>
          
          <div className="code-block">
            {prompt}
          </div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartOver}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={20} />
            Start Over
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
