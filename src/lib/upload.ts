import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  UPLOAD_MAX_SIZE,
  UPLOAD_ALLOWED_TYPES,
  UPLOAD_DIR,
} from "./constants";

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  // Validate size
  if (file.size > UPLOAD_MAX_SIZE) {
    return {
      success: false,
      error: "Archivo demasiado grande (máx 5MB)",
    };
  }

  // Validate type
  if (!UPLOAD_ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Formato no soportado. Usar jpg, png o webp",
    };
  }

  // Generate unique filename
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${uuidv4()}.${ext}`;
  const uploadDir = path.resolve(UPLOAD_DIR);

  // Ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filepath = path.join(uploadDir, filename);

  // Convert File to Buffer and write
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filepath, buffer);

  return {
    success: true,
    url: `/uploads/productos/${filename}`,
  };
}
