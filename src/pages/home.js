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

    // if(state.loading) return (
    //     <Component>
    //         <h1 className="p-5">Loading...</h1>
    //     </Component>
    // )
    return(
        <Component>
            {/* <div className="p-5">
                <button className="m-5" onClick={() => handler.addNewItem("item 3")}>add to cart</button>
                <button className="m-5" onClick={() => handler.removeItem(0)}>add to cart</button>
                {JSON.stringify(state.cart, null, 4)}
            </div> */}
            {/* <NavigationContainer></NavigationContainer> */}
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