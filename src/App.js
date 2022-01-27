import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationContainer } from 'react-notifications';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/index';
import Transactions from './pages/Transactions/Transactions';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-notifications/lib/notifications.css';
import { CategoriesInfoContextProvider } from './contexts/CategoriesInfoContext';
import { ExpensesContextProvider } from './contexts/ExpensesContext';
import History from './pages/History';
import Login from './pages/Login';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CategoriesInfoContextProvider>
        <ExpensesContextProvider>
          <div>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
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
              </Routes>
            </BrowserRouter>
            <NotificationContainer />
          </div>
        </ExpensesContextProvider>
      </CategoriesInfoContextProvider>
    </QueryClientProvider>
  );
}

export default App;
