import React from "react";
import Component from "../../components/root";
import Form from "../../components/form";
import Text from "../../components/text";
import Button from "../../components/button";
import { register } from "../../api/config";

export default function RegisterContainer() {
    const [state,setState] = React.useState({
        username: "",
        password: ""
    })
    const changeHandler = (e) => {
        setState(s =>({
            ...state,
            [e.target.name]: e.target.value
        }) )
    }
    const submitHandler = (e) => {
        e.preventDefault();
        register(state.username, state.password)
    }
    return(
        <Component className="login">
            <Component>
                <Form className="login__form" onSubmit={submitHandler}>
                    <Component.Flex className="login__flex">
                        <Text.Title>
                            Welcome to Register
                        </Text.Title>
                        <Form.Input name="username" value= {state.username} placeholder="Enter your user name..." onChange={changeHandler} ></Form.Input>
                        <Form.Input name="email" placeholder="Enter your email..."></Form.Input>
                        <Form.Input name="password" value={state.password} placeholder="Enter your password..." onChange={changeHandler}></Form.Input>
                        <Form.Input placeholder="Enter your password again..."></Form.Input>
                        <Form.Input type="submit" value={"Register"} style={{ width: "220px" }}></Form.Input>
                        <Button href="/login">Back to Login</Button>
                    </Component.Flex>
                </Form>
                <img src="https://wallpaperaccess.com/full/1098772.jpg" style={{ height: '99.8vh', width: '100%' }}></img>
            </Component>
        </Component>
    )
}

