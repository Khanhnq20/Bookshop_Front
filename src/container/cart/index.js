import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import { BiMinus, BiPlus } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "../../components/button";

export default function CartContainer(){
    return(
        <Component>
            <Component.Flex className="cart__flex">
                <Component.Flex>
                    <Row md="aoto" style={{alignItems:"center",gap:"10px"}}>
                        <Col>Image</Col>
                        <Col>
                            <Text.Subtitle>
                                Product Name
                            </Text.Subtitle>
                        </Col>
                        <Col>
                            <Text.Subtitle className="cart__type">
                                Type : Hard
                            </Text.Subtitle>
                        </Col>
                        <Col>
                            <Text.Subtitle>
                                100000$
                            </Text.Subtitle>
                        </Col>
                        <Col>
                            <Component className="productDetail__quantity">
                                <Component.Span className="productDetail__minus"><BiMinus></BiMinus></Component.Span>
                                <Component.Span className="productDetail__number">1</Component.Span>
                                <Component.Span className="productDetail__plus"><BiPlus></BiPlus></Component.Span>
                            </Component>
                        </Col>
                        <Col>
                            Xoa
                        </Col>
                    </Row>
                </Component.Flex>
                <Component>
                    <Component>
                        <Text.Title className="cart__title">Total Product</Text.Title>
                    </Component>
                    <Component>
                        <Text.Subtitle>1000$</Text.Subtitle>
                    </Component>
                    <Component>
                        <Text.Title className="cart__title">Delivery</Text.Title>
                        <div key={`default-checkbox`} className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id="default-checkbox"
                                label="freeship"
                            />
                        </div>
                    </Component>
                    <Component>
                        <Button>Go To Payment</Button>
                    </Component>
                </Component>
            </Component.Flex>
        </Component>
    )
}