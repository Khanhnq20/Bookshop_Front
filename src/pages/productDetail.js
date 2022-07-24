import React from "react";
import Component from "../components/root";
import NavigationContainer from "../container/navigation";
import ProductDetailContainer from "../container/productDetail";

export default function ProductDetail() {
    return(
    <Component style={{position:"relative"}}>
        <NavigationContainer></NavigationContainer>
        <ProductDetailContainer></ProductDetailContainer>
    </Component>
    )
}