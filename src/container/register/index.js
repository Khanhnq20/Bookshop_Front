import React from "react";
import Component from "../../components/root";
import FormComponent from "../../components/form";
import Text from "../../components/text";
import { register } from "../../api/config";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import Logo from "../../components/logo";


let productSchema = yup.object().shape({
    email: yup.string().required("Email is a required field"),
    password: yup.string().required("This field is requied").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    passwordConfirm: yup.string().required("This field is requied").oneOf([yup.ref("password"), null], "Passwords must match"),
    name: yup.string().required("Name is a required field"),
    dayOfBirth: yup.date().typeError("Day of Birth should be entered as yyyy/mm/dd").required("Day of Birth is a required field"),
    phoneNumber: yup.number().required("Phone Number is a required field"),
    gender: yup.string().required("Gender is a required field"),
})

export default function RegisterContainer() {
    const [error,setError] = React.useState();
    const navigate = useNavigate();
    return(<Formik
    initialValues={{
        email: '',
        password: '',
        passwordConfirm:"",
        name:'',
        dayOfBirth: '',
        phoneNumber: '',
        gender: ''
    }}
    validationSchema={productSchema}

    onSubmit={(values,formikHelper) => {
        formikHelper.setSubmitting(false);
        try{
            register(values.email,values.password,values.name,values.dayOfBirth,values.phoneNumber,values.gender).then(res => {
                    toast.success("Registed!")
                    navigate("/auth/login")
                });
        }catch(e){
            setError("Maybe your email already exists")
        }
    
    }}
    >
        {({values,touched,errors,handleSubmit,handleChange, handleBlur}) => {
            return(
        <Component className="login">
            <Component>
                <FormComponent className="login__form" onSubmit={handleSubmit}>
                    <Component.Flex className="login__flex">
                        <Logo></Logo>
                        <Text.Title style={{fontSize:"20px"}}>
                            Welcome to Register
                        </Text.Title>
                        {error && <Text style={{color:"red",textAlign:"center"}}>{error}</Text>}
                        <Form.Group>
                                <Form.Control
                                    type="text" 
                                    isInvalid={touched.email && errors.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                    placeholder="Enter your email" />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                    type="text" 
                                    isInvalid={touched.name && errors.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="name"
                                    placeholder="Enter your user name" />
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
                                    placeholder="Enter your phone number" />
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
                                    placeholder="Enter your Password"
                                    name="password"/>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                name="passwordConfirm"
                                placeholder="Enter password again"
                                isInvalid={touched.passwordConfirm && errors.passwordConfirm}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="success" onClick={handleSubmit}>Register</Button>
                        <Link to="/auth/login">
                            <Button variant="primary">Back To Login</Button>
                        </Link>
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

