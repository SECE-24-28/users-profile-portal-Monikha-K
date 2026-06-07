"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import gql from "graphql-tag";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { id name email }
    }
  }
`;

interface LoginData {
  login: { token: string; user: { id: string; name: string; email: string } };
}

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [login, { loading }] = useMutation<LoginData>(LOGIN);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("All fields are required"); return; }
    try {
      const { data } = await login({ variables: form });
      if (data) {
        localStorage.setItem("token", data.login.token);
        localStorage.setItem("user", JSON.stringify(data.login.user));
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" />
      </div>
      {error && <p className="error-msg" style={{ marginBottom: 12 }}>{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
