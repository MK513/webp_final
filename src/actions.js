"use server";
import db from "./db";
import bcrypt from "bcryptjs";

export const addMusicToNote = async (noteId, filePath, fileName) => {
  // console.log(noteId, filePath, fileName);
  const publicPath = convertToPublicPath(filePath);

  // console.log(publicPath);

  await db.music.create({
    data: {
      filePath: publicPath,
      fileName: fileName,
      noteId: parseInt(noteId),
    },
  });
};

export const deleteMusicFromNote = async (musicId) => {
  await db.music.delete({
    where: { id: parseInt(musicId) },
  });
};

const convertToPublicPath = (absolutePath) => {
  // 'public' 이후의 경로만 가져오기
  const publicIndex = absolutePath.indexOf("public");
  if (publicIndex === -1) {
    throw new Error("경로에 'public' 폴더가 포함되어 있지 않습니다.");
  }

  // 'public' 이후 경로를 추출하고 슬래시로 변환
  const relativePath = absolutePath.slice(publicIndex + "public".length);
  return relativePath.replace(/\\/g, "/"); // 윈도우 경로의 \를 /로 변환
};

export const fetchMusics = async (userId, noteId) => {
  // console.log("Userid, noteId", userId, noteId);
  const note = await db.note.findUnique({
    where: {
      id: parseInt(noteId),
      userId: parseInt(userId),
    },
    include: {
      musics: true, // 관련된 musics 데이터를 함께 가져옴
    },
  });

  const musics = note.musics ? note.musics : [];
  return musics;
};

export const fetchComments = async (userId, noteId) => {
  const notes = await db.note.findMany({
    where: {
      userId: parseInt(userId),
      id: parseInt(noteId),
    },
    include: {
      contents: {
        include: {
          comments: true,
        },
      },
    },
  });

  return notes.length > 0
    ? notes[0].contents.flatMap((content) =>
        content.comments.map((comment) => ({
          ...comment,
          createdAt: comment.createdAt.toString(), // createdAt을 문자열로 변환
        }))
      )
    : [];
};

export const createComment = async (userId, noteId, commentValue) => {
  // Ensure the userId and noteId are valid and related
  const note = await db.note.findUnique({
    where: { id: parseInt(noteId) },
    include: {
      contents: true,
    },
  });

  if (!note || note.userId !== parseInt(userId)) {
    throw new Error("Note not found or user is not authorized to comment.");
  }

  // Find the associated content (assuming a single content per note for simplicity)
  const content = note.contents[0];

  if (!content) {
    throw new Error("Content not found for the specified note.");
  }

  console.log("content", content);

  // Create the comment
  const comment = await db.comment.create({
    data: {
      value: commentValue,
      contentId: content.id,
    },
  });

  return comment;
};

export const deleteComment = async (userId, noteId, commentId) => {
  // 노트가 해당 사용자에게 속하는지 확인
  const note = await db.note.findUnique({
    where: { id: parseInt(noteId) },
    include: {
      contents: {
        include: {
          comments: true,
        },
      },
    },
  });

  // 노트가 없거나 사용자 ID가 일치하지 않으면 에러 반환
  if (!note || note.userId !== parseInt(userId)) {
    throw new Error(
      "Note not found or user is not authorized to delete this comment."
    );
  }

  // 댓글이 해당 콘텐츠에 속하는지 확인
  const commentExists = note.contents.some((content) =>
    content.comments.some((comment) => comment.id === parseInt(commentId))
  );

  if (!commentExists) {
    throw new Error(
      "Comment not found or does not belong to the specified note."
    );
  }

  // 댓글 삭제
  await db.comment.delete({
    where: { id: parseInt(commentId) },
  });

  return { success: true, message: "Comment deleted successfully." };
};

export const fetchNotes = async (userId) => {
  const notes = await db.note.findMany({
    where: { userId: parseInt(userId) },
    orderBy: [
      { isFavorite: "desc" }, // 즐겨찾기된 노트가 상단에 오도록 정렬
      { createdAt: "asc" },
    ],
  });
  return notes;
};

export const searchNotesByContent = async (userId, word) => {
  const notes = await db.note.findMany({
    where: {
      userId: parseInt(userId),
      contents: {
        some: {
          value: {
            contains: word, // `word`가 포함된 Content 검색
          },
        },
      },
    },
    include: {
      contents: true, // 연결된 Content 반환
    },
  });
  return notes;
};

export const toggleFavorite = async (userId, noteId) => {
  const targetNote = await db.note.findUnique({
    where: { userId: parseInt(userId), id: parseInt(noteId) },
    select: { isFavorite: true }, // isFavorite 값만 가져옴
  });

  if (targetNote === null) {
    throw new Error("Note not found");
  }

  await db.note.update({
    where: { userId: parseInt(userId), id: parseInt(noteId) },
    data: { isFavorite: !targetNote.isFavorite },
  });
};

export const updateTitle = async (id, title) => {
  await db.note.update({
    where: { id: parseInt(id) },
    data: {
      title: `${title}`, // ID를 포함한 title 업데이트
    },
  });
  return;
};

export const updateContent = async (id, content) => {
  await db.content.update({
    where: { noteId: parseInt(id) },
    data: {
      value: `${content}`, // ID를 포함한 title 업데이트
    },
  });
  return;
};

export const selectNote = async (id) => {
  const note = await db.note.findUnique({
    where: { id: parseInt(id) },
    include: {
      contents: true, // 연결된 Content 반환
    },
  });

  if (!note) {
    throw new Error("No note found with given id");
  }

  return note;
};

export const createNote = async (noteCnt, userId) => {
  console.log("noteCnt:", noteCnt, "userId:", userId);

  const newNote = {
    title: `Untitled ${noteCnt}`,
    userId: parseInt(userId),
    contents: {
      create: [
        {
          type: "p",
          value: "Start writing your note here...",
        },
      ],
    },
  };

  console.log("newNote:", newNote);

  try {
    const createdNote = await db.note.create({
      data: newNote,
      include: {
        contents: true,
      },
    });

    return createdNote;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Note");
  }
};

export const deleteNote = async (id) => {
  try {
    const noteId = Number(id);
    if (isNaN(noteId)) {
      throw new Error("Invalid ID provided");
    }

    // 데이터 삭제
    await db.note.delete({
      where: { id: noteId },
      include: {
        contents: true, // 연결된 Content 반환
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Note");
  }
};

export const createSeed = async () => {
  const data = [
    {
      title: "First Note",
      contents: {
        type: "p",
        value: "This is the first note.",
      },
    },
    {
      title: "Second Note",
      contents: {
        type: "p",
        value: "This is the second note.",
      },
    },
  ];

  for (const note of data) {
    await db.note.create({
      data: {
        title: note.title,
        contents: {
          create: [
            {
              type: note.contents.type,
              value: note.contents.value,
            },
          ],
        },
      },
    });
  }

  console.log("Seeding completed!");
};

export const registerUser = async (name, id, pw) => {
  try {
    const hashedPassword = await bcrypt.hash(pw, 10);

    const newUser = await db.user.create({
      data: {
        username: name,
        userLoginId: id,
        password: hashedPassword,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to register user.");
  }
};

// 사용자 프로필 이미지 업데이트 함수
export const updateProfileImage = async (userId, file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Buffer로 변환

    // const buffer = fs.readFileSync(imageData.filepath);

    console.log("USERID", userId);
    console.log("imageData", buffer.length);
    await db.user.update({
      where: { id: parseInt(userId) },
      data: { profileImage: buffer },
    });
  } catch (error) {
    console.error("Failed to update profile image:", error);
    throw new Error("Database update failed");
  }
};

// 사용자 프로필 이미지 get 함수
export const getProfileImage = async (userId) => {
  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
    });

    // console.log("user get", user, userId);

    if (user) {
      return user.profileImage;
    } else {
      return null;
    }

  } catch (error) {
    console.error("Failed to update profile image:", error);
    throw new Error("Database update failed");
  }
};
