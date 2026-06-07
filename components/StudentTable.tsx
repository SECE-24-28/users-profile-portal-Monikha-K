"use client";
import Link from "next/link";
import Image from "next/image";
import { Student } from "@/types";

interface Props {
  students: Student[];
  onDelete: (id: string) => void;
}

export default function StudentTable({ students, onDelete }: Props) {
  return (
    <div className="student-table-wrap card">
      <table className="student-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>
                <Image
                  src={s.image || "/default-avatar.svg"}
                  alt={s.name}
                  width={36}
                  height={36}
                  className="table-avatar"
                />
              </td>
              <td style={{ fontWeight: 500 }}>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td><span className="badge">{s.department}</span></td>
              <td>
                <div className="table-actions">
                  <Link href={`/students/${s.id}`} className="btn btn-outline btn-sm">View</Link>
                  <Link href={`/students/${s.id}/edit`} className="btn btn-secondary btn-sm">Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(s.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
