import React from "react";

export interface User {
  email: string
  password: string
}


export interface GroupResponseApi{
  groups: Group[]
}
export interface Group {
  description: string;
  id:          string;
  members:     number;
  name:        string;
  people:      Person[];
  roles:       Person[];
  type:        boolean;
 }
 
 export interface Person {
  active: boolean;
  id:     string;
  name:   string;
 }


 export type GroupContextType = {
  groupList: Group[];
  setGroupList: React.Dispatch<React.SetStateAction<Group[]>>
  successAlert: boolean
  setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>
  alertMessage: string
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>
};

