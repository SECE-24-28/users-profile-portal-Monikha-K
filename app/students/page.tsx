"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import gql from "graphql-tag";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudentCard from "@/components/StudentCard";
import StudentTable from "@/components/StudentTable";
import "@/styles/students.css";
import { Student } from "@/types";

const GET_STUDENTS = gql`
  query { students { id name email age department image createdAt } }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) { deleteStudent(id: $id) }
`;

interface StudentsData { students: Student[] }

export default function StudentsPage() {
  const { data, loading, refetch } = useQuery<StudentsData>(GET_STUDENTS);
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  const [view, setView] = useState<"grid" | "table">("grid");
  const students = data?.students || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this student?")) return;
    await deleteStudent({ variables: { id } });
    refetch();
  };

  return (
    <ProtectedRoute>
      <div className="page-header">
        <h1>Students</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className={`btn btn-sm ${view === "grid" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setView("grid")}
          >Grid</button>
          <button
            className={`btn btn-sm ${view === "table" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setView("table")}
          >Table</button>
          <Link href="/students/create" className="btn btn-primary btn-sm">+ Add Student</Link>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading students...</div>
      ) : students.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "48px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
          <p style={{ color: "#6b7280", marginBottom: 16 }}>No students found</p>
          <Link href="/students/create" className="btn btn-primary">Add First Student</Link>
        </div>
      ) : view === "grid" ? (
        <div className="students-grid">
          {students.map(s => <StudentCard key={s.id} student={s} onDelete={handleDelete} />)}
        </div>
      ) : (
        <StudentTable students={students} onDelete={handleDelete} />
      )}
    </ProtectedRoute>
  );
}
