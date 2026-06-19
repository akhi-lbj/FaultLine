import React, { useEffect, useState } from 'react';
import { Loader2, XCircle } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

interface DeleteAccountConfirmPageProps {
  token: string | null;
}

export default function DeleteAccountConfirmPage({ token }: DeleteAccountConfirmPageProps) {
  const { user, loading } = useAuth();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (loading) return; // Wait for auth state

    if (!user && !isDeleting) {
      if (token) sessionStorage.setItem('pendingDeletionToken', token);
      window.location.replace('/#/login');
      return;
    }

    if (!token) {
      setStatus('error');
      setErrorMsg("No token provided.");
      return;
    }

    const confirmDeletion = async () => {
      if (isDeleting) return;
      setIsDeleting(true);
      try {
        const res = await fetch('/api/account-deletion/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          let errorMessage = data.message || "Failed to delete account";
          if (data.error === "Invalid or expired token." || data.error === "Link has expired." || data.error === "Invalid token") {
             errorMessage = "This delete link is invalid or expired.";
          } else if (data.error === "Link has already been used." || data.error === "User not found in application database.") {
             errorMessage = "This account has already been deleted.";
          }
          throw new Error(errorMessage);
        }
        
        alert("Your account has been permanently deleted successfully.");
        
        await signOut(auth);
        localStorage.clear();
        sessionStorage.clear();
        
        window.location.replace("/#/login");
        
      } catch (err: any) {
        setStatus('error');
        setErrorMsg(err.message || "Something went wrong. Please try again.");
      }
    };

    if (user && token && !isDeleting && status === 'loading') {
      confirmDeletion();
    }
  }, [token, user, loading]);

  if (loading || (!user && status === 'loading')) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-sm text-zinc-400 font-mono">Verifying authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl p-8 relative flex flex-col items-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold font-mono text-zinc-100 mb-2">Deleting Account</h2>
            <p className="text-sm text-zinc-400 text-center">Please wait while we permanently remove your data...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold font-mono text-zinc-100 mb-2 text-center">{errorMsg === "This account has already been deleted." ? "Already Deleted" : "Deletion Link Invalid"}</h2>
            <p className="text-sm text-zinc-400 text-center mb-4">
              {errorMsg}
            </p>
            <p className="text-sm text-zinc-400 text-center mb-8">
              If you did not make this request or the request is no longer valid, you can safely return home.
            </p>
            <button 
              onClick={() => window.location.replace('/#/login')}
              className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-mono text-sm transition-colors"
            >
              Return Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
