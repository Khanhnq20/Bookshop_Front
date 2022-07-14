import React from "react";
import Component from "../../components/root";
import Form from "../../components/form";
import Text from "../../components/text";
import Button from "../../components/button";

export default function RegisterContainer() {
    return(
        <Component className="login">
            <Component>
                <Form className="login__form">
                    <Component.Flex className="login__flex">
                        <Text.Title>
                            Welcome to Register
                        </Text.Title>
                        <Form.Input placeholder="Enter your user name..."></Form.Input>
                        <Form.Input placeholder="Enter your phone number..."></Form.Input>
                        <Form.Input placeholder="Enter your email..."></Form.Input>
                        <Form.Input placeholder="Enter your password..."></Form.Input>
                        <Form.Input placeholder="Enter your password again..."></Form.Input>
                        <Button style={{ width: "220px" }}>Register</Button>
                    </Component.Flex>
                </Form>
            </Component>
        </Component>
    )
}