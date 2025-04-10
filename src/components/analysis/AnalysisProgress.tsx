
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  progress: number;
  status: string;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ progress, status }) => {
  return (
    <div className="w-full p-6 bg-white dark:bg-slate-900 rounded-lg border shadow-sm">
      <div className="flex items-center justify-center mb-4">
        <div className="relative h-16 w-16 rounded-full grid place-items-center bg-primary/10">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          <Loader2 className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-center text-lg font-semibold mb-2">Analyzing Media</h3>
      <p className="text-center text-sm text-muted-foreground mb-4">{status}</p>
      
      <Progress value={progress} className="h-2 mb-2" />
      <p className="text-right text-xs text-muted-foreground">{progress}% complete</p>
    </div>
  );
};

export default AnalysisProgress;
