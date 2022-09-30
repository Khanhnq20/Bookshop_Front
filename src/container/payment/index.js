import { Formik, FieldArray } from 'formik';
import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

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
                <Component>
                    <Component>
                        <Text>Payment</Text>
                    </Component>
                    <Component.Flex>
                        <Component>
                            <Text>Payment Information</Text>
                            <Component.Grid>
                                <Form.Group className="createProduct__form1" >
                                    <Form.Control
                                        type="text"
                                        isInvalid={touched.userName && errors.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="userName"
                                        placeholder="Your Name" />
                                    <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="createProduct__form1" >
                                    <Form.Control
                                        type="text"
                                        isInvalid={touched.phoneNumber && errors.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="phoneNumber"
                                        placeholder="Your Phone Number" />
                                    <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="createProduct__form1" >
                                    <Form.Control
                                        type="text"
                                        isInvalid={touched.email && errors.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="email"
                                        placeholder="Your Email" />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="createProduct__form1" >
                                    <Form.Control
                                        type="text"
                                        isInvalid={touched.city && errors.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="city"
                                        placeholder="Your City" />
                                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="createProduct__form1" >
                                    <Form.Control
                                        type="text"
                                        isInvalid={touched.district && errors.district}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="district"
                                        placeholder="Your District" />
                                    <Form.Control.Feedback type="invalid">{errors.district}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="createProduct__form1" >
                                    <Form.Control
                                        type="text"
                                        isInvalid={touched.ward && errors.ward}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="ward"
                                        placeholder="Your Ward" />
                                    <Form.Control.Feedback type="invalid">{errors.ward}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="createProduct__form1" >
                                    <Form.Control
                                        type="text"
                                        isInvalid={touched.street && errors.street}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="street"
                                        placeholder="Your Street" />
                                    <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                                </Form.Group>
                            </Component.Grid>
                        </Component>
                    </Component.Flex>
                </Component>
            )
        }}
    </Formik>
    )
}