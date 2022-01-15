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

function App() {
  const [hideSideBar, setHideSidebar] = useState(true);
  const queryClient = new QueryClient();

  function hideBarHandler() {
    setHideSidebar(!hideSideBar);
  }
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <CategoriesInfoContextProvider>
          <ExpensesContextProvider>
            <Sidebar hideSideBar={hideSideBar}></Sidebar>
            <main className={hideSideBar ? 'mainContainer' : 'mainContainerHidedSideBar'}>
              <TopBar showHideSideBar={hideBarHandler} />
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/transactionsHistory" component={History} />
                <Route path="/transactions" component={Transactions} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </main>

            <NotificationContainer />
          </ExpensesContextProvider>
        </CategoriesInfoContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
