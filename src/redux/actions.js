import * as types from './actionTypes'
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
})

const userDeleted = ()=>({
    type:types.DELETE_USER
})

const userAdded = ()=>({
    type:types.ADD_USER
})

export const loadUsers = () => {
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_API}`).then((res)=>{
            dispatch(getUsers(res.data))
        }).catch(error => console.log(error))
    }
}

export const deleteUser = (id) => {
    return function(dispatch){
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((res)=>{
            dispatch(userDeleted());
            dispatch(loadUsers());
        }).catch(error => console.log(error))
    }
}

export const adduser = (user) => {
    return function(dispatch){
        axios.post(`${process.env.REACT_APP_API}`, user).then((res)=>{
            dispatch(userAdded());
        }).catch(error => console.log(error))
    }
}

export const editUser = (id) => {
    console.log("IN to action ", id, `${process.env.REACT_APP_API}${id}`);
    return function(dispatch){
        axios.get(`${process.env.REACT_APP_API}`).then((res)=>{
            dispatch(getUsers(res.data))
        }).catch(error => console.log(error))
    }
}

