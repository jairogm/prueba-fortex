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
import { Add } from "@mui/icons-material";

export default function AddGroup() {
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

  const handleSave = () => {
    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    return axios
      .post(
        `${API_URL}/group/create`,
        {
          name: inputValues.name,
          description: inputValues.description,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSuccessAlert(true);
        setAlertMessage("Group Creacted Succesfully");
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
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<Add />}
      >
        Add Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <form onSubmit={() => handleSave()}>
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
          <Button onClick={() => handleSave()} disabled={isNameTaken}>
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
