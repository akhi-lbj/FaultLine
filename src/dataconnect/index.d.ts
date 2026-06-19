import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Analysis_Key {
  id: UUIDString;
  __typename?: 'Analysis_Key';
}

export interface CreateFeatureData {
  feature_insert: Feature_Key;
}

export interface CreateFeatureVariables {
  name: string;
  budget?: number | null;
  status: string;
}

export interface DeleteFeatureData {
  feature_delete?: Feature_Key | null;
}

export interface DeleteFeatureVariables {
  id: UUIDString;
}

export interface Feature_Key {
  id: UUIDString;
  __typename?: 'Feature_Key';
}

export interface GetPortfolioByUserData {
  features: ({
    id: UUIDString;
    name: string;
    budget?: number | null;
    status: string;
    createdAt: TimestampString;
    transcripts_on_feature: ({
      id: UUIDString;
      analyses_on_transcript: ({
        id: UUIDString;
        ffsRaw?: number | null;
        iqsRaw?: number | null;
        pFail?: number | null;
        expectedLoss?: number | null;
        recommendation?: string | null;
        confidenceScore?: number | null;
      } & Analysis_Key)[];
    } & Transcript_Key)[];
  } & Feature_Key)[];
}

export interface GetValidationRecordsData {
  validationRecords: ({
    id: UUIDString;
    actualOutcome: string;
    completedAt: TimestampString;
    feature: {
      name: string;
    };
  } & ValidationRecord_Key)[];
}

export interface InsertAnalysisData {
  analysis_insert: Analysis_Key;
}

export interface InsertAnalysisVariables {
  transcriptId: UUIDString;
  narrativeSummary?: string | null;
  ffsRaw?: number | null;
  iqsRaw?: number | null;
  pFail?: number | null;
  expectedLoss?: number | null;
  recommendation?: string | null;
  confidenceScore?: number | null;
}

export interface InsertContradictionData {
  signalContradiction_insert: SignalContradiction_Key;
}

export interface InsertContradictionVariables {
  analysisId: UUIDString;
  quote1: string;
  quote2: string;
  explanation?: string | null;
  severity?: string | null;
}

export interface InsertFrictionGapData {
  signalFrictionGap_insert: SignalFrictionGap_Key;
}

export interface InsertFrictionGapVariables {
  analysisId: UUIDString;
  statedImportance: string;
  actualBehavior: string;
  gapScore?: number | null;
}

export interface InsertLeadingQuestionData {
  signalLeadingQuestion_insert: SignalLeadingQuestion_Key;
}

export interface InsertLeadingQuestionVariables {
  analysisId: UUIDString;
  question: string;
  response: string;
  severity?: string | null;
}

export interface InsertPolitenessData {
  signalPoliteness_insert: SignalPoliteness_Key;
}

export interface InsertPolitenessVariables {
  analysisId: UUIDString;
  quote: string;
  marker: string;
  intensity?: string | null;
}

export interface InsertRecommendedActionData {
  recommendedAction_insert: RecommendedAction_Key;
}

export interface InsertRecommendedActionVariables {
  analysisId: UUIDString;
  title: string;
  description?: string | null;
  expectedRiskReduction?: number | null;
  difficulty?: string | null;
  estimatedEffortHours?: number | null;
}

export interface InsertTranscriptData {
  transcript_insert: Transcript_Key;
}

export interface InsertTranscriptVariables {
  featureId: UUIDString;
  rawText: string;
}

export interface RecommendedAction_Key {
  id: UUIDString;
  __typename?: 'RecommendedAction_Key';
}

export interface SignalContradiction_Key {
  id: UUIDString;
  __typename?: 'SignalContradiction_Key';
}

export interface SignalFrictionGap_Key {
  id: UUIDString;
  __typename?: 'SignalFrictionGap_Key';
}

export interface SignalLeadingQuestion_Key {
  id: UUIDString;
  __typename?: 'SignalLeadingQuestion_Key';
}

export interface SignalPoliteness_Key {
  id: UUIDString;
  __typename?: 'SignalPoliteness_Key';
}

export interface Transcript_Key {
  id: UUIDString;
  __typename?: 'Transcript_Key';
}

export interface UpdateFeatureData {
  feature_update?: Feature_Key | null;
}

export interface UpdateFeatureVariables {
  id: UUIDString;
  budget?: number | null;
  status?: string | null;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  email: string;
  displayName?: string | null;
  photoUrl?: string | null;
}

export interface User_Key {
  uid: string;
  __typename?: 'User_Key';
}

export interface ValidationRecord_Key {
  id: UUIDString;
  __typename?: 'ValidationRecord_Key';
}

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface CreateFeatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFeatureVariables): MutationRef<CreateFeatureData, CreateFeatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFeatureVariables): MutationRef<CreateFeatureData, CreateFeatureVariables>;
  operationName: string;
}
export const createFeatureRef: CreateFeatureRef;

export function createFeature(vars: CreateFeatureVariables): MutationPromise<CreateFeatureData, CreateFeatureVariables>;
export function createFeature(dc: DataConnect, vars: CreateFeatureVariables): MutationPromise<CreateFeatureData, CreateFeatureVariables>;

interface UpdateFeatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFeatureVariables): MutationRef<UpdateFeatureData, UpdateFeatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFeatureVariables): MutationRef<UpdateFeatureData, UpdateFeatureVariables>;
  operationName: string;
}
export const updateFeatureRef: UpdateFeatureRef;

export function updateFeature(vars: UpdateFeatureVariables): MutationPromise<UpdateFeatureData, UpdateFeatureVariables>;
export function updateFeature(dc: DataConnect, vars: UpdateFeatureVariables): MutationPromise<UpdateFeatureData, UpdateFeatureVariables>;

interface InsertTranscriptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertTranscriptVariables): MutationRef<InsertTranscriptData, InsertTranscriptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertTranscriptVariables): MutationRef<InsertTranscriptData, InsertTranscriptVariables>;
  operationName: string;
}
export const insertTranscriptRef: InsertTranscriptRef;

export function insertTranscript(vars: InsertTranscriptVariables): MutationPromise<InsertTranscriptData, InsertTranscriptVariables>;
export function insertTranscript(dc: DataConnect, vars: InsertTranscriptVariables): MutationPromise<InsertTranscriptData, InsertTranscriptVariables>;

interface InsertAnalysisRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertAnalysisVariables): MutationRef<InsertAnalysisData, InsertAnalysisVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertAnalysisVariables): MutationRef<InsertAnalysisData, InsertAnalysisVariables>;
  operationName: string;
}
export const insertAnalysisRef: InsertAnalysisRef;

export function insertAnalysis(vars: InsertAnalysisVariables): MutationPromise<InsertAnalysisData, InsertAnalysisVariables>;
export function insertAnalysis(dc: DataConnect, vars: InsertAnalysisVariables): MutationPromise<InsertAnalysisData, InsertAnalysisVariables>;

interface InsertContradictionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertContradictionVariables): MutationRef<InsertContradictionData, InsertContradictionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertContradictionVariables): MutationRef<InsertContradictionData, InsertContradictionVariables>;
  operationName: string;
}
export const insertContradictionRef: InsertContradictionRef;

export function insertContradiction(vars: InsertContradictionVariables): MutationPromise<InsertContradictionData, InsertContradictionVariables>;
export function insertContradiction(dc: DataConnect, vars: InsertContradictionVariables): MutationPromise<InsertContradictionData, InsertContradictionVariables>;

interface InsertPolitenessRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertPolitenessVariables): MutationRef<InsertPolitenessData, InsertPolitenessVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertPolitenessVariables): MutationRef<InsertPolitenessData, InsertPolitenessVariables>;
  operationName: string;
}
export const insertPolitenessRef: InsertPolitenessRef;

export function insertPoliteness(vars: InsertPolitenessVariables): MutationPromise<InsertPolitenessData, InsertPolitenessVariables>;
export function insertPoliteness(dc: DataConnect, vars: InsertPolitenessVariables): MutationPromise<InsertPolitenessData, InsertPolitenessVariables>;

interface InsertLeadingQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertLeadingQuestionVariables): MutationRef<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertLeadingQuestionVariables): MutationRef<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;
  operationName: string;
}
export const insertLeadingQuestionRef: InsertLeadingQuestionRef;

export function insertLeadingQuestion(vars: InsertLeadingQuestionVariables): MutationPromise<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;
export function insertLeadingQuestion(dc: DataConnect, vars: InsertLeadingQuestionVariables): MutationPromise<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;

interface InsertFrictionGapRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertFrictionGapVariables): MutationRef<InsertFrictionGapData, InsertFrictionGapVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertFrictionGapVariables): MutationRef<InsertFrictionGapData, InsertFrictionGapVariables>;
  operationName: string;
}
export const insertFrictionGapRef: InsertFrictionGapRef;

export function insertFrictionGap(vars: InsertFrictionGapVariables): MutationPromise<InsertFrictionGapData, InsertFrictionGapVariables>;
export function insertFrictionGap(dc: DataConnect, vars: InsertFrictionGapVariables): MutationPromise<InsertFrictionGapData, InsertFrictionGapVariables>;

interface InsertRecommendedActionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertRecommendedActionVariables): MutationRef<InsertRecommendedActionData, InsertRecommendedActionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertRecommendedActionVariables): MutationRef<InsertRecommendedActionData, InsertRecommendedActionVariables>;
  operationName: string;
}
export const insertRecommendedActionRef: InsertRecommendedActionRef;

export function insertRecommendedAction(vars: InsertRecommendedActionVariables): MutationPromise<InsertRecommendedActionData, InsertRecommendedActionVariables>;
export function insertRecommendedAction(dc: DataConnect, vars: InsertRecommendedActionVariables): MutationPromise<InsertRecommendedActionData, InsertRecommendedActionVariables>;

interface DeleteFeatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFeatureVariables): MutationRef<DeleteFeatureData, DeleteFeatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteFeatureVariables): MutationRef<DeleteFeatureData, DeleteFeatureVariables>;
  operationName: string;
}
export const deleteFeatureRef: DeleteFeatureRef;

export function deleteFeature(vars: DeleteFeatureVariables): MutationPromise<DeleteFeatureData, DeleteFeatureVariables>;
export function deleteFeature(dc: DataConnect, vars: DeleteFeatureVariables): MutationPromise<DeleteFeatureData, DeleteFeatureVariables>;

interface GetPortfolioByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPortfolioByUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPortfolioByUserData, undefined>;
  operationName: string;
}
export const getPortfolioByUserRef: GetPortfolioByUserRef;

export function getPortfolioByUser(): QueryPromise<GetPortfolioByUserData, undefined>;
export function getPortfolioByUser(dc: DataConnect): QueryPromise<GetPortfolioByUserData, undefined>;

interface GetValidationRecordsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetValidationRecordsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetValidationRecordsData, undefined>;
  operationName: string;
}
export const getValidationRecordsRef: GetValidationRecordsRef;

export function getValidationRecords(): QueryPromise<GetValidationRecordsData, undefined>;
export function getValidationRecords(dc: DataConnect): QueryPromise<GetValidationRecordsData, undefined>;

