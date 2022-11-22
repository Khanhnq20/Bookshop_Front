import React from "react";
import Component from "../../components/root";
import FormComponent from "../../components/form";
import Text from "../../components/text";
import Button from "../../components/button";
import Logo from "../../components/logo";
import {login} from '../../api/config';
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {useAthContext} from "../../store/authorContext";
import { toast } from "react-toastify";



export default function LoginContainer() {
    const [state, setState] = React.useState({
        username: '',
        password: ''
    });
    const contextHandler = useAthContext();
    const navigate = useNavigate();
    const changeHandler = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        login(state.username, state.password).then(res => {
            let data = res.data;
            localStorage.setItem("access",data?.token)
            navigate('/');
            toast.success(`Hello, ${contextHandler?.role}`)
            contextHandler.setLogin(true);
        });
    }

    return(<Formik>
        <Component className="login">
            <Component>
                    <FormComponent className="login__form" onSubmit={submitHandler}>
                        <Component.Flex className="login__flex">
                            <Logo></Logo>
                            <Text.Title>
                                Welcome to Login
                            </Text.Title>
                            <FormComponent.Input placeholder="Enter your email..." name="username" onChange={changeHandler}></FormComponent.Input>
                            <FormComponent.Input placeholder="Enter your password..." name="password" onChange={changeHandler}></FormComponent.Input>
                            <FormComponent.Input 
                            type="submit" 
                            value={"Login"} 
                            style={{width:"220px"}}
                            ></FormComponent.Input>
                            <Text.Link href="/register">Forgot your Password?</Text.Link>
                            <Text.Subtitle>Don't you have an account? <Text.Link href="/auth/register">Create an account</Text.Link></Text.Subtitle>
                        </Component.Flex>
                    </FormComponent>
                <FormComponent.Image style={{height: '99.8vh', width: '100%'}}></FormComponent.Image>
            </Component>
        </Component>
    </Formik>
    )
}

