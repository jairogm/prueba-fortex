//react
import { useContext, useEffect } from "react";

//material-ui
import { Alert, Snackbar } from "@mui/material";
import { Box } from "@mui/system";

//axios
import axios from "axios";

//context
import { GroupContext } from "../../context/GroupContext";

//types
import { GroupContextType, GroupResponseApi } from "../../Types.d";

//components
import GroupCard from "../GroupCard";

//styles
import "./Home.css";
import AddGroup from "../Dialogs/AddGroup";


export default function Home() {
  const API_URL = "https://demo-api-work-test.herokuapp.com";

  const {
    groupList,
    successAlert,
    alertMessage,
    setGroupList,
    setSuccessAlert,
  } = useContext(GroupContext) as GroupContextType;

  const getGroupList = () => {
    const accessToken = JSON.parse(localStorage.getItem("token") || "{}");
    return axios
      .get<GroupResponseApi>(API_URL + "/group", {
        headers: {
          authorization: accessToken,
        },
      })
      .then((res) => {
        setGroupList(res.data.groups);
      });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessAlert(false);
  };

  useEffect(() => {
    getGroupList();
  }, [successAlert]);

  return (
    <>
      {successAlert && (
        <Snackbar
          open={successAlert}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      )}
      <Box sx={{display: "flex", justifyContent: "center", alignItem: "center"}}>
      <AddGroup/>
      </Box>
      <Box className="group__container">
    
    
        {groupList.map((group) => {
          return <GroupCard key={group.id} groups={group} />;
        })}
      </Box>
    </>
  );
}
