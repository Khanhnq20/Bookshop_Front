import React from "react";
import Component from "../components/root";
import Text from "../components/text";
import BannerContainer from "../container/banner";
import BestTopic from "../container/bestTopic";
import BokoBrand from "../container/bokoBrand";
import CreateGenreContainer from "../container/createGenre";
import CreateProductContainer from "../container/createProduct";
import FooterContainer from "../container/footer";
import NavigationContainer from "../container/navigation";
import ProductContainer from "../container/product";

export default function Home(){
    return(
        <Component>
            <NavigationContainer></NavigationContainer>
            <BannerContainer></BannerContainer>
            <BestTopic></BestTopic>
            <Text.Title>Best Seller Books</Text.Title>
            <ProductContainer></ProductContainer>
            <BokoBrand></BokoBrand>
            <Text.Title>Classic Books</Text.Title>
            <ProductContainer></ProductContainer>
            {/* <CreateGenreContainer></CreateGenreContainer> */}
        </Component>
    )
}