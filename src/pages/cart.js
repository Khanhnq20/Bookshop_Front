import React from "react";
import Component from "../components/root";
import CartContainer from "../container/cart";

export default function Cart(){
    return(
        <Component style={{minHeight:'100vh'}}>
            <CartContainer></CartContainer>
        </Component>
    )
}