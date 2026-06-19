import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

if (getApps().length === 0) {
  const serviceAccount = JSON.parse(fs.readFileSync("project-2-490908-firebase-adminsdk-fbsvc-91fa919bde.json", "utf-8"));
  initializeApp({ credential: cert(serviceAccount) });
}

const adminDc = getDataConnect({ serviceId: "faultline", location: "us-central1", connector: "default" });

async function cleanup() {
  console.log(`Scanning Data Connect for orphaned users...`);
  
  const query = `query { users { uid email } }`;
  const res = await adminDc.executeGraphql(query);
  
  if (res.data && res.data.users) {
    for (const u of res.data.users) {
      let isOrphaned = false;
      try {
        await getAuth().getUser(u.uid);
      } catch (err: any) {
        if (err.code === 'auth/user-not-found') {
          isOrphaned = true;
        }
      }

      if (isOrphaned) {
        console.log(`Found orphaned UID: ${u.uid} (${u.email})`);
        
        const fRes = await adminDc.executeGraphql(`query { features(where: { user: { uid: { eq: "${u.uid}" } } }) { id } }`);
        if (fRes.data && fRes.data.features) {
           for (const f of fRes.data.features) {
               const tResult = await adminDc.executeGraphql(`query { transcripts(where: { featureId: { eq: "${f.id}" } }) { id } }`);
               if (tResult.data && tResult.data.transcripts) {
                  for (const t of tResult.data.transcripts) {
                      const aResult = await adminDc.executeGraphql(`query { analyses(where: { transcriptId: { eq: "${t.id}" } }) { id } }`);
                      if (aResult.data && aResult.data.analyses) {
                         for (const a of aResult.data.analyses) {
                            await adminDc.executeGraphql(`mutation { signalContradiction_deleteMany(where: { analysisId: { eq: "${a.id}" } }) }`);
                            await adminDc.executeGraphql(`mutation { signalPoliteness_deleteMany(where: { analysisId: { eq: "${a.id}" } }) }`);
                            await adminDc.executeGraphql(`mutation { signalLeadingQuestion_deleteMany(where: { analysisId: { eq: "${a.id}" } }) }`);
                            await adminDc.executeGraphql(`mutation { signalFrictionGap_deleteMany(where: { analysisId: { eq: "${a.id}" } }) }`);
                            await adminDc.executeGraphql(`mutation { recommendedAction_deleteMany(where: { analysisId: { eq: "${a.id}" } }) }`);
                            await adminDc.executeGraphql(`mutation { analysis_delete(key: { id: "${a.id}" }) }`);
                         }
                      }
                      await adminDc.executeGraphql(`mutation { transcript_delete(key: { id: "${t.id}" }) }`);
                  }
               }
               await adminDc.executeGraphql(`mutation { validationRecord_deleteMany(where: { featureId: { eq: "${f.id}" } }) }`);
               await adminDc.executeGraphql(`mutation { feature_delete(key: { id: "${f.id}" }) }`);
           }
        }
        
        const wRes = await adminDc.executeGraphql(`mutation { user_delete(key: { uid: "${u.uid}" }) }`);
        if (wRes.errors) {
          console.error("Failed to delete user row:", wRes.errors);
        } else {
          console.log(`Successfully deleted orphaned user ${u.uid}`);
        }
      }
    }
  }
  console.log("Cleanup complete.");
}

cleanup().catch(console.error);
