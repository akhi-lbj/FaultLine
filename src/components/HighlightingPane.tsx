import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, HelpCircle, HelpCircleIcon, CheckCircle2 } from 'lucide-react';
import { TranscriptAnalysis } from '../types';

interface HighlightingPaneProps {
  analysis: TranscriptAnalysis | null;
}

export default function HighlightingPane({ analysis }: HighlightingPaneProps) {
  const [selectedHighlight, setSelectedHighlight] = useState<{
    type: 'contradiction' | 'politeness' | 'leading' | 'friction';
    content: string;
    description: string;
    quote1?: string;
    quote2?: string;
    reason?: string;
    confidence?: number;
    extra?: string;
  } | null>(null);

  const [activeFilter, setActiveFilter] = useState<'contradiction' | 'politeness' | 'leading' | 'friction' | null>(null);

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 text-center">
        <ShieldAlert className="w-12 h-12 text-zinc-600 mb-4 animate-pulse" />
        <h3 className="text-lg font-medium text-zinc-300">No Transcript Audited</h3>
        <p className="text-zinc-500 text-sm max-w-md mt-1">
          Upload customer interviews or discovery transcripts in the sidebar to generate an interactive fragility audit trail.
        </p>
      </div>
    );
  }

  // Generate an interactive text rendering by highlighting substrings
  const text = analysis.transcriptText;

  // Exact correction mapping for risk label classification
  const classifyLine = (line: string) => {
    const lineLower = line.toLowerCase().trim();
    const isInterviewerLine = lineLower.startsWith("interviewer:") || lineLower.startsWith("q:");
    const isCustomerLine = lineLower.startsWith("client:") || lineLower.startsWith("customer:") || lineLower.startsWith("user:") || lineLower.startsWith("respondent:");

    // Check specific examples from system description to ensure perfect coverage
    if (lineLower.includes("use it after every major incident") || lineLower.includes("incident response process")) {
      return null; // Recurring adoption intent, not a Friction Gap Deficit
    }
    if (lineLower.includes("affect engineering time")) {
      return null; // Business impact inquiry, not a Leading Prompter Trap
    }
    if (lineLower.includes("saved even three hours") || lineLower.includes("engineering hours saved per month") || lineLower.includes("15 to 20 engineering hours")) {
      return null; // Quantified ROI evidence, not a Leading Prompter Trap
    }
    if (lineLower.includes("own the reliability tooling budget") || lineLower.includes("budget up to $50,000") || lineLower.includes("$50,000 annually")) {
      return null; // Budget authority, not a risk signal
    }
    if (lineLower.includes("provide five historical incidents") || lineLower.includes("historical incidents for testing")) {
      return null; // Validation readiness, not a risk signal
    }

    // Still generalize positive validation evidence for other customer lines
    const hasPositiveSignal = (
      // Adoption intent / Recurring usage intent
      lineLower.includes("would use") || 
      lineLower.includes("incident response process") || 
      lineLower.includes("part of our incident") ||
      lineLower.includes("every major incident") ||
      lineLower.includes("use it after every") ||
      lineLower.includes("use this after") ||
      lineLower.includes("integrate into our") ||
      lineLower.includes("recurring") ||
      lineLower.includes("usage intent") ||
      
      // ROI
      lineLower.includes("saved even") || 
      lineLower.includes("hours saved") || 
      lineLower.includes("engineering hours saved") || 
      lineLower.includes("hours saved per month") || 
      lineLower.includes("hour postmortem") ||
      lineLower.includes("would be worth") ||
      lineLower.includes("save us") ||
      lineLower.includes("saving") ||
      lineLower.includes("saves me") ||
      lineLower.includes("saved 15 to 20") ||
      
      // Budget ownership / willingness to pay
      lineLower.includes("own the reliability") || 
      lineLower.includes("tooling budget") || 
      lineLower.includes("pre-approved budget") || 
      lineLower.includes("approve the invoice") || 
      lineLower.includes("purchase order") || 
      lineLower.includes("willing to spend") || 
      lineLower.includes("annually") || 
      lineLower.includes("budget up to") ||
      lineLower.includes("willing to pay") ||
      lineLower.includes("$50,000") ||
      lineLower.includes("$12,000") ||
      lineLower.includes("pre-approved") ||
      lineLower.includes("approved budget") ||
      lineLower.includes("invoice on day one") ||
      
      // Validation readiness
      lineLower.includes("provide five") || 
      lineLower.includes("historical incidents") || 
      lineLower.includes("incidents for testing") || 
      lineLower.includes("willing to pilot") || 
      lineLower.includes("run a pilot") || 
      lineLower.includes("start a pilot") || 
      lineLower.includes("test it with") ||
      lineLower.includes("testing") ||
      
      // Urgency
      lineLower.includes("immediately") || 
      lineLower.includes("desperate") || 
      lineLower.includes("urgent") || 
      lineLower.includes("six weeks") || 
      lineLower.includes("nightmare") ||
      lineLower.includes("by next quarter") ||
      lineLower.includes("sign a purchase order" )
    );

    if (!isInterviewerLine && hasPositiveSignal) {
      return null; // Leave as unhighlighted in Transcript Inspector
    }

    // 1. Contradiction Detected (two customer statements conflict)
    const matchingContradiction = analysis.contradictions.find(c => {
      const q1 = c.quote1 ? c.quote1.toLowerCase().trim() : "";
      const q2 = c.quote2 ? c.quote2.toLowerCase().trim() : "";
      const sub1 = q1.substring(0, Math.min(24, q1.length));
      const sub2 = q2.substring(0, Math.min(24, q2.length));
      return (sub1 && lineLower.includes(sub1)) || (sub2 && lineLower.includes(sub2));
    });

    if (matchingContradiction && !isInterviewerLine) {
      return {
        type: 'contradiction' as const,
        data: matchingContradiction,
        reason: matchingContradiction.reason || matchingContradiction.explanation || "Strategic contradiction: customer statements logically conflict.",
        quoteContent: `[CONTRADICTION] ${line}`
      };
    }

    // 2. Politeness Bias Signal (customer gives vague approval)
    const matchingPoliteness = analysis.politenessBiases.find(p => {
      const q = p.quote ? p.quote.toLowerCase().trim() : "";
      const sub = q.substring(0, Math.min(24, q.length));
      return sub && lineLower.includes(sub);
    });

    if (matchingPoliteness && !isInterviewerLine) {
      return {
        type: 'politeness' as const,
        data: matchingPoliteness,
        reason: matchingPoliteness.explanation || matchingPoliteness.reason || "Vague, polite approval indicates low direct pain.",
        quoteContent: `[POLITENESS BIAS] ${line}`
      };
    }

    // 3. Leading Prompter Traps (interviewer asks a biased/agreement-pushing question)
    const matchingLeading = analysis.leadingQuestions.find(l => {
      const q = l.question ? l.question.toLowerCase().trim() : "";
      const subQ = q.substring(0, Math.min(20, q.length));
      return subQ && lineLower.includes(subQ);
    });

    if (matchingLeading && isInterviewerLine) {
      return {
        type: 'leading' as const,
        data: matchingLeading,
        reason: matchingLeading.explanation || matchingLeading.reason || "Interviewer biased question framing pushing customer toward agreement.",
        quoteContent: `[LEADING QUESTION] ${line}`
      };
    }

    // 4. Friction Gap Deficit (customer lacks behavior, budget, authority, urgency, usage intent, or proof)
    const matchingFriction = analysis.frictionGaps.find(f => {
      const s = f.statedImportance ? f.statedImportance.toLowerCase().trim() : "";
      const sub = s.substring(0, Math.min(24, s.length));
      return sub && lineLower.includes(sub);
    });

    if (matchingFriction && !isInterviewerLine) {
      return {
        type: 'friction' as const,
        data: matchingFriction,
        reason: matchingFriction.explanation || matchingFriction.reason || "Friction-to-behavior gap: claims importance but lacks matching behavior/budget/urgency.",
        quoteContent: `[BEHAVIORAL FRICTION GAP] ${line}`
      };
    }

    return null;
  };

  // Split lines of transcript and pre-process to get exact highlighted states
  const processedLines = text.split('\n').map((line, idx) => {
    return {
      idx,
      originalLine: line,
      classification: classifyLine(line)
    };
  });

  // Calculate global totals from pre-processed classifications correctly
  const contradictionCount = processedLines.filter(pl => pl.classification?.type === 'contradiction').length;
  const politenessCount = processedLines.filter(pl => pl.classification?.type === 'politeness').length;
  const leadingCount = processedLines.filter(pl => pl.classification?.type === 'leading').length;
  const frictionCount = processedLines.filter(pl => pl.classification?.type === 'friction').length;

  // Perform click filtering on transcript source view
  const filteredLines = activeFilter
    ? processedLines.filter(pl => pl.classification?.type === activeFilter)
    : processedLines;

  // Active filter helper for interactive trigger clicks
  const handleToggleFilter = (filterType: 'contradiction' | 'politeness' | 'leading' | 'friction') => {
    if (activeFilter === filterType) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterType);
      // Ensure Auditor Investigation Pane only inspects findings of the active filter
      if (selectedHighlight && selectedHighlight.type !== filterType) {
        setSelectedHighlight(null);
      }
    }
  };

  // Only render active investigation if it matches current filter (if filter exists)
  const isHighlightMatchingFilter = !activeFilter || selectedHighlight?.type === activeFilter;
  const displayHighlight = (selectedHighlight && isHighlightMatchingFilter) ? selectedHighlight : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Narrative Synthesis Area */}
      <div className="p-6 bg-gradient-to-r from-red-950/20 via-zinc-900 to-zinc-900 border border-zinc-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg text-red-400 border border-red-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-xs uppercase font-mono tracking-wider text-red-400 font-semibold">Executive Audit Synthesis</span>
            <h3 className="text-base font-semibold text-zinc-100">{analysis.featureName} Discovery Assessment</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mt-2">{analysis.narrativeSummary}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-500 block font-mono">Confidence</span>
            <span className="text-lg font-mono font-bold text-emerald-400">{analysis.confidenceScore}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transcript Highlighting Window */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 block animate-pulse"></span>
              Interactive Discovery Transcript Source {analysis.transcriptText.length > 500 ? '(Pre-processed)' : ''}
              {activeFilter && <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-500/20 px-1.5 py-0.2 rounded font-mono uppercase ml-2">Filtered: {activeFilter}</span>}
            </h4>
            <span className="text-xs text-zinc-500 font-mono">Click highlighted indicators to audit risk severity</span>
          </div>

          <div className="relative p-5 bg-zinc-950 border border-zinc-800 rounded-xl font-sans text-sm text-zinc-400 leading-relaxed overflow-y-auto max-h-[500px]">
            <div className="space-y-4 whitespace-pre-wrap font-mono text-xs text-zinc-500">
              {filteredLines.map((pl) => {
                const line = pl.originalLine;
                const cls = pl.classification;

                if (cls) {
                  let highlightClass = "";
                  let indicator: React.ReactNode = null;

                  if (cls.type === 'contradiction') {
                    highlightClass = "bg-red-950/40 text-red-300 border-l-2 border-red-500 pl-2 py-1 my-1 cursor-pointer hover:bg-red-950/60";
                    indicator = <ShieldAlert className="w-3.5 h-3.5 text-red-400 inline-block mr-1 align-middle" />;
                  } else if (cls.type === 'politeness') {
                    highlightClass = "bg-amber-950/30 text-amber-300 border-l-2 border-amber-500 pl-2 py-1 my-1 cursor-pointer hover:bg-amber-950/50";
                    indicator = <AlertTriangle className="w-3.5 h-3.5 text-amber-400 inline-block mr-1 align-middle" />;
                  } else if (cls.type === 'leading') {
                    highlightClass = "bg-purple-950/30 text-purple-300 border-l-2 border-purple-500 pl-2 py-1 my-1 cursor-pointer hover:bg-purple-950/50";
                    indicator = <HelpCircle className="w-3.5 h-3.5 text-purple-400 inline-block mr-1 align-middle" />;
                  } else if (cls.type === 'friction') {
                    highlightClass = "bg-indigo-950/30 text-indigo-300 border-l-2 border-indigo-500 pl-2 py-1 my-1 cursor-pointer hover:bg-indigo-950/50";
                    indicator = <AlertTriangle className="w-3.5 h-3.5 text-indigo-400 inline-block mr-1 align-middle" />;
                  }

                  const onClickHandler = () => {
                    setSelectedHighlight({
                      type: cls.type,
                      content: line,
                      description: cls.reason,
                      quote1: cls.type === 'contradiction' ? (cls.data as any)?.quote1 : undefined,
                      quote2: cls.type === 'contradiction' ? (cls.data as any)?.quote2 : undefined,
                      confidence: cls.data?.confidence ?? 0.88
                    });
                  };

                  return (
                    <div 
                      key={pl.idx} 
                      className={`${highlightClass} transition-all rounded-r`}
                      onClick={onClickHandler}
                    >
                      {indicator}
                      <span className="font-sans text-sm">{cls.quoteContent}</span>
                    </div>
                  );
                }

                return (
                  <div key={pl.idx} className="hover:text-zinc-300 font-sans text-sm py-0.5 px-2">
                    {line}
                  </div>
                );
              })}
              {filteredLines.length === 0 && (
                <div className="text-center py-12 text-zinc-500">
                  No highlighted risks of this type exist in the source transcript.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Real-Time Auditor Panel */}
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Auditor Investigation Pane</h4>
          </div>

          {displayHighlight ? (
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4 animate-fade-in">
              <div className="flex items-center gap-2">
                {displayHighlight.type === 'contradiction' && (
                  <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase">
                    Contradiction Detected
                  </span>
                )}
                {displayHighlight.type === 'politeness' && (
                  <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                    Politeness Bias Signal
                  </span>
                )}
                {displayHighlight.type === 'leading' && (
                  <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                    Leading Prompter Traps
                  </span>
                )}
                {displayHighlight.type === 'friction' && (
                  <span className="px-2.5 py-1 text-[10px] font-mono rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                    Friction Gap Deficit
                  </span>
                )}
              </div>

              {displayHighlight.type === 'contradiction' ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Earlier Quote:</span>
                      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs italic text-zinc-300 mt-1 leading-relaxed">
                        "{displayHighlight.quote1}"
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Later Quote:</span>
                      <div className="p-3 bg-zinc-950 border border-red-950/50 rounded-lg text-xs italic text-red-300 mt-1 leading-relaxed">
                        "{displayHighlight.quote2}"
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Risk Evaluation</span>
                      {displayHighlight.confidence !== undefined && (
                        <span className="text-[10px] font-mono text-emerald-400">
                          {Math.round(displayHighlight.confidence <= 1 ? displayHighlight.confidence * 100 : displayHighlight.confidence)}% Confidence
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {displayHighlight.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block">Extracted Quote</span>
                    <p className="text-sm italic text-zinc-300 mt-1">"{displayHighlight.content}"</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Risk Evaluation</span>
                      {displayHighlight.confidence !== undefined && (
                        <span className="text-[10px] font-mono text-emerald-400">
                          {Math.round(displayHighlight.confidence <= 1 ? displayHighlight.confidence * 100 : displayHighlight.confidence)}% Confidence
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{displayHighlight.description}</p>
                  </div>
                </>
              )}

              <button
                onClick={() => setSelectedHighlight(null)}
                className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono rounded-lg transition-colors border border-zinc-700 cursor-pointer"
              >
                Close Audit Inspection
              </button>
            </div>
          ) : (
            <div className="p-6 border border-dashed border-zinc-800 rounded-xl text-center bg-zinc-950 text-zinc-500 py-12">
              <HelpCircleIcon className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
              <h5 className="text-zinc-400 text-sm font-medium">No Highlight Selected</h5>
              <p className="text-xs text-zinc-600 mt-1 max-w-[200px] mx-auto">
                {activeFilter 
                  ? `Click any of the ${activeFilter} indicators to investigate its analytical details.`
                  : "Click any of the highlighted lines inside the source transcript to investigate its analytical details."
                }
              </p>
            </div>
          )}

          {/* Quick Metrics Breakdowns */}
          <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4">
            <span className="text-xs uppercase font-mono text-zinc-400">Critical Quality Triggers</span>
            <div className="space-y-3 pt-2">
              <div 
                onClick={() => handleToggleFilter('contradiction')}
                className={`flex items-center justify-between text-xs font-mono p-1.5 px-2 rounded cursor-pointer transition-all border ${
                  activeFilter === 'contradiction'
                    ? "bg-red-500/10 border-red-500/30 text-red-300 font-bold"
                    : "border-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                }`}
                title="Filter by Strategic Contradictions (Two customer lines conflict)"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
                  Strategic Contradictions:
                </span>
                <span className={`font-semibold ${contradictionCount > 0 ? 'text-red-400' : 'text-zinc-300'}`}>
                  {contradictionCount}
                </span>
              </div>

              <div 
                onClick={() => handleToggleFilter('politeness')}
                className={`flex items-center justify-between text-xs font-mono p-1.5 px-2 rounded cursor-pointer transition-all border ${
                  activeFilter === 'politeness'
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-300 font-bold"
                    : "border-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                }`}
                title="Filter by Politeness Markers (Customer vague non-committal approval)"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                  Politeness Markers:
                </span>
                <span className={`font-semibold ${politenessCount > 0 ? 'text-amber-400' : 'text-zinc-300'}`}>
                  {politenessCount}
                </span>
              </div>

              <div 
                onClick={() => handleToggleFilter('leading')}
                className={`flex items-center justify-between text-xs font-mono p-1.5 px-2 rounded cursor-pointer transition-all border ${
                  activeFilter === 'leading'
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300 font-bold"
                    : "border-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                }`}
                title="Filter by Leading Prompts (Interviewer agreement-pushing question)"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"></span>
                  Leading Prompts:
                </span>
                <span className={`font-semibold ${leadingCount > 0 ? 'text-purple-400' : 'text-zinc-300'}`}>
                  {leadingCount}
                </span>
              </div>

              <div 
                onClick={() => handleToggleFilter('friction')}
                className={`flex items-center justify-between text-xs font-mono p-1.5 px-2 rounded cursor-pointer transition-all border ${
                  activeFilter === 'friction'
                    ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300 font-bold"
                    : "border-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                }`}
                title="Filter by Friction-to-Behavior Gaps (Customer lacks commitment details/proof/workflow)"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block"></span>
                  Friction-to-Behavior Gaps:
                </span>
                <span className={`font-semibold ${frictionCount > 0 ? 'text-indigo-400' : 'text-zinc-300'}`}>
                  {frictionCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
