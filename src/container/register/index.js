import React from "react";
import Component from "../../components/root";
import FormComponent from "../../components/form";
import Text from "../../components/text";
import Button from "../../components/button";
import { register } from "../../api/config";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';


let productSchema = yup.object().shape({
    email: yup.string().required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
    name: yup.string().required("Name is a required field"),
    dayOfBirth: yup.date().typeError("Day of Birth should be entered as yyyy/mm/dd").required("Day of Birth is a required field"),
    phoneNumber: yup.number().required("Phone Number is a required field"),
    gender: yup.string().required("Gender is a required field"),
})

export default function RegisterContainer() {
    const navigate = useNavigate();
    return(<Formik
    initialValues={{
        email: '',
        password: '',
        name:'',
        dayOfBirth: '',
        phoneNumber: '',
        gender: ''
    }}
    validationSchema={productSchema}

    onSubmit={(values,formikHelper) => {
        formikHelper.setSubmitting(false);
        register(values.email,values.password,values.name,values.dayOfBirth,values.phoneNumber,values.gender).then(res => {
                navigate("/auth/login")
            });
    }}
    >
        {({values,touched,errors,handleSubmit,handleChange, handleBlur}) => {
            return(
        <Component className="login">
            <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(errors,null,4)}</pre>
            <Component>
                <FormComponent className="login__form" onSubmit={handleSubmit}>
                    <Component.Flex className="login__flex">
                        <Text.Title>
                            Welcome to Register
                        </Text.Title>
                        <Form.Group>
                                <Form.Control
                                    type="text" 
                                    isInvalid={touched.email && errors.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                    placeholder="Enter your email..." />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                    type="text" 
                                    isInvalid={touched.name && errors.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="name"
                                    placeholder="Enter your user name..." />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                    type="text" 
                                    isInvalid={touched.dateOfBirth && errors.dayOfBirth}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="dayOfBirth"
                                    placeholder="Date of birth (dd/mm/yyyy)" />
                            <Form.Control.Feedback type="invalid">{errors.dayOfBirth}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                    type="text" 
                                    isInvalid={touched.phoneNumber && errors.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="phoneNumber"
                                    placeholder="Enter your phone number..." />
                            <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style={{ marginRight: "5px" }}>
                            <Form.Check
                                inline
                                label={"Male"}
                                value="Male"
                                name="gender"
                                type="radio"
                                onChange={handleChange}
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                inline
                                label={"Female"}
                                value="Female"
                                name="gender"
                                type="radio"
                                onChange={handleChange}
                                id={`inline-radio-2`}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                    type="password" 
                                    isInvalid={touched.password && errors.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="password"/>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <FormComponent.Input type="submit" value={"Register"} style={{ width: "220px" }}></FormComponent.Input>
                        <Button href="/auth/login">Back to Login</Button>
                    </Component.Flex>
                </FormComponent>
                <FormComponent.Image style={{ height: '99.8vh', width: '100%' }}></FormComponent.Image>
            </Component>
        </Component>
            )
        }}
    </Formik>
    )
}

