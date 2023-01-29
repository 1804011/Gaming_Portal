import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
function RequireAuth({ children }) {
    let [user, loading] = useAuthState(auth);

    let location = useLocation();
    if (loading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default RequireAuth;
