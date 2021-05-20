import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext";
import Login from "./pages/login";
import SignUp from "./pages/singUp"


export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}