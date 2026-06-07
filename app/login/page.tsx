import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import "@/styles/login.css";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>🎓 StudentMS</h1>
          <p>Student Profile Management</p>
        </div>
        <h2>Welcome back</h2>
        <LoginForm />
        <p className="auth-footer">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
