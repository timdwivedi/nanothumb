"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (amount) {
      // In a real production app, webhooks should handle this updating logic on the server.
      // For this demo with db.json, we will manually trigger an add.
      const handleCredits = async () => {
        // First get current user to add to their balance
        const res = await fetch("/api/user");
        const data = await res.json();
        const currentCredits = data.user?.credits || 0;
        
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credits: currentCredits + (Number(amount) * 10) })
        });
        
        setLoading(false);
      };
      
      handleCredits();
    } else {
      setLoading(false);
    }
  }, [amount]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", top: 24, left: 24 }}>
        <Link href="/" className="logo">
          <span className="gradient-text">Thumby</span> ✦
        </Link>
      </div>
      
      <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "500px", margin: "24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
        {loading ? (
          <>
            <Loader2 size={48} className="animate-spin" style={{ color: "var(--primary)", marginBottom: "24px" }} />
            <h2 style={{ marginBottom: "16px", fontSize: "28px" }}>Finalizing Payment...</h2>
            <p style={{ color: "var(--text-muted)" }}>We are adding the credits to your account.</p>
          </>
        ) : (
          <>
            <CheckCircle2 size={64} style={{ color: "var(--accent-green)", marginBottom: "24px" }} />
            <h2 style={{ marginBottom: "16px", fontSize: "28px" }}>Payment Successful!</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "16px" }}>
              Your credits have been added. You are ready to start generating cinematic thumbnails.
            </p>
            <Link href="/dashboard" style={{ width: "100%" }}>
              <button className="btn-primary" style={{ width: "100%", padding: "16px", fontSize: "18px" }}>Go to Dashboard</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
