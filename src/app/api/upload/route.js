import fs from "fs";
import path from "path";
import { addMusicToNote, deleteMusicFromNote } from "@/actions";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const formData = await request.formData();
    const musicData = formData.get("music"); // `file` 필드에서 파일 가져오기
    const music = JSON.parse(musicData);

    console.log("MUSIC", music);
    console.log("MUSICID", music.id);

    if (!music) {
      return NextResponse.json({ error: "No music provided" }, { status: 400 });
    }

    const fullFilePath = path.join(process.cwd(), "public", music.filePath);

    // console.log("MUSIC FILEPATH", music.filePath);

    try {
      // 파일 저장
      fs.unlinkSync(fullFilePath);
    } catch (error) {
      console.error("File write error:", error);
      return NextResponse.json(
        { error: "Failed to remove the file" },
        { status: 500 }
      );
    }

    try {
      // 데이터베이스 연동 (addMusicToNote 함수 호출)
      await deleteMusicFromNote(music.id);
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to delete file information to the database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file"); // `file` 필드에서 파일 가져오기
    const noteId = formData.get("noteId"); // `file` 필드에서 파일 가져오기

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer(); // 파일 내용을 ArrayBuffer로 변환
    const buffer = Buffer.from(arrayBuffer); // Node.js Buffer로 변환

    const uploadDir = path.join(process.cwd(), "/public/music");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueFileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    try {
      // 파일 저장
      fs.writeFileSync(filePath, buffer);
    } catch (error) {
      console.error("File write error:", error);
      return NextResponse.json(
        { error: "Failed to save the file" },
        { status: 500 }
      );
    }

    try {
      // 데이터베이스 연동 (addMusicToNote 함수 호출)
      await addMusicToNote(noteId, filePath, file.name);
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save file information to the database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
