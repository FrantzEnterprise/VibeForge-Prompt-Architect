import { useState } from 'react';
import { ProjectData } from '../types';

const initialData: ProjectData = {
  name: '',
  email: '',
  phone: '',
  appName: '',
  description: '',
  appType: '',
  customAppType: '',
  componentSelection: 'ai-suggest',
  customComponents: [],
  additionalInfo: '',
  referenceFiles: [],
  logoFiles: [],
  backgroundFile: null,
  designStyle: '',
  customStyle: '',
  colorScheme: '',
  primaryColor: '#00BFFF',
  secondaryColor: '#FF007F',
  accentColor: '#40E0D0',
  typography: 'modern-safe',
  animationStyle: 'subtle'
};

export const useFormData = () => {
  const [data, setData] = useState<ProjectData>(initialData);

  const updateData = (updates: Partial<ProjectData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
  };

  return { data, updateData, resetData };
};
