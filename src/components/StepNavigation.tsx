import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
  showBack?: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  nextLabel = "Next",
  isNextDisabled = false,
  showBack = true
}) => {
  return (
    <div className="flex justify-between items-center mt-8">
      {showBack && onBack ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="btn-secondary flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Back
        </motion.button>
      ) : (
        <div />
      )}

      {onNext && (
        <motion.button
          whileHover={{ scale: isNextDisabled ? 1 : 1.02 }}
          whileTap={{ scale: isNextDisabled ? 1 : 0.98 }}
          onClick={onNext}
          disabled={isNextDisabled}
          className={`btn-primary flex items-center gap-2 ${isNextDisabled ? '' : 'animate-glow'}`}
        >
          {nextLabel}
          <ChevronRight size={20} />
        </motion.button>
      )}
    </div>
  );
};
