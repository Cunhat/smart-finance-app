import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/sideBar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";


function App() {
   return (
      <Router>
         <Sidebar></Sidebar>
         <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/settings" component={Settings} />
         </Switch>
      </Router>
   );
}

export default App;
