export const dynamic = "force-dynamic";

import LoginForm from "@/components/ui/LoginForm";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return <LoginForm />;
}
