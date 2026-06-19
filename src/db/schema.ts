import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, real, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firebaseUid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const features = pgTable('features', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  budget: real('budget'),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const transcripts = pgTable('transcripts', {
  id: serial('id').primaryKey(),
  featureId: integer('feature_id').references(() => features.id).notNull(),
  rawText: text('raw_text').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const analyses = pgTable('analyses', {
  id: serial('id').primaryKey(),
  transcriptId: integer('transcript_id').references(() => transcripts.id).notNull(),
  narrativeSummary: text('narrative_summary'),
  ffsRaw: real('ffs_raw'),
  iqsRaw: real('iqs_raw'),
  pFail: real('p_fail'),
  expectedLoss: real('expected_loss'),
  recommendation: text('recommendation'),
  confidenceScore: real('confidence_score'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const signalsContradictions = pgTable('signals_contradictions', {
  id: serial('id').primaryKey(),
  analysisId: integer('analysis_id').references(() => analyses.id).notNull(),
  quote1: text('quote1').notNull(),
  quote2: text('quote2').notNull(),
  explanation: text('explanation'),
  severity: text('severity'),
});

export const signalsPoliteness = pgTable('signals_politeness', {
  id: serial('id').primaryKey(),
  analysisId: integer('analysis_id').references(() => analyses.id).notNull(),
  quote: text('quote').notNull(),
  marker: text('marker').notNull(),
  intensity: text('intensity'),
});

export const signalsLeadingQuestions = pgTable('signals_leading_questions', {
  id: serial('id').primaryKey(),
  analysisId: integer('analysis_id').references(() => analyses.id).notNull(),
  question: text('question').notNull(),
  response: text('response').notNull(),
  severity: text('severity'),
});

export const signalsFrictionGaps = pgTable('signals_friction_gaps', {
  id: serial('id').primaryKey(),
  analysisId: integer('analysis_id').references(() => analyses.id).notNull(),
  statedImportance: text('stated_importance').notNull(),
  actualBehavior: text('actual_behavior').notNull(),
  gapScore: integer('gap_score'),
});

export const recommendedActions = pgTable('recommended_actions', {
  id: serial('id').primaryKey(),
  analysisId: integer('analysis_id').references(() => analyses.id).notNull(),
  title: text('action').notNull(),
  description: text('description'),
  expectedRiskReduction: real('expected_risk_reduction'),
  difficulty: text('difficulty'),
  estimatedEffortHours: integer('estimated_effort_hours'),
});

export const validationRecords = pgTable('validation_records', {
  id: serial('id').primaryKey(),
  featureId: integer('feature_id').references(() => features.id).notNull(),
  actualOutcome: text('actual_outcome').notNull(),
  completedAt: timestamp('completed_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  features: many(features),
}));

export const featuresRelations = relations(features, ({ one, many }) => ({
  user: one(users, {
    fields: [features.userId],
    references: [users.id],
  }),
  transcripts: many(transcripts),
  validationRecords: many(validationRecords),
}));

export const transcriptsRelations = relations(transcripts, ({ one, many }) => ({
  feature: one(features, {
    fields: [transcripts.featureId],
    references: [features.id],
  }),
  analyses: many(analyses),
}));

export const analysesRelations = relations(analyses, ({ one, many }) => ({
  transcript: one(transcripts, {
    fields: [analyses.transcriptId],
    references: [transcripts.id],
  }),
  signalsContradictions: many(signalsContradictions),
  signalsPoliteness: many(signalsPoliteness),
  signalsLeadingQuestions: many(signalsLeadingQuestions),
  signalsFrictionGaps: many(signalsFrictionGaps),
  recommendedActions: many(recommendedActions),
}));

export const signalsContradictionsRelations = relations(signalsContradictions, ({ one }) => ({
  analysis: one(analyses, {
    fields: [signalsContradictions.analysisId],
    references: [analyses.id],
  }),
}));

export const signalsPolitenessRelations = relations(signalsPoliteness, ({ one }) => ({
  analysis: one(analyses, {
    fields: [signalsPoliteness.analysisId],
    references: [analyses.id],
  }),
}));

export const signalsLeadingQuestionsRelations = relations(signalsLeadingQuestions, ({ one }) => ({
  analysis: one(analyses, {
    fields: [signalsLeadingQuestions.analysisId],
    references: [analyses.id],
  }),
}));

export const signalsFrictionGapsRelations = relations(signalsFrictionGaps, ({ one }) => ({
  analysis: one(analyses, {
    fields: [signalsFrictionGaps.analysisId],
    references: [analyses.id],
  }),
}));

export const recommendedActionsRelations = relations(recommendedActions, ({ one }) => ({
  analysis: one(analyses, {
    fields: [recommendedActions.analysisId],
    references: [analyses.id],
  }),
}));

export const validationRecordsRelations = relations(validationRecords, ({ one }) => ({
  feature: one(features, {
    fields: [validationRecords.featureId],
    references: [features.id],
  }),
}));

export const accountActionTokens = pgTable('account_action_tokens', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull(),
  tokenHash: text('token_hash').notNull().unique(),
  tokenType: text('token_type').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  usedAt: timestamp('used_at', { withTimezone: true }),
  requestedIp: text('requested_ip'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
