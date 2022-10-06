import axios from 'axios';
import {serialize} from 'object-to-formdata'
const host = "https://localhost:5001";

const staffInstance = axios.create({
    baseURL: `${host}/api/staff`,
    withCredentials: 'same-site'
})

export function createProduct(prop){
    console.log(prop);
    const formData = serialize(prop, {
        indices: true,
        noFilesWithArrayNotation: false,
        dotsForObjectNotation: true,
        nullsAsUndefineds: true,
        allowEmptyArrays: true
    })
    return(
        staffInstance.post("createProduct",formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    )
}

export function getProduct(){
    return staffInstance.get("getProduct");
}

export function deleteProduct(id){
    return staffInstance.delete("deleteProduct",{
        params: {
            id:id
        }
    });
}

export function getSingleProduct(id){
    return staffInstance.get("getSingleProduct",{
        params:{
            id:id
        }
    })
}

export function updateProduct(updatedProduct,id){
    return staffInstance.put("updateProduct",updatedProduct,{
        params:{
            id:id
        }
    })
}

export function updateProductImage(file, productId){
    const formData = new FormData();
    formData.append("request", file);
    return staffInstance.put("updateImage", formData ,{
        params:{
            id: productId
        }
    })
}