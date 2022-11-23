import axios from 'axios';
const host = "https://localhost:5001";

const adminInstance = axios.create({
    baseURL: `${host}/api/admin`,
    withCredentials:'same-site',
        headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
    }
})

export function getUser(searchString){
    return adminInstance.get("getUser",{
        params:{
            searchString
        }
    });
}

export function getStaff(searchString){
    return adminInstance.get("getStaff",{
        params:{
            searchString
        }
    });
}

export function getSingleUser(id){
    return adminInstance.get("getSingleUser",{params:{
        id
    }});
}

export function registerStaff(email, password,name,dayOfBirth,phoneNumber,gender){
    return axios.post("api/accounts/register/staff",{email:email,password:password,name:name,dayOfBirth:dayOfBirth,phoneNumber:phoneNumber,gender:gender},{
        baseURL: host,
        withCredentials: 'same-site',
            headers: {
        Authorization: `${localStorage.getItem("access")}`
    }
    });
} 

export function getPurchaseHistory(){
    return adminInstance.get("getPurchaseHistory");
}

export function getSinglePurchaseHistory(id){
    return adminInstance.get("getSinglePurchaseHistory",{params:{
        id
    }});
}

export function changePassword(id,password){
    return adminInstance.post("changePassword",{},{params:{
        id,
        password
    }});
}

