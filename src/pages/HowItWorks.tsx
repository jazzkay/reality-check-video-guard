
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Brain, FileVideo, BarChart4, Layers, Binary } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-2">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI system uses multiple detection techniques to identify manipulated media
          </p>
        </section>

        <section className="space-y-10 mt-12">
          <div className="relative">
            <div className="absolute left-1/2 h-full w-px bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                <div className="md:text-right space-y-4 md:pr-8">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold md:ml-auto">1</div>
                  <h3 className="text-2xl font-semibold">Media Uploaded</h3>
                  <p className="text-muted-foreground">
                    Users upload images or videos to our secure platform for analysis
                  </p>
                </div>
                <div className="md:pl-8">
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="rounded-full p-3 bg-primary/10">
                        <FileVideo className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Secure Upload</h4>
                        <p className="text-sm text-muted-foreground">
                          Files are processed with privacy and security as our priority
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-2 border hidden md:block">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                <div className="md:order-2 space-y-4 md:pl-8">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">2</div>
                  <h3 className="text-2xl font-semibold">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Multiple algorithms examine the media for signs of manipulation
                  </p>
                </div>
                <div className="md:order-1 md:text-right md:pr-8">
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-primary/10">
                          <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-medium">Facial Analysis</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Detection of unnatural facial movements, blinking patterns, 
                        and inconsistencies in expressions
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-2 border hidden md:block">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                <div className="md:text-right space-y-4 md:pr-8">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold md:ml-auto">3</div>
                  <h3 className="text-2xl font-semibold">Digital Forensics</h3>
                  <p className="text-muted-foreground">
                    Examination of digital artifacts and manipulation traces at the pixel level
                  </p>
                </div>
                <div className="md:pl-8">
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-primary/10">
                          <Binary className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-medium">Technical Analysis</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Detection of compression inconsistencies, unusual noise patterns, 
                        and editing fingerprints
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-2 border hidden md:block">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                <div className="md:order-2 space-y-4 md:pl-8">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">4</div>
                  <h3 className="text-2xl font-semibold">Result Generation</h3>
                  <p className="text-muted-foreground">
                    Comprehensive report with confidence scores and detailed findings
                  </p>
                </div>
                <div className="md:order-1 md:text-right md:pr-8">
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-primary/10">
                          <BarChart4 className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-medium">Detailed Report</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clear visualization of detection confidence and explanation of findings
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-2 border hidden md:block">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mt-12 pt-8 border-t">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Our Technology</h2>
            <p className="text-muted-foreground">
              Powered by cutting-edge AI and computer vision technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5 text-primary" />
                  <span>Multi-Layer Analysis</span>
                </CardTitle>
                <CardDescription>Advanced detection algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Our system uses multiple layers of analysis to examine different aspects of media authenticity, from visual inconsistencies to digital fingerprints.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Neural Networks</span>
                </CardTitle>
                <CardDescription>Deep learning technology</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Specialized convolutional neural networks trained on millions of examples can detect subtle signs of manipulation that would be invisible to the human eye.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Continuous Learning</span>
                </CardTitle>
                <CardDescription>Adapting to new techniques</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  As deepfake technology evolves, our system continuously learns and adapts to new manipulation techniques, ensuring high accuracy over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
