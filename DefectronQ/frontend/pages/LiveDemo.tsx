import { useState, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button3D from '../components/Button3D';
import Card3D from '../components/Card3D';
import { Upload, CheckCircle, XCircle, RefreshCw, Image } from 'lucide-react';

const LiveDemo = () => {
  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload');
  const [result, setResult] = useState<'normal' | 'anomaly' | null>(null);
  const [score, setScore] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Simulate processing
    setStep('processing');
    
    // Simulate result after 3 seconds
    setTimeout(() => {
      setStep('result');
      // Randomly determine if anomaly or normal
      const isAnomaly = Math.random() > 0.5;
      setResult(isAnomaly ? 'anomaly' : 'normal');
      setScore(isAnomaly ? 0.75 + Math.random() * 0.2 : Math.random() * 0.3);
    }, 3000);
  };
  
  const handleReset = () => {
    setStep('upload');
    setResult(null);
    setScore(0);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleUseExample = () => {
    // Use example image
    setPreviewUrl('https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600');
    
    // Simulate processing
    setStep('processing');
    
    // Simulate result after 3 seconds
    setTimeout(() => {
      setStep('result');
      setResult('anomaly');
      setScore(0.82);
    }, 3000);
  };
  
  return (
    <div className="pt-20">
      <section className="hero-gradient min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <SectionTitle 
            title="Live Anomaly Detection Demo"
            subtitle="Upload a bottle image and see our quantum-enhanced model detect anomalies in real-time."
          />
          
          <div className="mt-10 max-w-4xl mx-auto">
            <Card3D className="p-6 md:p-10">
              {step === 'upload' && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                    <Upload className="text-blue-400" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4">Upload a Bottle Image</h3>
                  <p className="text-gray-400 mb-8 max-w-md">
                    Select an image file to analyze. Our model will process the image 
                    and determine if there are any anomalies.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <label className="btn-3d px-6 py-3 font-semibold text-white rounded-lg cursor-pointer
                      bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
                      active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2">
                      <Upload size={18} />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                      />
                    </label>
                    
                    <Button3D onClick={handleUseExample} variant="outline" className="flex items-center gap-2">
                      <Image size={18} />
                      Use Example Image
                    </Button3D>
                  </div>
                </div>
              )}
              
              {step === 'processing' && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                    <RefreshCw className="text-blue-400 animate-spin" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4">Processing Image</h3>
                  <p className="text-gray-400 mb-8 max-w-md">
                    Our quantum-enhanced model is analyzing the image for anomalies. 
                    This will take just a moment...
                  </p>
                  
                  {previewUrl && (
                    <div className="relative max-w-md w-full">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-auto rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gray-900/80 flex items-center justify-center animate-pulse">
                          <RefreshCw className="text-blue-400 animate-spin" size={32} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {step === 'result' && (
                <div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-semibold mb-4">Analysis Result</h3>
                      
                      <div className={`p-4 rounded-lg mb-6 ${
                        result === 'anomaly' ? 'bg-red-900/30' : 'bg-green-900/30'
                      }`}>
                        <div className="flex items-center gap-3">
                          {result === 'anomaly' ? (
                            <XCircle className="text-red-400" size={24} />
                          ) : (
                            <CheckCircle className="text-green-400" size={24} />
                          )}
                          <span className="text-lg font-semibold">
                            {result === 'anomaly' ? 'Anomaly Detected' : 'No Anomaly Detected'}
                          </span>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-gray-300 mb-2">Anomaly Score</p>
                          <div className="w-full bg-gray-700 rounded-full h-4">
                            <div 
                              className={`h-4 rounded-full ${
                                result === 'anomaly' ? 'bg-red-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${score * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-sm text-gray-400">
                            <span>0.0</span>
                            <span>0.5</span>
                            <span>1.0</span>
                          </div>
                        </div>
                        
                        <p className="mt-4 text-sm text-gray-300">
                          {result === 'anomaly' 
                            ? `The model detected anomalies with a confidence score of ${(score * 100).toFixed(1)}%. 
                               The anomaly map highlights potential defect areas.`
                            : `The model classified this as a normal bottle with a low anomaly score of ${(score * 100).toFixed(1)}%.
                               No significant defects were detected.`
                          }
                        </p>
                      </div>
                      
                      <Button3D onClick={handleReset} className="w-full flex items-center justify-center gap-2">
                        <RefreshCw size={18} />
                        Analyze Another Image
                      </Button3D>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Original Image</h4>
                          {previewUrl && (
                            <img
                              src={previewUrl}
                              alt="Original"
                              className="w-full h-auto rounded-lg"
                            />
                          )}
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Anomaly Map</h4>
                          {previewUrl && (
                            <div className="relative">
                              <img
                                src={previewUrl}
                                alt="Anomaly Map"
                                className="w-full h-auto rounded-lg opacity-40"
                              />
                              {result === 'anomaly' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-[40%] h-[15%] rounded-full bg-red-500/60 blur-md"></div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card3D>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle 
            title="How the Demo Works"
            subtitle="A simplified explanation of what happens behind the scenes."
            centered
          />
          
          <div className="max-w-4xl mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card3D className="p-6">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="rounded-full w-12 h-12 bg-blue-500/20 flex items-center justify-center mb-4">
                    <span className="text-blue-400 font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Image Processing</h3>
                  <p className="text-gray-400 flex-grow">
                    Your uploaded image is preprocessed to normalize size, color, 
                    and brightness to match the training distribution.
                  </p>
                </div>
              </Card3D>
              
              <Card3D className="p-6" glowColor="rgba(139, 92, 246, 0.4)">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="rounded-full w-12 h-12 bg-purple-500/20 flex items-center justify-center mb-4">
                    <span className="text-purple-400 font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Model Inference</h3>
                  <p className="text-gray-400 flex-grow">
                    The quantum-enhanced model generates a reconstruction of what 
                    it thinks a normal version of your image should look like.
                  </p>
                </div>
              </Card3D>
              
              <Card3D className="p-6" glowColor="rgba(236, 72, 153, 0.4)">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="rounded-full w-12 h-12 bg-pink-500/20 flex items-center justify-center mb-4">
                    <span className="text-pink-400 font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Anomaly Scoring</h3>
                  <p className="text-gray-400 flex-grow">
                    The difference between original and reconstructed images is 
                    measured to generate an anomaly score and visualization map.
                  </p>
                </div>
              </Card3D>
            </div>
            
            <p className="mt-10 text-gray-400 max-w-2xl mx-auto">
              Note: This is a simulated demo for demonstration purposes. In a production environment, 
              the model would be running on specialized hardware with quantum processing capabilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveDemo;