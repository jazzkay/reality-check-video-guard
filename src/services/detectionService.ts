
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

// Extract image dimensions
const getImageDimensions = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(`${img.width} × ${img.height}`);
      URL.revokeObjectURL(img.src); // Clean up
    };
    img.onerror = () => {
      resolve("Unknown");
      URL.revokeObjectURL(img.src); // Clean up
    };
    img.src = URL.createObjectURL(file);
  });
};

// This function analyzes image content patterns to detect potential deepfakes
const analyzeImageContent = (filename: string): {
  isFake: boolean;
  score: number;
  confidence: number;
} => {
  // In a real system, this would use actual AI analysis
  // For this simulation, we're using filename-based detection with added randomization
  
  const lowerFilename = filename.toLowerCase();
  
  // Keywords that suggest the image might be AI-generated
  const fakeKeywords = ['fake', 'deep', 'synthetic', 'ai', 'generated', 'gan', 'stylegan'];
  const realKeywords = ['real', 'genuine', 'original', 'authentic'];
  
  // Check if filename contains any fake keywords
  const hasFakeKeywords = fakeKeywords.some(keyword => lowerFilename.includes(keyword));
  const hasRealKeywords = realKeywords.some(keyword => lowerFilename.includes(keyword));
  
  // If filename has clues, use them
  if (hasFakeKeywords) {
    return {
      isFake: true,
      score: randomNumber(75, 98),
      confidence: randomNumber(85, 98)
    };
  } else if (hasRealKeywords) {
    return {
      isFake: false,
      score: randomNumber(5, 25),
      confidence: randomNumber(88, 98)
    };
  }
  
  // For images without keyword hints, use a more sophisticated simulation
  // Analyze file extension - certain formats are more common in AI-generated content
  const ext = filename.split('.').pop()?.toLowerCase();
  let baseScore = 30; // neutral starting point
  
  // Common editing software leaves metadata artifacts, adjust score based on that
  if (ext === 'png') {
    baseScore += randomNumber(-10, 20); // PNGs could be either real or fake
  } else if (ext === 'jpg' || ext === 'jpeg') {
    baseScore += randomNumber(-15, 15); // JPEGs are common in both
  } else if (ext === 'webp') {
    baseScore += randomNumber(0, 25); // WebP is newer, sometimes used with AI
  }
  
  // Add randomness to simulate actual AI detection variance
  baseScore += randomNumber(-15, 15);
  
  // Ensure score stays in range
  baseScore = Math.max(5, Math.min(98, baseScore));
  
  const isFake = baseScore >= 70;
  const confidence = randomNumber(isFake ? 70 : 60, 95);
  
  return {
    isFake,
    score: baseScore,
    confidence
  };
};

// Function to generate appropriate anomalies based on detection score
const generateAnomalies = (score: number, isImage: boolean): AnalysisResultData['anomalies'] => {
  if (score >= 70) {
    return isImage ? [
      {
        name: "Facial proportion inconsistencies",
        description: "Abnormal facial features or proportions not following natural human patterns.",
        severity: "high",
        confidence: randomNumber(85, 98)
      },
      {
        name: "Texture irregularities",
        description: "Unnatural skin texture or areas with inconsistent detail level.",
        severity: "high",
        confidence: randomNumber(80, 95)
      },
      {
        name: "Background-subject mismatch",
        description: "Lighting or perspective inconsistencies between subject and background.",
        severity: "medium",
        confidence: randomNumber(75, 90)
      },
      {
        name: "Artifacts around facial features",
        description: "Blurring, warping or unusual patterns around eyes, mouth, or hair.",
        severity: "medium",
        confidence: randomNumber(70, 90)
      }
    ] : [
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
  } else if (score >= 30) {
    return [
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
  } else if (Math.random() < 0.3) {
    // Sometimes add a minor, low-confidence anomaly for realism
    return [
      {
        name: "Common digital processing",
        description: "Normal digital processing artifacts consistent with standard cameras and software.",
        severity: "low",
        confidence: randomNumber(30, 60)
      }
    ];
  }
  
  return [];
};

// Generate technical details based on score and media type
const generateTechnicalDetails = (score: number, isImage: boolean): AnalysisResultData['technicalDetails'] => {
  const details = {
    inconsistencies: [] as string[],
    artifacts: [] as string[],
    manipulationTraces: [] as string[]
  };
  
  if (score >= 70) {
    details.inconsistencies = isImage ? [
      "Pixel value distribution anomalies",
      "Inconsistent noise patterns across image regions",
      "Lighting vector inconsistencies on facial surfaces"
    ] : [
      "Irregular facial texture patterns",
      "Unusual interpolation between facial expressions",
      "Lighting vector inconsistencies on skin surfaces"
    ];
    
    details.artifacts = isImage ? [
      "Unnatural edge sharpness in key areas",
      "Inconsistent JPEG compression artifacts",
      "Abnormal color distribution in skin tones"
    ] : [
      "Compression anomalies in high-detail areas",
      "Frame discontinuities in motion transitions",
      "Unusual noise distribution patterns in skin tones"
    ];
    
    details.manipulationTraces = isImage ? [
      "GAN signature patterns detected",
      "Statistical image generation markers present",
      "Neural synthesis artifact indicators",
      "Frequency domain manipulation traces"
    ] : [
      "GAN pattern signature detected",
      "Neural rendering artifacts present",
      "Frequency domain manipulation indicators",
      "Temporal inconsistencies in motion flow"
    ];
  } else if (score >= 30) {
    details.inconsistencies = [
      "Minor color balance inconsistencies",
      "Possible touch-up artifacts in specific regions"
    ];
    
    details.artifacts = [
      "Localized anomalies in texture patterns",
      "Subtle compression artifacts in specific areas"
    ];
    
    details.manipulationTraces = [
      "Low-confidence manipulation indicators",
      "Minor statistical anomalies in pixel distributions"
    ];
  } else if (Math.random() < 0.4) {
    details.artifacts = [
      "Standard compression artifacts",
      "Normal noise patterns consistent with digital sensors"
    ];
  }
  
  return details;
};

// This is a simulation service that mimics an AI analysis process
export const analyzeMedia = async (file: File): Promise<AnalysisResultData> => {
  // Determine if this is an image or video
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  
  // Simulate processing time with steps
  const steps = [
    { progress: 10, message: "Initializing analysis..." },
    { progress: 25, message: "Extracting media features..." },
    { progress: 40, message: isImage ? "Analyzing image patterns..." : "Analyzing facial landmarks..." },
    { progress: 60, message: "Detecting visual inconsistencies..." },
    { progress: 75, message: "Scanning for manipulation traces..." },
    { progress: 90, message: "Verifying authenticity..." },
    { progress: 100, message: "Finalizing report..." },
  ];

  // Broadcast progress updates
  for (const step of steps) {
    window.dispatchEvent(new CustomEvent('analysisProgress', { 
      detail: { progress: step.progress, status: step.message } 
    }));
    
    // Faster analysis for images, slightly longer for videos
    await new Promise(resolve => setTimeout(resolve, randomNumber(500, isImage ? 1000 : 1500)));
  }

  // Extract file metadata
  const format = file.type.split('/')[1].toUpperCase();
  
  // Get dimensions - for images, get actual dimensions
  let dimensions: string | undefined;
  let duration: string | undefined;
  
  if (isImage) {
    dimensions = await getImageDimensions(file);
  } else if (isVideo) {
    // For videos, use simulated dimensions
    const minutes = randomNumber(0, 3);
    const seconds = randomNumber(1, 59);
    duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    dimensions = `${randomNumber(720, 1920)} × ${randomNumber(480, 1080)}`;
  }
  
  // Analyze media content for deepfake detection
  const analysis = analyzeImageContent(file.name);
  const { isFake, score, confidence } = analysis;
  
  // Generate appropriate anomalies and technical details based on score
  const anomalies = generateAnomalies(score, isImage);
  const technicalDetails = generateTechnicalDetails(score, isImage);
  
  // Create analysis result
  const result: AnalysisResultData = {
    score,
    isFake,
    confidence,
    anomalies,
    metadata: {
      platform: "RealityCheck Analyzer",
      filename: file.name,
      filesize: formatFileSize(file.size),
      dimensions,
      duration,
      format
    },
    technicalDetails
  };
  
  return result;
};
