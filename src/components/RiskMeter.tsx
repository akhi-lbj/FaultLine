import { useState, useEffect } from 'react';
import { Percent, ShieldCheck, AlertCircle, AlertOctagon, HelpCircleIcon, Cpu } from 'lucide-react';
import { TranscriptAnalysis, CalibrationConfig } from '../types';

interface RiskMeterProps {
  analysis: TranscriptAnalysis | null;
  onConfigChanged: (newConfig: CalibrationConfig) => void;
}

export default function RiskMeter({ analysis, onConfigChanged }: RiskMeterProps) {
  const [config, setConfig] = useState<CalibrationConfig>({ coefficientA: -0.08, coefficientB: 3.5 });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Load config from the server
    fetch("/api/config")
      .then(r => r.json())
      .then(d => setConfig(d))
      .catch(console.error);
  }, [analysis]);

  const handleUpdateConfig = async (coefA: number, coefB: number) => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coefficientA: coefA, coefficientB: coefB })
      });
      const data = await response.json();
      if (data.config) {
        // Pendo Track: calibration_config_updated
        if (typeof pendo !== 'undefined') {
          pendo.track("calibration_config_updated", {
            coefficientA: coefA,
            coefficientB: coefB,
            previousCoefficientA: config.coefficientA,
            previousCoefficientB: config.coefficientB
          });
        }
        setConfig(data.config);
        onConfigChanged(data.config);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 text-center">
        <Percent className="w-12 h-12 text-zinc-600 mb-4 animate-pulse" />
        <h3 className="text-lg font-medium text-zinc-300">No Risk Assessed</h3>
        <p className="text-zinc-500 text-sm max-w-md mt-1">
          Perform a transcript audit first to calibrate fragility, interview rigor, and generate Platt failure curves.
        </p>
      </div>
    );
  }

  // Get current recommendation colors/labels
  const rec = analysis.recommendation;
  let recColor = "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
  let recLabel = "Validated Build";
  let recIcon = <ShieldCheck className="w-5 h-5 text-emerald-400" />;
  let recDesc = "Discovery results are outstandingly robust. Customers showed high grit, behavioral signals, and minimal leading interview prompts. Proceed directly to building phase.";

  if (rec === 'CONDITIONAL_REVIEW') {
    recColor = "text-amber-400 border-amber-500/20 bg-amber-500/10";
    recLabel = "Conditional Review";
    recIcon = <AlertCircle className="w-5 h-5 text-amber-400" />;
    recDesc = "Moderate risk signals detected. Highly recommend carrying out secondary non-hypothetical validation steps (e.g. watch workflow directly, deploy manual Wizard-of-Oz prototypes) before committing high resource budgets.";
  } else if (rec === 'PILOT_RECOMMENDED') {
    recColor = "text-blue-400 border-blue-500/20 bg-blue-500/10";
    recLabel = "Pilot Recommended";
    recIcon = <ShieldCheck className="w-5 h-5 text-blue-400" />;
    recDesc = "Strong positive validation signals identified with manageable, well-understood risks or high recurring user pain. Recommended to proceed with a validation pilot or limited rollout.";
  } else if (rec === 'HALT_ALLOCATION') {
    recColor = "text-red-400 border-red-500/20 bg-red-500/10";
    recLabel = "Halt Allocation";
    recIcon = <AlertOctagon className="w-5 h-5 text-red-400" />;
    recDesc = "Severe risk of post-launch failure detected. The transcript reveals systemic contradictions, major leading questions, or zero actual user friction behaviors. Do NOT build this feature yet. Re-evaluate core thesis.";
  }

  // Generate coordinates for the S-curve: range 0 to 100
  const points: { x: number; y: number }[] = [];
  for (let x = 0; x <= 100; x += 2) {
    const exponent = config.coefficientA * x + config.coefficientB;
    const y = 1 / (1 + Math.exp(exponent));
    points.push({ x, y });
  }

  // Convert points to SVG polyline coordinates
  const svgWidth = 400;
  const svgHeight = 120;
  const dPath = points.map((p, idx) => {
    const svgX = (p.x / 100) * svgWidth;
    const svgY = svgHeight - p.y * svgHeight;
    return `${idx === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
  }).join(' ');

  // Current feature point position on the SVG
  const currentSvgX = (analysis.ffsRaw / 100) * svgWidth;
  const currentSvgY = svgHeight - analysis.pFail * svgHeight;

  return (
    <div className="space-y-6">
      {/* Risk Metrics Triple Dial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dial 1: FFS_raw (Feature Fragility Score) */}
        <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-red-500/30 group-hover:text-red-400 group-hover:drop-shadow-[0_0_15px_rgba(248,113,113,0.8)] transition-all duration-300">
            <Percent className="w-16 h-16" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold block">Primary Risk Heuristic</span>
          <h3 className="text-sm font-semibold text-zinc-300">Feature Fragility Score (FFS)</h3>
          
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-4xl font-mono font-bold text-red-400">{analysis.ffsRaw}</span>
            <span className="text-xs font-mono text-zinc-500">/ 100</span>
          </div>

          <div className="w-full bg-zinc-900 rounded-full h-1.5 mt-2">
            <div 
              className="bg-red-400 h-1.5 rounded-full transition-all duration-1000" 
              style={{ width: `${analysis.ffsRaw}%` }}
            ></div>
          </div>

          <p className="text-xs text-zinc-500 mt-2">
            A weighted evaluation of customer contradictions, soft commitment constructs, and stated-to-actual behavioral gaps.
          </p>
        </div>

        {/* Dial 2: IQS_raw (Interview Quality Score) */}
        <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-purple-500/30 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(192,132,252,0.8)] transition-all duration-300">
            <Cpu className="w-16 h-16" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold block">Methodology Integrity</span>
          <h3 className="text-sm font-semibold text-zinc-300">Interview Quality Score (IQS)</h3>
          
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-4xl font-mono font-bold text-purple-400">{analysis.iqsRaw}</span>
            <span className="text-xs font-mono text-zinc-500">/ 100</span>
          </div>

          <div className="w-full bg-zinc-900 rounded-full h-1.5 mt-2">
            <div 
              className="bg-purple-400 h-1.5 rounded-full transition-all duration-1000" 
              style={{ width: `${analysis.iqsRaw}%` }}
            ></div>
          </div>

          <p className="text-xs text-zinc-500 mt-2">
            Evaluates interviewer bias, usage of leading/trapping question constructs, and diligence of validation probing.
          </p>
        </div>

        {/* Dial 3: P_fail (Calibrated Probability of Failure) */}
        <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 text-emerald-500/30 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.8)] transition-all duration-300">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-semibold block">Statistical Calibrator</span>
          <h3 className="text-sm font-semibold text-zinc-300">Probability of Failure (P_fail)</h3>
          
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-4xl font-mono font-bold text-zinc-100">
              {Math.round(analysis.pFail * 100)}%
            </span>
            <span className="text-xs font-mono text-zinc-500">calibrated</span>
          </div>

          <div className="w-full bg-zinc-900 rounded-full h-1.5 mt-2">
            <div 
              className="bg-zinc-100 h-1.5 rounded-full transition-all duration-1000" 
              style={{ width: `${analysis.pFail * 100}%` }}
            ></div>
          </div>

          <p className="text-xs text-zinc-500 mt-2">
            Platt Scaling mapping of structural fragility against historically validated failure outcomes.
          </p>
        </div>
      </div>

      {/* Governance Recommendation Panel */}
      <div className={`p-6 border rounded-xl flex items-start gap-4 ${recColor}`}>
        <div className="p-3 bg-zinc-950/40 rounded-lg border border-zinc-800">
          {recIcon}
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">Governance Verdict</span>
          <h3 className="text-base font-bold uppercase tracking-wide">{recLabel}</h3>
          <p className="text-sm opacity-90 leading-relaxed mt-1">{recDesc}</p>
        </div>
      </div>
    </div>
  );
}
