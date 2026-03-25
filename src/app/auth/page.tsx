"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: isLogin ? "login" : "signup", email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error) {
      setError(data.error);
      return;
    }

    localStorage.setItem("userId", data.userId);
    router.push("/dashboard");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", top: 24, left: 24 }}>
        <Link href="/" className="logo">
          <span className="gradient-text">Thumby</span> ✦
        </Link>
      </div>
      <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "480px", margin: "24px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
          {isLogin ? "Welcome Back" : "Start Generating"}
        </h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "32px", fontSize: "14px" }}>
          {isLogin ? "Sign in to access your dashboard" : "Create an account — 3 free thumbnails included"}
        </p>

        <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label className="input-label">Email Address</label>
            <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="input-label">Password</label>
            <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && (
            <div style={{ color: "var(--accent-pink)", fontSize: "14px", textAlign: "center" }}>{error}</div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: "12px" }} disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up — Free"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "var(--text-muted)" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="gradient-text"
            style={{ cursor: "pointer", fontWeight: "600" }}
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
}
