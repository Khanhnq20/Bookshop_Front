import axios from 'axios';
const host = "https://localhost:5001";

const authInstance = axios.create({
    baseURL: `${host}/api/accounts`,
    withCredentials:'same-site'
})

const staffInstance = axios.create({
    baseURL: `${host}/api/staff`,
    withCredentials:'same-site'
})

export function login(username, password){
    return axios.post("api/accounts/login",{email: username, password: password},{
        baseURL: host,
        withCredentials: 'same-site'
    });
}

export function register(username, password){
    axios.post("api/accounts/register",{email:username,password:password},{
        baseURL: host,
        withCredentials: 'same-site'
    });
}   

export function logout(){
    return axios.get("api/accounts/logout",{
        baseURL: host,
        withCredentials: 'same-site'
    });
}


export function certificate(){
    return authInstance.get("userPersistence",{
        credentials: 'same-site',
    });
}

export function createGenre(genre){
    return staffInstance.post("createGenre",{name:genre},{
    });
}

export function getGenre(){
    return staffInstance.get("getGenre")
}

export function deleteGenre(id){
    return staffInstance.delete("deleteGenre",{
        params: {
            id: id
        }
    });
}