import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from "./components/Home";
import ItemDetail from "./components/ItemDetail";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:id' component={ItemDetail} />
      </Switch>
    </Router>
  );
}
