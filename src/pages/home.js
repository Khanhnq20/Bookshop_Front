import React from "react";
import Component from "../components/root";
import Text from "../components/text";
import BannerContainer from "../container/banner";
import FooterContainer from "../container/footer";
import NavigationContainer from "../container/navigation";
import ProductContainer from "../container/product";

export default function Home(){
    return(
        <Component>
            <NavigationContainer></NavigationContainer>
            <BannerContainer></BannerContainer>
            {/* <Text.Title>Best Seller Books</Text.Title>
            <ProductContainer></ProductContainer> */}
            <FooterContainer></FooterContainer>
        </Component>
    )
}