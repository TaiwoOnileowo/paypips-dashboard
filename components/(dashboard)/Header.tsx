import { auth } from "@/auth";
import ClientHeader from "./Client/Header";
import EmployeeHeader from "./Employee/Header";
const Header = async () => {
  const session = await auth();
  if (!session) return null;
  const role = session.user.role;
  const isClient = role === "client";
  return isClient ? (
    <ClientHeader session={session} />
  ) : (
    <EmployeeHeader session={session} />
  );
};

export default Header;
