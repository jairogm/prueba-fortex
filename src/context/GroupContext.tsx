import { createContext, useState } from "react";
import { Group, GroupContextType } from "../Types.d";

export const GroupContext = createContext<GroupContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const GroupProvider: React.FC<Props> = ({ children }) => {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")
  return (
    <GroupContext.Provider
      value={{ groupList, setGroupList, successAlert, setSuccessAlert, alertMessage, setAlertMessage }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;
