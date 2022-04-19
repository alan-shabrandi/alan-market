import { useEffect } from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/profile/personal-info");
  }, [router]);
  return null;
};

export default Profile;
