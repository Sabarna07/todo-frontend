import cookie from 'js-cookie'
import { Navigate } from 'react-router-dom';
import {API} from '../Config'

// export const handleResponse = (response) => {
//     if (response.status === 401) {
//       signout(() => {
//         Router.push({
//           pathname: "/signin",
//           query: {
//             message: "Your session is expired. Please signin",
//           },
//         });
//       });
//       //window.location.reload();
//     }
//   };

export const signupSignin = (formName, userDetails) => {
    let endPoint;
    formName == "Login"
      ? (endPoint = `${API}/signin`)
      : (endPoint = `${API}/signup`);
      
    return fetch(`${endPoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const signout = (next) => {
    removeCookie("token");
    removeLocalStorage("user");
    next();
  
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout successfull");
        <Navigate to='/login' />
      })
      .catch((err) => console.log(err));
  };
  
  //set cookie
  export const setCookie = (key, value) => {
    if (typeof window !== "undefined") {
      cookie.set(key, value, {
        expires: 1,
      });
    }
  };
  
  export const removeCookie = (key) => {
    if (typeof window !== "undefined") {
      cookie.remove(key, {
        expires: 1,
      });
    }
  };
  
  export const getCookie = (key) => {
    if (typeof window !== "undefined") {
      return cookie.get(key);
    }
  };
  
  //localStrorage
  export const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  
  export const removeLocalStorage = (key) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };
  
  //Authenticate use by pass data to cookie and localStorage
  export const authenticate = (data,next) =>{
    if(typeof window !== 'undefined'){
        setLocalStorage("user", data.user)
        setCookie("token", data.token)
        next();
    }
};

  export const isAuth = () => {
    if (typeof window != 'undefined') {
        const cookieChecked = getCookie("token");
        if (cookieChecked) {
          if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"));
          } else {
            return false;
          }
        }
      }
  };