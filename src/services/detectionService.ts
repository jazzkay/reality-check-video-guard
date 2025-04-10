
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

// Advanced image analysis to detect deepfake artifacts
const analyzeImageContent = (file: File): {
  isFake: boolean;
  score: number;
  confidence: number;
} => {
  // In a real system, this would use actual AI analysis
  // For this simulation, we'll use more sophisticated logic
  
  const filename = file.name.toLowerCase();
  const fileType = file.type;
  const isImage = fileType.startsWith('image/');
  
  // Keywords that suggest the media might be AI-generated
  const fakeKeywords = ['fake', 'deep', 'synthetic', 'ai', 'generated', 'gan', 'stylegan', 'midjourney', 'dalle', 'diffusion'];
  const realKeywords = ['real', 'genuine', 'original', 'authentic', 'photo', 'camera'];
  
  // Check if filename contains any fake keywords
  const hasFakeKeywords = fakeKeywords.some(keyword => filename.includes(keyword));
  const hasRealKeywords = realKeywords.some(keyword => filename.includes(keyword));
  
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
  
  // For media without keyword hints, use more sophisticated simulation
  // Analyze file type and extension for specific patterns
  const ext = filename.split('.').pop()?.toLowerCase();
  let baseScore = isImage ? 35 : 30; // Different starting points for images vs videos
  
  // Images and videos have different detection patterns
  if (isImage) {
    // Image-specific analysis
    if (ext === 'png') {
      baseScore += randomNumber(-5, 20); // PNGs could be either real or fake
    } else if (ext === 'jpg' || ext === 'jpeg') {
      baseScore += randomNumber(-10, 15); // JPEGs are common in both
    } else if (ext === 'webp') {
      baseScore += randomNumber(5, 25); // WebP is newer, sometimes used with AI
    }
    
    // Simulate analysis of image content
    // In a real system, this would involve analyzing pixel patterns, noise levels, etc.
    const imageSize = file.size;
    if (imageSize > 5 * 1024 * 1024) {
      baseScore -= randomNumber(5, 15); // Larger files tend to be real photos
    } else if (imageSize < 100 * 1024) {
      baseScore += randomNumber(5, 15); // Very small images might be AI generated
    }
  } else {
    // Video-specific analysis
    if (ext === 'mp4') {
      baseScore += randomNumber(-5, 15);
    } else if (ext === 'mov') {
      baseScore += randomNumber(-10, 10);
    } else if (ext === 'webm') {
      baseScore += randomNumber(0, 20); // WebM sometimes used with AI
    }
    
    // File size consideration for videos
    const videoSize = file.size;
    if (videoSize > 20 * 1024 * 1024) {
      baseScore -= randomNumber(5, 15); // Larger videos tend to be genuine
    }
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

// Function to generate image-specific anomalies
const generateImageAnomalies = (score: number): AnalysisResultData['anomalies'] => {
  if (score >= 70) {
    return [
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
    ];
  } else if (score >= 30) {
    return [
      {
        name: "Potential minor manipulations",
        description: "Some elements of the image may have been altered or enhanced.",
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

// Function to generate video-specific anomalies
const generateVideoAnomalies = (score: number): AnalysisResultData['anomalies'] => {
  if (score >= 70) {
    return [
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
        description: "Some elements of the video may have been altered or enhanced.",
        severity: "medium",
        confidence: randomNumber(60, 85)
      },
      {
        name: "Temporal inconsistencies",
        description: "Slight timing issues in motion or facial expressions.",
        severity: "low",
        confidence: randomNumber(50, 75)
      }
    ];
  } else if (Math.random() < 0.3) {
    // Sometimes add a minor, low-confidence anomaly for realism
    return [
      {
        name: "Common compression artifacts",
        description: "Normal compression artifacts consistent with standard video recording.",
        severity: "low",
        confidence: randomNumber(30, 60)
      }
    ];
  }
  
  return [];
};

// Generate technical details for images
const generateImageTechnicalDetails = (score: number): AnalysisResultData['technicalDetails'] => {
  const details = {
    inconsistencies: [] as string[],
    artifacts: [] as string[],
    manipulationTraces: [] as string[]
  };
  
  if (score >= 70) {
    details.inconsistencies = [
      "Pixel value distribution anomalies",
      "Inconsistent noise patterns across image regions",
      "Lighting vector inconsistencies on facial surfaces",
      "Statistical pattern deviations in color channels"
    ];
    
    details.artifacts = [
      "Unnatural edge sharpness in key areas",
      "Inconsistent JPEG compression artifacts",
      "Abnormal color distribution in skin tones",
      "Grid-like pattern artifacts typical of GAN-generated images"
    ];
    
    details.manipulationTraces = [
      "GAN signature patterns detected",
      "Statistical image generation markers present",
      "Neural synthesis artifact indicators",
      "Frequency domain manipulation traces",
      "AI model fingerprint patterns identified"
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

// Generate technical details for videos
const generateVideoTechnicalDetails = (score: number): AnalysisResultData['technicalDetails'] => {
  const details = {
    inconsistencies: [] as string[],
    artifacts: [] as string[],
    manipulationTraces: [] as string[]
  };
  
  if (score >= 70) {
    details.inconsistencies = [
      "Irregular facial texture patterns",
      "Unusual interpolation between facial expressions",
      "Lighting vector inconsistencies on skin surfaces",
      "Temporal motion anomalies in facial movements"
    ];
    
    details.artifacts = [
      "Compression anomalies in high-detail areas",
      "Frame discontinuities in motion transitions",
      "Unusual noise distribution patterns in skin tones",
      "Boundary artifacts around moving face parts"
    ];
    
    details.manipulationTraces = [
      "GAN pattern signature detected",
      "Neural rendering artifacts present",
      "Frequency domain manipulation indicators",
      "Temporal inconsistencies in motion flow",
      "Face-swapping algorithmic fingerprints"
    ];
  } else if (score >= 30) {
    details.inconsistencies = [
      "Minor motion inconsistencies",
      "Possible audio-visual sync issues"
    ];
    
    details.artifacts = [
      "Localized compression artifacts",
      "Subtle frame transition issues"
    ];
    
    details.manipulationTraces = [
      "Low-confidence manipulation indicators",
      "Minor statistical anomalies in frame sequences"
    ];
  } else if (Math.random() < 0.4) {
    details.artifacts = [
      "Standard video compression artifacts",
      "Normal noise patterns consistent with digital video sensors"
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
  const analysis = analyzeImageContent(file);
  const { isFake, score, confidence } = analysis;
  
  // Generate appropriate anomalies and technical details based on score and media type
  const anomalies = isImage 
    ? generateImageAnomalies(score)
    : generateVideoAnomalies(score);
    
  const technicalDetails = isImage
    ? generateImageTechnicalDetails(score)
    : generateVideoTechnicalDetails(score);
  
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
