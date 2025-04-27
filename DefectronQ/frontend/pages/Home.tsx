import { ArrowRight, FlaskRound as Flask, Zap, Database, PieChart } from 'lucide-react';
import AnimatedTitle from '../components/AnimatedTitle';
import SectionTitle from '../components/SectionTitle';
import Button3D from '../components/Button3D';
import Card3D from '../components/Card3D';
import ParallaxSection from '../components/ParallaxSection';
import React from 'react';

const Home = () => {
  return (
    <div className="pt-1">
      {/* Hero section */}
      <section className="hero-gradient pt-36 pb-28">
        <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between">
            <div className="lg:w-1/2 text-center lg:text-left">
              <AnimatedTitle 
                text="Quantum Autoencoder-Based Anomaly Detection"
                subtitle="Hybrid GAN architecture for manufacturing defect detection powered by quantum computing."
              />
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                <Button3D to="/explore" size="lg">
                  Explore Model <ArrowRight className="inline ml-2" size={18} />
                </Button3D>
                <Button3D to="/demo" variant="outline" size="lg">
                  Try Live Demo
                </Button3D>
              </div>
            </div>
            
            {/* <div className="lg:w-1/5 transform translate-y-4 opacity-0 animate-[fadeInUp_1s_0.5s_forwards]">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Quantum Anomaly Detection" 
                  className="rounded-xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/40 rounded-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-6 bg-gray-900/80 backdrop-blur-sm rounded-xl max-w-xs">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">DefectronQ</h3>
                    <p className="text-gray-300">Advanced defect detection using quantum-classical hybrid architecture.</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Problem explanation section */}
      <ParallaxSection>
      <section className="pb-24 bg-gray-900">
          <div className="container mx-auto px-8">
            <SectionTitle 
              title="The Challenge"
              // subtitle="Detecting manufacturing defects with quantum precision"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              <Card3D className="p-4 h-full">
                <div className="flex flex-col h-full">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-500/20 mb-6">
                    <Flask className="text-blue-400" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Human Difficulties</h3>
                  <p className="text-gray-400 flex-grow">
                  Manual inspection is slow, inconsistent, and prone to human error, especially in high-volume production lines.
                  </p>
                </div>
              </Card3D>
              
              <Card3D className="p-4 h-full" glowColor="rgba(139, 92, 246, 0.4)">
                <div className="flex flex-col h-full">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-purple-500/20 mb-6">
                    <Zap className="text-purple-400" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Machine Learning</h3>
                  <p className="text-gray-400 flex-grow">
                  Traditional machine learning models require large amounts of labeled defect data, which is often scarce or hard to obtain.
                  </p>
                </div>
              </Card3D>
              
              <Card3D className="p-4 h-full" glowColor="rgba(236, 72, 153, 0.4)">
                <div className="flex flex-col h-full">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-pink-500/20 mb-6">
                    <Database className="text-pink-400" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Complex Defects</h3>
                  <p className="text-gray-400 flex-grow">
                  Subtle or complex defects may not follow predictable patterns, making them difficult to detect with standard approaches.
                  </p>
                </div>
              </Card3D>
            </div>
            
            <div className="mt-10 bg-gray-800 rounded-xl p-4 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4">Our Solution</h3>
                  <p className="text-gray-400 mb-4">
                  Our hybrid quantum-classical model learns normal patterns through reconstruction, making unseen defects stand out clearly.
                  </p>
                  <p className="text-gray-400 mb-6">
                    Highlights defects by detecting deviations from learned patterns.
                  </p>
                  <div className="mt-4">
                    <Button3D to="/explore">
                      Learn how it works
                    </Button3D>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                      alt="Bottle manufacturing line" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900/60"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm">AI inspection active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA section */}
      <section className="py-10 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle 
            title="Ready to explore DefectronQ?"
            centered
          />
          
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Button3D to="/explore" size="lg" variant="primary">
              Explore Model
            </Button3D>
            <Button3D to="/demo" size="lg" variant="secondary">
              Try Demo
            </Button3D>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;