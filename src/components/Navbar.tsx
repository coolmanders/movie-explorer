import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Movie Explorer</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
