"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/students", label: "Students", icon: "👥" },
  { href: "/students/create", label: "Add Student", icon: "➕" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      position: "fixed", top: "60px", left: 0, bottom: 0,
      width: "240px", background: "#fff", borderRight: "1px solid #e5e7eb",
      padding: "24px 16px", display: "flex", flexDirection: "column", gap: "4px",
      overflowY: "auto", zIndex: 99
    }}>
      {links.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 14px", borderRadius: "8px",
            fontWeight: active ? 600 : 400,
            background: active ? "#eff6ff" : "transparent",
            color: active ? "#2563eb" : "#374151",
            fontSize: "14px", transition: "all 0.15s"
          }}>
            <span>{icon}</span>
            {label}
          </Link>
        );
      })}
    </aside>
  );
}
