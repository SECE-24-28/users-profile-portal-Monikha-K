import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function saveBase64Image(base64Data: string): string {
  ensureUploadDir();
  const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid image data");

  const ext = matches[1].split("/")[1];
  const filename = `${uuidv4()}.${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  fs.writeFileSync(filepath, Buffer.from(matches[2], "base64"));
  return `/uploads/${filename}`;
}

export function deleteImage(imagePath: string) {
  if (!imagePath) return;
  const fullPath = path.join(process.cwd(), "public", imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}
