"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check if configuration is missing (placeholder detection)
        const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
            process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

        if (isPlaceholder) {
            setError("Configuration Error: Supabase URL/Key not found in Environment Variables.");
            setLoading(false);
            return;
        }

        try {
            const { error: signupError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (signupError) {
                setError(signupError.message);
                setLoading(false);
            } else {
                setSuccess(true);
                setLoading(false);
            }
        } catch (err: any) {
            console.error('Signup Error:', err);
            if (err.message === 'Failed to fetch') {
                setError("Network Error: Could not reach Supabase. This usually happens if your URL is missing 'https://' or if an Ad-Blocker is active.");
            } else {
                setError(err.message || "An unexpected network error occurred.");
            }
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-card reveal active text-center">
                    <div className="success-icon">
                        <i className="fa-solid fa-envelope-circle-check"></i>
                    </div>
                    <h1>Check your <span>Email</span></h1>
                    <p style={{ margin: '20px 0' }}>We've sent a verification link to <strong>{email}</strong>. Please click the link to activate your account.</p>
                    <Link href="/login" className="cta-btn auth-btn">Back to Login</Link>
                </div>
                <style jsx>{`
                    .auth-container { min-height: calc(100vh - var(--header-height)); display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%); }
                    .auth-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 40px; border-radius: 20px; width: 100%; max-width: 450px; text-align: center; }
                    .success-icon { font-size: 4rem; color: #42b836; margin-bottom: 20px; }
                    h1 span { color: var(--primary-red); }
                    .auth-btn { display: inline-block; text-decoration: none; width: 100%; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card reveal active">
                <div className="auth-header">
                    <img src="https://cdn.axt.co.in/logo.jpg" alt="AXT Logo" />
                    <h1>Create <span>Account</span></h1>
                    <p>Start your cloud journey with AXTCloud</p>
                </div>

                <form onSubmit={handleSignup} className="auth-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Min 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <button type="submit" className="cta-btn auth-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="auth-footer">
                        Already have an account? <Link href="/login">Sign In</Link>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .auth-container {
                    min-height: calc(100vh - var(--header-height));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    background: radial-gradient(circle at top, #1a0000 0%, var(--dark-bg) 70%);
                }
                .auth-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    padding: 40px;
                    border-radius: 20px;
                    width: 100%;
                    max-width: 450px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }
                .auth-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .auth-header img {
                    width: 60px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }
                .auth-header h1 {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                .auth-header h1 span {
                    color: var(--primary-red);
                }
                .auth-header p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                }
                .auth-form .form-group {
                    margin-bottom: 20px;
                }
                .auth-form label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 0.9rem;
                    color: #ccc;
                }
                .auth-form input {
                    width: 100%;
                    padding: 12px 16px;
                    background: #0a0a0a;
                    border: 1px solid #333;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 1rem;
                    transition: 0.3s;
                }
                .auth-form input:focus {
                    outline: none;
                    border-color: var(--primary-red);
                    background: #111;
                }
                .auth-btn {
                    width: 100%;
                    margin-top: 10px;
                    font-size: 1rem;
                    padding: 14px;
                }
                .error-message {
                    background: rgba(255, 0, 0, 0.1);
                    border: 1px solid var(--primary-red);
                    color: #ff4d4d;
                    padding: 10px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-size: 0.9rem;
                    text-align: center;
                }
                .auth-footer {
                    text-align: center;
                    margin-top: 25px;
                    font-size: 0.9rem;
                    color: #888;
                }
                .auth-footer a {
                    color: var(--primary-red);
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
}
