"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import gql from "graphql-tag";
import ImageUpload from "./ImageUpload";
import { Student } from "@/types";

const CREATE_STUDENT = gql`
  mutation CreateStudent($name: String!, $email: String!, $age: Int!, $department: String!, $image: String) {
    createStudent(name: $name, email: $email, age: $age, department: $department, image: $image) {
      id
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $name: String, $email: String, $age: Int, $department: String, $image: String) {
    updateStudent(id: $id, name: $name, email: $email, age: $age, department: $department, image: $image) {
      id
    }
  }
`;

interface Props {
  student?: Student;
}

export default function StudentForm({ student }: Props) {
  const router = useRouter();
  const isEdit = !!student;

  const [form, setForm] = useState({
    name: student?.name || "",
    email: student?.email || "",
    age: student?.age?.toString() || "",
    department: student?.department || "",
  });
  const [image, setImage] = useState<string>(student?.image || "");
  const [error, setError] = useState("");

  const [createStudent, { loading: creating }] = useMutation(CREATE_STUDENT);
  const [updateStudent, { loading: updating }] = useMutation(UPDATE_STUDENT);

  const loading = creating || updating;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.age || !form.department) {
      setError("All fields are required");
      return;
    }
    try {
      const vars = {
        name: form.name,
        email: form.email,
        age: parseInt(form.age),
        department: form.department,
        image: image && image.startsWith("data:") ? image : undefined,
      };
      if (isEdit) {
        await updateStudent({ variables: { id: student!.id, ...vars } });
      } else {
        await createStudent({ variables: vars });
      }
      router.push("/students");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const previewSrc = image && image.startsWith("data:") ? image : image || undefined;

  return (
    <form className="student-form card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Profile Image</label>
        <ImageUpload value={previewSrc} onChange={setImage} />
      </div>

      <div className="form-group">
        <label>Full Name</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
      </div>

      <div className="form-group">
        <label>Age</label>
        <input name="age" type="number" min="1" max="100" value={form.age} onChange={handleChange} placeholder="Enter age" />
      </div>

      <div className="form-group">
        <label>Department</label>
        <select name="department" value={form.department} onChange={handleChange}>
          <option value="">Select department</option>
          {["Computer Science", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Business", "Arts"].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {error && <p className="error-msg">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Student" : "Add Student"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
