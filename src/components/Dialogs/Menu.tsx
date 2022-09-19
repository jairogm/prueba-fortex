//react
import { useState } from "react";

//material-ui
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditGroupInfo from "./EditGroupInfo";

//types
import { Group } from "../../Types.d";
import DeleteGroupDialog from "./DeleteGroup";

interface Props {
  groups: Group;
}
export default function MenuDialog({ groups }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="settings"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem disableRipple>
          <EditGroupInfo groups={groups} />
        </MenuItem>
        <MenuItem disableRipple>
          <DeleteGroupDialog groups={groups}/>
        </MenuItem>
      </Menu>
    </div>
  );
}
