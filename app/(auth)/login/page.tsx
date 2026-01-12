'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Sparkles, Mail, User, ArrowRight, Heart, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      // Success - redirect based on whether they're new or returning
      if (data.isNewUser) {
        router.push('/lighthouse?welcome=true');
      } else {
        router.push('/lighthouse');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber via-plasma to-cyber bg-[length:200%_200%] animate-gradient-shift mb-6 relative">
            <span className="text-void font-bold text-3xl">H</span>
            <div className="absolute inset-0 rounded-2xl bg-cyber/30 blur-xl animate-glow-pulse" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl mb-3 text-ghost">
            Welcome <span className="text-gradient">Back</span>
          </h1>
          <p className="text-ghost-muted text-lg">
            Enter the movement to transform humanity
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-card p-8 rounded-2xl animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-ghost flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyber" />
                Email Address
                <span className="text-cyber">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="cyber-input w-full"
                required
                autoComplete="email"
              />
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-ghost flex items-center gap-2">
                <User className="w-4 h-4 text-cyber" />
                Your Name
                <span className="text-ghost-dim text-xs font-normal ml-auto">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should we call you?"
                className="cyber-input w-full"
                autoComplete="name"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top duration-300">
                <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="cyber-btn w-full text-lg py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Entering...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Enter the Movement</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyber/20"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-abyss px-2 text-ghost-dim">New here?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              href="/signup"
              className="cyber-btn-outline w-full text-base py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>Create Account</span>
            </Link>
          </form>

          {/* Privacy Notice */}
          <p className="text-xs text-ghost-dim text-center mt-6">
            By continuing, you agree to our{' '}
            <Link href="/legal/terms" className="text-cyber hover:text-cyber-light underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="text-cyber hover:text-cyber-light underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 animate-in fade-in duration-700 delay-300">
          <Link
            href="/"
            className="text-sm text-ghost-muted hover:text-cyber transition-colors duration-200 inline-flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
