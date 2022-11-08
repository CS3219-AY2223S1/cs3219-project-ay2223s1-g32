import * as React from "react";
import axios from "axios";
import { LOGIN_USER_SVC, LOGOUT_USER_SVC } from "./configs";
import { Navigate, useLocation } from "react-router-dom";

const authContext = React.createContext();

function useAuth() {
    const [authed, setAuthed] = React.useState(false);
    return {
        authed,
        login(username, password) {
            return new Promise((res) => {
                axios.post(LOGIN_USER_SVC, { username, password })
                    .then(res => {
                        setAuthed(true);
                        res();
                    }).catch(res => res)
            })
        },
        logout(userAuthToken) {
            return new Promise((res) => {
                fetch(LOGOUT_USER_SVC, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userAuthToken}`,
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        setAuthed(false);
                        res();
                    }).catch(res => res)
            })
        }
    }
}

function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}
