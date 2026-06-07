import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import "@/styles/login.css";

export default function SignupPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>🎓 StudentMS</h1>
          <p>Student Profile Management</p>
        </div>
        <h2>Create an account</h2>
        <SignupForm />
        <p className="auth-footer">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
