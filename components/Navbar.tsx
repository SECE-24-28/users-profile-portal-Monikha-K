"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      height: "60px", display: "flex", alignItems: "center",
      padding: "0 24px", justifyContent: "space-between"
    }}>
      <Link href="/dashboard" style={{ fontWeight: 700, fontSize: 18, color: "#2563eb" }}>
        🎓 StudentMS
      </Link>
      <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
