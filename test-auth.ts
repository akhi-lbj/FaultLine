import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as dotenv from "dotenv";

dotenv.config();

console.log("PROJECT ID:", process.env.FIREBASE_PROJECT_ID);
initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });

async function test() {
  try {
    await getAuth().verifyIdToken("invalid_token");
    console.log("Success (unexpected)");
  } catch (err) {
    console.error("Auth Error:", err);
  }
}
test();
