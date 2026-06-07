"use client";
import { useQuery, useMutation } from "@apollo/client/react";
import gql from "graphql-tag";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/styles/students.css";
import { Student } from "@/types";

const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) { id name email age department image createdAt }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) { deleteStudent(id: $id) }
`;

interface StudentData { student: Student | null }

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, loading } = useQuery<StudentData>(GET_STUDENT, { variables: { id } });
  const [deleteStudent] = useMutation(DELETE_STUDENT);

  const handleDelete = async () => {
    if (!confirm("Delete this student?")) return;
    await deleteStudent({ variables: { id } });
    router.push("/students");
  };

  const s = data?.student;

  return (
    <ProtectedRoute>
      <div className="page-header">
        <h1>Student Details</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/students" className="btn btn-secondary btn-sm">← Back</Link>
          {s && <Link href={`/students/${id}/edit`} className="btn btn-outline btn-sm">Edit</Link>}
          {s && <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : !s ? (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <p>Student not found.</p>
        </div>
      ) : (
        <div className="student-detail card">
          <div className="student-detail-header">
            <Image
              src={s.image || "/default-avatar.svg"}
              alt={s.name}
              width={100}
              height={100}
              className="student-detail-img"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <div className="detail-info">
              <h2>{s.name}</h2>
              <p>{s.email}</p>
              <span className="badge" style={{ marginTop: 6 }}>{s.department}</span>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: "20px 0" }} />

          <div className="detail-grid">
            <div className="detail-item">
              <label>Full Name</label>
              <p>{s.name}</p>
            </div>
            <div className="detail-item">
              <label>Email Address</label>
              <p>{s.email}</p>
            </div>
            <div className="detail-item">
              <label>Age</label>
              <p>{s.age} years</p>
            </div>
            <div className="detail-item">
              <label>Department</label>
              <p>{s.department}</p>
            </div>
            <div className="detail-item">
              <label>Member Since</label>
              <p>{new Date(parseInt(s.createdAt)).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric"
              })}</p>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
