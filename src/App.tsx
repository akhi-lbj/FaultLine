import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  FileText, 
  Percent, 
  DollarSign, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  Sparkles, 
  Settings2, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { TRANSCRIPT_TEMPLATES, TranscriptTemplate } from './preseeds';
import HighlightingPane from './components/HighlightingPane';
import RiskMeter from './components/RiskMeter';
import FinancialRiskCard from './components/FinancialRiskCard';
import PortfolioGrid from './components/PortfolioGrid';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import DeleteAccountModal from './components/DeleteAccountModal';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import DeleteAccountConfirmPage from './components/DeleteAccountConfirmPage';
import { useAuth } from './hooks/useAuth';
import { TranscriptAnalysis, PortfolioItem, ValidationRecord, ValidationMetrics, CalibrationConfig } from './types';

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (user && !loading) {
      const pendingToken = sessionStorage.getItem('pendingDeletionToken');
      if (pendingToken) {
        sessionStorage.removeItem('pendingDeletionToken');
        window.location.hash = `#/delete-account/confirm?token=${pendingToken}`;
        return;
      }

      if (hash === '#/login' || hash === '#/signup') {
        window.location.hash = ''; // redirect to dashboard
      }
    }
  }, [user, loading, hash]);

  if (hash === '#/terms') {
    return <TermsPage />;
  }

  if (hash === '#/privacy') {
    return <PrivacyPage />;
  }

  if (hash.startsWith('#/delete-account/confirm') || window.location.pathname === '/delete-account/confirm') {
    const query = hash.includes('?') ? hash.split('?')[1] : window.location.search.slice(1);
    const params = new URLSearchParams(query || '');
    const token = params.get('token');
    return <DeleteAccountConfirmPage token={token} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-4" />
        <p className="text-zinc-500 font-mono text-sm">Authenticating...</p>
      </div>
    );
  }

  if (!user && (hash === '#/login' || hash === '#/signup')) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col pt-12 items-center justify-center">
        <AuthModal 
          onSuccess={() => { window.location.hash = ''; }} 
          onClose={() => { window.location.hash = ''; }} 
          isLightTheme={false} 
          initialMode={hash === '#/signup' ? 'signup' : 'login'}
        />
      </div>
    );
  }

  if (!user) {
    return <LandingPage onSignIn={() => window.location.hash = '#/login'} />;
  }

  return <MainApp hash={hash} user={user} loading={loading} logout={logout} />;
}

function MainApp({ hash, user, loading, logout }: { hash: string, user: any, loading: boolean, logout: () => void }) {

  // Tabs State: 0=Transcript, 1=Risk, 2=Business, 3=Portfolio
  const [activeTab, setActiveTab] = useState(0);

  // Global Theme State
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLightTheme]);

  const toggleTheme = () => {
    setIsLightTheme(prev => {
      const next = !prev;
      localStorage.setItem("theme", next ? "light" : "dark");
      return next;
    });
  };

  // Core Data States
  const [featureName, setFeatureName] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(150000);
  
  // Active loaded analysis
  const [activeAnalysis, setActiveAnalysis] = useState<TranscriptAnalysis | null>(null);
  
  // Lists from backend
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [validationRecords, setValidationRecords] = useState<ValidationRecord[]>([]);
  const [validationMetrics, setValidationMetrics] = useState<ValidationMetrics | null>(null);
  const [config, setConfig] = useState<CalibrationConfig>({ coefficientA: -0.08, coefficientB: 3.5 });

  // System Loading indicators
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingSource, setIsLoadingSource] = useState(false);
  const [analysisTextStep, setAnalysisTextStep] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Load everything on mount
  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user]);

  const getHeaders = async (u: any = user) => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (u && typeof u.getIdToken === 'function') {
      const token = await u.getIdToken();
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  const fetchData = async (u = user) => {
    try {
      const headers = await getHeaders(u);
      
      // 1. Config
      const configRes = await fetch("/api/config");
      const configData = await configRes.json();
      setConfig(configData);

      // 2. Portfolio
      const portRes = await fetch("/api/portfolio", { headers });
      const portData = await portRes.json();
      if (Array.isArray(portData)) {
        setPortfolio(portData);
      } else {
        console.error("Failed to parse portfolio:", portData);
        setPortfolio([]);
      }

      // 3. Validation
      const valRes = await fetch("/api/validation", { headers });
      const valData = await valRes.json();
      setValidationRecords(valData.records);
      setValidationMetrics(valData.metrics);
    } catch (err) {
      console.error("Critical: Failed to sync database layers", err);
    }
  };

  // Preseed Transcript Template loader
  const handleSelectTemplate = (tpl: TranscriptTemplate) => {
    setFeatureName(tpl.name);
    setTranscriptText(tpl.text);
    setBudgetAmount(tpl.budget);
  };

  // Main Audit Analyst triggering POST
  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureName.trim() || !transcriptText.trim()) return;

    setIsAnalyzing(true);
    setActiveTab(0); // auto switch to Page 1
    
    // Simulate real-time auditor steps progress
    const steps = [
      "Isolating semantic constructs...",
      "Analyzing contradictory customer behaviors...",
      "Extracting interviewer confirmation leading prompts...",
      "Calibrating Platt scale probability curves...",
      "Validating governance allocations..."
    ];

    let stepIdx = 0;
    setAnalysisTextStep(steps[0]);
    const timer = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setAnalysisTextStep(steps[stepIdx]);
      }
    }, 900);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify({
          transcript: transcriptText,
          featureName,
          budget: budgetAmount
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const data: TranscriptAnalysis = await response.json();
      setActiveAnalysis(data);
      
      // Auto-trigger db refresh
      await fetchData();
    } catch (err: any) {
      console.error(err);
      alert(`Audit failed: ${err.message}`);
    } finally {
      clearInterval(timer);
      setIsAnalyzing(false);
    }
  };

  // Select an item from Portfolio view
  const handleLoadPortfolioItem = (item: PortfolioItem) => {
    // Generate a quick pre-populated mock transcript or find existing if any
    const matchedTemplate = TRANSCRIPT_TEMPLATES.find(t => t.name.toLowerCase() === item.featureName.toLowerCase());
    if (matchedTemplate) {
      setFeatureName(matchedTemplate.name);
      setTranscriptText(matchedTemplate.text);
      setBudgetAmount(item.budget);
    } else {
      setFeatureName(item.featureName);
      setTranscriptText(`INTERVIEWER: Tell me, why do you need this custom feature?
CLIENT: Well, we certainly think it is an outstanding idea!
INTERVIEWER: Wouldn't it save your team massive operations labor if we built it?
CLIENT: Yes, absolutely!
CLIENT: But we currently solve this on Excel and don't have active budget allocated yet.`);
      setBudgetAmount(item.budget);
    }
    
    // Trigger analyzer immediately
    setIsLoadingSource(true);
    setActiveTab(0);
    setTimeout(async () => {
      try {
        const headers = await getHeaders();
        
        // Attempt to fetch existing analysis from the database to avoid re-running the AI
        const fetchRes = await fetch(`/api/analysis/feature/${encodeURIComponent(item.featureName)}`, { headers });
        if (fetchRes.ok) {
          const data = await fetchRes.json();
          setActiveAnalysis(data);
          await fetchData();
          return;
        }

        // Fallback: If not found, run the analysis
        setIsLoadingSource(false);
        setIsAnalyzing(true);
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers,
          body: JSON.stringify({
            transcript: matchedTemplate ? matchedTemplate.text : `INTERVIEWER: Tell me, why do you need this custom feature?\nCLIENT: Well, we certainly think it is an outstanding idea!\nINTERVIEWER: Wouldn't it save your team massive operations labor if we built it?\nCLIENT: Yes, absolutely!\nCLIENT: But we currently solve this on Excel and don't have active budget allocated yet.`,
            featureName: item.featureName,
            budget: item.budget
          })
        });
        
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        setActiveAnalysis(data);
        await fetchData();
      } catch (err: any) {
        console.error(err);
        alert(`Failed to load: ${err.message}`);
      } finally {
        setIsAnalyzing(false);
        setIsLoadingSource(false);
      }
    }, 1200);
  };

  // Delete portfolio item
  const handleDeletePortfolioItem = async (id: string) => {
    try {
      const itemToDelete = portfolio.find(p => p.id === id);
      const isCurrentlyActive = activeAnalysis?.featureName === itemToDelete?.featureName;

      await fetch(`/api/portfolio/${id}`, { method: "DELETE", headers: await getHeaders() });
      await fetchData();

      if (isCurrentlyActive) {
        setActiveAnalysis(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add portfolio item
  const handleAddPortfolioItem = async (name: string, budget: number, status: any) => {
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify({ featureName: name, budget, status })
      });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Update portfolio status
  const handleUpdateStatus = async (id: string, status: any) => {
    try {
      await fetch(`/api/portfolio/${id}`, {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify({ status })
      });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add validation record
  const handleAddValidationRecord = async (record: any) => {
    try {
      await fetch("/api/validation", {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify(record)
      });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete validation record
  const handleDeleteValidationRecord = async (id: string) => {
    try {
      await fetch(`/api/validation/${id}`, { method: "DELETE", headers: await getHeaders() });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="faultline-root" className={`min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row font-sans antialiased selection:bg-red-500/30 selection:text-red-200 ${isLightTheme ? 'light-theme' : ''}`}>
      
      {/* Immersive Vertical Sidebar */}
      <aside className="w-full lg:w-80 border-r border-zinc-800 bg-zinc-950 flex flex-col shrink-0 z-10 overflow-y-auto">
        
        {/* Brand Identity Header Block */}
        <div 
          onClick={() => {
            window.location.hash = '';
            setFeatureName('');
            setTranscriptText('');
            setActiveAnalysis(null);
            setActiveTab(3);
          }}
          className="p-5 border-b border-zinc-800 flex items-center justify-between shrink-0 hover:bg-zinc-900/30 cursor-pointer group transition-all"
          title="Return to Home/Portfolio"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold italic tracking-tighter text-lg text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] font-display group-hover:scale-105 transition-transform">
              FL
            </div>
            <div>
              <span className="font-semibold text-lg tracking-tight uppercase font-display block text-white leading-none">
                FaultLine
              </span>
              <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase block mt-1">
                Risk Decision System
              </span>
            </div>
          </div>
          <span className="text-[10px] text-zinc-400 group-hover:text-red-400 font-mono transition-colors">
            ← Home
          </span>
        </div>

        {/* Sidebar Scrollable Body */}
        <div className="flex-1 p-4 space-y-6">
          
          {/* Section: Decision Matrix Selection Tabs */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 px-2 block font-mono font-bold">
              INTELLIGENCE MATRIX
            </span>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab(0)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-xs font-mono tracking-wide transition-all border cursor-pointer ${
                  activeTab === 0
                    ? "bg-zinc-900 border-zinc-700/60 text-white shadow-sm"
                    : "border-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                }`}
              >
                <FileText className="w-4 h-4 text-zinc-400" />
                Transcript Inspector
              </button>

              <button
                onClick={() => setActiveTab(1)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-xs font-mono tracking-wide transition-all border cursor-pointer ${
                  activeTab === 1
                    ? "bg-zinc-900 border-zinc-700/60 text-white shadow-sm"
                    : "border-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                }`}
              >
                <Percent className="w-4 h-4 text-zinc-400" />
                Predictive Risk Index
              </button>

              <button
                onClick={() => setActiveTab(2)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md font-medium text-xs font-mono tracking-wide transition-all border cursor-pointer ${
                  activeTab === 2
                    ? "bg-zinc-900 border-zinc-700/60 text-white shadow-sm"
                    : "border-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                }`}
              >
                <DollarSign className="w-4 h-4 text-zinc-400" />
                Financial Exposure
              </button>

              <button
                onClick={() => setActiveTab(3)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium text-xs font-mono tracking-wide transition-all border cursor-pointer ${
                  activeTab === 3
                    ? "bg-zinc-900 border-zinc-700/60 text-white shadow-sm"
                    : "border-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  Portfolio Board
                </div>
                <span className="bg-zinc-800 text-zinc-400 text-[10px] px-1.5 py-0.2 rounded font-bold border border-zinc-700/60 font-mono">
                  {portfolio.length}
                </span>
              </button>
            </nav>
          </div>

          <div className="h-px bg-zinc-800/80"></div>

          {/* Section: PM input parameters */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 px-2 block font-mono font-bold">
              ACTIVE AUDIT CONTEXT
            </span>

            {/* Quick preseed scenario selector */}
            <div className="space-y-1.5 px-1">
              <label className="text-[9px] uppercase font-mono text-zinc-500 block">Scenario Library</label>
              <div className="grid grid-cols-3 gap-1">
                {TRANSCRIPT_TEMPLATES.map((tpl, idx) => {
                  const isActive = featureName === tpl.name;
                  return (
                    <button
                      key={tpl.name}
                      type="button"
                      onClick={() => handleSelectTemplate(tpl)}
                      className={`py-1.5 px-2 text-[9px] font-mono border rounded truncate text-center cursor-pointer transition-all ${
                        isActive
                          ? "bg-red-950/20 border-red-500/30 text-red-200 font-bold"
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                      title={tpl.name}
                    >
                      Scenario {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form controls */}
            <form onSubmit={handleRunAudit} className="space-y-4">
              {/* Feature/Initiative Name */}
              <div className="space-y-1 px-1">
                <label className="text-[9px] uppercase font-mono text-zinc-500 block">Initiative Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adaptive Vector Querying"
                  value={featureName}
                  onChange={(e) => setFeatureName(e.target.value)}
                  className="w-full bg-zinc-900/60 text-zinc-100 border border-zinc-800/80 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-zinc-700 font-sans"
                />
              </div>

              {/* Budget amount */}
              <div className="space-y-1 px-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase font-mono text-zinc-500 block">Assigned Budget ($)</label>
                  <span className="text-[10px] font-mono text-zinc-400 font-medium">${budgetAmount.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  required
                  min="5000"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-900/60 text-zinc-100 border border-zinc-800/80 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-zinc-700 font-mono"
                />
              </div>

              {/* Raw Transcript Area */}
              <div className="space-y-1 px-1">
                <label className="text-[9px] uppercase font-mono text-zinc-500 block">Interview Transcript</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Paste customer voice callbacks or product team notes here..."
                  value={transcriptText}
                  onChange={(e) => setTranscriptText(e.target.value)}
                  className="w-full bg-zinc-900/60 text-zinc-100 border border-zinc-800/80 rounded p-2 text-xs focus:outline-none focus:border-zinc-700 font-mono leading-normal"
                ></textarea>
              </div>

              {/* Auditor trigger button */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full mt-2 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-wide rounded cursor-pointer selection:bg-transparent shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Run Risk Audit
                  </>
                )}
              </button>
            </form>

          </div>

        </div>

        {/* System telemetry and User control at bottom */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 shrink-0 mt-auto space-y-4">
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold">Operator</span>
                <span className="text-xs font-mono text-zinc-300 truncate max-w-[150px]" title={user.email || 'Anonymous'}>{user.email || 'Anonymous'}</span>
              </div>
              <button 
                onClick={() => logout()}
                className="text-zinc-500 hover:text-red-400 p-1.5 rounded transition-colors bg-zinc-900 border border-zinc-800 hover:border-red-500/50"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </aside>

      {/* Workspace Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950 relative">
        
        {/* Custom Header Bar */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <h1 className="text-xs text-zinc-500 font-mono uppercase tracking-wider block shrink-0">Projects / Faultline</h1>
            <div className="h-4 w-[1px] bg-zinc-800 shrink-0"></div>
            <h2 className="text-sm font-semibold text-white truncate">
              Active Source: <span className="italic text-zinc-400">"{activeAnalysis?.featureName || "N/A (Provide Transcripts)"}"</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-[10px] font-mono font-medium px-3 py-1.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer"
              title="Toggle theme (Presenter Mode)"
            >
              {isLightTheme ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>DARK THEME</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>LIGHT THEME</span>
                </>
              )}
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="text-[10px] font-mono text-red-500 hover:text-red-400 hover:bg-red-500/10 px-2.5 py-1.5 rounded bg-zinc-900/60 border border-zinc-800 uppercase hidden sm:block transition-colors cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </header>

        {isDeleteModalOpen && (
          <DeleteAccountModal
            isLightTheme={isLightTheme}
            onClose={() => setDeleteModalOpen(false)}
            onSuccess={() => {
              setDeleteModalOpen(false);
              logout();
            }}
          />
        )}

        {/* Action-audit processing overlay */}
        {(isAnalyzing || isLoadingSource) && (
          <div className="absolute inset-0 bg-zinc-950/90 z-50 flex flex-col items-center justify-center space-y-6 text-center p-6 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-zinc-900 border-t-red-500 border-r-purple-500 border-l-blue-500 animate-spin"></div>
              <Flame className="w-6 h-6 text-red-500 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold tracking-tight text-white font-mono uppercase">
                {isLoadingSource ? "Loading Source" : "FaultLine auditing in progress"}
              </h3>
              <p className="text-zinc-500 text-sm max-w-sm font-mono animate-pulse">{analysisTextStep}</p>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
          {activeTab === 0 && (
            <HighlightingPane analysis={activeAnalysis} />
          )}

          {activeTab === 1 && (
            <RiskMeter analysis={activeAnalysis} onConfigChanged={(newConfig) => setConfig(newConfig)} />
          )}

          {activeTab === 2 && (
            <FinancialRiskCard analysis={activeAnalysis} config={config} />
          )}

          {activeTab === 3 && (
            <PortfolioGrid 
              items={portfolio} 
              onSelectItem={handleLoadPortfolioItem}
              onDeleteItem={handleDeletePortfolioItem}
              onAddItem={handleAddPortfolioItem}
              onUpdateStatus={handleUpdateStatus}
              activeItemId={activeAnalysis?.id ?? activeAnalysis?.featureName}
            />
          )}
        </div>

      </main>

    </div>
  );
}
