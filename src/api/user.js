import axios from 'axios';

const host = "https://localhost:5001";

const userInstance = axios.create({
    baseURL : `${host}/api/user`,
    withCredentials: 'same-site'
})

export function payment(data){
    return userInstance.post("payment", data,{params:{
        returnURL: "/payment/success"
    }})
}

export function confirmStatus(refCode){
    return userInstance.get("payment/confirm", {
        params:{
            refCode
        }
    })
}