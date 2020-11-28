import "./App.css";
import { AppContextProvider } from "./State";
import Main from "./pages/Main";

export default function App() {
  return (
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  );
}
