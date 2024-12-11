import NoteForm from "@/components/ui/NoteForm";
import {
  fetchNotes,
  fetchMusics,
  fetchComments,
  selectNote,
  getProfileImage,
} from "@/actions";
import { auth } from "@/auth";
import LeftSidebar from "@/components/ui/LeftSidebar";

export default async function Page({ searchParams }) {
  const session = await auth();

  if (!session) {
    return "You need to login";
  }

  const username = session?.user?.username;
  const userId = session?.user?.id;

  // console.log(session);

  const notes = await fetchNotes(userId);

  const { id } = await searchParams;
  const noteId = id ? parseInt(id, 10) : null;
  const profileImage = JSON.stringify(await getProfileImage(userId));

  const currentNote = noteId ? await selectNote(noteId) : null;

  const comments = await fetchComments(userId, noteId);
  const musics = await fetchMusics(userId, noteId);

  return (
    <div className='flex'>
      {/* LeftSidebar */}
      <LeftSidebar
        userId={userId}
        username={username}
        noteId={noteId}
        notes={notes}
        profileImage={profileImage}
      />
      <NoteForm
        currentNote={currentNote}
        userId={userId}
        username={username}
        noteId={noteId}
        notes={notes}
        profileImage={profileImage}
        comments={comments}
        musics={musics}
      />
    </div>
  );
}
