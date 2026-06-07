"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", paddingTop: "60px" }}>
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </>
  );
}
