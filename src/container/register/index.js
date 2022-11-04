import React from "react";
import Component from "../../components/root";
import FormComponent from "../../components/form";
import Text from "../../components/text";
import Button from "../../components/button";
import { register } from "../../api/config";

export default function RegisterContainer() {
    const [state,setState] = React.useState({
        email: "",
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
        register(state.email, state.password)
    }
    return(
        <Component className="login">
            <Component>
                <FormComponent className="login__form" onSubmit={submitHandler}>
                    <Component.Flex className="login__flex">
                        <Text.Title>
                            Welcome to Register
                        </Text.Title>

                        <FormComponent.Input name="email" placeholder="Enter your email..."></FormComponent.Input>
                        
                        <FormComponent.Input name="name" value= {state.name} placeholder="Enter your user name..." onChange={changeHandler} ></FormComponent.Input>

                        <FormComponent.Input name="dayOfBirth" value={state.name} type="date" onChange={changeHandler}></FormComponent.Input>

                        <FormComponent.Input name="phoneNumber" value={state.name} placeholder="Enter your phone number..." onChange={changeHandler}></FormComponent.Input>

                        <FormComponent.Input name="phoneNumber" value={state.name} placeholder="Enter your gender..." onChange={changeHandler}></FormComponent.Input>

                        <FormComponent.Input name="password" value={state.password} placeholder="Enter your password..." onChange={changeHandler}></FormComponent.Input>

                        <FormComponent.Input placeholder="Enter your password again..."></FormComponent.Input>

                        <FormComponent.Input type="submit" value={"Register"} style={{ width: "220px" }}></FormComponent.Input>
                        <Button href="/login">Back to Login</Button>
                    </Component.Flex>
                </FormComponent>
                <FormComponent.Image style={{ height: '99.8vh', width: '100%' }}></FormComponent.Image>
            </Component>
        </Component>
    )
}

