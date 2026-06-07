import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      padding: "20px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎓</div>
      <h1 style={{ fontSize: 40, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 }}>
        Student Profile System
      </h1>
      <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 480, marginBottom: 40 }}>
        A complete management system to handle student profiles, departments, and records.
      </p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/login" className="btn btn-primary" style={{ fontSize: 16, padding: "12px 32px" }}>
          Login
        </Link>
        <Link href="/signup" className="btn btn-outline" style={{ fontSize: 16, padding: "12px 32px" }}>
          Sign Up
        </Link>
      </div>
      <div style={{
        marginTop: 60,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 20,
        maxWidth: 700,
        width: "100%",
      }}>
        {[
          { icon: "🔐", title: "Secure Auth", desc: "JWT-based authentication" },
          { icon: "📊", title: "Dashboard", desc: "Real-time stats & overview" },
          { icon: "🖼️", title: "Image Upload", desc: "Profile photo management" },
          { icon: "⚡", title: "GraphQL API", desc: "Fast & flexible queries" },
        ].map(f => (
          <div key={f.title} style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</h3>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
