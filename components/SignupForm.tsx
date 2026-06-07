"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import gql from "graphql-tag";

const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user { id name email }
    }
  }
`;

interface SignupData {
  signup: { token: string; user: { id: string; name: string; email: string } };
}

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [signup, { loading }] = useMutation<SignupData>(SIGNUP);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) { setError("All fields are required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    try {
      const { data } = await signup({ variables: form });
      if (data) {
        localStorage.setItem("token", data.signup.token);
        localStorage.setItem("user", JSON.stringify(data.signup.user));
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" />
      </div>
      {error && <p className="error-msg" style={{ marginBottom: 12 }}>{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
