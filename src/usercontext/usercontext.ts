import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'

import { userInfo } from 'os';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const ISSERVER = typeof window === "undefined";
const user = !ISSERVER && localStorage.getItem('user')||{};
const userSubject = new BehaviorSubject(user);

export const userContext = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    registeruser,
};

function registeruser(userinfo:any){
    userSubject.next(userinfo);
    console.log("userinfo in useservice.registeruser: ", JSON.stringify(userinfo));
    localStorage.setItem('user', JSON.stringify(userinfo));
    return userInfo;
}

async function login(email:any, password:any) {

    return await axios.post(`${baseUrl}/authenticateuser`, { email, password })
        .then((res:any) => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(JSON.stringify(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));

            return res.data;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next({});
    Router.push('/login');
}
