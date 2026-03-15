"use client";
import React, { useEffect, useState } from "react";
import { UploadCloud, Save } from "lucide-react";

export default function ConfigPage() {
  const [prompt, setPrompt] = useState("");
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setPrompt(data.user?.defaultPrompt || "");
        if (data.user?.faceImages?.length > 0) {
          setFaceImage(data.user.faceImages[0]);
        }
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ defaultPrompt: prompt, faceImages: faceImage ? [faceImage] : [] })
    });
    setSaving(false);
    alert("Settings saved successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFaceImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>Configuration</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>Set your default generation prompt and face models.</p>

      <div className="glass-card" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
           Default Generation Prompt
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px" }}>
          This prompt will be combined with the inspiration thumbnail automatically.
        </p>
        <textarea 
          rows={4} 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Cinematic lighting, photorealistic, bold colors, maximum detail..."
          style={{ width: "100%" }}
        />
      </div>

      <div className="glass-card" style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Your Face Models</h2>
        <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px" }}>
          Upload high-quality images of your face for the AI to seamlessly integrate into thumbnails.
        </p>
        
        <label 
          style={{ 
            border: "2px dashed var(--border-card)", 
            padding: "40px", 
            borderRadius: "16px", 
            textAlign: "center",
            cursor: "pointer",
            background: "transparent",
            transition: "all 0.2s",
            display: "block"
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-card)"}
        >
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
          {faceImage ? (
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto" }}>
              <img src={faceImage} alt="Uploaded Face" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, background: "var(--bg-card)", borderRadius: "50%", padding: "4px" }}>✅</div>
            </div>
          ) : (
            <>
              <UploadCloud size={32} style={{ color: "var(--primary)", marginBottom: "16px" }} />
              <div style={{ fontWeight: "600", marginBottom: "8px" }}>Click to upload face image</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>PNG, JPG up to 10MB</div>
            </>
          )}
        </label>
      </div>

      <div style={{ textAlign: "right" }}>
        <button className="btn-primary" onClick={handleSave} disabled={saving} style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
          {saving ? "Saving..." : <><Save size={18} /> Save Configurations</>}
        </button>
      </div>
    </div>
  );
}
