"use client";
import Link from "next/link";
import Image from "next/image";
import { Student } from "@/types";

interface Props {
  student: Student;
  onDelete: (id: string) => void;
}

export default function StudentCard({ student, onDelete }: Props) {
  return (
    <div className="student-card">
      <Image
        src={student.image || "/default-avatar.svg"}
        alt={student.name}
        width={400}
        height={180}
        className="student-card-img"
        style={{ objectFit: "cover" }}
      />
      <div className="student-card-body">
        <h3>{student.name}</h3>
        <p>{student.email}</p>
        <span className="badge">{student.department}</span>
        <div className="student-card-actions" style={{ marginTop: 12 }}>
          <Link href={`/students/${student.id}`} className="btn btn-outline btn-sm">View</Link>
          <Link href={`/students/${student.id}/edit`} className="btn btn-secondary btn-sm">Edit</Link>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(student.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
