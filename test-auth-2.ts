import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as dotenv from "dotenv";

dotenv.config();

process.env.GOOGLE_CLOUD_PROJECT = process.env.FIREBASE_PROJECT_ID;

console.log("PROJECT ID:", process.env.FIREBASE_PROJECT_ID);
initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });

async function test() {
  try {
    // Generate a fake JWT token that has three parts (header.payload.signature)
    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    await getAuth().verifyIdToken(fakeToken);
    console.log("Success (unexpected)");
  } catch (err) {
    console.error("Auth Error:", err);
  }
}
test();
