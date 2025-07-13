import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  label: string;
  description: string;
  acceptedTypes: string[];
  multiple?: boolean;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description,
  acceptedTypes,
  multiple = false,
  files,
  onFilesChange
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      acceptedTypes.some(type => file.name.toLowerCase().endsWith(type.replace('.', '')))
    );

    if (multiple) {
      onFilesChange([...files, ...validFiles]);
    } else {
      onFilesChange(validFiles.slice(0, 1));
    }
  }, [acceptedTypes, files, multiple, onFilesChange]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (multiple) {
      onFilesChange([...files, ...selectedFiles]);
    } else {
      onFilesChange(selectedFiles.slice(0, 1));
    }
  }, [files, multiple, onFilesChange]);

  const removeFile = useCallback((index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  }, [files, onFilesChange]);

  const hasFiles = files.length > 0;

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      <div
        className={`upload-zone ${isDragOver ? 'drag-over' : ''} ${hasFiles ? 'has-files' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-input-${label}`)?.click()}
      >
        <input
          id={`file-input-${label}`}
          type="file"
          accept={acceptedTypes.join(',')}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {hasFiles ? (
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400" size={24} />
            <span className="text-green-400 font-medium">
              {files.length} file{files.length > 1 ? 's' : ''} uploaded
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="text-gray-400" size={32} />
            <div className="text-center">
              <p className="text-gray-300 font-medium">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Accepted: {acceptedTypes.join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <File size={16} className="text-blue-400" />
                  <span className="text-sm text-gray-300">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
