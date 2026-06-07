"use client";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/styles/dashboard.css";
import { Student } from "@/types";

const GET_STUDENTS = gql`
  query { students { id name email department image } }
`;

interface StudentsData { students: Student[] }

export default function DashboardPage() {
  const { data, loading } = useQuery<StudentsData>(GET_STUDENTS);
  const students = data?.students || [];

  const deptCount = students.reduce((acc: Record<string, number>, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <ProtectedRoute>
      <div className="page-header">
        <h1>Dashboard</h1>
        <Link href="/students/create" className="btn btn-primary">+ Add Student</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{loading ? "..." : students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏛️</div>
          <div className="stat-info">
            <h3>{loading ? "..." : Object.keys(deptCount).length}</h3>
            <p>Departments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🖼️</div>
          <div className="stat-info">
            <h3>{loading ? "..." : students.filter(s => s.image).length}</h3>
            <p>With Photos</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Students</h2>
          <Link href="/students" className="btn btn-outline btn-sm">View All</Link>
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : students.length === 0 ? (
          <p style={{ color: "#6b7280", textAlign: "center", padding: "24px 0" }}>
            No students yet. <Link href="/students/create" style={{ color: "#2563eb" }}>Add the first one!</Link>
          </p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td>{s.email}</td>
                  <td><span className="badge">{s.department}</span></td>
                  <td>
                    <Link href={`/students/${s.id}`} className="btn btn-outline btn-sm">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
}
