import React from "react";
import Form from "../../components/form";
import Component from "../../components/root";
import Text from "../../components/text";

export default function ProductContainer(){
    return(
        <Component>
            <Component className="product">
                <Form.Item className="product__form">
                    <Component className="product__formImage">
                        <Form.Image className="product__image" src="https://tinyurl.com/4bfh7s5z"></Form.Image>
                    </Component>
                    <Text.Subtitle className="product__name">Gun</Text.Subtitle>
                    <Text className="product__price">600$</Text>
                </Form.Item>
            </Component>
        </Component>
    )
}