"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function PaymentPage() {
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState(1); // Default $1 => 10 credits

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }) 
      });
      const data = await res.json();
      
      if (data.url) {
        // Redirect to Stripe Checkout page
        window.location.href = data.url;
      } else {
        alert("Error creating checkout session");
        setProcessing(false);
      }
    } catch (e) {
       alert("Error creating checkout session");
       setProcessing(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", top: 24, left: 24 }}>
        <Link href="/" className="logo">
          <span className="gradient-text">NanoThumb</span> ✦
        </Link>
      </div>
      
      <div className="glass-card animate-fade-in" style={{ width: "100%", maxWidth: "500px", margin: "24px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "8px", fontSize: "28px" }}>Purchase Credits</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "14px" }}>
          You must purchase credits before generating any thumbnails.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px", textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-card)" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CreditCard size={24} style={{ color: "var(--accent-blue)" }} />
                <div>
                  <div style={{ fontWeight: "600" }}>Razorpay Secure Checkout</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>End-to-end encrypted</div>
                </div>
             </div>
             <CheckCircle2 style={{ color: "var(--primary)" }} />
          </div>
        </div>

        <a 
           href="https://rzp.io/rzp/miYQJ0F" 
           target="_blank" 
           rel="noopener noreferrer"
           className="btn-primary" 
           style={{ width: "100%", padding: "16px", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", textDecoration: "none" }}
        >
           Pay Securely
        </a>
      </div>
    </div>
  );
}
