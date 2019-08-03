import axios from 'axios';
const headers = {
    "Content-Type": "application/json"
};
const burl = "http://localhost:8000";

export default {
    signin : function(email, password) {
        return axios.post(burl + "/user/signin", {
            "email" : email,
            "password" : password
        }, {
            "headers": headers
        });
    },

    signup : function(send) {
        return axios.post(burl + "/user/signup", send, {"headers": headers});
    },
    
    isAuth : function() {
        return (localStorage.getItem("token") !== null);
    },
    
    signout : function() {
        localStorage.clear();
        window.location.href = "/";
    },

    getUser : function(token) {
        return axios.get(burl + "/user/getUser", {
            "params": {
              "token": token
            },
            "headers": headers
        });
    },

    updateUser : function(user) {
        return axios.post(burl + "/user/updateUser", user, {"headers": headers});
    }
}