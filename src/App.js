import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/sideBar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings/index";
import Transactions from "./pages/Transactions/Transactions";
import TopBar from "./components/topBar";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';





function App() {
   const [hideSideBar, setHideSidebar] = useState(true);

   function hideBarHandler() {
      setHideSidebar(!hideSideBar);
   }

   return (
      <Router>
         <Sidebar hideSideBar={hideSideBar}></Sidebar>
         <main className={hideSideBar ? "mainContainer": "mainContainerHidedSideBar"}>
            <TopBar showHideSideBar={hideBarHandler}/>
            <Switch>
               <Route path="/dashboard" exact component={Dashboard} />
               <Route path="/transactions" component={Transactions} />
               <Route path="/settings" component={Settings} />
            </Switch>
         </main>
      </Router>
   );
}

export default App;
