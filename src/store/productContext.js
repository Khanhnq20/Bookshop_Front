import React, {createContext } from "react";
import { getProduct } from "../api/product";

const ProductProvider = React.createContext();
export function ProductContext({children}){
    
    const [product,setProduct] = React.useState([]);
        React.useEffect(() => {
        getProduct().then(res => {
            const {data} = res;
            setProduct(data)
        });
    }, [])
    return(
        <ProductProvider.Provider value={{product}}>
            {children}
        </ProductProvider.Provider>
    )
}

export const useProductContext = ()=>{
    return React.useContext(ProductProvider);
}
