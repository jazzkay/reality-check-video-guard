
import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, Zap, Fingerprint, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export interface AnalysisResultData {
  score: number;
  isFake: boolean;
  confidence: number;
  anomalies: {
    name: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    confidence: number;
  }[];
  metadata: {
    platform: string;
    filename: string;
    filesize: string;
    dimensions?: string;
    duration?: string;
    format: string;
  };
  technicalDetails: {
    inconsistencies: string[];
    artifacts: string[];
    manipulationTraces: string[];
  };
}

interface AnalysisResultProps {
  result: AnalysisResultData;
  onReset: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  const getColor = (score: number) => {
    if (score < 30) return 'text-security-green';
    if (score < 70) return 'text-amber-500';
    return 'text-security-red';
  };

  const getBackgroundColor = (score: number) => {
    if (score < 30) return 'bg-security-green/10';
    if (score < 70) return 'bg-amber-500/10';
    return 'bg-security-red/10';
  };

  const getBorderColor = (score: number) => {
    if (score < 30) return 'border-security-green/20';
    if (score < 70) return 'border-amber-500/20';
    return 'border-security-red/20';
  };
  
  const getIcon = (score: number) => {
    if (score < 30) return <ShieldCheck className="h-8 w-8 text-security-green" />;
    if (score < 70) return <AlertTriangle className="h-8 w-8 text-amber-500" />;
    return <ShieldAlert className="h-8 w-8 text-security-red" />;
  };

  const getVerdict = (score: number) => {
    if (score < 30) return "Likely Authentic";
    if (score < 70) return "Potentially Modified";
    return "Likely Deepfake";
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    if (severity === 'low') return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (severity === 'medium') return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-red-500/10 text-red-500 border-red-500/20';
  };
  
  return (
    <div className="w-full space-y-6">
      <Card className={`border-2 ${getBorderColor(result.score)}`}>
        <CardHeader className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {getIcon(result.score)}
              <div>
                <CardTitle className="text-2xl">{getVerdict(result.score)}</CardTitle>
                <CardDescription>
                  Analysis completed with {result.confidence}% confidence
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center">
                <span className={`text-3xl font-bold ${getColor(result.score)}`}>
                  {result.score}%
                </span>
                <p className="text-xs text-muted-foreground">
                  Manipulation Score
                </p>
              </div>
              <div className="h-14 w-14 relative">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={result.score < 30 ? "#059669" : result.score < 70 ? "#f59e0b" : "#DC2626"}
                    strokeWidth="3"
                    strokeDasharray={`${result.score}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className={`h-6 w-6 ${getColor(result.score)}`} />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="p-0">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-none h-12">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" /> Analysis Summary
                </h3>
                <p className="text-muted-foreground">
                  {result.isFake 
                    ? "Our system detected signs of manipulation or AI generation in this media. Review the detailed findings below."
                    : "Our system found no significant signs of manipulation in this media. It appears to be authentic."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">File Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      <span className="text-muted-foreground">Filename:</span>
                      <span className="font-medium truncate">{result.metadata.filename}</span>
                      
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{result.metadata.format}</span>
                      
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{result.metadata.filesize}</span>
                      
                      {result.metadata.dimensions && (
                        <>
                          <span className="text-muted-foreground">Dimensions:</span>
                          <span className="font-medium">{result.metadata.dimensions}</span>
                        </>
                      )}
                      
                      {result.metadata.duration && (
                        <>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{result.metadata.duration}</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`border ${getBackgroundColor(result.score)}`}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Fingerprint className="h-4 w-4" />
                      Key Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    {result.anomalies.length > 0 ? (
                      <>
                        <p className="text-sm">Critical findings:</p>
                        <ul className="space-y-2 text-sm">
                          {result.anomalies.slice(0, 3).map((anomaly, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className={`w-2 h-2 rounded-full mt-1.5 ${anomaly.severity === 'high' ? 'bg-security-red' : anomaly.severity === 'medium' ? 'bg-amber-500' : 'bg-security-green'}`} />
                              <span>{anomaly.name}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-sm">No significant anomalies detected.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="anomalies" className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Scan className="h-4 w-4" /> Detected Anomalies
                </h3>
                <p className="text-muted-foreground">
                  {result.anomalies.length > 0 
                    ? `We've identified ${result.anomalies.length} potential issues in this media.`
                    : "No significant anomalies were detected in this media."}
                </p>
              </div>
              
              {result.anomalies.length > 0 ? (
                <div className="space-y-4">
                  {result.anomalies.map((anomaly, index) => (
                    <Card key={index} className={`border ${getSeverityColor(anomaly.severity)}`}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{anomaly.name}</h4>
                          <div className="px-2 py-1 rounded-full text-xs font-medium border">
                            {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)} severity
                          </div>
                        </div>
                        <p className="text-sm">{anomaly.description}</p>
                        <div className="w-full space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Confidence</span>
                            <span>{anomaly.confidence}%</span>
                          </div>
                          <Progress value={anomaly.confidence} className="h-1.5" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border rounded-lg bg-muted/50">
                  <ShieldCheck className="h-10 w-10 text-security-green mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No Anomalies Detected</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our analysis found no significant signs of manipulation.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="technical" className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Technical Details</h3>
                <p className="text-muted-foreground">
                  Detailed technical findings from our analysis algorithms.
                </p>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Visual Inconsistencies</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {result.technicalDetails.inconsistencies.length > 0 ? (
                      <ul className="space-y-2 text-sm">
                        {result.technicalDetails.inconsistencies.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No visual inconsistencies detected.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Digital Artifacts</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {result.technicalDetails.artifacts.length > 0 ? (
                      <ul className="space-y-2 text-sm">
                        {result.technicalDetails.artifacts.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No unusual digital artifacts detected.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Manipulation Traces</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {result.technicalDetails.manipulationTraces.length > 0 ? (
                      <ul className="space-y-2 text-sm">
                        {result.technicalDetails.manipulationTraces.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No manipulation traces detected.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button onClick={onReset}>Analyze Another File</Button>
      </div>
    </div>
  );
};

export default AnalysisResult;
