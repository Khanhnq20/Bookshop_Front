import React from "react";
import Button from 'react-bootstrap/Button';
import FormComponent from "../../components/form";
import Component from "../../components/root";
import Text from "../../components/text";
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useCartContext } from "../../store/cartContext";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";


export default function CartBar(prop){
    const [state, functions] = useCartContext();
    // const [show, setShow] = React.useState(false);
    
    const handleMinus=(index)=>{
        functions.reduceItem(index);
    }
    const handlePlus=(index)=>{
        functions.addItem(index);
    }

    React.useEffect(() =>{

    },[state.cart])
    return(<>
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {"end"}
      </Button> */}
      <Offcanvas style={{zIndex:"20000"}} show={prop.showBar} onHide={prop.handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {state?.cart?.map((item,index) => {
            return(
                <Component className="cartBar__product" key={index}>
                    <Component className= "cartBar__productImageFrame">
                        <FormComponent.Image src={item.image} className= "cartBar__productImage"></FormComponent.Image>
                    </Component>
                    <Component className="cartBar__contentProduct">
                        <Text>{item.name}</Text>
                        <Text>{item.type} - Id: {item.id}</Text>
                        <Component className="cartBar__quantityForm">
                            <Component.Span className="productDetail__quantityForm">
                                    <BiMinus style={{cursor:'pointer',marginLeft:'5px'}}
                                        onClick={() => handleMinus(index)}
                                    ></BiMinus>
                                    <FormComponent.Input className="productDetail__quantity"
                                        style={{paddingLeft:'5px'}}
                                        type='number'
                                        value={item.quantity}
                                        max={99}
                                        onChange={(i) =>{}}
                                    ></FormComponent.Input>
                                    <BiPlus style={{cursor:'pointer'}}
                                        onClick={() => handlePlus(index)}
                                    ></BiPlus>
                            </Component.Span>
                            <Text>{item.total} USD</Text>
                        </Component>
                    </Component>
                </Component>
            )})} 
        </Offcanvas.Body>
        <Component>
            <Component className="cartBar__totalFee">
                <Text style={{fontWeight: 600,fontSize:"17px"}}>
                    Total Fee
                </Text>
                <Text style={{fontWeight:600,color:"red",fontSize:"17px"}}>
                    {(state?.cart?.reduce((total, item) => item.total + total, 0)) || 0} VND
                </Text>
            </Component>
            <Component style={{textAlign:"center"}}>
                <Link to='/payment'>
                    <Button variant="danger" style={{margin:"0 20px 20px 20px"}}>Go to the Payment</Button>
                </Link>
            </Component>
        </Component>
    </Offcanvas>
    </>
    </>
    )
}
