# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetPortfolioByUser*](#getportfoliobyuser)
  - [*GetValidationRecords*](#getvalidationrecords)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*CreateFeature*](#createfeature)
  - [*UpdateFeature*](#updatefeature)
  - [*InsertTranscript*](#inserttranscript)
  - [*InsertAnalysis*](#insertanalysis)
  - [*InsertContradiction*](#insertcontradiction)
  - [*InsertPoliteness*](#insertpoliteness)
  - [*InsertLeadingQuestion*](#insertleadingquestion)
  - [*InsertFrictionGap*](#insertfrictiongap)
  - [*InsertRecommendedAction*](#insertrecommendedaction)
  - [*DeleteFeature*](#deletefeature)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@faultline/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@faultline/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@faultline/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetPortfolioByUser
You can execute the `GetPortfolioByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getPortfolioByUser(): QueryPromise<GetPortfolioByUserData, undefined>;

interface GetPortfolioByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPortfolioByUserData, undefined>;
}
export const getPortfolioByUserRef: GetPortfolioByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPortfolioByUser(dc: DataConnect): QueryPromise<GetPortfolioByUserData, undefined>;

interface GetPortfolioByUserRef {
  ...
  (dc: DataConnect): QueryRef<GetPortfolioByUserData, undefined>;
}
export const getPortfolioByUserRef: GetPortfolioByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPortfolioByUserRef:
```typescript
const name = getPortfolioByUserRef.operationName;
console.log(name);
```

### Variables
The `GetPortfolioByUser` query has no variables.
### Return Type
Recall that executing the `GetPortfolioByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPortfolioByUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPortfolioByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPortfolioByUser } from '@faultline/dataconnect';


// Call the `getPortfolioByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPortfolioByUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPortfolioByUser(dataConnect);

console.log(data.features);

// Or, you can use the `Promise` API.
getPortfolioByUser().then((response) => {
  const data = response.data;
  console.log(data.features);
});
```

### Using `GetPortfolioByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPortfolioByUserRef } from '@faultline/dataconnect';


// Call the `getPortfolioByUserRef()` function to get a reference to the query.
const ref = getPortfolioByUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPortfolioByUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.features);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.features);
});
```

## GetValidationRecords
You can execute the `GetValidationRecords` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getValidationRecords(): QueryPromise<GetValidationRecordsData, undefined>;

interface GetValidationRecordsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetValidationRecordsData, undefined>;
}
export const getValidationRecordsRef: GetValidationRecordsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getValidationRecords(dc: DataConnect): QueryPromise<GetValidationRecordsData, undefined>;

interface GetValidationRecordsRef {
  ...
  (dc: DataConnect): QueryRef<GetValidationRecordsData, undefined>;
}
export const getValidationRecordsRef: GetValidationRecordsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getValidationRecordsRef:
```typescript
const name = getValidationRecordsRef.operationName;
console.log(name);
```

### Variables
The `GetValidationRecords` query has no variables.
### Return Type
Recall that executing the `GetValidationRecords` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetValidationRecordsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetValidationRecords`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getValidationRecords } from '@faultline/dataconnect';


// Call the `getValidationRecords()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getValidationRecords();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getValidationRecords(dataConnect);

console.log(data.validationRecords);

// Or, you can use the `Promise` API.
getValidationRecords().then((response) => {
  const data = response.data;
  console.log(data.validationRecords);
});
```

### Using `GetValidationRecords`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getValidationRecordsRef } from '@faultline/dataconnect';


// Call the `getValidationRecordsRef()` function to get a reference to the query.
const ref = getValidationRecordsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getValidationRecordsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.validationRecords);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.validationRecords);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  email: string;
  displayName?: string | null;
  photoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@faultline/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., 
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ email: ..., displayName: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@faultline/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  email: ..., 
  displayName: ..., // optional
  photoUrl: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ email: ..., displayName: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateFeature
You can execute the `CreateFeature` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createFeature(vars: CreateFeatureVariables): MutationPromise<CreateFeatureData, CreateFeatureVariables>;

interface CreateFeatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFeatureVariables): MutationRef<CreateFeatureData, CreateFeatureVariables>;
}
export const createFeatureRef: CreateFeatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFeature(dc: DataConnect, vars: CreateFeatureVariables): MutationPromise<CreateFeatureData, CreateFeatureVariables>;

interface CreateFeatureRef {
  ...
  (dc: DataConnect, vars: CreateFeatureVariables): MutationRef<CreateFeatureData, CreateFeatureVariables>;
}
export const createFeatureRef: CreateFeatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFeatureRef:
```typescript
const name = createFeatureRef.operationName;
console.log(name);
```

### Variables
The `CreateFeature` mutation requires an argument of type `CreateFeatureVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFeatureVariables {
  name: string;
  budget?: number | null;
  status: string;
}
```
### Return Type
Recall that executing the `CreateFeature` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFeatureData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFeatureData {
  feature_insert: Feature_Key;
}
```
### Using `CreateFeature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFeature, CreateFeatureVariables } from '@faultline/dataconnect';

// The `CreateFeature` mutation requires an argument of type `CreateFeatureVariables`:
const createFeatureVars: CreateFeatureVariables = {
  name: ..., 
  budget: ..., // optional
  status: ..., 
};

// Call the `createFeature()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFeature(createFeatureVars);
// Variables can be defined inline as well.
const { data } = await createFeature({ name: ..., budget: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFeature(dataConnect, createFeatureVars);

console.log(data.feature_insert);

// Or, you can use the `Promise` API.
createFeature(createFeatureVars).then((response) => {
  const data = response.data;
  console.log(data.feature_insert);
});
```

### Using `CreateFeature`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFeatureRef, CreateFeatureVariables } from '@faultline/dataconnect';

// The `CreateFeature` mutation requires an argument of type `CreateFeatureVariables`:
const createFeatureVars: CreateFeatureVariables = {
  name: ..., 
  budget: ..., // optional
  status: ..., 
};

// Call the `createFeatureRef()` function to get a reference to the mutation.
const ref = createFeatureRef(createFeatureVars);
// Variables can be defined inline as well.
const ref = createFeatureRef({ name: ..., budget: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFeatureRef(dataConnect, createFeatureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feature_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feature_insert);
});
```

## UpdateFeature
You can execute the `UpdateFeature` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateFeature(vars: UpdateFeatureVariables): MutationPromise<UpdateFeatureData, UpdateFeatureVariables>;

interface UpdateFeatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFeatureVariables): MutationRef<UpdateFeatureData, UpdateFeatureVariables>;
}
export const updateFeatureRef: UpdateFeatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFeature(dc: DataConnect, vars: UpdateFeatureVariables): MutationPromise<UpdateFeatureData, UpdateFeatureVariables>;

interface UpdateFeatureRef {
  ...
  (dc: DataConnect, vars: UpdateFeatureVariables): MutationRef<UpdateFeatureData, UpdateFeatureVariables>;
}
export const updateFeatureRef: UpdateFeatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFeatureRef:
```typescript
const name = updateFeatureRef.operationName;
console.log(name);
```

### Variables
The `UpdateFeature` mutation requires an argument of type `UpdateFeatureVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFeatureVariables {
  id: UUIDString;
  budget?: number | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateFeature` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFeatureData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFeatureData {
  feature_update?: Feature_Key | null;
}
```
### Using `UpdateFeature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFeature, UpdateFeatureVariables } from '@faultline/dataconnect';

// The `UpdateFeature` mutation requires an argument of type `UpdateFeatureVariables`:
const updateFeatureVars: UpdateFeatureVariables = {
  id: ..., 
  budget: ..., // optional
  status: ..., // optional
};

// Call the `updateFeature()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFeature(updateFeatureVars);
// Variables can be defined inline as well.
const { data } = await updateFeature({ id: ..., budget: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFeature(dataConnect, updateFeatureVars);

console.log(data.feature_update);

// Or, you can use the `Promise` API.
updateFeature(updateFeatureVars).then((response) => {
  const data = response.data;
  console.log(data.feature_update);
});
```

### Using `UpdateFeature`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFeatureRef, UpdateFeatureVariables } from '@faultline/dataconnect';

// The `UpdateFeature` mutation requires an argument of type `UpdateFeatureVariables`:
const updateFeatureVars: UpdateFeatureVariables = {
  id: ..., 
  budget: ..., // optional
  status: ..., // optional
};

// Call the `updateFeatureRef()` function to get a reference to the mutation.
const ref = updateFeatureRef(updateFeatureVars);
// Variables can be defined inline as well.
const ref = updateFeatureRef({ id: ..., budget: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFeatureRef(dataConnect, updateFeatureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feature_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feature_update);
});
```

## InsertTranscript
You can execute the `InsertTranscript` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertTranscript(vars: InsertTranscriptVariables): MutationPromise<InsertTranscriptData, InsertTranscriptVariables>;

interface InsertTranscriptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertTranscriptVariables): MutationRef<InsertTranscriptData, InsertTranscriptVariables>;
}
export const insertTranscriptRef: InsertTranscriptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertTranscript(dc: DataConnect, vars: InsertTranscriptVariables): MutationPromise<InsertTranscriptData, InsertTranscriptVariables>;

interface InsertTranscriptRef {
  ...
  (dc: DataConnect, vars: InsertTranscriptVariables): MutationRef<InsertTranscriptData, InsertTranscriptVariables>;
}
export const insertTranscriptRef: InsertTranscriptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertTranscriptRef:
```typescript
const name = insertTranscriptRef.operationName;
console.log(name);
```

### Variables
The `InsertTranscript` mutation requires an argument of type `InsertTranscriptVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertTranscriptVariables {
  featureId: UUIDString;
  rawText: string;
}
```
### Return Type
Recall that executing the `InsertTranscript` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertTranscriptData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertTranscriptData {
  transcript_insert: Transcript_Key;
}
```
### Using `InsertTranscript`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertTranscript, InsertTranscriptVariables } from '@faultline/dataconnect';

// The `InsertTranscript` mutation requires an argument of type `InsertTranscriptVariables`:
const insertTranscriptVars: InsertTranscriptVariables = {
  featureId: ..., 
  rawText: ..., 
};

// Call the `insertTranscript()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertTranscript(insertTranscriptVars);
// Variables can be defined inline as well.
const { data } = await insertTranscript({ featureId: ..., rawText: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertTranscript(dataConnect, insertTranscriptVars);

console.log(data.transcript_insert);

// Or, you can use the `Promise` API.
insertTranscript(insertTranscriptVars).then((response) => {
  const data = response.data;
  console.log(data.transcript_insert);
});
```

### Using `InsertTranscript`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertTranscriptRef, InsertTranscriptVariables } from '@faultline/dataconnect';

// The `InsertTranscript` mutation requires an argument of type `InsertTranscriptVariables`:
const insertTranscriptVars: InsertTranscriptVariables = {
  featureId: ..., 
  rawText: ..., 
};

// Call the `insertTranscriptRef()` function to get a reference to the mutation.
const ref = insertTranscriptRef(insertTranscriptVars);
// Variables can be defined inline as well.
const ref = insertTranscriptRef({ featureId: ..., rawText: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertTranscriptRef(dataConnect, insertTranscriptVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transcript_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transcript_insert);
});
```

## InsertAnalysis
You can execute the `InsertAnalysis` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertAnalysis(vars: InsertAnalysisVariables): MutationPromise<InsertAnalysisData, InsertAnalysisVariables>;

interface InsertAnalysisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertAnalysisVariables): MutationRef<InsertAnalysisData, InsertAnalysisVariables>;
}
export const insertAnalysisRef: InsertAnalysisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertAnalysis(dc: DataConnect, vars: InsertAnalysisVariables): MutationPromise<InsertAnalysisData, InsertAnalysisVariables>;

interface InsertAnalysisRef {
  ...
  (dc: DataConnect, vars: InsertAnalysisVariables): MutationRef<InsertAnalysisData, InsertAnalysisVariables>;
}
export const insertAnalysisRef: InsertAnalysisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertAnalysisRef:
```typescript
const name = insertAnalysisRef.operationName;
console.log(name);
```

### Variables
The `InsertAnalysis` mutation requires an argument of type `InsertAnalysisVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `InsertAnalysis` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertAnalysisData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertAnalysisData {
  analysis_insert: Analysis_Key;
}
```
### Using `InsertAnalysis`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertAnalysis, InsertAnalysisVariables } from '@faultline/dataconnect';

// The `InsertAnalysis` mutation requires an argument of type `InsertAnalysisVariables`:
const insertAnalysisVars: InsertAnalysisVariables = {
  transcriptId: ..., 
  narrativeSummary: ..., // optional
  ffsRaw: ..., // optional
  iqsRaw: ..., // optional
  pFail: ..., // optional
  expectedLoss: ..., // optional
  recommendation: ..., // optional
  confidenceScore: ..., // optional
};

// Call the `insertAnalysis()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertAnalysis(insertAnalysisVars);
// Variables can be defined inline as well.
const { data } = await insertAnalysis({ transcriptId: ..., narrativeSummary: ..., ffsRaw: ..., iqsRaw: ..., pFail: ..., expectedLoss: ..., recommendation: ..., confidenceScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertAnalysis(dataConnect, insertAnalysisVars);

console.log(data.analysis_insert);

// Or, you can use the `Promise` API.
insertAnalysis(insertAnalysisVars).then((response) => {
  const data = response.data;
  console.log(data.analysis_insert);
});
```

### Using `InsertAnalysis`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertAnalysisRef, InsertAnalysisVariables } from '@faultline/dataconnect';

// The `InsertAnalysis` mutation requires an argument of type `InsertAnalysisVariables`:
const insertAnalysisVars: InsertAnalysisVariables = {
  transcriptId: ..., 
  narrativeSummary: ..., // optional
  ffsRaw: ..., // optional
  iqsRaw: ..., // optional
  pFail: ..., // optional
  expectedLoss: ..., // optional
  recommendation: ..., // optional
  confidenceScore: ..., // optional
};

// Call the `insertAnalysisRef()` function to get a reference to the mutation.
const ref = insertAnalysisRef(insertAnalysisVars);
// Variables can be defined inline as well.
const ref = insertAnalysisRef({ transcriptId: ..., narrativeSummary: ..., ffsRaw: ..., iqsRaw: ..., pFail: ..., expectedLoss: ..., recommendation: ..., confidenceScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertAnalysisRef(dataConnect, insertAnalysisVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.analysis_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.analysis_insert);
});
```

## InsertContradiction
You can execute the `InsertContradiction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertContradiction(vars: InsertContradictionVariables): MutationPromise<InsertContradictionData, InsertContradictionVariables>;

interface InsertContradictionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertContradictionVariables): MutationRef<InsertContradictionData, InsertContradictionVariables>;
}
export const insertContradictionRef: InsertContradictionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertContradiction(dc: DataConnect, vars: InsertContradictionVariables): MutationPromise<InsertContradictionData, InsertContradictionVariables>;

interface InsertContradictionRef {
  ...
  (dc: DataConnect, vars: InsertContradictionVariables): MutationRef<InsertContradictionData, InsertContradictionVariables>;
}
export const insertContradictionRef: InsertContradictionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertContradictionRef:
```typescript
const name = insertContradictionRef.operationName;
console.log(name);
```

### Variables
The `InsertContradiction` mutation requires an argument of type `InsertContradictionVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertContradictionVariables {
  analysisId: UUIDString;
  quote1: string;
  quote2: string;
  explanation?: string | null;
  severity?: string | null;
}
```
### Return Type
Recall that executing the `InsertContradiction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertContradictionData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertContradictionData {
  signalContradiction_insert: SignalContradiction_Key;
}
```
### Using `InsertContradiction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertContradiction, InsertContradictionVariables } from '@faultline/dataconnect';

// The `InsertContradiction` mutation requires an argument of type `InsertContradictionVariables`:
const insertContradictionVars: InsertContradictionVariables = {
  analysisId: ..., 
  quote1: ..., 
  quote2: ..., 
  explanation: ..., // optional
  severity: ..., // optional
};

// Call the `insertContradiction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertContradiction(insertContradictionVars);
// Variables can be defined inline as well.
const { data } = await insertContradiction({ analysisId: ..., quote1: ..., quote2: ..., explanation: ..., severity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertContradiction(dataConnect, insertContradictionVars);

console.log(data.signalContradiction_insert);

// Or, you can use the `Promise` API.
insertContradiction(insertContradictionVars).then((response) => {
  const data = response.data;
  console.log(data.signalContradiction_insert);
});
```

### Using `InsertContradiction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertContradictionRef, InsertContradictionVariables } from '@faultline/dataconnect';

// The `InsertContradiction` mutation requires an argument of type `InsertContradictionVariables`:
const insertContradictionVars: InsertContradictionVariables = {
  analysisId: ..., 
  quote1: ..., 
  quote2: ..., 
  explanation: ..., // optional
  severity: ..., // optional
};

// Call the `insertContradictionRef()` function to get a reference to the mutation.
const ref = insertContradictionRef(insertContradictionVars);
// Variables can be defined inline as well.
const ref = insertContradictionRef({ analysisId: ..., quote1: ..., quote2: ..., explanation: ..., severity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertContradictionRef(dataConnect, insertContradictionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.signalContradiction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.signalContradiction_insert);
});
```

## InsertPoliteness
You can execute the `InsertPoliteness` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertPoliteness(vars: InsertPolitenessVariables): MutationPromise<InsertPolitenessData, InsertPolitenessVariables>;

interface InsertPolitenessRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertPolitenessVariables): MutationRef<InsertPolitenessData, InsertPolitenessVariables>;
}
export const insertPolitenessRef: InsertPolitenessRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertPoliteness(dc: DataConnect, vars: InsertPolitenessVariables): MutationPromise<InsertPolitenessData, InsertPolitenessVariables>;

interface InsertPolitenessRef {
  ...
  (dc: DataConnect, vars: InsertPolitenessVariables): MutationRef<InsertPolitenessData, InsertPolitenessVariables>;
}
export const insertPolitenessRef: InsertPolitenessRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertPolitenessRef:
```typescript
const name = insertPolitenessRef.operationName;
console.log(name);
```

### Variables
The `InsertPoliteness` mutation requires an argument of type `InsertPolitenessVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertPolitenessVariables {
  analysisId: UUIDString;
  quote: string;
  marker: string;
  intensity?: string | null;
}
```
### Return Type
Recall that executing the `InsertPoliteness` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertPolitenessData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertPolitenessData {
  signalPoliteness_insert: SignalPoliteness_Key;
}
```
### Using `InsertPoliteness`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertPoliteness, InsertPolitenessVariables } from '@faultline/dataconnect';

// The `InsertPoliteness` mutation requires an argument of type `InsertPolitenessVariables`:
const insertPolitenessVars: InsertPolitenessVariables = {
  analysisId: ..., 
  quote: ..., 
  marker: ..., 
  intensity: ..., // optional
};

// Call the `insertPoliteness()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertPoliteness(insertPolitenessVars);
// Variables can be defined inline as well.
const { data } = await insertPoliteness({ analysisId: ..., quote: ..., marker: ..., intensity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertPoliteness(dataConnect, insertPolitenessVars);

console.log(data.signalPoliteness_insert);

// Or, you can use the `Promise` API.
insertPoliteness(insertPolitenessVars).then((response) => {
  const data = response.data;
  console.log(data.signalPoliteness_insert);
});
```

### Using `InsertPoliteness`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertPolitenessRef, InsertPolitenessVariables } from '@faultline/dataconnect';

// The `InsertPoliteness` mutation requires an argument of type `InsertPolitenessVariables`:
const insertPolitenessVars: InsertPolitenessVariables = {
  analysisId: ..., 
  quote: ..., 
  marker: ..., 
  intensity: ..., // optional
};

// Call the `insertPolitenessRef()` function to get a reference to the mutation.
const ref = insertPolitenessRef(insertPolitenessVars);
// Variables can be defined inline as well.
const ref = insertPolitenessRef({ analysisId: ..., quote: ..., marker: ..., intensity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertPolitenessRef(dataConnect, insertPolitenessVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.signalPoliteness_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.signalPoliteness_insert);
});
```

## InsertLeadingQuestion
You can execute the `InsertLeadingQuestion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertLeadingQuestion(vars: InsertLeadingQuestionVariables): MutationPromise<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;

interface InsertLeadingQuestionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertLeadingQuestionVariables): MutationRef<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;
}
export const insertLeadingQuestionRef: InsertLeadingQuestionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertLeadingQuestion(dc: DataConnect, vars: InsertLeadingQuestionVariables): MutationPromise<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;

interface InsertLeadingQuestionRef {
  ...
  (dc: DataConnect, vars: InsertLeadingQuestionVariables): MutationRef<InsertLeadingQuestionData, InsertLeadingQuestionVariables>;
}
export const insertLeadingQuestionRef: InsertLeadingQuestionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertLeadingQuestionRef:
```typescript
const name = insertLeadingQuestionRef.operationName;
console.log(name);
```

### Variables
The `InsertLeadingQuestion` mutation requires an argument of type `InsertLeadingQuestionVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertLeadingQuestionVariables {
  analysisId: UUIDString;
  question: string;
  response: string;
  severity?: string | null;
}
```
### Return Type
Recall that executing the `InsertLeadingQuestion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertLeadingQuestionData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertLeadingQuestionData {
  signalLeadingQuestion_insert: SignalLeadingQuestion_Key;
}
```
### Using `InsertLeadingQuestion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertLeadingQuestion, InsertLeadingQuestionVariables } from '@faultline/dataconnect';

// The `InsertLeadingQuestion` mutation requires an argument of type `InsertLeadingQuestionVariables`:
const insertLeadingQuestionVars: InsertLeadingQuestionVariables = {
  analysisId: ..., 
  question: ..., 
  response: ..., 
  severity: ..., // optional
};

// Call the `insertLeadingQuestion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertLeadingQuestion(insertLeadingQuestionVars);
// Variables can be defined inline as well.
const { data } = await insertLeadingQuestion({ analysisId: ..., question: ..., response: ..., severity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertLeadingQuestion(dataConnect, insertLeadingQuestionVars);

console.log(data.signalLeadingQuestion_insert);

// Or, you can use the `Promise` API.
insertLeadingQuestion(insertLeadingQuestionVars).then((response) => {
  const data = response.data;
  console.log(data.signalLeadingQuestion_insert);
});
```

### Using `InsertLeadingQuestion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertLeadingQuestionRef, InsertLeadingQuestionVariables } from '@faultline/dataconnect';

// The `InsertLeadingQuestion` mutation requires an argument of type `InsertLeadingQuestionVariables`:
const insertLeadingQuestionVars: InsertLeadingQuestionVariables = {
  analysisId: ..., 
  question: ..., 
  response: ..., 
  severity: ..., // optional
};

// Call the `insertLeadingQuestionRef()` function to get a reference to the mutation.
const ref = insertLeadingQuestionRef(insertLeadingQuestionVars);
// Variables can be defined inline as well.
const ref = insertLeadingQuestionRef({ analysisId: ..., question: ..., response: ..., severity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertLeadingQuestionRef(dataConnect, insertLeadingQuestionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.signalLeadingQuestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.signalLeadingQuestion_insert);
});
```

## InsertFrictionGap
You can execute the `InsertFrictionGap` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertFrictionGap(vars: InsertFrictionGapVariables): MutationPromise<InsertFrictionGapData, InsertFrictionGapVariables>;

interface InsertFrictionGapRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertFrictionGapVariables): MutationRef<InsertFrictionGapData, InsertFrictionGapVariables>;
}
export const insertFrictionGapRef: InsertFrictionGapRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertFrictionGap(dc: DataConnect, vars: InsertFrictionGapVariables): MutationPromise<InsertFrictionGapData, InsertFrictionGapVariables>;

interface InsertFrictionGapRef {
  ...
  (dc: DataConnect, vars: InsertFrictionGapVariables): MutationRef<InsertFrictionGapData, InsertFrictionGapVariables>;
}
export const insertFrictionGapRef: InsertFrictionGapRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertFrictionGapRef:
```typescript
const name = insertFrictionGapRef.operationName;
console.log(name);
```

### Variables
The `InsertFrictionGap` mutation requires an argument of type `InsertFrictionGapVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertFrictionGapVariables {
  analysisId: UUIDString;
  statedImportance: string;
  actualBehavior: string;
  gapScore?: number | null;
}
```
### Return Type
Recall that executing the `InsertFrictionGap` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertFrictionGapData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertFrictionGapData {
  signalFrictionGap_insert: SignalFrictionGap_Key;
}
```
### Using `InsertFrictionGap`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertFrictionGap, InsertFrictionGapVariables } from '@faultline/dataconnect';

// The `InsertFrictionGap` mutation requires an argument of type `InsertFrictionGapVariables`:
const insertFrictionGapVars: InsertFrictionGapVariables = {
  analysisId: ..., 
  statedImportance: ..., 
  actualBehavior: ..., 
  gapScore: ..., // optional
};

// Call the `insertFrictionGap()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertFrictionGap(insertFrictionGapVars);
// Variables can be defined inline as well.
const { data } = await insertFrictionGap({ analysisId: ..., statedImportance: ..., actualBehavior: ..., gapScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertFrictionGap(dataConnect, insertFrictionGapVars);

console.log(data.signalFrictionGap_insert);

// Or, you can use the `Promise` API.
insertFrictionGap(insertFrictionGapVars).then((response) => {
  const data = response.data;
  console.log(data.signalFrictionGap_insert);
});
```

### Using `InsertFrictionGap`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertFrictionGapRef, InsertFrictionGapVariables } from '@faultline/dataconnect';

// The `InsertFrictionGap` mutation requires an argument of type `InsertFrictionGapVariables`:
const insertFrictionGapVars: InsertFrictionGapVariables = {
  analysisId: ..., 
  statedImportance: ..., 
  actualBehavior: ..., 
  gapScore: ..., // optional
};

// Call the `insertFrictionGapRef()` function to get a reference to the mutation.
const ref = insertFrictionGapRef(insertFrictionGapVars);
// Variables can be defined inline as well.
const ref = insertFrictionGapRef({ analysisId: ..., statedImportance: ..., actualBehavior: ..., gapScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertFrictionGapRef(dataConnect, insertFrictionGapVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.signalFrictionGap_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.signalFrictionGap_insert);
});
```

## InsertRecommendedAction
You can execute the `InsertRecommendedAction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertRecommendedAction(vars: InsertRecommendedActionVariables): MutationPromise<InsertRecommendedActionData, InsertRecommendedActionVariables>;

interface InsertRecommendedActionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertRecommendedActionVariables): MutationRef<InsertRecommendedActionData, InsertRecommendedActionVariables>;
}
export const insertRecommendedActionRef: InsertRecommendedActionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertRecommendedAction(dc: DataConnect, vars: InsertRecommendedActionVariables): MutationPromise<InsertRecommendedActionData, InsertRecommendedActionVariables>;

interface InsertRecommendedActionRef {
  ...
  (dc: DataConnect, vars: InsertRecommendedActionVariables): MutationRef<InsertRecommendedActionData, InsertRecommendedActionVariables>;
}
export const insertRecommendedActionRef: InsertRecommendedActionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertRecommendedActionRef:
```typescript
const name = insertRecommendedActionRef.operationName;
console.log(name);
```

### Variables
The `InsertRecommendedAction` mutation requires an argument of type `InsertRecommendedActionVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertRecommendedActionVariables {
  analysisId: UUIDString;
  title: string;
  description?: string | null;
  expectedRiskReduction?: number | null;
  difficulty?: string | null;
  estimatedEffortHours?: number | null;
}
```
### Return Type
Recall that executing the `InsertRecommendedAction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertRecommendedActionData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertRecommendedActionData {
  recommendedAction_insert: RecommendedAction_Key;
}
```
### Using `InsertRecommendedAction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertRecommendedAction, InsertRecommendedActionVariables } from '@faultline/dataconnect';

// The `InsertRecommendedAction` mutation requires an argument of type `InsertRecommendedActionVariables`:
const insertRecommendedActionVars: InsertRecommendedActionVariables = {
  analysisId: ..., 
  title: ..., 
  description: ..., // optional
  expectedRiskReduction: ..., // optional
  difficulty: ..., // optional
  estimatedEffortHours: ..., // optional
};

// Call the `insertRecommendedAction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertRecommendedAction(insertRecommendedActionVars);
// Variables can be defined inline as well.
const { data } = await insertRecommendedAction({ analysisId: ..., title: ..., description: ..., expectedRiskReduction: ..., difficulty: ..., estimatedEffortHours: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertRecommendedAction(dataConnect, insertRecommendedActionVars);

console.log(data.recommendedAction_insert);

// Or, you can use the `Promise` API.
insertRecommendedAction(insertRecommendedActionVars).then((response) => {
  const data = response.data;
  console.log(data.recommendedAction_insert);
});
```

### Using `InsertRecommendedAction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertRecommendedActionRef, InsertRecommendedActionVariables } from '@faultline/dataconnect';

// The `InsertRecommendedAction` mutation requires an argument of type `InsertRecommendedActionVariables`:
const insertRecommendedActionVars: InsertRecommendedActionVariables = {
  analysisId: ..., 
  title: ..., 
  description: ..., // optional
  expectedRiskReduction: ..., // optional
  difficulty: ..., // optional
  estimatedEffortHours: ..., // optional
};

// Call the `insertRecommendedActionRef()` function to get a reference to the mutation.
const ref = insertRecommendedActionRef(insertRecommendedActionVars);
// Variables can be defined inline as well.
const ref = insertRecommendedActionRef({ analysisId: ..., title: ..., description: ..., expectedRiskReduction: ..., difficulty: ..., estimatedEffortHours: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertRecommendedActionRef(dataConnect, insertRecommendedActionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.recommendedAction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.recommendedAction_insert);
});
```

## DeleteFeature
You can execute the `DeleteFeature` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteFeature(vars: DeleteFeatureVariables): MutationPromise<DeleteFeatureData, DeleteFeatureVariables>;

interface DeleteFeatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteFeatureVariables): MutationRef<DeleteFeatureData, DeleteFeatureVariables>;
}
export const deleteFeatureRef: DeleteFeatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteFeature(dc: DataConnect, vars: DeleteFeatureVariables): MutationPromise<DeleteFeatureData, DeleteFeatureVariables>;

interface DeleteFeatureRef {
  ...
  (dc: DataConnect, vars: DeleteFeatureVariables): MutationRef<DeleteFeatureData, DeleteFeatureVariables>;
}
export const deleteFeatureRef: DeleteFeatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteFeatureRef:
```typescript
const name = deleteFeatureRef.operationName;
console.log(name);
```

### Variables
The `DeleteFeature` mutation requires an argument of type `DeleteFeatureVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteFeatureVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteFeature` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteFeatureData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteFeatureData {
  feature_delete?: Feature_Key | null;
}
```
### Using `DeleteFeature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteFeature, DeleteFeatureVariables } from '@faultline/dataconnect';

// The `DeleteFeature` mutation requires an argument of type `DeleteFeatureVariables`:
const deleteFeatureVars: DeleteFeatureVariables = {
  id: ..., 
};

// Call the `deleteFeature()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteFeature(deleteFeatureVars);
// Variables can be defined inline as well.
const { data } = await deleteFeature({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteFeature(dataConnect, deleteFeatureVars);

console.log(data.feature_delete);

// Or, you can use the `Promise` API.
deleteFeature(deleteFeatureVars).then((response) => {
  const data = response.data;
  console.log(data.feature_delete);
});
```

### Using `DeleteFeature`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteFeatureRef, DeleteFeatureVariables } from '@faultline/dataconnect';

// The `DeleteFeature` mutation requires an argument of type `DeleteFeatureVariables`:
const deleteFeatureVars: DeleteFeatureVariables = {
  id: ..., 
};

// Call the `deleteFeatureRef()` function to get a reference to the mutation.
const ref = deleteFeatureRef(deleteFeatureVars);
// Variables can be defined inline as well.
const ref = deleteFeatureRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteFeatureRef(dataConnect, deleteFeatureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.feature_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.feature_delete);
});
```

