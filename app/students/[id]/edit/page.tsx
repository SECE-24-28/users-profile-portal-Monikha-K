"use client";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudentForm from "@/components/StudentForm";
import "@/styles/students.css";
import { Student } from "@/types";

const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) { id name email age department image createdAt }
  }
`;

interface StudentData { student: Student | null }

export default function EditStudentPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery<StudentData>(GET_STUDENT, { variables: { id } });

  return (
    <ProtectedRoute>
      <div className="page-header">
        <h1>Edit Student</h1>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : !data?.student ? (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>Student not found.</div>
      ) : (
        <StudentForm student={data.student} />
      )}
    </ProtectedRoute>
  );
}
