import { Request, Response, NextFunction } from "express";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as dotenv from "dotenv";

dotenv.config();
process.env.GOOGLE_CLOUD_PROJECT = process.env.FIREBASE_PROJECT_ID;

const initializeFirebaseAdmin = () => {
  if (getApps().length > 0) return;

  // Initialize using environment variables - assumed to be configured 
  // via FIREBASE_CONFIG or GOOGLE_APPLICATION_CREDENTIALS in Cloud Run,
  // OR fallback to default app if not provided explicitly.
  initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
};

initializeFirebaseAdmin();

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    (req as any).user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture
    };
    next();
  } catch (err) {
    console.error("Firebase Auth Error:", err);
    return res.status(401).json({ error: "Unauthorized valid token" });
  }
};
