import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AssetsPage from "./modules/assets/AssetsPage";
import { ToastProvider } from "./shared/components/ToastProvider";
import MainAppBar from "./components/layout/MainAppBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b5e20",
    },
    secondary: {
      main: "#eeeeee",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <MainAppBar></MainAppBar>
        <div className="px-8 max-w-6xl mx-auto">
          <AssetsPage></AssetsPage>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
