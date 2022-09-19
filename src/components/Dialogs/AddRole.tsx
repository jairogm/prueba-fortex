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
export default function AddRoleDialog({ groups }: Props) {
  const API_URL = "https://demo-api-work-test.herokuapp.com";

  const [open, setOpen] = useState(false);
  const [currentRoles, setCurrentRoles] = useState<Group["people"]>([]);

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
    const activeRoles = groups.roles.filter((role) => role.active && role.id);

    const oldRolesArray = activeRoles.map((role) => role.id);
    const newRolesArray = [...oldRolesArray, id];

    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    const unActiveRoles = groups.roles.filter(
      (role) => !role.active && role.id
    );
    console.log(unActiveRoles.length);
    if (unActiveRoles.length === 1) {
      handleClose();
    }

    return axios
      .post(
        `${API_URL}/group/manage-roles`,
        {
          groupId: groupId,
          oldValues: oldRolesArray,
          newValues: newRolesArray,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((res) => {
        setSuccessAlert(true);
        setAlertMessage("Role added correctly");
      });
  };

  useEffect(() => {
    const unActiveRoles = groups.roles.filter(
      (role) => !role.active && role.id
    );
    setCurrentRoles(unActiveRoles);
  }, [open, successAlert]);

  return (
    <div>
      <Button onClick={handleClickOpen} startIcon={<AddIcon />} size="small">
        Add Role
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Role"}</DialogTitle>
        <DialogContent>
          <Box id="alert-dialog-description">
            {currentRoles.length <= 0 ? (
              <Alert severity="info">All roles have been asigned</Alert>
            ) : (
              <Alert severity="info">Click a role to added it</Alert>
            )}
          </Box>
          <Box>
            {groups.roles.map((role) => (
              <Box key={role.id}>
                {!role.active && (
                  <Chip
                    label={role.name}
                    variant="outlined"
                    size="small"
                    onClick={() => handleAdd(groups.id, role.id)}
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
