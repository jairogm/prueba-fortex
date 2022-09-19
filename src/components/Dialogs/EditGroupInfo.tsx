//react
import React, { useContext, useEffect, useState } from "react";

//Material-ui
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Edit from "@mui/icons-material/Edit";

//axios
import axios from "axios";

//types
import { Group, GroupContextType } from "../../Types.d";

//context
import { GroupContext } from "../../context/GroupContext";
import { Alert } from "@mui/material";

interface Props {
  groups: Group;
}

export default function EditGroupInfo({ groups }: Props) {
  const API_URL = "https://demo-api-work-test.herokuapp.com";

  const { groupList, setAlertMessage, setSuccessAlert } = useContext(
    GroupContext
  ) as GroupContextType;

  const [open, setOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    description: "",
  });

  const [isNameTaken, setIsNameTaken] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (id: string) => {
    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    return axios
      .patch(
        `${API_URL}/group/update/?id=${id}`,
        {
          name: inputValues.name !== "" ? inputValues.name : groups.name,
          description:
            inputValues.description !== ""
              ? inputValues.description
              : groups.description,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((res) => {
        setSuccessAlert(true);
        setAlertMessage("Group Updated Correctly");
        handleClose();
      });
  };

  useEffect(() => {
    console.log(inputValues);
    const result = groupList.filter((group) => group.name === inputValues.name);
    if (result.length > 0) {
      console.log("Name Taken");
      setIsNameTaken(true);
    } else {
      setIsNameTaken(false);
    }
  }, [inputValues]);

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<Edit />}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        Edit Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Group Information</DialogTitle>
        <DialogContent>
          <form onSubmit={() => handleSave(groups.id)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Group Name"
              type="text"
              fullWidth
              variant="standard"
              value={inputValues.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              multiline
              margin="dense"
              id="description"
              name="description"
              label="Group Description"
              type="text"
              fullWidth
              variant="standard"
              value={inputValues.description}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSave(groups.id)} disabled={isNameTaken}>
            Save
          </Button>
        </DialogActions>
        {isNameTaken && (
          <Alert severity="error">Name is taken, Use a different one</Alert>
        )}
      </Dialog>
    </div>
  );
}
