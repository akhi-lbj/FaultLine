import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { loginWithGoogle, loginWithEmail, signupWithEmail, sendResetEmail } from '../lib/auth';

interface AuthModalProps {
  onSuccess: (user: User) => void;
  onClose: () => void;
  isLightTheme?: boolean;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ onSuccess, onClose, isLightTheme, initialMode }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode || 'login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await loginWithGoogle();
      if (typeof pendo !== 'undefined') {
        pendo.track("user_logged_in", { authMethod: "google" });
      }
      onSuccess(res.user);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Failed to authenticate with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }
    try {
      setLoading(true);
      setError('');
      setResetSuccess('');
      await sendResetEmail(email);
      if (typeof pendo !== 'undefined') {
        pendo.track("password_reset_requested", {
          emailDomain: email.split('@')[1] || ""
        });
      }
      setResetSuccess('Password reset email sent. Please check your inbox (and spam/junk folder). After changing your password, you can log in below.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !fullName)) {
      setError('Please fill all required fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      if (mode === 'login') {
        const res = await loginWithEmail(email, password);
        if (typeof pendo !== 'undefined') {
          pendo.track("user_logged_in", { authMethod: "email" });
        }
        onSuccess(res.user);
      } else {
        const res = await signupWithEmail(email, password, fullName);
        if (typeof pendo !== 'undefined') {
          pendo.track("user_signed_up", {
            authMethod: "email",
            hasDisplayName: !!fullName
          });
        }
        onSuccess(res.user);
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in Firebase project. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Incorrect email or password.');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const bgPanel = isLightTheme ? "bg-white border-zinc-200" : "bg-zinc-950 border-zinc-800";
  const textDark = isLightTheme ? "text-zinc-900" : "text-white";
  const textLight = isLightTheme ? "text-zinc-500" : "text-zinc-400";
  const inputBg = isLightTheme ? "bg-zinc-50 border-zinc-300 text-zinc-900" : "bg-zinc-900 border-zinc-800 text-zinc-100";
  
  return (
    <div 
      className="fixed inset-0 min-h-screen bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-sm rounded-xl border shadow-2xl p-6 ${bgPanel}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 text-center">
          <h2 className={`text-2xl font-bold font-sans tracking-tight mb-1 ${textDark}`}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className={`text-sm ${textLight}`}>
            Authenticate to save your generated transcription outputs and portfolio history.
          </p>
        </div>

        {error && <div className="p-3 mb-4 rounded bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-500/20">{error}</div>}
        {resetSuccess && <div className="p-3 mb-4 rounded bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-500/20">{resetSuccess}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          {mode === 'signup' && (
            <div>
              <label className={`block text-xs uppercase font-mono mb-1 ${textLight}`}>Full Name</label>
              <input 
                type="text" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full p-2.5 rounded border focus:outline-none focus:border-red-500 text-sm ${inputBg}`} 
                placeholder="Jane Doe" 
              />
            </div>
          )}
          <div>
            <label className={`block text-xs uppercase font-mono mb-1 ${textLight}`}>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2.5 rounded border focus:outline-none focus:border-red-500 text-sm ${inputBg}`} 
              placeholder="jane@company.com" 
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className={`block text-xs uppercase font-mono ${textLight}`}>Password</label>
              {mode === 'login' && <button type="button" onClick={handleResetPassword} disabled={loading} className="text-xs text-blue-500 hover:underline">Forgot?</button>}
            </div>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2.5 rounded border focus:outline-none focus:border-red-500 text-sm ${inputBg}`} 
              placeholder="••••••••" 
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded transition-colors text-sm"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-px bg-zinc-800 flex-1"></div>
          <span className={`text-xs ${textLight}`}>or</span>
          <div className="h-px bg-zinc-800 flex-1"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className={`w-full font-medium text-sm py-2.5 rounded transition-colors flex items-center justify-center gap-3 border ${isLightTheme ? 'border-zinc-300 hover:bg-zinc-50' : 'border-zinc-700 hover:bg-zinc-800'}`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              <span className={textDark}>Continue with Google</span>
            </>
          )}
        </button>

        <div className="mt-6 text-center space-y-2">
          {mode === 'login' ? (
             <p className={`text-xs ${textLight}`}>
               Don't have an account? <button type="button" onClick={() => setMode('signup')} className="text-red-500 hover:text-red-400 font-medium">Create one</button>
             </p>
          ) : (
             <p className={`text-xs ${textLight}`}>
               Already have an account? <button type="button" onClick={() => setMode('login')} className="text-red-500 hover:text-red-400 font-medium">Log in</button>
             </p>
          )}
          <p className={`text-[10px] ${textLight}`}>
            By continuing, you agree to our{' '}
            <a href="#/privacy" className="text-blue-500 hover:underline">Privacy Policy</a> and{' '}
            <a href="#/terms" className="text-blue-500 hover:underline">Terms of Service</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
