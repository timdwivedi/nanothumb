"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Settings, Image as ImageIcon, LogOut, Coins } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCredits(data.user.credits);
        }
      })
      .catch((err) => console.error(err));
  }, [pathname]); // Refreshes when navigating around

  const handleSignOut = () => {
    // In a production app with Supabase, you would call supabase.auth.signOut() here
    router.push("/");
  };

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/dashboard/generate", label: "Generate", icon: <ImageIcon size={18} /> },
    { href: "/dashboard/config", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", borderRight: "1px solid var(--border-card)", background: "rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", padding: "24px" }}>
        <Link href="/" className="logo" style={{ marginBottom: "40px" }}>
          <span className="gradient-text">NanoThumb</span> ✦
        </Link>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                style={{ 
                  display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px",
                  background: isActive ? "rgba(156, 95, 255, 0.1)" : "transparent",
                  color: isActive ? "white" : "var(--text-muted)",
                  border: `1px solid ${isActive ? "rgba(156, 95, 255, 0.2)" : "transparent"}`,
                  transition: "all 0.2s"
                }}
              >
                {link.icon} {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-card)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-card)", padding: "12px", borderRadius: "12px", border: "1px solid var(--border-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-orange)", fontSize: "14px", fontWeight: "bold" }}>
                <Coins size={16} /> {credits !== null ? credits : "..."} Credits
              </div>
              <Link href="https://rzp.io/rzp/miYQJ0F" style={{ fontSize: "12px", color: "white", textDecoration: "underline" }} target="_blank" rel="noopener noreferrer">Buy More</Link>
            </div>
          <button 
             onClick={handleSignOut}
             style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", color: "var(--text-muted)", borderRadius: "12px", background: "transparent", border: "none", cursor: "pointer", fontSize: "16px", fontFamily: "inherit", width: "100%", transition: "background 0.2s" }}
             onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
             onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
             <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
