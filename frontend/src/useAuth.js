import * as React from "react";
import axios from "axios";
import { LOGIN_USER_SVC, LOGOUT_USER_SVC } from "./configs";

const authContext = React.createContext();

export function useAuth() {
    // const [authed, setAuth] = React.useState(false);

    return {
        login(username, password) {
            return new Promise((myResolve, myReject) => {
                axios.post(LOGIN_USER_SVC, { username, password })
                    .then(res => {
                        console.log("M HERE");
                        myResolve(res);
                        res();
                    })
                    .catch(err => {
                        myReject(err);
                    });
            });
        },

        logout(userAuthToken) {
            return new Promise((myResolve, myReject) => {
                fetch(LOGOUT_USER_SVC, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userAuthToken}`,
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    myResolve(res);
                    res();
                })
                    .catch(err => {
                        myReject(err);
                    });
            });
        }
    }
}

export function AuthProvider({ children }) {
    const auth = useAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return React.useContext(authContext) || null;
}
