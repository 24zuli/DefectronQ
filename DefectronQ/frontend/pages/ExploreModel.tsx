import { useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import ParallaxSection from '../components/ParallaxSection';
import Card3D from '../components/Card3D';
import { Brain, ArrowRight, LayoutGrid, Code2, Activity } from 'lucide-react';
import React from 'react';

const ExploreModel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Settings for quantum circuit visualization
    const padding = 20;
    const wireSpacing = 40;
    const gateWidth = 40;
    const wireCount = 4;
    const wireLabels = ['|q₀⟩', '|q₁⟩', '|q₂⟩', '|q₃⟩'];
    
    // Draw quantum circuit animation
    const drawCircuit = (time: number) => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw circuit wires
      const startX = padding;
      const endX = canvas.width - padding;
      
      ctx.strokeStyle = '#4B5563';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < wireCount; i++) {
        const y = padding + i * wireSpacing;
        
        // Draw wire
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
        
        // Draw wire label
        ctx.fillStyle = '#60A5FA';
        ctx.font = '16px monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(wireLabels[i], startX - 10, y);
      }
      
      // Calculate gate positions based on time for animation
      const animationSpeed = 0.0005;
      const baseOffset = (time * animationSpeed) % 1;
      const gateSpacing = 100;
      const totalWidth = canvas.width - 2 * padding;
      
      // Draw H gates on all qubits at the beginning
      for (let i = 0; i < wireCount; i++) {
        const y = padding + i * wireSpacing;
        const x = startX + 50;
        
        ctx.fillStyle = '#3B82F6';
        ctx.fillRect(x - gateWidth / 2, y - gateWidth / 2, gateWidth, gateWidth);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('H', x, y);
      }
      
      // Draw some CNOT gates
      const cnotPositions = [
        { control: 0, target: 1, pos: 0.25 },
        { control: 1, target: 2, pos: 0.4 },
        { control: 2, target: 3, pos: 0.55 },
        { control: 0, target: 3, pos: 0.7 },
      ];
      
      for (const cnot of cnotPositions) {
        const controlY = padding + cnot.control * wireSpacing;
        const targetY = padding + cnot.target * wireSpacing;
        const x = startX + 50 + cnot.pos * (totalWidth - 100);
        
        // Control point
        ctx.beginPath();
        ctx.arc(x, controlY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#EC4899';
        ctx.fill();
        
        // Line connecting control and target
        ctx.beginPath();
        ctx.moveTo(x, controlY);
        ctx.lineTo(x, targetY);
        ctx.strokeStyle = '#EC4899';
        ctx.stroke();
        
        // Target (⊕ symbol)
        ctx.beginPath();
        ctx.arc(x, targetY, 10, 0, Math.PI * 2);
        ctx.strokeStyle = '#EC4899';
        ctx.stroke();
        
        // Draw + inside the circle
        ctx.beginPath();
        ctx.moveTo(x - 7, targetY);
        ctx.lineTo(x + 7, targetY);
        ctx.moveTo(x, targetY - 7);
        ctx.lineTo(x, targetY + 7);
        ctx.stroke();
      }
      
      // Draw measurement at the end
      for (let i = 0; i < wireCount; i++) {
        const y = padding + i * wireSpacing;
        const x = endX - 50;
        
        // Measurement box
        ctx.fillStyle = '#8B5CF6';
        ctx.fillRect(x - gateWidth / 2, y - gateWidth / 2, gateWidth, gateWidth);
        
        // Measurement symbol
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('M', x, y);
      }
      
      // Particle effects for quantum computing visualization
      const particleCount = 10;
      for (let i = 0; i < wireCount; i++) {
        const y = padding + i * wireSpacing;
        
        for (let j = 0; j < particleCount; j++) {
          const particlePos = (baseOffset + j / particleCount) % 1;
          const x = startX + particlePos * (endX - startX);
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${0.7 * (1 - particlePos)})`;
          ctx.fill();
        }
      }
      
      requestAnimationFrame(drawCircuit);
    };
    
    requestAnimationFrame(drawCircuit);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="pt-18 pg-20 bg-gray-900">
      <section className="hero-gradient min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <SectionTitle
            title="Explore Our Model"
            subtitle="Discover how our hybrid quantum-classical architecture detects anomalies without relying on defective samples."
          />

          <div className="mt-10 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Model Overview</h3>
            <p className="text-gray-300">
              Our approach leverages a hybrid quantum-classical autoencoder
              architecture designed for unsupervised anomaly detection. The
              model is trained exclusively on normal images, learning how to
              accurately reconstruct typical patterns and structures.
            </p>
            <p className="text-gray-300">
              During inference, when the model encounters anomalous
              inputs—patterns it has not learned—it fails to reconstruct these
              regions effectively. This reconstruction failure produces higher
              reconstruction error, which we use as an anomaly score to reliably
              flag defective or abnormal samples.
            </p>
            <p className="text-gray-300">
              By combining classical convolutional feature extraction with a
              quantum-enhanced decoder, the model achieves rich, expressive
              transformations in the latent space, improving its ability to
              detect subtle and complex anomalies.
            </p>
          </div>
        </div>
      </section>
      <ParallaxSection>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="How It Works"
              subtitle="Our model pipeline transforms input images into anomaly maps through a hybrid quantum-classical process."
            />

            <div className="relative mt-12 mb-20 overflow-hidden">
              <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 py-8">
                <div className="workflow-item p-4 bg-gray-800 rounded-lg w-full md:w-1/5">
                  <div className="text-center">
                    <div className="rounded-full w-12 h-12 bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                      <LayoutGrid className="text-blue-400" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">Input Image</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Image to be inspected for anomalies
                    </p>
                  </div>
                </div>

                <ArrowRight className="text-gray-600 hidden md:block" />

                <div className="workflow-item p-4 bg-gray-800 rounded-lg w-full md:w-1/5">
                  <div className="text-center">
                    <div className="rounded-full w-12 h-12 bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                      <Brain className="text-blue-400" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">Encoder (CNN)</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Compresses the image into a latent vector
                    </p>
                  </div>
                </div>

                <ArrowRight className="text-gray-600 hidden md:block" />

                <div className="workflow-item p-4 bg-gray-800 rounded-lg w-full md:w-1/5">
                  <div className="text-center">
                    <div className="rounded-full w-12 h-12 bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                      <Code2 className="text-purple-400" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">Quantum Decoder</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Processes latent space through quantum circuits
                    </p>
                  </div>
                </div>

                <ArrowRight className="text-gray-600 hidden md:block" />

                <div className="workflow-item p-4 bg-gray-800 rounded-lg w-full md:w-1/5">
                  <div className="text-center">
                    <div className="rounded-full w-12 h-12 bg-pink-500/20 flex items-center justify-center mx-auto mb-3">
                      <LayoutGrid className="text-pink-400" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">
                      Reconstructed Image
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Generated prediction of normal appearance
                    </p>
                  </div>
                </div>

                <ArrowRight className="text-gray-600 hidden md:block" />

                <div className="workflow-item p-4 bg-gray-800 rounded-lg w-full md:w-1/5">
                  <div className="text-center">
                    <div className="rounded-full w-12 h-12 bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                      <Activity className="text-green-400" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold">Anomaly Score</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Difference between the original and reconstructed image
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card3D className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  The Quantum Advantage
                </h3>
                <p className="text-gray-400 mb-4">
                  Our model leverages quantum computing's unique capabilities to
                  enhance anomaly detection:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      Superposition and entanglement enable complex feature
                      interactions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      Quantum circuits process high-dimensional data more
                      efficiently
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      Improved sensitivity to subtle patterns that traditional
                      models might miss
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">
                    Quantum Circuit Architecture
                  </h4>
                  <div className="bg-gray-900 p-4 rounded-lg overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-40 md:h-60"
                    ></canvas>
                  </div>
                </div>
              </Card3D>

              <div className="space-y-6">
                <Card3D className="p-6" glowColor="rgba(139, 92, 246, 0.4)">
                  <h3 className="text-xl font-semibold mb-4">
                    Optimization Objective
                  </h3>
                  <p className="text-gray-400">
                    The model is trained to minimize reconstruction error on
                    normal images:
                  </p>
                  <div className="mt-4 p-3 bg-gray-900 rounded-lg overflow-x-auto">
                    <code className="text-sm text-purple-300 font-mono">
                      Loss = ||Original_Image - Reconstructed_Image||²
                    </code>
                  </div>
                  <p className="text-gray-400 mt-4">
                    During training, the model is only exposed to normal
                    samples, learning to perfectly reconstruct their features.
                    When an anomalous input is processed, the model struggles to
                    reconstruct the abnormal regions, resulting in a high error
                    that signals a defect.
                  </p>
                </Card3D>

                <Card3D className="p-6" glowColor="rgba(236, 72, 153, 0.4)">
                  <h3 className="text-xl font-semibold mb-4">
                    Why Reconstruction Helps
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Reconstruction-based anomaly detection offers significant
                    advantages:
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2">•</span>
                      <span>
                        No defective examples needed for training (unsupervised
                        learning)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2">•</span>
                      <span>
                        Localizes defects by highlighting areas with high
                        reconstruction error
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2">•</span>
                      <span>
                        Can detect novel defect types never seen during
                        development
                      </span>
                    </li>
                  </ul>
                </Card3D>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>
    </div>
  );
};

export default ExploreModel;