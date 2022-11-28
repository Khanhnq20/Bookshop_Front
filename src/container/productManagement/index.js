import React from "react";  
import Form from 'react-bootstrap/Form';
import Component from "../../components/root";
import Text from "../../components/text";
import { deleteProduct, getProduct, searchProduct } from "../../api/product";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import FormComponent from "../../components/form";
import { toast } from "react-toastify";

export default function ProductManagementContainer(){
    const [product,setProduct] = React.useState({
        getProduct:[]
    })
    const [text,setText] = React.useState()
    React.useEffect(() => {
        searchProduct(text).then(res => {
            const data = res.data;
            setProduct({
                getProduct:[...data]
            })
        });
    }, [text])

    const handleChange = (e) =>{
        setText(e.target.value);
    }
    
    return(
        <Component style={{minHeight:"100vh"}}>
            <Component className="product">
                    <Component style={{margin:"20px 0"}}>
                            <Link to="/createProduct">
                                <Button variant="primary">Create New Product</Button>
                            </Link>
                    </Component>
                    <Form className="genre__createForm"  style={{marginBottom:"20px"}}>
                        <Form.Group className="" >
                            <Form.Control
                                type="text"
                                name="f_product"
                                placeholder="Product Name"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Component style={{ display: "flex", justifyContent: "center", paddingLeft: "10px" }}>
                            <Button variant="primary">Search</Button>
                        </Component>
                    </Form>
                <Component className="product__list" style={{overflow:"unset",whiteSpace:"pre-wrap"}}>
                    {product?.getProduct?.map(e =>{
                        
                        return (<Form className="product__form">
                                    <Link to={{
                                        pathname: `/product/${e.id}`
                                    }}>
                                    <Component className="product__formImage">
                                        <FormComponent.Image className="product__image" src={e.fileImage}></FormComponent.Image>
                                    </Component>
                                    </Link>
                                    <Text.Subtitle className="product__name">{e.name}</Text.Subtitle>
                                    <Text className="product__author">{e.author}</Text>
                                    <Component className="product__buttonManage">
                                        <Link to={`/updateProduct/${e.id}`}>
                                        <Button 
                                        variant="success"
                                        >Update</Button>
                                        </Link>
                                        <Button
                                        variant="danger"
                                        onClick={() => {
                                            deleteProduct(e.id).then(res=>{toast.success("Deleted!")});
                                            setProduct(oldState => {
                                                return{
                                                    ...oldState,
                                                    getProduct: oldState.getProduct.filter(i => i.id !== e.id)
                                                }
                                            })
                                        }}
                                        
                                        >Delete</Button>
                                    </Component>
                                </Form>
                        )
                    })}
                </Component>
            </Component>
        </Component>
    )
}