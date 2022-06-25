// Require modules:
import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

// Require components:
import App from "./components/App";
import { UserProvider } from "./components/UserContext";

//const domain = dev-6driueyv.us.auth0.com
//const ClientId= XjWHr0mRskkEfJYDiRlC45GHHOihNuGn
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    // domain='dev-6driueyv.us.auth0.com'
    // clientId='XjWHr0mRskkEfJYDiRlC45GHHOihNuGn'
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <App />
    </UserProvider>
  </Auth0Provider>
);
