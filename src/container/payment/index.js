import { Formik } from 'formik';
import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import FormComponent from '../../components/form/index';
import Button from 'react-bootstrap/Button';
import { useCartContext } from '../../store/cartContext';
import {payment} from '../../api/user'
import {useAthContext} from '../../store/authorContext';

let productSchema = yup.object().shape({
    phoneNumber: yup.number().required(),
    address : yup.string().required(),
})

class purchasedHistory{
    constructor(userId,address,paymentMethod,phoneNumber,deliveryFee,date,purchasedProducts){
        
        this.userId = userId;
        this.address = address;
        this.paymentMethod = paymentMethod;
        this.phoneNumber = phoneNumber;
        this.deliveryFee = deliveryFee;
        this.date = date;
        this.purchasedProducts = purchasedProducts
    }
}

class purchasedProducts{
    constructor(productId,type,quantity,totalProductsFee){
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.totalProductsFee = totalProductsFee;
    }
}

export default function PaymentContainer(){
    const [errorPayment,setErrorPayment] = React.useState(false);
    const [freeShip,setFreeShip] = React.useState(true);
    const [state] = useCartContext();
    const {userID} = useAthContext();

    React.useEffect(() => {
        if((state?.cart?.reduce((total,item) => item.total + total,0)) >= 400000){
            setFreeShip(false);
        }else{
            setFreeShip(true)
        }
    }, [state.cart])

    const getDate = ()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }
    return(<Formik
        initialValues={{
            phoneNumber:"",
            address:"",
            paymentMethod: "VNPay",
            deliveryFee: 20000,
        }}
        validationSchema ={productSchema}
        onSubmit={((values,formikHelper) => {
            formikHelper.setSubmitting(false);

            payment(new purchasedHistory(userID,values.address,values.paymentMethod
                ,values.phoneNumber,values.deliveryFee,getDate(),
                state?.cart?.map((item) => new purchasedProducts(item.id
                    ,item.type,item.quantity,item.total)))).then(res => {
                        localStorage.removeItem("cart");
                        const link = res.data;
                        window.location.replace(link);
                    })
        })}
        
    >
        {({values,touched,errors,handleSubmit,handleChange,handleBlur,setFieldValue}) => {
            return(
                
                <Form className="payment" onSubmit={handleSubmit}>
                    <Component.Flex className="payment__parent">
                        <Component className="payment__flex-1">
                            <Component style={{marginBottom:"50px"}}>
                                <Text style={{marginBottom:"10px",fontWeight:"600",fontSize:"16px"}}>Payment Information</Text>
                                <Component.Grid className="payment__gridForm">
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            isInvalid={touched.phoneNumber && errors.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="phoneNumber"
                                            placeholder="Your Phone Number" />
                                        <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            isInvalid={touched.address && errors.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="address"
                                            placeholder="Your Address" />
                                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                                    </Form.Group>
                                </Component.Grid>
                            </Component>
                            <Component className="payment__deliveryForm">
                                <Text style={{fontWeight:"600",fontSize:"16px"}}>Delivery principle</Text>
                                <Component>
                                        <Form>
                                            <Component className='payment__20k'>
                                                <Form.Check 
                                                    type={"radio"}
                                                    checked = {values.deliveryFee === 20000 ? true : false}
                                                    id={`default-radio`}
                                                    name="group1"
                                                    onChange={()=>{
                                                        setFieldValue("deliveryFee",20000)
                                                    }}
                                                    label={`Product is under 400,000 VND`}
                                                />
                                            </Component>
                                            <Component className='payment__0k'>
                                                <Form.Check
                                                    disabled={freeShip}
                                                    type={"radio"}
                                                    name="group1"
                                                    label={`Free ship`}
                                                    onChange={()=>{setFieldValue("deliveryFee",0)}}
                                                    id={`disabled-default-radio`}
                                                />
                                            </Component>
                                        </Form>
                                </Component>
                            </Component>
                            <Component className="payment__deliveryForm">
                                <Text style={{fontWeight:"600",fontSize:"16px"}}>Payment methods</Text>
                                <Component>
                                        <Form.Group>
                                            {/* <Component className='payment__20k'>
                                                <FormComponent.Image  
                                                    style={{display:"inline-block",marginRight:"15px"}}
                                                    height="40px" 
                                                    width="40px" 
                                                    src="https://static.vecteezy.com/system/resources/previews/000/356/559/non_2x/vector-package-icon.jpg"/>
                                                <Form.Check 
                                                    inline
                                                    checked= {values.paymentMethod}
                                                    name="group1"
                                                    type={"radio"}
                                                    onChange={()=>{
                                                        setFieldValue("paymentMethod", true)
                                                    }}
                                                    id={`default-radio-1`}
                                                    label={`Payment on delivery (COD)`}
                                                />
                                            </Component> */}
                                            <Component className='payment__20k'>
                                                <FormComponent.Image  
                                                    style={{display:"inline-block",marginRight:"15px"}}
                                                    height="40px" 
                                                    width="40px" 
                                                    src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/202166185_2021396718013233_8499389898242103910_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=pjAGSkpO-a4AX_9rQtQ&_nc_ht=scontent.fdad3-6.fna&oh=00_AfCNQoV9SaUJZiounlWlHiFjIb4mSTLhHDW7sbgdfi0Rew&oe=637DACE9"/>
                                                <Form.Check 
                                                    inline
                                                    name="group1"
                                                    checked= {true}
                                                    type={"radio"}
                                                    value="VNPay"
                                                    onChange={()=>{
                                                        setFieldValue("paymentMethod", "VNPay")
                                                    }}
                                                    id={`default-radio-2`}
                                                    label={`VNPay payment`}
                                                />
                                            </Component>
                                        </Form.Group>
                                </Component>
                                <Component style={{textAlign:"center",padding:"10px"}}>
                                    <Button 
                                        variant="primary" 
                                        type="submit"
                                        style={{width:"160px",padding:"10px"}}
                                        onSubmit = {() =>{
                                            if(!errorPayment){
                                                setErrorPayment(true);
                                                return;
                                            }
                                            if(errorPayment){

                                            }
                                        }}
                                        >Submit</Button>
                                </Component>
                            </Component>
                        </Component>

                        {/* state2 */}
                        <Component className="payment__flex-2">
                            <Component>
                                <Component name="purchasedProducts">
                                    {state?.cart?.map((item,index) =>{return(
                                        <Component>
                                            <Component className = "payment__productForm" key={index}>
                                                <Component className="payment__productInfo">
                                                    <FormComponent.Image
                                                        src={item.image}
                                                        height="115px" width="auto"
                                                        />
                                                    <Component>
                                                        <Text className="payment__productContent" style={{fontWeight:"600"}}>{item.name}</Text>
                                                        <Text className="payment__productContent">Type : {item.type}</Text>
                                                        <Text className="payment__productContent">Quantity : {item.quantity}</Text>
                                                    </Component>
                                                </Component>
                                                <Text style={{color:"red"}}>{item.total.toLocaleString("en-US")} VND</Text>
                                            </Component>
                                        </Component>
                                    )})}
                                </Component>
                                <Component className="payment__fee">
                                    <Component className="payment__productFee">
                                        <Text style={{color:"#717171"}}>Total Product Fee</Text>
                                        <Text className="payment__price">{(state?.cart?.reduce((total,item) => item.total + total,0)).toLocaleString("en-US") || 0} VND</Text>
                                    </Component>
                                    <Component className="payment__deliveryFee">
                                        <Text style={{color:"#717171"}}>Delivery Fee</Text>
                                        <Text className="payment__price">{values.deliveryFee.toLocaleString("en-US")} VND</Text>
                                    </Component>
                                </Component>
                                <Component className="payment__totalFee">
                                    <Text style={{fontSize:"18px",fontWeight:"600"}}>Total</Text>
                                    <Text  className="payment__price" style={{fontSize:"18px"}}>{((state?.cart?.reduce((total,item) => item.total + total,0)) + values.deliveryFee).toLocaleString("en-US")} VND</Text>
                                </Component>
                            </Component>
                        </Component>
                    </Component.Flex>
                </Form>
            )
        }}
    </Formik>
    )
}