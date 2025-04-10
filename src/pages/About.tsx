
import React from 'react';
import { Shield, Users, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-2">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">About RealityCheck</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to protect digital truth in an era of synthetic media
          </p>
        </section>
        
        <section className="space-y-6 mt-8">
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="lead">
              In today's digital landscape, distinguishing between authentic and AI-generated content has become increasingly challenging. RealityCheck was created to empower individuals and organizations with tools to verify the authenticity of digital media.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              RealityCheck is committed to safeguarding digital truth through accessible, cutting-edge detection technology. We believe in a future where people can trust what they see online, fostering a healthier information ecosystem for everyone.
            </p>
            
            <h2>The Deepfake Challenge</h2>
            <p>
              As AI technology advances, the creation of synthetic media – including deepfakes – has become more sophisticated and accessible. These manipulated videos and images pose significant challenges for:
            </p>
            
            <ul>
              <li>Information integrity and public discourse</li>
              <li>Personal reputation and privacy</li>
              <li>Media organizations and fact-checkers</li>
              <li>Democratic processes and institutional trust</li>
            </ul>
            
            <h2>Our Technology</h2>
            <p>
              RealityCheck leverages a multi-layered approach to deepfake detection, combining several analytical techniques:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Facial Analysis</span>
                </CardTitle>
                <CardDescription>Examining natural human traits</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Our system analyzes subtle facial characteristics, movement patterns, blinking behavior, and micro-expressions that are difficult for AI systems to perfectly replicate.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Digital Forensics</span>
                </CardTitle>
                <CardDescription>Detecting manipulation traces</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  We examine digital artifacts, compression inconsistencies, and other technical signatures that may indicate manipulation or synthetic generation.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none mt-6">
            <h2>Educational Focus</h2>
            <p>
              Beyond detection, we're committed to educating the public about deepfakes and media literacy. We provide resources to help individuals critically evaluate digital content and understand the evolving landscape of synthetic media.
            </p>
            
            <h2>Looking Forward</h2>
            <p>
              As AI technology continues to advance, so too will our detection capabilities. We're committed to ongoing research and development to stay ahead of emerging deepfake techniques and provide the most accurate analysis possible.
            </p>
            
            <div className="mt-8 p-6 bg-muted rounded-lg border">
              <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Join Our Mission</span>
              </h3>
              <p className="mb-0">
                Whether you're a researcher, developer, or concerned citizen, we welcome collaboration in our effort to build a more trustworthy digital environment. Together, we can promote authenticity and integrity in our shared information spaces.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
