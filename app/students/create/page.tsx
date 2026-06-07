import ProtectedRoute from "@/components/ProtectedRoute";
import StudentForm from "@/components/StudentForm";
import "@/styles/students.css";

export default function CreateStudentPage() {
  return (
    <ProtectedRoute>
      <div className="page-header">
        <h1>Add New Student</h1>
      </div>
      <StudentForm />
    </ProtectedRoute>
  );
}
