import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'faultline',
  location: 'us-central1'
};

export const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export const createFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFeature', inputVars);
}
createFeatureRef.operationName = 'CreateFeature';

export function createFeature(dcOrVars, vars) {
  return executeMutation(createFeatureRef(dcOrVars, vars));
}

export const updateFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFeature', inputVars);
}
updateFeatureRef.operationName = 'UpdateFeature';

export function updateFeature(dcOrVars, vars) {
  return executeMutation(updateFeatureRef(dcOrVars, vars));
}

export const insertTranscriptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertTranscript', inputVars);
}
insertTranscriptRef.operationName = 'InsertTranscript';

export function insertTranscript(dcOrVars, vars) {
  return executeMutation(insertTranscriptRef(dcOrVars, vars));
}

export const insertAnalysisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertAnalysis', inputVars);
}
insertAnalysisRef.operationName = 'InsertAnalysis';

export function insertAnalysis(dcOrVars, vars) {
  return executeMutation(insertAnalysisRef(dcOrVars, vars));
}

export const insertContradictionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertContradiction', inputVars);
}
insertContradictionRef.operationName = 'InsertContradiction';

export function insertContradiction(dcOrVars, vars) {
  return executeMutation(insertContradictionRef(dcOrVars, vars));
}

export const insertPolitenessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertPoliteness', inputVars);
}
insertPolitenessRef.operationName = 'InsertPoliteness';

export function insertPoliteness(dcOrVars, vars) {
  return executeMutation(insertPolitenessRef(dcOrVars, vars));
}

export const insertLeadingQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertLeadingQuestion', inputVars);
}
insertLeadingQuestionRef.operationName = 'InsertLeadingQuestion';

export function insertLeadingQuestion(dcOrVars, vars) {
  return executeMutation(insertLeadingQuestionRef(dcOrVars, vars));
}

export const insertFrictionGapRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertFrictionGap', inputVars);
}
insertFrictionGapRef.operationName = 'InsertFrictionGap';

export function insertFrictionGap(dcOrVars, vars) {
  return executeMutation(insertFrictionGapRef(dcOrVars, vars));
}

export const insertRecommendedActionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertRecommendedAction', inputVars);
}
insertRecommendedActionRef.operationName = 'InsertRecommendedAction';

export function insertRecommendedAction(dcOrVars, vars) {
  return executeMutation(insertRecommendedActionRef(dcOrVars, vars));
}

export const deleteFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFeature', inputVars);
}
deleteFeatureRef.operationName = 'DeleteFeature';

export function deleteFeature(dcOrVars, vars) {
  return executeMutation(deleteFeatureRef(dcOrVars, vars));
}

export const getPortfolioByUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPortfolioByUser');
}
getPortfolioByUserRef.operationName = 'GetPortfolioByUser';

export function getPortfolioByUser(dc) {
  return executeQuery(getPortfolioByUserRef(dc));
}

export const getValidationRecordsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetValidationRecords');
}
getValidationRecordsRef.operationName = 'GetValidationRecords';

export function getValidationRecords(dc) {
  return executeQuery(getValidationRecordsRef(dc));
}

