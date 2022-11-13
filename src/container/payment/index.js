import { Formik, FieldArray } from 'formik';
import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import FormComponent from '../../components/form/index';
import Button from 'react-bootstrap/Button';

let productSchema = yup.object().shape({
    userName: yup.string().required(),
    phoneNumber: yup.number().required(),
    email : yup.string().email().required(),
    city : yup.string().required(),
    district: yup.string().required(),
    ward: yup.string().required(),
    street: yup.string().required()
})

export default function PaymentContainer(){
    const [deliveryFee,setDeliveryFee] = React.useState(0);
    return(<Formik
        initialValues={{
            userName : "",
            phoneNumber:"",
            email:"",
            city: "",
            district:"",
            ward:"",
            street:""
        }}
        validationSchema ={productSchema}
        onSubmit={(formikHelper => {
            formikHelper.setSubmitting(false);
        })}
    >
        {({values,touched,errors,handleSubmit,handleChange,handleBlur}) => {
            return(
                <Component className="payment">
                    <Component.Flex className="payment__parent">
                        <Component className="payment__flex-1">
                            <Component style={{marginBottom:"50px"}}>
                                <Text style={{marginBottom:"10px",fontWeight:"600",fontSize:"16px"}}>Payment Information</Text>
                                <Component.Grid className="payment__gridForm">
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            isInvalid={touched.userName && errors.userName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="userName"
                                            placeholder="Your Name" />
                                        <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                                    </Form.Group>
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
                                            isInvalid={touched.email && errors.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="email"
                                            placeholder="Your Email" />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            isInvalid={touched.city && errors.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="city"
                                            placeholder="Your City" />
                                        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
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
                                                    id={`default-radio`}
                                                    name="group1"
                                                    onChange={()=>{setDeliveryFee(20)}}
                                                    label={`Product is under 400.000vnd`}
                                                />
                                            </Component>
                                            <Component className='payment__0k'>
                                                <Form.Check
                                                    disabled
                                                    type={"radio"}
                                                    name="group1"
                                                    label={`Free ship`}
                                                    onChange={()=>{setDeliveryFee(0)}}
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
                                            <Component className='payment__20k'>
                                                <FormComponent.Image  
                                                    style={{display:"inline-block",marginRight:"15px"}}
                                                    height="40px" 
                                                    width="40px" 
                                                    src="https://static.vecteezy.com/system/resources/previews/000/356/559/non_2x/vector-package-icon.jpg"/>
                                                <Form.Check 
                                                    inline
                                                    name="group1"
                                                    type={"radio"}
                                                    id={`default-radio-1`}
                                                    label={`Payment on delivery (COD)`}
                                                />
                                            </Component>
                                            <Component className='payment__20k'>
                                                <FormComponent.Image  
                                                    style={{display:"inline-block",marginRight:"15px"}}
                                                    height="40px" 
                                                    width="40px" 
                                                    src="https://tinyurl.com/2vadxsya"/>
                                                <Form.Check 
                                                    inline
                                                    name="group1"
                                                    type={"radio"}
                                                    id={`default-radio-2`}
                                                    label={`VNPay payment`}
                                                />
                                            </Component>
                                        </Form.Group>
                                </Component>
                                <Component style={{textAlign:"center",padding:"10px"}}>
                                    <Button 
                                        variant="primary" 
                                        style={{width:"160px",padding:"10px"}}
                                        >Submit</Button>
                                </Component>
                            </Component>
                        </Component>

                        {/* state2 */}
                        <Component className="payment__flex-2">
                            <Component>
                                <Component className = "payment__productForm">
                                    <Component className="payment__productInfo">
                                        <FormComponent.Image style={{borderRadius:"8px",overflow:"hidden"}} 
                                            src="https://tinyurl.com/2mcfxrmt" 
                                            height="100px" width="100px"
                                            />
                                        <Component>
                                            <Text className="payment__productContent">Name</Text>
                                            <Text className="payment__productContent">Type</Text>
                                            <Text className="payment__productContent">Quantity</Text>
                                        </Component>
                                    </Component>
                                    <Text>325 USD</Text>
                                </Component>
                                <Component className="payment__fee">
                                    <Component className="payment__productFee">
                                        <Text style={{color:"#717171"}}>Total Product Fee</Text>
                                        <Text className="payment__price">345 USD</Text>
                                    </Component>
                                    <Component className="payment__deliveryFee">
                                        <Text style={{color:"#717171"}}>Delivery Fee</Text>
                                        <Text className="payment__price">{deliveryFee} USD</Text>
                                    </Component>
                                </Component>
                                <Component className="payment__totalFee">
                                    <Text style={{fontSize:"18px"}}>Total</Text>
                                    <Text  className="payment__price" style={{fontSize:"18px"}}>543 USD</Text>
                                </Component>
                            </Component>
                        </Component>
                    </Component.Flex>
                </Component>
            )
        }}
    </Formik>
    )
}