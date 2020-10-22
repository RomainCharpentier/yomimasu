import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
};
const burl = 'http://localhost:8000';

export default {
    signin : function(email, password) {
        return axios.post(burl + '/user/signin', {
            email : email,
            password : password
        }, {
            headers: headers
        });
    },

    signup : function(send) {
        return axios.post(burl + '/user/signup', send, {headers: headers});
    },
    
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    
    isAdmin : async function() {
        let user = await getUser(localStorage.getItem('token'));
        return user && user.role === 'admin';
    },
    
    signout : function() {
        localStorage.clear();
        window.location.href = '/';
    },

    getUser : function(token) {
        return axios.post(burl + '/user/getUser', {'token': token}, {headers: headers});
    },

    getUsers : function(token) {
        return axios.get(burl + '/user/getUsers', {}, {headers: headers});
    },

    updateUser : function(user) {
        return axios.post(burl + '/user/updateUser', user, {headers: headers});
    },

    getAllBooks : function() {
        return axios.post(burl + '/book/getAll', {headers: headers});
    },

    createBook : function(book) {
        book.author = localStorage.getItem('token');
        return axios.post(burl + '/book/create', book, {headers: headers});
    }
}