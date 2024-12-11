import LeftSidebar from "@/components/ui/LeftSidebar";
import ProfileForm from "@/components/ui/ProfileForm";
import { fetchNotes, getProfileImage } from "@/actions";
import { auth } from "@/auth";

export default async function Page({ searchParams }) {
  const session = await auth();

  if (!session) {
    return "You need to login";
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
      <ProfileForm userId={userId} username={username}></ProfileForm>
    </div>
  );
}
