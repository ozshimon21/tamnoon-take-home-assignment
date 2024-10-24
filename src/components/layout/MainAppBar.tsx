import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CompanyIcon from "../../assets/logo.svg";

export default function MainAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <img src={CompanyIcon} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
