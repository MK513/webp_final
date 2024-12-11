import { auth } from "@/auth";
import ConfigForm from "@/components/ui/ConfigForm";
import LeftSidebar from "@/components/ui/LeftSidebar";
import { fetchNotes, getProfileImage } from "@/actions";

export default async function Page({ searchParams }) {
  const session = await auth();

  if (!session) {
    return (
      <div className='flex'>
        <ConfigForm />
      </div>
    );
  }

  const username = session?.user?.username;
  const userId = session?.user?.id;
  const { id } = await searchParams;

  const notes = await fetchNotes(userId);
  const noteId = id ? parseInt(id, 10) : null;
  const profileImage = JSON.stringify(await getProfileImage(userId));

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
      <ConfigForm />
    </div>
  );
}
