export interface ProjectData {
  // Step 1: Project Foundation
  name: string;
  email: string;
  phone: string;
  appName: string;
  description: string;

  // Step 2: Technical Specifications
  appType: string;
  customAppType: string;
  componentSelection: 'ai-suggest' | 'manual';
  customComponents: string[];
  additionalInfo: string;

  // Step 3: Assets
  referenceFiles: File[];
  logoFiles: File[];
  backgroundFile: File | null;

  // Step 4: Design
  designStyle: string;
  customStyle: string;
  colorScheme: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  typography: string;
  animationStyle: string;
}

export interface StepProps {
  data: ProjectData;
  updateData: (updates: Partial<ProjectData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}
