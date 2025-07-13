import React from 'react';
import { motion } from 'framer-motion';

interface SelectionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  description,
  icon,
  selected,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`selection-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {icon && (
        <div className="flex justify-center mb-3 text-blue-400">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-400">{description}</p>
      )}
    </motion.div>
  );
};
