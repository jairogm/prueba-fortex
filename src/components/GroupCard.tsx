//Material-ui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuDialog from "./Dialogs/Menu";
import { Button, Chip, Stack } from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DeleteForever } from "@mui/icons-material";

//types
import { Group, GroupContextType } from "../Types.d";

//context
import { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContext";

//axios
import axios from "axios";

//components
import AddRoleDialog from "./Dialogs/AddRole";
import AddPersonDialog from "./Dialogs/AddPerson";
import AddGroup from "./Dialogs/AddGroup";

interface Props {
  groups: Group;
}

export default function GroupCard({ groups }: Props) {
  const API_URL = "https://demo-api-work-test.herokuapp.com";

  const [expanded, setExpanded] = useState(false);
  const { setAlertMessage, setSuccessAlert } = useContext(GroupContext) as GroupContextType;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (groups: Group, roleId: string) => {
    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    const OldRolesArray = groups.roles.map((role) =>
      role.active ? role.id : null
    );
    const newRolesArray = OldRolesArray.filter(
      (newRoles) => !newRoles?.includes(roleId)
    );

    return axios
      .post(
        `${API_URL}/group/manage-roles`,
        {
          groupId: groups.id,
          oldValues: OldRolesArray,
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
        setAlertMessage("Role Deleted Correctly");
      });
  };

  const handleDeletePerson = (groups: Group, personId: string) => {
    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    const oldPeopleArray = groups.people.map((person) =>
      person.active ? person.id : null
    );

    const unActivePeople = groups.people.filter(
      (person) => !person.active && person.id
    );

    const newPeopleArray = oldPeopleArray.filter(
      (newRoles) => !newRoles?.includes(personId)
    );

    return axios
      .post(
        `${API_URL}/group/manage-members`,
        {
          groupId: groups.id,
          oldValues: oldPeopleArray,
          newValues: newPeopleArray,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      )
      .then((res) => {
        setSuccessAlert(true);
        setAlertMessage("Person Deleted Correctly");
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Card sx={{ width: 800 }}>
      <CardHeader action={<MenuDialog groups={groups} />} title={groups.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {groups.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          Roles:{" "}
          {groups.roles.map((role) => (
            <Box key={role.id}>
              {role.active && (
                <Chip
                  label={role.name}
                  variant="outlined"
                  size="small"
                  onDelete={() => handleDelete(groups, role.id)}
                />
              )}
            </Box>
          ))}
          <AddRoleDialog groups={groups} />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          endIcon={<ExpandMoreIcon />}
          onClick={handleExpandClick}
          sx={{
            "&:hover": {
              backgroundColor: "transparent !important",
            },
          }}
        >
          View people on this group
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <AddPersonDialog groups={groups} />
          <Stack spacing={2}>
            {groups.people.map((person) => (
              <Box key={person.id}>
                {person.active && (
                  <Item>
                    {person.name}
                    <Box>
                      <Button
                        onClick={() => handleDeletePerson(groups, person.id)}
                      >
                        <DeleteForever />
                      </Button>
                    </Box>
                  </Item>
                )}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
