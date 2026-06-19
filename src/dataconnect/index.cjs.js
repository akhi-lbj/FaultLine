const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'faultline',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};

const createFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFeature', inputVars);
}
createFeatureRef.operationName = 'CreateFeature';
exports.createFeatureRef = createFeatureRef;

exports.createFeature = function createFeature(dcOrVars, vars) {
  return executeMutation(createFeatureRef(dcOrVars, vars));
};

const updateFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFeature', inputVars);
}
updateFeatureRef.operationName = 'UpdateFeature';
exports.updateFeatureRef = updateFeatureRef;

exports.updateFeature = function updateFeature(dcOrVars, vars) {
  return executeMutation(updateFeatureRef(dcOrVars, vars));
};

const insertTranscriptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertTranscript', inputVars);
}
insertTranscriptRef.operationName = 'InsertTranscript';
exports.insertTranscriptRef = insertTranscriptRef;

exports.insertTranscript = function insertTranscript(dcOrVars, vars) {
  return executeMutation(insertTranscriptRef(dcOrVars, vars));
};

const insertAnalysisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertAnalysis', inputVars);
}
insertAnalysisRef.operationName = 'InsertAnalysis';
exports.insertAnalysisRef = insertAnalysisRef;

exports.insertAnalysis = function insertAnalysis(dcOrVars, vars) {
  return executeMutation(insertAnalysisRef(dcOrVars, vars));
};

const insertContradictionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertContradiction', inputVars);
}
insertContradictionRef.operationName = 'InsertContradiction';
exports.insertContradictionRef = insertContradictionRef;

exports.insertContradiction = function insertContradiction(dcOrVars, vars) {
  return executeMutation(insertContradictionRef(dcOrVars, vars));
};

const insertPolitenessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertPoliteness', inputVars);
}
insertPolitenessRef.operationName = 'InsertPoliteness';
exports.insertPolitenessRef = insertPolitenessRef;

exports.insertPoliteness = function insertPoliteness(dcOrVars, vars) {
  return executeMutation(insertPolitenessRef(dcOrVars, vars));
};

const insertLeadingQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertLeadingQuestion', inputVars);
}
insertLeadingQuestionRef.operationName = 'InsertLeadingQuestion';
exports.insertLeadingQuestionRef = insertLeadingQuestionRef;

exports.insertLeadingQuestion = function insertLeadingQuestion(dcOrVars, vars) {
  return executeMutation(insertLeadingQuestionRef(dcOrVars, vars));
};

const insertFrictionGapRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertFrictionGap', inputVars);
}
insertFrictionGapRef.operationName = 'InsertFrictionGap';
exports.insertFrictionGapRef = insertFrictionGapRef;

exports.insertFrictionGap = function insertFrictionGap(dcOrVars, vars) {
  return executeMutation(insertFrictionGapRef(dcOrVars, vars));
};

const insertRecommendedActionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertRecommendedAction', inputVars);
}
insertRecommendedActionRef.operationName = 'InsertRecommendedAction';
exports.insertRecommendedActionRef = insertRecommendedActionRef;

exports.insertRecommendedAction = function insertRecommendedAction(dcOrVars, vars) {
  return executeMutation(insertRecommendedActionRef(dcOrVars, vars));
};

const deleteFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFeature', inputVars);
}
deleteFeatureRef.operationName = 'DeleteFeature';
exports.deleteFeatureRef = deleteFeatureRef;

exports.deleteFeature = function deleteFeature(dcOrVars, vars) {
  return executeMutation(deleteFeatureRef(dcOrVars, vars));
};

const getPortfolioByUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPortfolioByUser');
}
getPortfolioByUserRef.operationName = 'GetPortfolioByUser';
exports.getPortfolioByUserRef = getPortfolioByUserRef;

exports.getPortfolioByUser = function getPortfolioByUser(dc) {
  return executeQuery(getPortfolioByUserRef(dc));
};

const getValidationRecordsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetValidationRecords');
}
getValidationRecordsRef.operationName = 'GetValidationRecords';
exports.getValidationRecordsRef = getValidationRecordsRef;

exports.getValidationRecords = function getValidationRecords(dc) {
  return executeQuery(getValidationRecordsRef(dc));
};
