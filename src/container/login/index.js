import React from "react";
import Component from "../../components/root";
import Form from "../../components/form";
import Text from "../../components/text";
import Button from "../../components/button";

export default function LoginContainer() {
    return(
        <Component className="login">
            <Component>
                    <Form className="login__form">
                        <Component.Flex className="login__flex">
                            <Text.Title>
                                Welcome to Login
                            </Text.Title>
                            <Form.Input placeholder="Enter your email..."></Form.Input>
                            <Form.Input placeholder="Enter your password..."></Form.Input>
                            <Button style={{width:"220px"}}>Login</Button>
                            <Text.Link href="aaa">Forgot your Password?</Text.Link>
                            <Text.Subtitle>Don't you have an account? <Text.Link href="aaa">Create an account</Text.Link></Text.Subtitle>
                        </Component.Flex>
                    </Form>
            </Component>
        </Component>
    )
}