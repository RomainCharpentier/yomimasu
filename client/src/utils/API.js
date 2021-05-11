import axios, { AxiosResponse } from 'axios';
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
};
const burl = 'http://localhost:8000';

export default {
    signin : function(email, password) {
        return axios.post(burl + '/user/signin', {
            email : email,
            password : password
        }, config);
    },

    signup : function(send) {
        return axios.post(burl + '/user/signup', send, config);
    },
    
    isAuth : function() {
        //FIXME: Test
        //return true;
        return (localStorage.getItem('token') !== null);
    },
    
    isAdmin : async function() {
        return true;
        //FIXME: Test
        //let user = await getUser(localStorage.getItem('token'));
        //return user && user.role === 'admin';
    },
    
    signout : function() {
        localStorage.clear();
        window.location.href = '/';
    },

    getUser : function(token) {
        return axios.get(burl + '/user/getUser', config);
    },

    findUserByNickname : function(nickname) {
        return axios.post(burl + '/user/findUserByNickname', {nickname: nickname}, config);
    },

    getUsers : function() {
        return axios.get(burl + '/user/getUsers', config);
    },

    updateUser : function(user) {
        return axios.post(burl + '/user/updateUser', user, config);
    },

    deleteUser : function(email) {
        return axios.delete(`${burl}/user/deleteUser/${email}`, config);
    },

    getAllBooks : function() {
        return axios.post(burl + '/book/getAll', config);
    },

    getBook : function(_id) {
        return axios.post(burl + '/book/get', {_id: _id}, config);
    },

    createBook : function(book) {
        book.author = localStorage.getItem('token');
        return axios.post(burl + '/book/create', book, config);
    }
}