
import { AnalysisResultData } from '@/components/analysis/AnalysisResult';

// Helper function to generate a random number between min and max
const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Helper to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' bytes';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

// This is a simulation service that mimics an AI analysis process
export const analyzeMedia = async (file: File): Promise<AnalysisResultData> => {
  // Simulate processing time
  const steps = [
    { progress: 10, message: "Initializing analysis..." },
    { progress: 25, message: "Extracting media features..." },
    { progress: 40, message: "Analyzing facial landmarks..." },
    { progress: 60, message: "Detecting visual inconsistencies..." },
    { progress: 75, message: "Scanning for manipulation traces..." },
    { progress: 90, message: "Verifying authenticity..." },
    { progress: 100, message: "Finalizing report..." },
  ];

  // For demo purposes, broadcast progress updates 
  // (in a real app, this would use a more robust pattern like a Subject or EventEmitter)
  for (const step of steps) {
    // Update progress in a way your UI can consume
    window.dispatchEvent(new CustomEvent('analysisProgress', { 
      detail: { progress: step.progress, status: step.message } 
    }));
    
    // Wait for a short time to simulate processing
    await new Promise(resolve => setTimeout(resolve, randomNumber(700, 1500)));
  }

  // Extract file metadata
  const isVideo = file.type.startsWith('video/');
  const format = file.type.split('/')[1].toUpperCase();
  
  let dimensions: string | undefined;
  let duration: string | undefined;
  
  // For images, get dimensions if possible
  if (!isVideo && file.type.startsWith('image/')) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        dimensions = `${img.width} × ${img.height}`;
        resolve();
      };
      img.onerror = () => {
        dimensions = "Unknown";
        resolve();
      };
      img.src = URL.createObjectURL(file);
    });
  }

  // For videos, use a fake duration
  if (isVideo) {
    const minutes = randomNumber(0, 3);
    const seconds = randomNumber(1, 59);
    duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    dimensions = `${randomNumber(720, 1920)} × ${randomNumber(480, 1080)}`;
  }

  // Determine if this should be classified as a deepfake
  // For demo, we'll use name-based detection to give predictable results
  const filename = file.name.toLowerCase();
  const isFake = filename.includes('fake') || 
               filename.includes('deep') || 
               filename.includes('synthetic') ||
               filename.includes('ai') ||
               filename.includes('generated');
  
  // Generate a manipulation score
  // Higher = more likely to be fake
  let score: number;
  if (isFake) {
    score = randomNumber(70, 98);
  } else {
    score = randomNumber(5, 25);
  }
  
  // Add some randomness for filenames not matching our keywords
  if (!isFake && !filename.includes('real') && !filename.includes('genuine')) {
    // Small chance of false positive
    if (Math.random() < 0.1) {
      score = randomNumber(30, 65);
    }
  }
  
  // Generate a confidence score
  const confidence = randomNumber(88, 99);
  
  // Create analysis result with appropriate anomalies based on detection
  const result: AnalysisResultData = {
    score,
    isFake: score >= 70,
    confidence,
    anomalies: [],
    metadata: {
      platform: "RealityCheck Analyzer",
      filename: file.name,
      filesize: formatFileSize(file.size),
      dimensions,
      duration,
      format
    },
    technicalDetails: {
      inconsistencies: [],
      artifacts: [],
      manipulationTraces: []
    }
  };
  
  // For high scores (likely fakes), add detailed anomalies
  if (score >= 70) {
    result.anomalies = [
      {
        name: "Facial feature inconsistencies",
        description: "Unnatural facial proportions and expressions that don't follow normal human patterns.",
        severity: "high",
        confidence: randomNumber(85, 98)
      },
      {
        name: "Irregular lighting patterns",
        description: "Lighting inconsistencies across the face and unusual shadows.",
        severity: "medium",
        confidence: randomNumber(75, 95)
      },
      {
        name: "Unusual blinking patterns",
        description: "Abnormal eye movements and blinking behavior not typical of natural video.",
        severity: "high",
        confidence: randomNumber(80, 97)
      },
      {
        name: "Edge artifacts around face",
        description: "Blurring or artifacts around facial boundaries and hair.",
        severity: "medium",
        confidence: randomNumber(70, 90)
      }
    ];
    
    result.technicalDetails.inconsistencies = [
      "Irregular facial texture patterns",
      "Unusual interpolation between facial expressions",
      "Lighting vector inconsistencies on skin surfaces"
    ];
    
    result.technicalDetails.artifacts = [
      "Compression anomalies in high-detail areas",
      "Frame discontinuities in motion transitions",
      "Unusual noise distribution patterns in skin tones"
    ];
    
    result.technicalDetails.manipulationTraces = [
      "GAN pattern signature detected",
      "Neural rendering artifacts present",
      "Frequency domain manipulation indicators",
      "Temporal inconsistencies in motion flow"
    ];
  }
  // For medium scores (potential manipulations)
  else if (score >= 30) {
    result.anomalies = [
      {
        name: "Potential minor manipulations",
        description: "Some elements of the media may have been altered or enhanced.",
        severity: "medium",
        confidence: randomNumber(60, 85)
      },
      {
        name: "Unusual visual patterns",
        description: "Some unusual patterns detected that could indicate editing.",
        severity: "low",
        confidence: randomNumber(50, 75)
      }
    ];
    
    result.technicalDetails.inconsistencies = [
      "Minor color balance inconsistencies",
      "Possible touch-up artifacts in specific regions"
    ];
    
    result.technicalDetails.artifacts = [
      "Localized anomalies in texture patterns",
      "Subtle compression artifacts in specific areas"
    ];
    
    result.technicalDetails.manipulationTraces = [
      "Low-confidence manipulation indicators",
      "Minor statistical anomalies in pixel distributions"
    ];
  }
  // For low scores (likely real)
  else {
    // Sometimes add a minor, low-confidence anomaly for realism
    if (Math.random() < 0.3) {
      result.anomalies = [
        {
          name: "Common digital processing",
          description: "Normal digital processing artifacts consistent with standard cameras and software.",
          severity: "low",
          confidence: randomNumber(30, 60)
        }
      ];
      
      result.technicalDetails.artifacts = [
        "Standard compression artifacts",
        "Normal noise patterns consistent with digital sensors"
      ];
    }
  }
  
  return result;
};
