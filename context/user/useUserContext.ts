import { useContext } from "react";
import { UserContext } from "./UserContext";
import { UserContextType } from "@/types/user";

const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default useUserContext;