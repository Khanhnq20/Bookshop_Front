import React from "react";
import Form from "../../components/form";
import Component from "../../components/root";
import Text from "../../components/text";
import {  filterProduct } from "../../api/product";
import { Link } from "react-router-dom";

export default function ProductContainer2(){
    const [product,setProduct] = React.useState({
        getProduct:[]
    })

    const [filter,setFilter] = React.useState({
        getFilter:[]
    })
    React.useEffect(() => {
        filterProduct(2011).then(res => {
            const {data} = res;
            setProduct({
                ...product,
                getProduct:[...data]
            })
        });

        filterProduct(2017).then((response =>{
            const {data} = response;
            setFilter({getFilter: [...data]});
        }))
    }, [])
    
    return(
        <Component>
            <Component className="product">
                <Text.Title style={{textAlign:"start",marginLeft:"10px"}}>Mystery</Text.Title>
                <Component className="product__list" style={{marginBottom:"25px"}}>
                    {product?.getProduct?.map((e,index) =>{
                        
                        return (<Form.Item className="product__form" key={index}>
                                    <Link to={{
                                        pathname: `/product/${e.product.id}`
                                    }}>
                                    <Component className="product__formImage">
                                        <Form.Image className="product__image" src={e.product.fileImage}></Form.Image>
                                    </Component>
                                    </Link>
                                    <Text.Subtitle className="product__name">{e.product.name}</Text.Subtitle>
                                    <Text className="product__author">{e.product.author}</Text>
                                </Form.Item>
                                
                        )
                    })}
                </Component>
                <Text.Title style={{textAlign:"start",marginLeft:"10px"}}>Self-Help</Text.Title>
                <Component className="product__list" style={{marginBottom:"25px"}}>
                    {filter?.getFilter?.map((e,index) =>{
                        
                        return (<Form.Item className="product__form" key={index}>
                                    <Link to={{
                                        pathname: `/product/${e.product.id}`
                                    }}>
                                    <Component className="product__formImage">
                                        <Form.Image className="product__image" src={e.product.fileImage}></Form.Image>
                                    </Component>
                                    </Link>
                                    <Text.Subtitle className="product__name">{e.product.name}</Text.Subtitle>
                                    <Text className="product__author">{e.product.author}</Text>
                                </Form.Item>
                                
                        )
                    })}
                </Component>
            </Component>
        </Component>
    )
}