import React, { useState, useEffect } from 'react';
import { Loader2, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { reauthenticateUser, deleteUserAccount, getCurrentUserToken } from '../lib/auth';
import { auth } from '../lib/firebase';

interface DeleteAccountModalProps {
  onClose: () => void;
  onSuccess: () => void;
  isLightTheme: boolean;
}

export default function DeleteAccountModal({ onClose, onSuccess, isLightTheme }: DeleteAccountModalProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const bgModal = isLightTheme ? 'bg-white border-zinc-200' : 'bg-zinc-900 border-zinc-800';
  const textDark = isLightTheme ? 'text-zinc-900' : 'text-zinc-100';
  const textLight = isLightTheme ? 'text-zinc-500' : 'text-zinc-400';
  const inputBg = isLightTheme ? 'bg-zinc-50 border-zinc-200 focus:border-red-500 text-zinc-900' : 'bg-zinc-950 border-zinc-800 focus:border-red-500 text-zinc-100 placeholder:text-zinc-600';

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      if (user.providerData.some(p => p.providerId === 'google.com')) {
        setIsGoogleUser(true);
        // Automatically send the first email on mount for Google users
        sendDeletionEmail();
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const sendDeletionEmail = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');
      const token = await getCurrentUserToken();
      if (!token) throw new Error("Not authenticated");
      
      const res = await fetch("/api/account-deletion/request", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send email");
      }
      
      setSuccessMsg("Account deletion email sent successfully.");
      setCooldown(60);
    } catch (err: any) {
      setError(err.message || 'Failed to send account deletion email.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGoogleUser) return; // Prevent direct deletion for Google users

    if (!password) {
      setError('Please enter your password to confirm.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // Re-authenticate user first
      await reauthenticateUser(password);
      
      // Get fresh token
      const token = await getCurrentUserToken();
      if (!token) throw new Error("Not authenticated");

      // Wipe Data Connect via backend
      const res = await fetch("/api/account-deletion/immediate", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to wipe backend data");
      }

      // Backend already deletes the Auth user, but we'll also wipe the client session
      await auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      
      alert("Your account has been permanently deleted successfully.");

      onSuccess();
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else {
        setError(err.message || 'Failed to delete account.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-sm rounded-lg border shadow-xl p-6 relative ${bgModal}`}>
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 ${textLight} hover:${textDark}`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
          </div>
          <h2 className={`text-xl font-bold font-mono text-center tracking-tight ${textDark}`}>
            Delete Account
          </h2>
          {!isGoogleUser ? (
            <p className={`text-sm text-center mt-2 ${textLight}`}>
              Are you sure you want to delete this account? This action cannot be undone.
            </p>
          ) : (
            <div className={`text-sm text-center mt-2 space-y-3 ${textLight}`}>
              <p>For security reasons, an account deletion confirmation email has been sent to your registered email address.</p>
              <p>Please check your inbox and click the confirmation link to permanently delete your account.</p>
              <p className="text-xs">If you do not receive the email within a few minutes, check your spam folder.</p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 mb-4 rounded bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-500/20">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 mb-4 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {successMsg}
          </div>
        )}

        {isGoogleUser ? (
          <div className="flex flex-col gap-3 mt-6">
             <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`w-full py-2 px-4 rounded text-sm font-bold font-mono border transition-colors ${isLightTheme ? 'border-zinc-300 hover:bg-zinc-100 text-zinc-900' : 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'}`}
            >
              Close
            </button>
            <button
              type="button"
              onClick={sendDeletionEmail}
              disabled={loading || cooldown > 0}
              className={`w-full py-2 px-4 rounded text-sm font-bold font-mono border transition-colors flex items-center justify-center gap-2 ${
                loading || cooldown > 0 
                ? 'opacity-50 cursor-not-allowed border-zinc-700 text-zinc-500' 
                : 'border-blue-500/50 hover:bg-blue-500/10 text-blue-500 dark:text-blue-400'
              }`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : cooldown > 0 ? `Resend Available in ${cooldown}s` : 'Resend Email'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleDelete} className="space-y-4">
            <div>
              <label className={`block text-xs uppercase font-mono mb-1 ${textLight}`}>
                Confirm Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded border outline-none transition-colors ${inputBg}`}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className={`flex-1 py-2 px-4 rounded text-sm font-bold font-mono border transition-colors ${isLightTheme ? 'border-zinc-300 hover:bg-zinc-100 text-zinc-900' : 'border-zinc-700 hover:bg-zinc-800 text-zinc-300'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 rounded text-sm font-bold font-mono bg-red-600 hover:bg-red-700 text-white transition-colors flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
