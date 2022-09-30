import React from "react";
import Component from "../../components/root";
import Form from "../../components/form";
import Text from "../../components/text";
import Button from "../../components/button";
import Logo from "../../components/logo";
import {login} from '../../api/config';


export default function LoginContainer() {
    const [state, setState] = React.useState({
        username: '',
        password: ''
    });
    const changeHandler = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        login(state.username, state.password);
    }

    return(
        <Component className="login">
            <Component>
                    <Form className="login__form" onSubmit={submitHandler}>
                        <Component.Flex className="login__flex">
                            <Logo></Logo>
                            <Text.Title>
                                Welcome to Login
                            </Text.Title>
                            <Form.Input placeholder="Enter your email..." name="username" onChange={changeHandler}></Form.Input>
                            <Form.Input placeholder="Enter your password..." name="password" onChange={changeHandler}></Form.Input>
                            <Form.Input type="submit" value={"Login"} style={{width:"220px"}}></Form.Input>
                            <Text.Link href="/register">Forgot your Password?</Text.Link>
                            <Text.Subtitle>Don't you have an account? <Text.Link href="aaa">Create an account</Text.Link></Text.Subtitle>
                        </Component.Flex>
                    </Form>
                <Form.Image src="https://wallpaperaccess.com/full/1098772.jpg" style={{height: '99.8vh', width: '100%'}}></Form.Image>
            </Component>

        </Component>
    )
}