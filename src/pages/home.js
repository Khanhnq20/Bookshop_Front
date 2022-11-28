import React from "react";
import Component from "../components/root";
import BannerContainer from "../container/banner";
import BestTopic from "../container/bestTopic";
import BokoBrand from "../container/bokoBrand";
import ProductContainer from "../container/product";
import ProductContainer2 from "../container/product2";

export default function Home(){

    return(
        <Component>
            <BannerContainer></BannerContainer>
            <BestTopic></BestTopic>
            <ProductContainer></ProductContainer>
            <BokoBrand></BokoBrand>
            <ProductContainer2></ProductContainer2>
        </Component>
    )
}