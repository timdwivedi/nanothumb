"use client";
import React, { useEffect, useState } from "react";
import { UploadCloud, Wand2, CheckCircle2, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authHeaders } from "@/lib/auth";

export default function GeneratePage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [inspiration, setInspiration] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    fetch("/api/user", { headers: authHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setPrompt(data.user?.defaultPrompt || "");
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInspiration(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!inspiration) {
      alert("Please upload an inspiration thumbnail.");
      return;
    }
    setGenerating(true);
    setOptions([]);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ prompt, inspirationUrl: inspiration }),
    });
    const data = await res.json();
    setGenerating(false);

    if (data.outOfCredits) {
      setShowUpgradeModal(true);
    } else if (data.error) {
      alert(data.error);
    } else {
      setOptions(data.options);
    }
  };

  const handleSelectAndSave = async () => {
    if (selectedOption === null) return;
    setSaving(true);
    await fetch("/api/thumbnails", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ url: options[selectedOption] })
    });
    setSaving(false);
    router.push("/dashboard");
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {showUpgradeModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="glass-card animate-fade-in" style={{ maxWidth: "460px", width: "100%", margin: "24px", textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>
              <Sparkles size={48} style={{ color: "var(--primary)", margin: "0 auto" }} />
            </div>
            <h2 style={{ fontSize: "24px", marginBottom: "12px" }}>Free Trial Complete</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "15px", lineHeight: "1.6" }}>
              You've used your 3 free thumbnails. Purchase credits to keep generating.
            </p>
            <Link
              href="https://rzp.io/rzp/miYQJ0F"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "block", padding: "16px", fontSize: "16px", textDecoration: "none", marginBottom: "12px" }}
            >
              Buy Credits
            </Link>
            <button
              onClick={() => setShowUpgradeModal(false)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "14px", fontFamily: "inherit" }}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
      <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>Create New Thumbnail</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>Generate breathtaking thumbnails using our advanced AI.</p>

      {options.length === 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          <div className="glass-card">
            <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>1. Inspiration Source</h2>
            <label 
              style={{ 
                border: "2px dashed var(--border-card)", 
                padding: "60px 40px", 
                borderRadius: "16px", 
                textAlign: "center",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "block"
              }}
            >
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
              {inspiration ? (
                <>
                  <img src={inspiration} alt="Inspiration" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
                  <div style={{ position: "relative", zIndex: 1, display: "inline-flex", background: "var(--bg-card)", padding: "12px 24px", borderRadius: "24px", backdropFilter: "blur(10px)" }}>
                    <CheckCircle2 style={{ color: "var(--accent-green)", marginRight: "8px" }} /> Uploaded
                  </div>
                </>
              ) : (
                <>
                  <UploadCloud size={48} style={{ color: "var(--primary)", margin: "0 auto 16px" }} />
                  <div style={{ fontWeight: "600", marginBottom: "8px" }}>Upload inspiration thumbnail</div>
                  <div style={{ fontSize: "14px", color: "var(--text-muted)" }}>Drag and drop or click</div>
                </>
              )}
            </label>
          </div>
          
          <div className="glass-card" style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>2. Modify Prompt</h2>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px" }}>
              Fine-tune the generation request.
            </p>
            <textarea 
               rows={6}
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="Enter your prompt modifications..."
               style={{ width: "100%", marginBottom: "24px", flex: 1 }}
            />
            
            <button 
              className="btn-primary" 
              onClick={handleGenerate} 
              disabled={generating || !inspiration}
              style={{ padding: "16px", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
            >
              {generating ? <><Loader2 className="animate-spin" /> Generating (3 credits)...</> : <><Wand2 size={20} /> Generate Now (3 credits)</>}
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Select Your Favorite</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>Choose one of the generated options below to save to your dashboard.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }}>
            {options.map((opt, i) => (
              <div 
                key={i} 
                className="glass-card" 
                style={{ 
                  padding: "8px", 
                  cursor: "pointer", 
                  border: `2px solid ${selectedOption === i ? "var(--primary)" : "var(--border-card)"}`,
                  transform: selectedOption === i ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.2s"
                }}
                onClick={() => setSelectedOption(i)}
              >
                <img src={opt} alt={`Option ${i+1}`} style={{ width: "100%", borderRadius: "12px", height: "200px", objectFit: "cover" }} />
                {selectedOption === i && (
                  <div style={{ textAlign: "center", padding: "12px 0", color: "var(--primary)", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                     <CheckCircle2 size={18} /> Selected
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-card)", paddingTop: "32px" }}>
            <button className="btn-outline" onClick={() => setOptions([])}>Cancel</button>
            <button 
               className="btn-primary" 
               disabled={selectedOption === null || saving}
               onClick={handleSelectAndSave}
               style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
               {saving ? "Saving..." : "Save to Dashboard"} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
