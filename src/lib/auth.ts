import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  updateProfile, 
  sendPasswordResetEmail, 
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser
} from "firebase/auth";
import { auth } from "./firebase";

export const signupWithEmail = async (email: string, password: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: fullName });
  const token = await userCredential.user.getIdToken();
  await syncUserWithBackend(token);
  return userCredential;
};

export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  await syncUserWithBackend(token);
  return userCredential;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const token = await userCredential.user.getIdToken();
  await syncUserWithBackend(token);
  return userCredential;
};

export const logout = () => {
  return signOut(auth);
};

export const sendResetEmail = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const reauthenticateUser = async (password: string) => {
  if (!auth.currentUser || !auth.currentUser.email) {
    throw new Error('User is not logged in or email is missing.');
  }
  const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
  return await reauthenticateWithCredential(auth.currentUser, credential);
};

export const deleteUserAccount = async () => {
  if (!auth.currentUser) {
    throw new Error('User is not logged in.');
  }
  return await deleteUser(auth.currentUser);
};

export const getCurrentUserToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
};

const syncUserWithBackend = async (token: string) => {
  try {
    await fetch("/api/auth/sync-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error("Failed to sync user with backend", err);
  }
};

