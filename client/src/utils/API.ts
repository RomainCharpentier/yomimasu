import axios, { AxiosResponse } from 'axios';
import { Book } from '../models/book';
import { User } from '../models/user';
const headers = {
    'Content-Type': 'application/json'
};
const burl = 'http://localhost:8000';

export default {
    signin : function(email: string, password: string) {
        return axios.post(burl + '/user/signin', {
            email : email,
            password : password
        }, {
            headers: headers
        });
    },

    signup : function(send: User) {
        return axios.post(burl + '/user/signup', send, {headers: headers});
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

    getUser : function(token: string): Promise<AxiosResponse<User>> {
        return axios.post<User>(burl + '/user/getUser', {token: token}, {headers: headers});
    },

    findUserByNickname : function(nickname: string) {
        return axios.post(burl + '/user/findUserByNickname', {nickname: nickname}, {headers: headers});
    },

    getUsers : function() {
        return axios.get(burl + '/user/getUsers', {headers: headers});
    },

    updateUser : function(user: User) {
        return axios.post(burl + '/user/updateUser', user, {headers: headers});
    },

    deleteUser : function(email: string) {
        return axios.delete(`${burl}/user/deleteUser/${email}`, {headers: headers});
    },

    getAllBooks : function() {
        return axios.post(burl + '/book/getAll', {headers: headers});
    },

    getBook : function(_id: number) {
        return axios.post(burl + '/book/get', {_id: _id}, {headers: headers});
    },

    createBook : function(book: Book) {
        book.author = localStorage.getItem('token')!;
        return axios.post(burl + '/book/create', book, {headers: headers});
    }
}