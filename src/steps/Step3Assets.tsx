import React from 'react';
import { motion } from 'framer-motion';
import { StepProps } from '../types';
import { StepNavigation } from '../components/StepNavigation';
import { FileUpload } from '../components/FileUpload';

export const Step3Assets: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-slide-up"
    >
      <div className="text-center mb-8">
        <h1 className="orbitron text-4xl font-bold gradient-text mb-4">
          Bring Your Brand to Life
        </h1>
        <p className="text-gray-400 text-lg">
          Upload your assets to personalize your application
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <FileUpload
          label="Reference Documents"
          description="Upload project briefs, content, or requirements that will help inform the development."
          acceptedTypes={['.pdf', '.docx', '.txt', '.md']}
          multiple={true}
          files={data.referenceFiles}
          onFilesChange={(files) => updateData({ referenceFiles: files })}
        />

        <FileUpload
          label="Logo Images"
          description="Upload your logo(s). Provide different versions if available (e.g., color, white, black)."
          acceptedTypes={['.png', '.svg', '.jpg', '.jpeg']}
          multiple={true}
          files={data.logoFiles}
          onFilesChange={(files) => updateData({ logoFiles: files })}
        />

        <FileUpload
          label="Background Image"
          description="Upload a primary background image or texture (optional)."
          acceptedTypes={['.png', '.jpg', '.jpeg']}
          multiple={false}
          files={data.backgroundFile ? [data.backgroundFile] : []}
          onFilesChange={(files) => updateData({ backgroundFile: files[0] || null })}
        />
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        nextLabel="Next: Design & Style"
        isNextDisabled={false}
      />
    </motion.div>
  );
};
