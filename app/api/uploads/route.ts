import { NextRequest, NextResponse } from "next/server";
import { FileUploadHandler } from "nextjs-file-master";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const result = await FileUploadHandler.upload(request, {
      maxFileSize: 5,
      convertToWebP: true,
      quality: 80,
      allowedDocTypes: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, files: result.files });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
