import { fetchNotes, selectNote, getProfileImage } from "@/actions";
import { auth } from "@/auth";
import LeftSidebar from "@/components/ui/LeftSidebar";
import HomeForm from "@/components/ui/HomeForm";

export default async function Page({ params, searchParams }) {
  const session = await auth();

  if (!session) {
    return "You need to login";
  }

  const username = session?.user?.username;
  const userId = session?.user?.id;

  console.log(session);

  // const { userId } = await params;
  const notes = await fetchNotes(userId);

  const { id } = await searchParams;
  const noteId = id ? parseInt(id, 10) : null;
  let currentNote = null;
  const profileImage = JSON.stringify(await getProfileImage(userId));

  if (noteId) {
    currentNote = await selectNote(noteId);
  }

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
      <HomeForm username={username} />
    </div>
  );
}
