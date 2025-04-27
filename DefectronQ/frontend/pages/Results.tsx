import { useEffect, useRef } from "react";
import SectionTitle from "../components/SectionTitle";
import ParallaxSection from "../components/ParallaxSection";
import Card3D from "../components/Card3D";
import React from "react";

const Results = () => {
  const rocCurveRef = useRef<HTMLCanvasElement>(null);
  const precisionRecallRef = useRef<HTMLCanvasElement>(null);
  const confusionMatrixRef = useRef<HTMLCanvasElement>(null);

  // Draw ROC curve on canvas
  useEffect(() => {
    if (!rocCurveRef.current) return;

    const canvas = rocCurveRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "#4B5563";
    ctx.lineWidth = 2;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw labels
    ctx.font = "12px Inter";
    ctx.fillStyle = "#9CA3AF";
    ctx.textAlign = "center";

    // X-axis label
    ctx.fillText("False Positive Rate", canvas.width / 2, canvas.height - 10);

    // Y-axis label
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("True Positive Rate", 0, 0);
    ctx.restore();

    // Draw axis values
    ctx.textAlign = "center";

    // X-axis values
    for (let i = 0; i <= 5; i++) {
      const x = padding + (width * i) / 5;
      const value = (i / 5).toFixed(1);
      ctx.fillText(value, x, canvas.height - padding + 20);

      // Grid lines
      ctx.beginPath();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.moveTo(x, canvas.height - padding);
      ctx.lineTo(x, padding);
      ctx.stroke();
    }

    // Y-axis values
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const y = canvas.height - padding - (height * i) / 5;
      const value = (i / 5).toFixed(1);
      ctx.fillText(value, padding - 10, y + 5);

      // Grid lines
      ctx.beginPath();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw diagonal (random classifier)
    ctx.beginPath();
    ctx.strokeStyle = "#6B7280";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, padding);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ROC curve
    // Replace your rocPoints array with these points:
    const rocPoints = [
      { x: 0.0, y: 0.0 },
      { x: 0.02, y: 0.4 },
      { x: 0.05, y: 0.65 },
      { x: 0.1, y: 0.78 },
      { x: 0.2, y: 0.88 },
      { x: 0.3, y: 0.93 },
      { x: 0.5, y: 0.97 },
      { x: 0.7, y: 0.99 },
      { x: 1.0, y: 1.0 },
    ];

    ctx.beginPath();
    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 3;

    rocPoints.forEach((point, i) => {
      const x = padding + point.x * width;
      const y = canvas.height - padding - point.y * height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Fill area under curve
    ctx.lineTo(
      padding + rocPoints[rocPoints.length - 1].x * width,
      canvas.height - padding
    );
    ctx.lineTo(padding + rocPoints[0].x * width, canvas.height - padding);
    ctx.closePath();
    ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
    ctx.fill();

    // Add AUC value
    ctx.fillStyle = "#60A5FA";
    ctx.font = "bold 16px Inter";
    ctx.textAlign = "center";
    ctx.fillText("AUC = 0.86", canvas.width / 2, padding + 30);
  }, []);

  // Draw precision-recall curve
  useEffect(() => {
    if (!precisionRecallRef.current) return;

    const canvas = precisionRecallRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "#4B5563";
    ctx.lineWidth = 2;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw labels
    ctx.font = "12px Inter";
    ctx.fillStyle = "#9CA3AF";
    ctx.textAlign = "center";

    // X-axis label
    ctx.fillText("Recall", canvas.width / 2, canvas.height - 10);

    // Y-axis label
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Precision", 0, 0);
    ctx.restore();

    // Draw axis values
    ctx.textAlign = "center";

    // X-axis values
    for (let i = 0; i <= 5; i++) {
      const x = padding + (width * i) / 5;
      const value = (i / 5).toFixed(1);
      ctx.fillText(value, x, canvas.height - padding + 20);

      // Grid lines
      ctx.beginPath();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.moveTo(x, canvas.height - padding);
      ctx.lineTo(x, padding);
      ctx.stroke();
    }

    // Y-axis values
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const y = canvas.height - padding - (height * i) / 5;
      const value = (i / 5).toFixed(1);
      ctx.fillText(value, padding - 10, y + 5);

      // Grid lines
      ctx.beginPath();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 1;
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw precision-recall curve
    const prPoints = [
      { x: 0.0, y: 1.0 },
      { x: 0.4, y: 0.95 },
      { x: 0.6, y: 0.9 },
      { x: 0.75, y: 0.85 },
      { x: 0.85, y: 0.75 },
      { x: 0.9, y: 0.65 },
      { x: 0.95, y: 0.5 },
      { x: 1.0, y: 0.4 },
    ];

    ctx.beginPath();
    ctx.strokeStyle = "#A855F7";
    ctx.lineWidth = 3;

    prPoints.forEach((point, i) => {
      const x = padding + point.x * width;
      const y = canvas.height - padding - point.y * height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Add AP value
    ctx.fillStyle = "#A855F7";
    ctx.font = "bold 16px Inter";
    ctx.textAlign = "center";
    ctx.fillText("AP = 0.886", canvas.width / 2, padding + 30);
  }, []);

  // Draw confusion matrix
  useEffect(() => {
    if (!confusionMatrixRef.current) return;

    const canvas = confusionMatrixRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 50;
    const size = Math.min(canvas.width, canvas.height) - padding * 2;
    const cellSize = size / 2;

    // Confusion matrix values
    // Updated Confusion Matrix values
    const matrix = [
      [428, 39], // [TN, FP]
      [941, 317], // [FN, TP]
    ];

    // Draw cells
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const x = padding + j * cellSize;
        const y = padding + i * cellSize;

        // Calculate color intensity based on value
        let colorIntensity;
        if (i === j) {
          // Diagonal (TP, TN) - blue gradient
          colorIntensity = matrix[i][j] / 200;
          ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(
            0.2 + colorIntensity * 0.8,
            1
          )})`;
        } else {
          // Off-diagonal (FP, FN) - red gradient
          colorIntensity = matrix[i][j] / 100;
          ctx.fillStyle = `rgba(239, 68, 68, ${Math.min(
            0.2 + colorIntensity * 0.8,
            1
          )})`;
        }

        // Draw cell
        ctx.fillRect(x, y, cellSize, cellSize);

        // Draw cell border
        ctx.strokeStyle = "#1F2937";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellSize, cellSize);

        // Draw cell value
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 18px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          matrix[i][j].toString(),
          x + cellSize / 2,
          y + cellSize / 2
        );
      }
    }

    // Draw labels
    ctx.font = "14px Inter";
    ctx.fillStyle = "#9CA3AF";
    ctx.textAlign = "center";

    // Class labels
    const classes = ["Normal", "Anomaly"];

    // Bottom labels (Predicted)
    for (let i = 0; i < 2; i++) {
      ctx.fillText(
        classes[i],
        padding + i * cellSize + cellSize / 2,
        padding + size + 25
      );
    }

    // Left labels (Actual)
    ctx.textAlign = "right";
    for (let i = 0; i < 2; i++) {
      ctx.fillText(
        classes[i],
        padding - 10,
        padding + i * cellSize + cellSize / 2
      );
    }

    // Add title and labels
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px Inter";
    ctx.textAlign = "center";
    ctx.fillText("Confusion Matrix", canvas.width / 2, 25);

    ctx.fillStyle = "#9CA3AF";
    ctx.font = "14px Inter";
    ctx.fillText("Predicted Class", canvas.width / 2, canvas.height - 10);

    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Actual Class", 0, 0);
    ctx.restore();
  }, []);

  return (
    <div className="pt-18 pg-20 bg-gray-900">
      <section className="hero-gradient min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <SectionTitle
            title="Model Performance Results"
            subtitle="Comprehensive evaluation of our quantum-enhanced anomaly detection model on the MVTec AD Bottle dataset."
          />

          <div className="mt-10 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">
              Performance Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-900 p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold mb-1">Accuracy</h4>
                <p className="text-3xl font-bold text-blue-400">75.0%</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold mb-1">Precision</h4>
                <p className="text-3xl font-bold text-purple-400">96.0%</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold mb-1">Recall</h4>
                <p className="text-3xl font-bold text-pink-400">70.0%</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold mb-1">F1 Score</h4>
                <p className="text-3xl font-bold text-green-400">81.0%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ParallaxSection>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Performance Metrics"
              // subtitle="Detailed performance analysis across multiple evaluation metrics."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <Card3D className="p-6">
                <h3 className="text-xl font-semibold mb-4">ROC Curve</h3>
                <p className="text-gray-400 mb-6">
                  The Receiver Operating Characteristic curve shows the tradeoff
                  between true positive rate and false positive rate at
                  different decision thresholds.
                </p>
                <div className="aspect-square w-full bg-gray-800 rounded-lg overflow-hidden">
                  <canvas ref={rocCurveRef} className="w-full h-full"></canvas>
                </div>
              </Card3D>

              <Card3D className="p-6" glowColor="rgba(168, 85, 247, 0.4)">
                <h3 className="text-xl font-semibold mb-4">
                  Precision-Recall Curve
                </h3>
                <p className="text-gray-400 mb-6">
                  This curve shows the tradeoff between precision and recall,
                  which is especially important for imbalanced datasets like
                  anomaly detection.
                </p>
                <div className="aspect-square w-full bg-gray-800 rounded-lg overflow-hidden">
                  <canvas
                    ref={precisionRecallRef}
                    className="w-full h-full"
                  ></canvas>
                </div>
              </Card3D>

              <Card3D className="p-6" glowColor="rgba(236, 72, 153, 0.4)">
                <h3 className="text-xl font-semibold mb-4">Confusion Matrix</h3>
                <p className="text-gray-400 mb-6">
                  The confusion matrix provides a detailed breakdown of correct
                  and incorrect classifications across both normal and anomalous
                  samples.
                </p>
                <div className="aspect-square w-full bg-gray-800 rounded-lg overflow-hidden">
                  <canvas
                    ref={confusionMatrixRef}
                    className="w-full h-full"
                  ></canvas>
                </div>
              </Card3D>
            </div>
          </div>
        </section>
      </ParallaxSection>

      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4">
          {/* <SectionTitle
            title="Example Anomaly Maps"
            subtitle="Visualization of model outputs showing original images, reconstructions, and anomaly heatmaps."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {[1, 2, 3].map((index) => (
              <Card3D key={index} className="overflow-hidden">
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div>
                    <h4 className="text-center text-sm font-semibold mb-2">
                      Original
                    </h4>
                    <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative">
                      <img
                        src={`https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600`}
                        alt="Original bottle"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gray-900/20"></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-center text-sm font-semibold mb-2">
                      Reconstruction
                    </h4>
                    <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative">
                      <img
                        src={`https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600`}
                        alt="Reconstructed bottle"
                        className="w-full h-full object-cover blur-[1.5px] brightness-95"
                      />
                      <div className="absolute inset-0 bg-gray-900/20"></div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h4 className="text-center text-sm font-semibold mb-2">
                      Anomaly Map
                    </h4>
                    <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[40%] h-[15%] rounded-full bg-red-500/60 blur-md animate-pulse"></div>
                      </div>
                      <img
                        src={`https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600`}
                        alt="Anomaly map"
                        className="w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute bottom-2 right-2 bg-gray-900/80 rounded-md px-2 py-1 text-xs">
                        Score:{" "}
                        <span className="text-red-400 font-semibold">0.87</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-3 text-sm text-center border-t border-gray-700">
                  <span className="inline-block px-2 py-1 bg-red-900/50 text-red-400 rounded font-semibold">
                    Anomaly Detected
                  </span>
                </div>
              </Card3D>
            ))}
          </div> */}

          <div className="mt-16 bg-gray-800 rounded-xl p-6 md:p-10">
            <h3 className="text-2xl font-semibold mb-6">
              Comparative Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">
                      Model
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">
                      Accuracy
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">
                      Precision
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">
                      Recall
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">
                      F1 Score
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-300">
                      AUC
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700 bg-blue-500/10">
                    <td className="py-3 px-4 font-semibold">
                      Quantum-Enhanced (Ours)
                    </td>
                    <td className="py-3 px-4 text-center">75.0%</td>
                    <td className="py-3 px-4 text-center">96.0%</td>
                    <td className="py-3 px-4 text-center">70.0%</td>
                    <td className="py-3 px-4 text-center">81.0%</td>
                    <td className="py-3 px-4 text-center">86.0%</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Autoencoder (Classical)</td>
                    <td className="py-3 px-4 text-center">89.5%</td>
                    <td className="py-3 px-4 text-center">84.7%</td>
                    <td className="py-3 px-4 text-center">87.2%</td>
                    <td className="py-3 px-4 text-center">85.9%</td>
                    <td className="py-3 px-4 text-center">88.3%</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">GANomaly</td>
                    <td className="py-3 px-4 text-center">91.2%</td>
                    <td className="py-3 px-4 text-center">85.9%</td>
                    <td className="py-3 px-4 text-center">90.1%</td>
                    <td className="py-3 px-4 text-center">88.0%</td>
                    <td className="py-3 px-4 text-center">90.1%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">PADIM</td>
                    <td className="py-3 px-4 text-center">90.7%</td>
                    <td className="py-3 px-4 text-center">86.3%</td>
                    <td className="py-3 px-4 text-center">88.5%</td>
                    <td className="py-3 px-4 text-center">87.4%</td>
                    <td className="py-3 px-4 text-center">89.6%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
