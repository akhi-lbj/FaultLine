import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { 
  loginWithEmail, 
  signupWithEmail, 
  loginWithGoogle, 
  logout, 
  sendResetEmail,
  getCurrentUserToken 
} from "../lib/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        pendo.identify({
          visitor: {
            id: u.uid,
            email: u.email || '',
            full_name: u.displayName || '',
            firebaseUid: u.uid,
            photoUrl: u.photoURL || ''
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logout,
    sendResetEmail,
    getCurrentUserToken,
  };
};
