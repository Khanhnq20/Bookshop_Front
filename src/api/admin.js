import axios from 'axios';
const host = "https://localhost:5001";

const adminInstance = axios.create({
    baseURL: `${host}/api/admin`,
    withCredentials:'same-site'
})

export function getUser(){
    return adminInstance.get("getUser");
}