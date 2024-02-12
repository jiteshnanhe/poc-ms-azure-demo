import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import Dashboard from './pages/dashboard';
import CreateUser from './pages/createUser';
import Header from './components/header';
import WorkItem from './pages/workItem';

function App({ msalInstance }) {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
        // TODO: grab the username from query params

        instance.ssoSilent({
            scopes: ["user.read"],
            loginHint: "diegos@msaltestingjs.onmicrosoft.com"
        }).then((response) => {
            instance.setActiveAccount(response.account);
        }).catch((error) => {
            if (error instanceof InteractionRequiredAuthError) {
                instance.loginRedirect({
                    scopes: ["user.read"],
                });
            }
        });
    }
  }, [instance, isAuthenticated]);

  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/workItem" element={<WorkItem />} />
        </Routes>
      </Router>
    </MsalProvider>
  )
}

export default App
