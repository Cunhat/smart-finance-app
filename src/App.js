import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from './components/sideBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/index';
import Transactions from './pages/Transactions/Transactions';
import TopBar from './components/topBar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-notifications/lib/notifications.css';
import { CategoriesInfoContextProvider } from './contexts/CategoriesInfoContext';
import { ExpensesContextProvider } from './contexts/ExpensesContext';
import History from './pages/History';
import Login from './pages/Login';

function App() {
  const [hideSideBar, setHideSidebar] = useState(true);
  const [logedIn] = useState(false);
  const queryClient = new QueryClient();

  function hideBarHandler() {
    setHideSidebar(!hideSideBar);
  }
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <CategoriesInfoContextProvider>
          <ExpensesContextProvider>
            <div className="app-container">
              <Switch>
                <Route path="/login" exact component={Login} />
                {logedIn && (
                  <>
                    <Sidebar hideSideBar={hideSideBar}></Sidebar>
                    <main className="mainContainer">
                      <TopBar showHideSideBar={hideBarHandler} />
                      <Route path="/" exact component={Dashboard} />
                      <Route path="/transactionsHistory" component={History} />
                      <Route path="/transactions" component={Transactions} />
                      <Route path="/settings" component={Settings} />
                    </main>
                    <NotificationContainer />
                  </>
                )}
              </Switch>
            </div>
          </ExpensesContextProvider>
        </CategoriesInfoContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
