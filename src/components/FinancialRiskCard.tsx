import { useState, useEffect } from 'react';
import { DollarSign, ShieldAlert, CheckCircle, TrendingDown, Target, Building } from 'lucide-react';
import { TranscriptAnalysis, CalibrationConfig } from '../types';

interface FinancialRiskCardProps {
  analysis: TranscriptAnalysis | null;
  config: CalibrationConfig;
}

export default function FinancialRiskCard({ analysis, config }: FinancialRiskCardProps) {
  const [budget, setBudget] = useState<number>(150000);
  const [selectedActionIds, setSelectedActionIds] = useState<string[]>([]);
  
  // Platt scaling coefficients for simulation updates
  const coefA = config?.coefficientA ?? -0.08;
  const coefB = config?.coefficientB ?? 3.5;

  useEffect(() => {
    if (analysis) {
      setBudget(analysis.budget || 150000);
      setSelectedActionIds([]);
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 text-center">
        <DollarSign className="w-12 h-12 text-zinc-600 mb-4 animate-pulse" />
        <h3 className="text-lg font-medium text-zinc-300">No Business Impact Calculated</h3>
        <p className="text-zinc-500 text-sm max-w-md mt-1">
          Select or audit an initiative transcript to evaluate capital allocation liability, risk tiers, and simulated recovery plans.
        </p>
      </div>
    );
  }

  // Calculate base fragility and current simulated fragility
  const baseFfs = analysis.ffsRaw;
  
  // Gather how much FFS reduction we get from selected actions
  let totalFfsReduction = 0;
  analysis.recommendedNextActions.forEach(action => {
    if (selectedActionIds.includes(action.id)) {
      totalFfsReduction += action.expectedRiskReduction; // e.g. 15 points
    }
  });

  const simulatedFfs = Math.max(0, baseFfs - totalFfsReduction);
  
  // Recalibrate simulated P_fail
  const exponent = coefA * simulatedFfs + coefB;
  const simulatedPFail = 1 / (1 + Math.exp(exponent));
  
  // Simulated stats
  const simulatedExpectedLoss = Math.round(budget * simulatedPFail);
  const capitalSaved = Math.max(0, Math.round(budget * analysis.pFail) - simulatedExpectedLoss);

  // Generate recommendation for current simulation
  let simRecommendation: 'VALIDATED_BUILD' | 'PILOT_RECOMMENDED' | 'CONDITIONAL_REVIEW' | 'HALT_ALLOCATION' = 'VALIDATED_BUILD';
  if (simulatedPFail >= 0.20 && simulatedPFail < 0.35) {
    simRecommendation = 'PILOT_RECOMMENDED';
  } else if (simulatedPFail >= 0.35 && simulatedPFail < 0.65) {
    simRecommendation = 'CONDITIONAL_REVIEW';
  } else if (simulatedPFail >= 0.65) {
    simRecommendation = 'HALT_ALLOCATION';
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Financial Exposure Workspace (Col-span 2) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
              Capital Budget Allocation Liability
            </h4>
            <span className="text-xs text-zinc-500 font-mono">Enterprise Level Metrics</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Budget Input Slider */}
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-3">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">Initiative Capital Allocation</span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold font-mono text-zinc-100">
                  ${budget.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400 font-mono">USD Budget</span>
              </div>
              <input 
                type="range"
                min="20000"
                max="500000"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-[9px] text-zinc-600 block">Drag to adjust allocated sprint/engineering resources.</span>
            </div>

            {/* Expected Loss Readout */}
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-red-500/5">
                <DollarSign className="w-16 h-16" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">Expected Loss (Fail Budget × P_fail)</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold font-mono ${simulatedExpectedLoss > budget * 0.5 ? 'text-red-400' : 'text-amber-400'}`}>
                  ${simulatedExpectedLoss.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-500 font-mono uppercase">Loss Liability</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded overflow-hidden">
                <div 
                  className={`h-2 rounded transition-all duration-300 ${simulatedExpectedLoss > budget * 0.5 ? 'bg-red-500' : 'bg-amber-400'}`} 
                  style={{ width: `${(simulatedExpectedLoss / budget) * 100}%` }}
                ></div>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono block">
                Calibrated capital risk exposing {Math.round(simulatedPFail * 100)}% of the total budget.
              </span>
            </div>
          </div>

          {/* Capital Exposure Comparison Bar Chart */}
          <div className="space-y-3 pt-2">
            <span className="text-xs text-zinc-400 font-mono uppercase">Liability Comparison Breakdown</span>
            <div className="space-y-2">
              {/* Total Budget */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">Committed Capital Budget:</span>
                  <span className="text-zinc-300 font-bold">${budget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-zinc-900 h-2 rounded">
                  <div className="bg-zinc-500 h-2 rounded" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Initial Raw expected loss */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">Initial Risk Capital Loss:</span>
                  <span className="text-red-400 font-bold">${Math.round(budget * analysis.pFail).toLocaleString()}</span>
                </div>
                <div className="w-full bg-zinc-900 h-2 rounded">
                  <div className="bg-red-400 h-2 rounded transition-all duration-300" style={{ width: `${analysis.pFail*100}%` }}></div>
                </div>
              </div>

              {/* Simulated active loop outcome expected loss (if checkboxes are present) */}
              {selectedActionIds.length > 0 && (
                <div className="space-y-1 bg-emerald-950/10 p-2 rounded border border-emerald-500/10 animate-fade-in">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      De-risked Impact Loss:
                    </span>
                    <span className="text-emerald-400 font-bold">${simulatedExpectedLoss.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2 rounded">
                    <div className="bg-emerald-400 h-2 rounded transition-all duration-300" style={{ width: `${simulatedPFail*100}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Simulation Saving stats */}
        {selectedActionIds.length > 0 && (
          <div className="p-5 bg-gradient-to-r from-emerald-950/20 via-zinc-950 to-zinc-950 border border-emerald-500/20 rounded-xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold block">Risk Mitigation ROI</span>
              <h4 className="text-sm font-semibold text-zinc-100">Simulated Capital Rescued: +${capitalSaved.toLocaleString()}</h4>
              <p className="text-xs text-zinc-400">
                Completing the selected customer validations drops fragility from <span className="font-semibold text-red-400">{baseFfs}</span> to <span className="font-semibold text-emerald-400">{simulatedFfs}</span>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Risk Reduction Flight Simulator Slider (Col-span 1) */}
      <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4">
        <div className="border-b border-zinc-800 pb-3 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            De-Risking Simulator
          </h4>
        </div>

        <p className="text-xs text-zinc-500">
          Checkbox completed validation tasks to simulated immediate reduction of the roadmap risk footprint before writing feature code:
        </p>

        <div className="space-y-3 pt-2">
          {analysis.recommendedNextActions.map((action) => {
            const isChecked = selectedActionIds.includes(action.id);
            return (
              <div 
                key={action.id}
                onClick={() => {
                  if (isChecked) {
                    setSelectedActionIds(prev => prev.filter(id => id !== action.id));
                  } else {
                    setSelectedActionIds(prev => [...prev, action.id]);
                  }
                }}
                className={`p-3 border rounded-lg cursor-pointer transition-all space-y-1.5 ${
                  isChecked 
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-zinc-200' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                    isChecked 
                      ? 'bg-emerald-500 border-emerald-400 text-zinc-950' 
                      : 'border-zinc-600'
                  }`}>
                    {isChecked && <CheckCircle className="w-2.5 h-2.5 stroke-[4px]" />}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <h5 className={`text-xs font-semibold ${isChecked ? 'text-zinc-100' : 'text-zinc-300'}`}>
                      {action.action}
                    </h5>
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      {action.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[9px] font-mono">
                  <span className="text-zinc-500">Mitigation: -{action.expectedRiskReduction} FFS</span>
                  <span className="text-zinc-500">Estimate: {action.estimatedEffortHours} hrs</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulated Status Indicators */}
        <div className="pt-2">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-500">Simulated Recommendation:</span>
            <span className={`font-bold uppercase px-1.5 py-0.5 rounded text-[9px] ${
              simRecommendation === 'VALIDATED_BUILD' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : simRecommendation === 'PILOT_RECOMMENDED'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : simRecommendation === 'CONDITIONAL_REVIEW' 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {simRecommendation.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
