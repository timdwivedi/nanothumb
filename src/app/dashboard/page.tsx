"use client";
import React, { useEffect, useState } from "react";
import { Download, Play } from "lucide-react";
import Link from "next/link";
import { authHeaders } from "@/lib/auth";

interface Thumbnail {
  id: string;
  url: string;
  createdAt: string;
}

export default function DashboardHome() {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/thumbnails", { headers: authHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setThumbnails(data.thumbnails);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>Dashboard</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>Overview of your recent generations.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "40px" }}>
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>Total Generated</div>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>{thumbnails.length}</div>
        </div>
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>Credits Used</div>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-pink)" }}>{thumbnails.length * 3}</div>
        </div>
        <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
           <Link href="/dashboard/generate" style={{ width: "100%" }}>
             <button className="btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><Play size={18} /> New Generation</button>
           </Link>
        </div>
      </div>

      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Your Thumbnails</h2>
      {loading ? (
        <p>Loading...</p>
      ) : thumbnails.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", border: "1px dashed var(--border-card)", borderRadius: "16px", color: "var(--text-muted)" }}>
          No thumbnails generated yet. Let's create one!
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {thumbnails.map((t) => (
            <div key={t.id} className="glass-card" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <img src={t.url} alt="Thumbnail" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{new Date(t.createdAt).toLocaleDateString()}</div>
                 <button className="btn-secondary" style={{ padding: "8px 12px", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }} onClick={() => window.open(t.url)}>
                   <Download size={14} /> Download
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
