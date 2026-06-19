import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ShieldAlert, 
  BarChart3, 
  HelpCircle, 
  Compass, 
  Eye, 
  Volume2, 
  ArrowRight,
  Gauge,
  Flame,
  UserCheck
} from 'lucide-react';

interface LandingPageProps {
  onSignIn: () => void;
}

export default function LandingPage({ onSignIn }: LandingPageProps) {
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const isLightTheme = false; // Always use dark theme for landing page

  const demoTranscripts = [
    {
      label: "Politeness Bias Teaser",
      text: "INTERVIEWER: Would you pay $50/mo for a real-time calendar syncing module?\nCLIENT: Oh, yes! That sounds incredibly amazing and fantastic! We would absolutely buy it instantly.",
      ffs: 84,
      iqs: 32,
      expectedOutcome: "High Likelihood of Abandonment (Empty Praise Detected)"
    },
    {
      label: "Authentic Friction Gap",
      text: "INTERVIEWER: How do you currently coordinate with external contractors?\nCLIENT: It's extremely critical. We waste 20 hours a week sending emails back and forth, but our management hasn't approved any software budget for external integrations so we just deal with it.",
      ffs: 41,
      iqs: 81,
      expectedOutcome: "Moderate Risk (High Need, Zero Budget Capability)"
    },
    {
      label: "Leading Question Trap",
      text: "INTERVIEWER: Don't you think our auto-tagging AI assistant would save you hours of daily manual sorting?\nCLIENT: I guess so, yeah. If it works as you described, it could be useful.",
      ffs: 71,
      iqs: 24,
      expectedOutcome: "Extremely Biased (Invalid validation signals)"
    }
  ];

  return (
    <div className={`min-h-screen bg-[#050507] text-zinc-100 flex flex-col font-sans antialiased relative overflow-hidden transition-colors duration-300 ${isLightTheme ? 'light-theme' : ''}`}>
      
      {/* Decorative ambient blobs (dynamic values per theme for pristine rendering) */}
      <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none -translate-y-1/2 transition-all duration-700 ${isLightTheme ? 'bg-red-500/5 opacity-55' : 'bg-red-600/12 opacity-100'}`}></div>
      <div className={`absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none translate-y-1/3 transition-all duration-700 ${isLightTheme ? 'bg-purple-500/4 opacity-40' : 'bg-purple-600/6 opacity-100'}`}></div>

      {/* Top Navigation */}
      <header className="h-20 border-b border-zinc-900 px-6 sm:px-12 flex items-center justify-between bg-zinc-950/40 backdrop-blur-md relative z-20 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-700 rounded-xl flex items-center justify-center font-black italic tracking-tighter text-xl text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] font-display">
            FL
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight uppercase font-display block text-white leading-none">
              FaultLine
            </span>
            <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase block mt-1.5 font-bold">
              Risk Decision System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onSignIn}
            className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer"
          >
            SIGN IN
          </button>
        </div>
      </header>

      {/* Hero Core Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 pt-16 pb-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Pitch and Core Hook */}
        <div className="flex-1 space-y-8 text-left max-w-2xl">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-red-950/20 border border-red-500/30 rounded-full text-red-400 text-xs font-mono font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>AI-Driven Feature Validation Audit</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.08] sm:leading-[1.05]">
            Expose the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.25)]">World of Faults</span> <br />
            Before Building
            <span className="inline-block text-red-500 ml-2 animate-pulse font-normal">✦</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-sans font-medium">
            FaultLine intercepts false signals in customer interviews by scanning transcripts for politeness bias, leading questions, and hidden behavioral friction gaps. By calculating statistical trial success probability curves and expected budget losses, we tell your team exactly when to commit, pivot, or halt allocation before writing a single line of code.
          </p>

          {/* Double CTA Pattern mimicking the uploaded UI exactly */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onSignIn}
              id="btn-landing-get-started"
              className="py-4 px-8 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-[0_4px_25px_rgba(220,38,38,0.35)] hover:shadow-[0_4px_35px_rgba(220,38,38,0.55)] cursor-pointer text-center text-sm flex items-center justify-center gap-2.5 group transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Micro stats banner with modern border aesthetics */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-zinc-900/80">
            <div>
              <span className="block text-3xl font-extrabold font-display text-zinc-100">85%+</span>
              <span className="block text-[10px] text-zinc-500 uppercase font-mono tracking-widest mt-1.5 leading-snug font-bold">Politeness Bias Detected</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold font-display text-rose-500">10x</span>
              <span className="block text-[10px] text-zinc-500 uppercase font-mono tracking-widest mt-1.5 leading-snug font-bold">Reduced Budget Wastes</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold font-display text-emerald-400">0.0-1.0</span>
              <span className="block text-[10px] text-zinc-500 uppercase font-mono tracking-widest mt-1.5 leading-snug font-bold">Calibrated Exposure</span>
            </div>
          </div>

        </div>

        {/* Right Side: Visual interactive simulation preview on glass card */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none space-y-6" id="interactive-demo">
          <div className={`p-6 sm:p-8 rounded-2xl relative transition-all duration-500 backdrop-blur-sm ${
            isLightTheme 
              ? "bg-white border border-zinc-200 shadow-sm lg:bg-transparent lg:border-none lg:shadow-none lg:p-0 lg:backdrop-blur-none" 
              : "bg-zinc-950/40 border border-zinc-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-t-red-500/20 border-r-rose-500/10 lg:bg-transparent lg:border-none lg:shadow-none lg:p-0 lg:backdrop-blur-none"
          }`}>
            
            {/* Ambient inner backglow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] pointer-events-none"></div>

            {/* Window header */}
            <div className={`flex items-center justify-between border-b pb-4 mb-6 ${
              isLightTheme ? "border-zinc-200" : "border-zinc-900"
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-2">Interactive Transcript Sandbox</span>
              </div>
              <span className={`text-[9px] font-mono px-2.5 py-1 rounded uppercase tracking-wide font-semibold border ${
                isLightTheme ? 'bg-zinc-100 text-zinc-650 border-zinc-250' : 'bg-zinc-950 text-zinc-400 border-zinc-800/80'
              }`}>
                Live Audit Simulation
              </span>
            </div>

            <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono font-bold mb-3">
              Switch Scenario to Preview Analysis:
            </p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {demoTranscripts.map((demo, idx) => {
                const isActive = selectedDemoIndex === idx;
                let activeClasses = "";
                let inactiveClasses = "";
                if (isLightTheme) {
                  activeClasses = "bg-gradient-to-r from-red-100 to-rose-100 border-red-400 text-red-800 font-extrabold shadow-[0_4px_12px_rgba(239,68,68,0.1)]";
                  inactiveClasses = "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-800 hover:border-zinc-300";
                } else {
                  activeClasses = "bg-gradient-to-r from-red-950/25 to-rose-950/25 border-red-500/50 text-red-200 font-black shadow-[0_0_15px_rgba(220,38,38,0.15)]";
                  inactiveClasses = "bg-zinc-900/20 border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800";
                }
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDemoIndex(idx)}
                    className={`py-2.5 px-3 text-[10px] font-mono border rounded-xl text-center cursor-pointer truncate transition-all ${
                      isActive ? activeClasses : inactiveClasses
                    }`}
                  >
                    {demo.label}
                  </button>
                );
              })}
            </div>

            {/* Transcript Preview Container */}
            <div className={`p-4 rounded-xl space-y-3 font-mono text-xs text-left leading-relaxed overflow-x-auto h-40 scrollbar-thin border ${
              isLightTheme 
                ? "bg-white border-zinc-200 text-zinc-800" 
                : "bg-zinc-950/80 border-zinc-900/60 text-zinc-300"
            }`}>
              <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block">RAW PAYLOAD PATHWAY SUMMARY:</span>
              <p className={`whitespace-pre-wrap font-mono ${isLightTheme ? 'text-zinc-700' : 'text-zinc-350'}`}>{demoTranscripts[selectedDemoIndex].text}</p>
            </div>

            {/* Simulated Analysis Dashboard Spark */}
            <div className={`mt-6 pt-6 border-t grid grid-cols-2 gap-4 ${
              isLightTheme ? "border-zinc-205" : "border-zinc-900"
            }`}>
              <div className={`border rounded-xl p-4 text-left ${
                isLightTheme ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-950/70 border-zinc-900"
              }`}>
                <div className={`flex items-center gap-1.5 mb-1.5 text-[10px] uppercase font-mono font-bold tracking-wider ${
                  isLightTheme ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>Fragility (FFS)</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-extrabold font-display ${demoTranscripts[selectedDemoIndex].ffs > 70 ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.15)]' : 'text-amber-500'}`}>
                    {demoTranscripts[selectedDemoIndex].ffs}
                  </span>
                  <span className={`text-[10px] font-mono ${isLightTheme ? 'text-zinc-500' : 'text-zinc-650'}`}>/ 100 max</span>
                </div>
              </div>

              <div className={`border rounded-xl p-4 text-left ${
                isLightTheme ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-950/70 border-zinc-900"
              }`}>
                <div className={`flex items-center gap-1.5 mb-1.5 text-[10px] uppercase font-mono font-bold tracking-wider ${
                  isLightTheme ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  <Gauge className="w-4 h-4 text-purple-400" />
                  <span>Quality (IQS)</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-extrabold font-display ${demoTranscripts[selectedDemoIndex].iqs < 40 ? 'text-amber-500' : 'text-emerald-400'}`}>
                    {demoTranscripts[selectedDemoIndex].iqs}
                  </span>
                  <span className={`text-[10px] font-mono ${isLightTheme ? 'text-zinc-500' : 'text-zinc-650'}`}>/ 100 max</span>
                </div>
              </div>
            </div>

            <div className={`mt-4 p-4 rounded-xl flex items-start gap-3.5 text-left border ${
              isLightTheme 
                ? "bg-red-50 border-red-200" 
                : "bg-red-950/10 border-red-500/20"
            }`}>
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold tracking-wide block">Predictive Risk Outcome:</span>
                <p className={`text-sm mt-1 font-mono font-bold tracking-wide ${isLightTheme ? "text-red-900" : "text-zinc-200"}`}>
                  {demoTranscripts[selectedDemoIndex].expectedOutcome}
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Value Proposition Cards */}
      <section className="bg-zinc-950/30 border-t border-zinc-900 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Centered Welcome Header matching the uploaded image */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 text-white text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display uppercase">
              <span className="text-red-500 animate-pulse font-normal">✦</span>
              <span>Welcome to</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]">FaultLine</span>
              <span className="text-red-500 animate-pulse font-normal">✦</span>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              We process text payloads into structured mathematical telemetry using custom qualitative analyzers, shielding development budgets from biased project commits or false customer agreement signals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className={`p-8 rounded-2xl space-y-4 border transition-all text-left group ${
              isLightTheme 
                ? "bg-white border-zinc-205 shadow-sm hover:border-zinc-300" 
                : "bg-zinc-950/30 border-zinc-900 hover:border-zinc-800"
            }`}>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                isLightTheme
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-red-900/10 border-red-500/20 text-red-500 group-hover:bg-red-500/10"
              }`}>
                <Compass className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold font-display ${isLightTheme ? "text-zinc-900" : "text-white"}`}>Politeness Bias Filters</h3>
              <p className={`text-xs leading-relaxed font-sans font-medium ${isLightTheme ? "text-zinc-650" : "text-zinc-400"}`}>
                Filter out casual enthusiasm and "pat-on-the-back" approval. Our linguistic scanner separates polite compliments from true urgent pains that drive customer checkouts and retention.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-8 rounded-2xl space-y-4 border transition-all text-left group ${
              isLightTheme 
                ? "bg-white border-zinc-205 shadow-sm hover:border-zinc-300" 
                : "bg-zinc-950/30 border-zinc-900 hover:border-zinc-800"
            }`}>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                isLightTheme
                  ? "bg-purple-50 border-purple-200 text-purple-600"
                  : "bg-purple-900/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500/10"
              }`}>
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold font-display ${isLightTheme ? "text-zinc-900" : "text-white"}`}>Leading Interview Prompts</h3>
              <p className={`text-xs leading-relaxed font-sans font-medium ${isLightTheme ? "text-zinc-650" : "text-zinc-400"}`}>
                Flag confirmation bias immediately. Avoid asking "Wouldn't you love this feature?". FaultLine maps out prompts where your user research sets clients up to agree instead of checking critical alternatives.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-8 rounded-2xl space-y-4 border transition-all text-left group ${
              isLightTheme 
                ? "bg-white border-zinc-205 shadow-sm hover:border-zinc-300" 
                : "bg-zinc-950/30 border-zinc-900 hover:border-zinc-800"
            }`}>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                isLightTheme
                  ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                  : "bg-emerald-900/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/10"
              }`}>
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold font-display ${isLightTheme ? "text-zinc-900" : "text-white"}`}>Financial Exposure Calibration</h3>
              <p className={`text-xs leading-relaxed font-sans font-medium ${isLightTheme ? "text-zinc-650" : "text-zinc-400"}`}>
                Transform qualitative warnings into quantitative liabilities. Input designated project budgets to dynamically assess expected losses based on calibrated, real-world failure distributions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-10 border-t border-zinc-900 bg-zinc-950/80 text-center text-zinc-500 text-xs font-mono select-none">
        <p>© 2026 FaultLine Risk Decision System. All audits strictly handled securely.</p>
      </footer>

    </div>
  );
}
