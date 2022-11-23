import React from "react";
import Button from "../../components/button";
import Form from "../../components/form";
import Component from "../../components/root";
import Text from "../../components/text";
import { GrAdd } from 'react-icons/gr'
import { deleteProduct, getProduct } from "../../api/product";
import { Link } from "react-router-dom";

export default function ProductContainer(){
    const [product,setProduct] = React.useState({
        getProduct:[]
    })
    React.useEffect(() => {
        getProduct().then(res => {
            const {data} = res;
            console.log(data);
            setProduct({
                ...product,
                getProduct:[...data]
            })
        });
    }, [])
    
    return(
        <Component>
            <Component className="product">
                <Component className="product__list">
                    {product.getProduct.map(e =>{
                        
                        return (<Form.Item className="product__form">
                                    <Link to={{
                                        pathname: `/product/${e.id}`
                                    }}>
                                    <Component className="product__formImage">
                                        <Form.Image className="product__image" src={e.fileImage}></Form.Image>
                                    </Component>
                                    </Link>
                                    <Text.Subtitle className="product__name">{e.name}</Text.Subtitle>
                                    <Text className="product__author">{e.author}</Text>
                                </Form.Item>
                                
                        )
                    })}
                </Component>
                <Component className="product__formButton">
                    <Button className="product__button">View All</Button>
                </Component>
            </Component>
        </Component>
    )
}