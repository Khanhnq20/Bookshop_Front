import React from "react";
import Button from "../../components/button";
import Component from "../../components/root";
import Text from "../../components/text";
import { deleteProduct, filterProduct, getProduct } from "../../api/product";
import { Link, useLocation, useParams } from "react-router-dom";
import Form from "../../components/form";
import { PriceRange } from "../../components/star_rating";

export default function FilterProductContainer(){
    const [product, setProduct] = React.useState({
        getProduct: []
    })
    const location = useLocation();
    const searchParams = useParams();
        
    React.useEffect(() => {

        if(searchParams['id']){

            const {id} = searchParams;
            filterProduct(id).then((response =>{
                const {data} = response;
                setProduct({getProduct: [...data]});
            }))
        }
    }, [location])
    return(
        <Component style={{paddingTop:"70px"}}>
            <Component>
                <Text.Title>Filter Product</Text.Title>
            </Component>
            <Component.Flex className="filterProduct__content">
                <Component>
                    {/* <PriceRange min={0} max={100} onChange={(val,max) => {
                        console.log(val,max)
                    }}></PriceRange> */}
                </Component>
                <Component className="filterProduct__listProduct">
                    {product.getProduct.map(e => {
                        return (<Form.Item className="product__form">
                            <Link to={{
                                pathname: `/product/${e.product.id}`
                            }}>
                                <Component className="product__formImage">
                                    <Form.Image className="product__image" src={e.product.fileImage}></Form.Image>
                                </Component>
                            </Link>
                            <Text.Subtitle className="product__name">{e.product.name}</Text.Subtitle>
                            <Text className="product__price">{e.product.author}</Text>
                        </Form.Item>
                        )
                    })}
                </Component>
            </Component.Flex>
        </Component>
    )
}