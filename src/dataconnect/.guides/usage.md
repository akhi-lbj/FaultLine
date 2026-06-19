# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { upsertUser, createFeature, updateFeature, insertTranscript, insertAnalysis, insertContradiction, insertPoliteness, insertLeadingQuestion, insertFrictionGap, insertRecommendedAction } from '@faultline/dataconnect';


// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation CreateFeature:  For variables, look at type CreateFeatureVars in ../index.d.ts
const { data } = await CreateFeature(dataConnect, createFeatureVars);

// Operation UpdateFeature:  For variables, look at type UpdateFeatureVars in ../index.d.ts
const { data } = await UpdateFeature(dataConnect, updateFeatureVars);

// Operation InsertTranscript:  For variables, look at type InsertTranscriptVars in ../index.d.ts
const { data } = await InsertTranscript(dataConnect, insertTranscriptVars);

// Operation InsertAnalysis:  For variables, look at type InsertAnalysisVars in ../index.d.ts
const { data } = await InsertAnalysis(dataConnect, insertAnalysisVars);

// Operation InsertContradiction:  For variables, look at type InsertContradictionVars in ../index.d.ts
const { data } = await InsertContradiction(dataConnect, insertContradictionVars);

// Operation InsertPoliteness:  For variables, look at type InsertPolitenessVars in ../index.d.ts
const { data } = await InsertPoliteness(dataConnect, insertPolitenessVars);

// Operation InsertLeadingQuestion:  For variables, look at type InsertLeadingQuestionVars in ../index.d.ts
const { data } = await InsertLeadingQuestion(dataConnect, insertLeadingQuestionVars);

// Operation InsertFrictionGap:  For variables, look at type InsertFrictionGapVars in ../index.d.ts
const { data } = await InsertFrictionGap(dataConnect, insertFrictionGapVars);

// Operation InsertRecommendedAction:  For variables, look at type InsertRecommendedActionVars in ../index.d.ts
const { data } = await InsertRecommendedAction(dataConnect, insertRecommendedActionVars);


```