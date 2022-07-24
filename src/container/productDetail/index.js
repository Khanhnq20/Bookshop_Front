import React from "react";
import Form from "../../components/form";
import Component from "../../components/root";
import Text from "../../components/text";
import Button from "../../components/button";
import { BiMinus, BiPlus } from 'react-icons/bi';

export default function ProductDetailContainer() {
    return(
        <Component.Wrapper className="productDetail">
            <Component.Flex className="productDetail__flex">
                <Component className="productDetail__item1">
                    <Form.Image className="productDetail__image" src="https://tinyurl.com/4bfh7s5z"></Form.Image>
                </Component>
                <Component className="productDetail__item2">
                    <Component>
                        <Text.Title className="productDetail__title">Gun</Text.Title>
                        <Component className="productDetail__label">
                            <Text.Label>Author</Text.Label>
                            <Text.Link>da Vince</Text.Link>
                        </Component>
                        <Text className="productDetail__price">600</Text>
                    </Component>
                    <Component className="productDetail__quantityForm">
                        <Component.Span className="productDetail__quantity">
                            <Component.Span className="productDetail__minus"><BiMinus></BiMinus></Component.Span>
                            <Component.Span className="productDetail__number">1</Component.Span>
                            <Component.Span className="productDetail__plus"><BiPlus></BiPlus></Component.Span>
                        </Component.Span>
                        <Component.Span>
                            <Button className="productDetail__button">Add to Cart</Button>
                        </Component.Span>
                    </Component>
                    <Component>
                        <Component className="productDetail__label">
                            <Component className="productDetail__topic">
                                <Text.Label>Warehouse</Text.Label>
                                <Text.Label>Author</Text.Label>
                                <Text.Label>Paper</Text.Label>
                                <Text.Label>Type</Text.Label>
                                <Text.Label>Language</Text.Label>
                            </Component>
                            <Component className="productDetail__info">
                                <Text.Info>Stocking</Text.Info>
                                <Text.Info>da Vince</Text.Info>
                                <Text.Info>320</Text.Info>
                                <Text.Info>Paperback</Text.Info>
                                <Text.Info>English</Text.Info>
                            </Component>
                        </Component>
                    </Component>
                </Component>
            </Component.Flex>
        </Component.Wrapper>
    )
}