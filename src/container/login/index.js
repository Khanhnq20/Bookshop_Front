import React from "react";
import Component from "../../components/root";
import FormComponent from "../../components/form";
import Text from "../../components/text";
import Logo from "../../components/logo";
import { Formik } from "formik";
import Button from 'react-bootstrap/Button';
import {useAthContext} from "../../store/authorContext";
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';

let loginSchema = yup.object().shape({
    username: yup.string().required("Pls enter your email!"),
    password: yup.string().required("Pls enter your password!")
})

export default function LoginContainer() {
    const [error,setError] = React.useState();
    const contextHandler = useAthContext();

    return(<Formik
    
    initialValues={{
        username: '',
        password: ''
    }}

    validationSchema={loginSchema}

    onSubmit={(values,formikHelper) => {
        formikHelper.setSubmitting(false);
            contextHandler.login(values.username, values.password);
            console.log(contextHandler.error);
            setError(contextHandler.error);
    }}
    >
        {({touched, errors, handleSubmit, handleChange, handleBlur}) =>{
            return(
                <Component className="login">
                    <Component>
                            <FormComponent className="login__form" onSubmit={handleSubmit}>
                                <Component.Flex className="login__flex">
                                    <Logo></Logo>
                                    <Text.Title style={{fontSize:"20px"}}>
                                        Welcome to Login!
                                    </Text.Title>
                                    {error && <Text.Info style={{color:"red"}}>{error}</Text.Info>}
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Enter new password"
                                            isInvalid={touched.username && errors.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter new password"
                                            isInvalid={touched.password && errors.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button
                                    onClick={handleSubmit}
                                    variant="success"
                                    >Login</Button>
                                    <Text.Subtitle style={{textAlign:"center", padding:"10px"}}>Don't you have an account? 
                                        <Text.Link style={{color:"green"}} href="/auth/register">Create an account!</Text.Link>
                                    </Text.Subtitle>
                                </Component.Flex>
                            </FormComponent>
                        <FormComponent.Image style={{height: '99.8vh', width: '100%'}}></FormComponent.Image>
                    </Component>
                </Component>
            )
        }}
    </Formik>
    )
}

