import axios from 'axios';

import { host } from './admin';

let access = localStorage.getItem("access");
const userInstance = axios.create({
    baseURL : `${host}/api/user`,
    withCredentials: 'same-site',
        headers: {
        Authorization: `Bearer ${access}`
    }
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

export function commentProduct(content,rate,author,emailAth,productId){
    return userInstance.post("comment",{content:content,rate:rate,author:author,emailAth:emailAth,productId:productId},{})
}

export function getComment(id){
    return userInstance.get("getComment", {
        params:{
            id
        }
    })
}

export function getPurchased(id){
    return userInstance.get("getPurchased",{
        params:{
            id
        }
    });
}