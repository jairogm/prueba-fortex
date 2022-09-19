//material-ui
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteForeverRounded } from "@mui/icons-material";
import { Group, GroupContextType } from "../../Types.d";

//axios
import axios from "axios";
//react
import { useContext, useState } from "react";
//context
import { GroupContext } from "../../context/GroupContext";

interface Props {
  groups: Group;
}
export default function DeleteGroupDialog({ groups }: Props) {
  const API_URL = "https://demo-api-work-test.herokuapp.com";

  const [open, setOpen] = useState(false);
  const { setAlertMessage, setSuccessAlert } = useContext(
    GroupContext
  ) as GroupContextType;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    return axios
      .delete(
        `${API_URL}/group/delete/?id=${id}`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((res) => {
        setSuccessAlert(true);
        setAlertMessage("Group Deleted Correctly");
        handleClose();
      });
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<DeleteForeverRounded />}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        Delete Group
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this group?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this group will erase it permantly, this action cannot be
            reverse
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(groups.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
