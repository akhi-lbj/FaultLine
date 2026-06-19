export interface ContradictionSignal {
  id: string;
  quote1: string;
  quote2: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
  type?: string;
  quote?: string;
  speaker?: string;
  reason?: string;
  confidence?: number;
}

export interface PolitenessSignal {
  id: string;
  quote: string;
  marker: string; // e.g., "Sounds interesting", "Yeah, nice"
  explanation: string;
  intensity: 'weak' | 'moderate' | 'strong';
  type?: string;
  speaker?: string;
  reason?: string;
  confidence?: number;
}

export interface LeadingQuestionSignal {
  id: string;
  question: string;
  response: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
  type?: string;
  quote?: string;
  speaker?: string;
  reason?: string;
  confidence?: number;
}

export interface FrictionGapSignal {
  id: string;
  statedImportance: string;
  actualBehaviorOrLackThereof: string;
  explanation: string;
  gapScore: number; // 1-10
  type?: string;
  quote?: string;
  speaker?: string;
  reason?: string;
  confidence?: number;
}

export interface RecommendedAction {
  id: string;
  action: string; // e.g., "Interview 5 additional admins"
  description: string;
  expectedRiskReduction: number; // e.g. 0.31 (31%)
  difficulty: 'low' | 'medium' | 'high';
  estimatedEffortHours: number;
}

export interface TranscriptAnalysis {
  id: string;
  userId?: string;
  featureName: string;
  transcriptText: string;
  contradictions: ContradictionSignal[];
  politenessBiases: PolitenessSignal[];
  leadingQuestions: LeadingQuestionSignal[];
  frictionGaps: FrictionGapSignal[];
  confidenceScore: number; // 0-100 indicating extraction confidence
  ffsRaw: number; // Feature Fragility Score (0-100)
  iqsRaw: number; // Interview Quality Score (0-100)
  pFail: number; // Calibrated probability of failure (0.0 - 1.0)
  narrativeSummary: string;
  recommendedNextActions: RecommendedAction[];
  budget: number;
  expectedLoss: number;
  recommendation: 'VALIDATED_BUILD' | 'PILOT_RECOMMENDED' | 'CONDITIONAL_REVIEW' | 'HALT_ALLOCATION';
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  userId?: string;
  featureName: string;
  ffsRaw: number;
  iqsRaw: number;
  pFail: number;
  budget: number;
  expectedLoss: number;
  recommendation: 'VALIDATED_BUILD' | 'PILOT_RECOMMENDED' | 'CONDITIONAL_REVIEW' | 'HALT_ALLOCATION';
  status: 'InDiscovery' | 'Reviewing' | 'Committed' | 'Halted' | 'Launched_Success' | 'Launched_Failure';
}

export interface ValidationRecord {
  id: string;
  userId?: string;
  featureName: string;
  ffsRaw: number;
  iqsRaw: number;
  pFail: number;
  budget: number;
  actualOutcome: 'SUCCESS' | 'FAILURE' | 'ABANDONED';
  completedAt: string;
}

export interface ValidationMetrics {
  confusionMatrix: {
    truePositive: number;  // Predicted fail, actually failed
    falsePositive: number; // Predicted fail, actually succeeded
    trueNegative: number;  // Predicted success, actually succeeded
    falseNegative: number; // Predicted success, actually failed
  };
  brierScore: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocArea: number;
}

// Default Platt Scaling configuration
export interface CalibrationConfig {
  coefficientA: number; // Default -0.08
  coefficientB: number; // Default 3.5
}
