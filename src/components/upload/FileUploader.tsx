
import React, { useState, useCallback } from 'react';
import { Upload, FileVideo, FileImage, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

type FileUploaderProps = {
  onFileSelected: (file: File) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image (JPEG, PNG, GIF) or video (MP4, MOV).');
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image or video file.",
      });
      return false;
    }

    if (file.size > maxSize) {
      setError('File is too large. Maximum size is 50MB.');
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 50MB.",
      });
      return false;
    }

    setError(null);
    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    setFile(file);
    onFileSelected(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for analysis.`
    });
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  }, [onFileSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  const isVideo = file?.type.startsWith('video/');
  const isImage = file?.type.startsWith('image/');

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {file ? (
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <Button 
                variant="secondary" 
                size="icon" 
                onClick={handleRemoveFile}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border bg-muted">
              {isImage && (
                <img 
                  src={preview!} 
                  alt="Preview" 
                  className="w-full h-auto max-h-[400px] object-contain mx-auto"
                />
              )}
              {isVideo && (
                <video 
                  src={preview!} 
                  controls 
                  className="w-full h-auto max-h-[400px]"
                />
              )}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors ${
              dragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Upload file</h3>
            <p className="mb-4 text-sm text-muted-foreground text-center">
              Drag and drop or click to upload an image or video file
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="gap-2"
              >
                <FileImage className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="gap-2"
              >
                <FileVideo className="h-4 w-4" />
                <span>Upload Video</span>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
                className="sr-only"
                onChange={handleFileChange}
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Supported formats: JPEG, PNG, GIF, MP4, MOV. Max file size: 50MB.
            </p>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploader;
