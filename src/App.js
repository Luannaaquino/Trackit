import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext";
import TasksContext from "./contexts/tasksContext"
import Login from "./pages/login";
import SignUp from "./pages/singUp"
import Today from "./pages/today"

export default function App() {
  const [user, setUser] = useState(null);
  const [ratio, setRatio] = useState(0);

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
          <TasksContext.Provider value={{ ratio, setRatio }}>
            <Route path="/today" exact>
              <Today />
            </Route>
          </TasksContext.Provider>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}