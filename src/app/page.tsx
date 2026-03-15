import Link from "next/link";
import { Star, Image as ImageIcon, Zap, Maximize2, Layers, UploadCloud, Wand2, Download, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <header className="container header">
        <div className="logo">
          <span className="gradient-text">Thumby</span> ✦
        </div>
        <nav className="nav-links">
          <Link href="#features" className="nav-item">Features</Link>
          <Link href="#how-it-works" className="nav-item">How it Works</Link>
          <Link href="#pricing" className="nav-item">Pricing</Link>
          <Link href="/auth" className="nav-item">Sign In</Link>
          <Link href="/auth">
            <button className="btn-primary">Get Started</button>
          </Link>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="container" style={{ textAlign: "center", padding: "100px 0 60px", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 10 }}>
            <div style={{ display: "inline-block", padding: "6px 16px", background: "rgba(156, 95, 255, 0.1)", border: "1px solid rgba(156, 95, 255, 0.3)", borderRadius: "32px", color: "var(--secondary)", fontSize: "14px", fontWeight: "600", marginBottom: "24px" }}>
               Powered by Advanced Image AI
            </div>
            <h1 style={{ fontSize: "72px", marginBottom: "24px", letterSpacing: "-2px", lineHeight: "1.1" }}>
              Revolutionary <span className="gradient-text">AI-Powered</span><br />
              Thumbnail Generators <span style={{ color: "var(--accent-orange)" }}>✵</span>
            </h1>
            <p style={{ fontSize: "20px", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6" }}>
              Play around to get the perfectly fit unique thumbnail that will catch eyes & save you hours of manual editing.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <Link href="/auth">
                <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "16px 36px", fontSize: "18px" }}>
                  <ImageIcon size={20} /> Generate For Free
                </button>
              </Link>
            </div>
          </div>
          
          {/* Replaced Tilted 3D Mockup with Flat 2D High-Quality Image */}
          <div className="glass-card animate-fade-in" style={{ marginTop: "60px", padding: "12px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(156, 95, 255, 0.25)" }}>
             <img 
                src="/demo_editor_2d.png" 
                alt="2D Demo Editor Flat View" 
                style={{ width: "100%", borderRadius: "16px", border: "1px solid var(--border-card)", display: "block", aspectRatio: "16/9", objectFit: "cover" }} 
             />
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="container" style={{ padding: "40px 0 80px", textAlign: "center", borderBottom: "1px solid var(--border-card)" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "32px" }}>Trusted by Top Creators</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap", opacity: 0.6, filter: "grayscale(100%)", alignItems: "center" }}>
            <h3 style={{ fontSize: "24px", margin: 0 }}>MrAnimal</h3>
            <h3 style={{ fontSize: "24px", margin: 0 }}>DudePerfectly</h3>
            <h3 style={{ fontSize: "24px", margin: 0 }}>MKBHDish</h3>
            <h3 style={{ fontSize: "24px", margin: 0 }}>LoganPool</h3>
          </div>
        </section>

        {/* HOW IT WORKS (3 STEPS) */}
        <section id="how-it-works" className="container" style={{ padding: "100px 0" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontSize: "40px", marginBottom: "16px" }}>How It Works</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>Generate stunning thumbnails in three simple steps.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
             <div className="glass-card" style={{ padding: "40px 32px", textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", background: "rgba(156, 95, 255, 0.1)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--primary)" }}>
                  <UploadCloud size={32} />
                </div>
                <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>1. Upload Inspiration</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>Provide a base layout or an idea you love. The AI will analyze the styling, lighting, and placement.</p>
             </div>

             <div className="glass-card" style={{ padding: "40px 32px", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: "50%", left: "-24px", transform: "translateY(-50%)", color: "var(--border-card)" }}><Maximize2 size={48} /></div>
                <div style={{ position: "absolute", top: "50%", right: "-24px", transform: "translateY(-50%)", color: "var(--border-card)" }}><Maximize2 size={48} /></div>
                
                <div style={{ width: "64px", height: "64px", background: "rgba(255, 121, 167, 0.1)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--accent-pink)" }}>
                  <Zap size={32} />
                </div>
                <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>2. Modify & Add Face</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>Type what you want changed, and let the AI swap the subject's face with your personalized model perfectly.</p>
             </div>

             <div className="glass-card" style={{ padding: "40px 32px", textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", background: "rgba(94, 158, 255, 0.1)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--accent-blue)" }}>
                  <Wand2 size={32} />
                </div>
                <h3 style={{ fontSize: "22px", marginBottom: "16px" }}>3. Generate Options</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>Receive 3 breathtaking, high-CTR variations instantly. Pick your favorite and directly download it.</p>
             </div>
          </div>
        </section>

        {/* FEATURES / BENEFITS */}
        <section id="features" className="container" style={{ padding: "80px 0 120px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
             <div>
               <h2 style={{ fontSize: "40px", marginBottom: "24px", lineHeight: "1.2" }}>Elevate Your CTR with <span className="gradient-text">Cinematic</span> Thumbnails</h2>
               <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "32px", lineHeight: "1.6" }}>
                 Thumby isn't just an image generator; it's a personalized thumbnail studio built for YouTube dominance. It automatically handles complex lighting engines to match your face model perfectly to entirely new neon-lit scenes.
               </p>
               <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                 <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "16px" }}>
                   <CheckCircle2 size={24} style={{ color: "var(--accent-green)", flexShrink: 0 }} />
                   <div><strong>100% Face Consistency</strong> - Upload your face model once, use it perfectly in infinite lighting scenarios automatically.</div>
                 </li>
                 <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "16px" }}>
                   <CheckCircle2 size={24} style={{ color: "var(--primary)", flexShrink: 0 }} />
                   <div><strong>Advanced Synthesis Model</strong> - Leverages bleeding-edge image synthesis for hyper-realistic renders that stand out.</div>
                 </li>
                 <li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "16px" }}>
                   <CheckCircle2 size={24} style={{ color: "var(--accent-orange)", flexShrink: 0 }} />
                   <div><strong>Guaranteed Eye-Catchers</strong> - Pre-configured aesthetic prompts guarantee high contrast, high saturation cinematic pieces.</div>
                 </li>
               </ul>
             </div>
             <div style={{ position: "relative" }}>
                 <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "120%", height: "120%", background: "radial-gradient(circle, rgba(156, 95, 255, 0.15) 0%, transparent 70%)", zIndex: -1 }}></div>
                 <img src="/thumbnail_mockup.png" alt="High Quality Output" style={{ width: "100%", borderRadius: "24px", border: "1px solid var(--border-card)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }} />
                 <div className="glass-card" style={{ position: "absolute", bottom: "-20px", left: "-20px", padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ color: "var(--accent-green)" }}><CheckCircle2 size={24} /></div>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>+14.2% CTR</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Average lift vs standard</div>
                    </div>
                 </div>
             </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="container" style={{ padding: "80px 0" }}>
           <div style={{ textAlign: "center", marginBottom: "64px" }}>
             <h2 style={{ fontSize: "40px", marginBottom: "16px" }}>Simple, Transparent Pricing</h2>
             <p style={{ color: "var(--text-muted)", fontSize: "18px" }}>Invest in your YouTube growth with credits.</p>
           </div>
           
           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
              <div className="glass-card" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "24px" }}>
                 <h3 style={{ color: "var(--accent-blue)" }}>Starter</h3>
                 <div style={{ fontSize: "48px", fontWeight: "800" }}>$5</div>
                 <p style={{ color: "var(--text-muted)" }}>50 Credits</p>
                 <ul style={{ textAlign: "left", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                   <li><Star size={16} style={{ color: "var(--accent-blue)", marginRight: "8px", verticalAlign: "middle" }} /> 16 Thumbnails generated</li>
                   <li><Star size={16} style={{ color: "var(--accent-blue)", marginRight: "8px", verticalAlign: "middle" }} /> Advanced AI model access</li>
                   <li><Star size={16} style={{ color: "var(--accent-blue)", marginRight: "8px", verticalAlign: "middle" }} /> Standard speed</li>
                 </ul>
                 <a href="https://rzp.io/rzp/miYQJ0F" target="_blank" rel="noopener noreferrer" style={{ marginTop: "auto" }}><button className="btn-outline" style={{ width: "100%" }}>Buy Starter</button></a>
              </div>

              <div className="glass-card" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "24px", border: "1px solid var(--primary)", position: "relative", transform: "scale(1.05)", zIndex: 10 }}>
                 <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #FF79A7, #9C5FFF)", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>MOST POPULAR</div>
                 <h3 className="gradient-text">Pro</h3>
                 <div style={{ fontSize: "48px", fontWeight: "800" }}>$20</div>
                 <p style={{ color: "var(--text-muted)" }}>200 Credits</p>
                 <ul style={{ textAlign: "left", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                   <li><Star size={16} style={{ color: "var(--primary)", marginRight: "8px", verticalAlign: "middle" }} /> 66 Thumbnails generated</li>
                   <li><Star size={16} style={{ color: "var(--primary)", marginRight: "8px", verticalAlign: "middle" }} /> Face replacement AI</li>
                   <li><Star size={16} style={{ color: "var(--primary)", marginRight: "8px", verticalAlign: "middle" }} /> Priority generation</li>
                 </ul>
                 <a href="https://rzp.io/rzp/miYQJ0F" target="_blank" rel="noopener noreferrer" style={{ marginTop: "auto" }}><button className="btn-primary" style={{ width: "100%" }}>Buy Pro</button></a>
              </div>

              <div className="glass-card" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "24px" }}>
                 <h3 style={{ color: "var(--accent-orange)" }}>Creator</h3>
                 <div style={{ fontSize: "48px", fontWeight: "800" }}>$50</div>
                 <p style={{ color: "var(--text-muted)" }}>500 Credits</p>
                 <ul style={{ textAlign: "left", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                   <li><Star size={16} style={{ color: "var(--accent-orange)", marginRight: "8px", verticalAlign: "middle" }} /> 166 Thumbnails generated</li>
                   <li><Star size={16} style={{ color: "var(--accent-orange)", marginRight: "8px", verticalAlign: "middle" }} /> Priority Email Support</li>
                   <li><Star size={16} style={{ color: "var(--accent-orange)", marginRight: "8px", verticalAlign: "middle" }} /> Instant generations</li>
                 </ul>
                 <a href="https://rzp.io/rzp/miYQJ0F" target="_blank" rel="noopener noreferrer" style={{ marginTop: "auto" }}><button className="btn-outline" style={{ width: "100%" }}>Buy Creator</button></a>
              </div>
           </div>
        </section>
      </main>

      <footer className="container footer">
        <div className="logo" style={{ fontSize: "18px" }}>
          <span className="gradient-text">Thumby</span>
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "14px", display: "flex", gap: "24px" }}>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
          <span>© 2026 Thumby. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
