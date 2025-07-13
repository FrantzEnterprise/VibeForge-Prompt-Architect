import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFormData } from './hooks/useFormData';
import { ProgressBar } from './components/ProgressBar';
import { Step1Foundation } from './steps/Step1Foundation';
import { Step2TechSpecs } from './steps/Step2TechSpecs';
import { Step3Assets } from './steps/Step3Assets';
import { Step4Design } from './steps/Step4Design';
import { Step5FinalPrompt } from './steps/Step5FinalPrompt';

const TOTAL_STEPS = 5;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const { data, updateData, resetData } = useFormData();

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startOver = () => {
    resetData();
    setCurrentStep(1);
  };

  const renderStep = () => {
    const stepProps = {
      data,
      updateData,
      onNext: nextStep,
      onBack: prevStep,
      isValid: true
    };

    switch (currentStep) {
      case 1:
        return <Step1Foundation {...stepProps} />;
      case 2:
        return <Step2TechSpecs {...stepProps} />;
      case 3:
        return <Step3Assets {...stepProps} />;
      case 4:
        return <Step4Design {...stepProps} />;
      case 5:
        return <Step5FinalPrompt data={data} onStartOver={startOver} />;
      default:
        return <Step1Foundation {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <h1 className="orbitron text-3xl md:text-5xl font-bold gradient-text mb-2">
            VibeForge
          </h1>
          <p className="space-grotesk text-lg md:text-xl text-gray-400">
            Prompt Architect
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          {currentStep < TOTAL_STEPS && (
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          )}
          
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
