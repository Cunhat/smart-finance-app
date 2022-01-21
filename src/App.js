import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
  const [logedIn] = useState(true);
  const queryClient = new QueryClient();

  function hideBarHandler() {
    setHideSidebar(!hideSideBar);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <CategoriesInfoContextProvider>
        <ExpensesContextProvider>
          <div className="app-container">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                {logedIn && (
                  <>
                    <Sidebar hideSideBar={hideSideBar}></Sidebar>
                    <main className="mainContainer">
                      <TopBar showHideSideBar={hideBarHandler} />
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/transactionsHistory" element={<History />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route
                        path="*"
                        element={
                          <main style={{ padding: '1rem' }}>
                            <p>There is nothing here!</p>
                          </main>
                        }
                      />
                    </main>
                    <NotificationContainer />
                  </>
                )}
              </Routes>
            </BrowserRouter>
          </div>
        </ExpensesContextProvider>
      </CategoriesInfoContextProvider>
    </QueryClientProvider>
  );
}

export default App;
