"use client";
import { useRef } from "react";
import Image from "next/image";

interface Props {
  value?: string;
  onChange: (base64: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload-box" onClick={() => inputRef.current?.click()}>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} onClick={e => e.stopPropagation()} />
      {value ? (
        <Image src={value} alt="Preview" width={160} height={160} style={{ objectFit: "cover", borderRadius: 8, maxWidth: 160, maxHeight: 160 }} />
      ) : (
        <>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📷</div>
          <p>Click to upload profile image</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>PNG, JPG, JPEG up to 5MB</p>
        </>
      )}
    </div>
  );
}
