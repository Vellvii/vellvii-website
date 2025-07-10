import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import UserProfileView from "./UserProfileView";

const UserMenu = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <>
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowProfile(true)}
          className="text-white hover:bg-white/10 px-2 sm:px-3"
        >
          <User className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Profile</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="text-white hover:bg-white/10 px-2 sm:px-3"
        >
          <LogOut className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>

      {showProfile && (
        <UserProfileView user={user} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default UserMenu;