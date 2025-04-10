
import React, { useState, useEffect } from 'react';
import FileUploader from '@/components/upload/FileUploader';
import AnalysisProgress from '@/components/analysis/AnalysisProgress';
import AnalysisResult, { AnalysisResultData } from '@/components/analysis/AnalysisResult';
import InfoCards from '@/components/info/InfoCards';
import { analyzeMedia } from '@/services/detectionService';
import { Shield } from 'lucide-react';

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<AnalysisResultData | null>(null);

  useEffect(() => {
    const handleProgress = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        const { progress, status } = customEvent.detail;
        setProgress(progress);
        setStatus(status);
      }
    };

    window.addEventListener('analysisProgress', handleProgress);
    return () => {
      window.removeEventListener('analysisProgress', handleProgress);
    };
  }, []);

  const handleFileSelected = async (selectedFile: File) => {
    setFile(selectedFile);
    setAnalyzing(true);
    setProgress(0);
    setResult(null);

    try {
      // Process the file
      const analysisResult = await analyzeMedia(selectedFile);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
    setStatus('');
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-2">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">RealityCheck Video Guard</h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Detect AI-generated deepfakes with advanced analysis technology
          </p>
        </section>

        <section className="space-y-6">
          {!file && !result && (
            <FileUploader onFileSelected={handleFileSelected} />
          )}
          
          {analyzing && (
            <AnalysisProgress progress={progress} status={status} />
          )}
          
          {result && (
            <AnalysisResult result={result} onReset={handleReset} />
          )}
        </section>

        {!analyzing && !result && (
          <section className="space-y-6 mt-12">
            <h2 className="text-2xl font-semibold text-center">Understanding Deepfakes</h2>
            <InfoCards />
          </section>
        )}
      </div>
    </div>
  );
};

export default Index;
