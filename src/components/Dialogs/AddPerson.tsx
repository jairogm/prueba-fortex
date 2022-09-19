//react
import { useContext, useEffect, useState } from "react";

//material-ui
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { Alert, Chip } from "@mui/material";

//types
import { Group, GroupContextType } from "../../Types.d";

//axios
import axios from "axios";

//Context
import { GroupContext } from "../../context/GroupContext";

//types
interface Props {
  groups: Group;
}
export default function AddPersonDialog({ groups }: Props) {
  const API_URL = "https://demo-api-work-test.herokuapp.com";

  const [open, setOpen] = useState(false);
  const [currentPeople, setCurrentPeople] = useState<Group["people"]>([]);

  const { successAlert, setAlertMessage, setSuccessAlert } = useContext(
    GroupContext
  ) as GroupContextType;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (groupId: string, id: string) => {
    const activePeople = groups.people.filter((person) => person.active && person.id);

    const oldPersonArray = activePeople.map((person) => person.id);
    const newPersonArray = [...oldPersonArray, id];

    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    const unActivePeople = groups.people.filter(
      (person) => !person.active && person.id
    );
    console.log(unActivePeople.length);
    if (unActivePeople.length === 1) {
      handleClose();
    }

    return axios
      .post(
        `${API_URL}/group/manage-members`,
        {
          groupId: groupId,
          oldValues: oldPersonArray,
          newValues: newPersonArray,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((res) => {
        setSuccessAlert(true);
        setAlertMessage("person added correctly");
      });
  };

  useEffect(() => {
    const unActivePeople = groups.people.filter(
      (person) => !person.active && person.id
    );
    setCurrentPeople(unActivePeople);
  }, [open, successAlert]);

  return (
    <div>
      <Button onClick={handleClickOpen} startIcon={<AddIcon />} size="small">
        Add person
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add person"}</DialogTitle>
        <DialogContent>
          <Box id="alert-dialog-description">
            {currentPeople.length <= 0 ? (
              <Alert severity="info">All people have been asigned</Alert>
            ) : (
              <Alert severity="info">Click a person to added it</Alert>
            )}
          </Box>
          <Box>
            {groups.people.map((person) => (
              <Box key={person.id}>
                {!person.active && (
                  <Chip
                    label={person.name}
                    variant="outlined"
                    size="small"
                    onClick={() => handleAdd(groups.id, person.id)}
                  />
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
