import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import { BiMinus, BiPlus } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "../../components/button";
import FormComponent from "../../components/form";
import { useCartContext } from "../../store/cardContext";

export default function CartContainer(){
    const [quantity,setQuantity] = React.useState(1);
    const [state, functions] = useCartContext();
    console.log(state);
    const handleMinus=(index)=>{
        functions.reduceItem(index);
    }
    const handlePlus=(index)=>{
        functions.addItem(index);
    }

    return(
        <Component>
            <pre>
                {JSON.stringify(state.cart,null,4)}
            </pre>
            {state?.cart?.map((item, index) =>{
                return(
                    <Component.Flex className="cart__flex">
                        <Component.Flex>
                            <Row md="aoto" style={{alignItems:"center",gap:"10px"}}>
                                <Col>
                                    <FormComponent.Image className="cart__image" src={item.image}></FormComponent.Image>
                                </Col>
                                <Col>
                                    <Text.Subtitle>
                                        {item.name}
                                    </Text.Subtitle>
                                </Col>
                                <Col>
                                    <Text.Subtitle className="cart__type">
                                        Type : {item.type}
                                    </Text.Subtitle>
                                </Col>
                                <Col>
                                    <Text.Subtitle>
                                        {item.price} USD
                                    </Text.Subtitle>
                                </Col>
                                <Col>
                                    <Component.Span className="productDetail__quantityForm">
                                        <BiMinus style={{cursor:'pointer',marginLeft:'5px'}}
                                            onClick={() => handleMinus(index)}
                                        ></BiMinus>
                                        <FormComponent.Input className="productDetail__quantity"
                                            style={{paddingLeft:'5px'}}
                                            type='number'
                                            value={item.quantity}
                                            max={99}
                                            onChange={(i) =>{setQuantity(Number(i.target.value) > 99 ? 99 : i.target.value)}}
                                        ></FormComponent.Input>
                                        <BiPlus style={{cursor:'pointer'}}
                                            onClick={() => handlePlus(index)}
                                        ></BiPlus>
                                    </Component.Span>
                                </Col>
                                <Col>
                                    <Button>Delete</Button>
                                </Col>
                            </Row>
                        </Component.Flex>
                        <Component.Flex>
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
                        </Component.Flex>
            </Component.Flex>

                )
            })}
        </Component>
    )
}