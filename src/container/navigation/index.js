import React from "react";
import Logo from "../../components/logo";
import Component from "../../components/root";
import { BsSearch, BsCartFill } from 'react-icons/bs';
import Form from '../../components/form';

export default function NavigationContainer(){
    const [toggle,setToggle] = React.useState(" ");
    return(
        <Component className="nav">
            <Component.Flex className="nav__frame">
                <Component className="nav__flexItem">
                    <Component className="nav__first">
                        <Component className="nav__logo">
                            <Logo></Logo>
                        </Component>
                        <Component className="nav__search">
                            <Form className="nav__formSearch">
                                <BsSearch className="nav__searchIcon"></BsSearch>
                                <Form.Input placeholder="Search something..." className="nav__searchInput">
                                </Form.Input>
                            </Form>
                        </Component>
                    </Component>
                </Component>
                <Component className="nav__flexItem">
                    <Component.Flex className="nav__categories">
                        <Component>Home</Component>
                        <Component>Blog</Component>
                        <Component>Categories</Component>
                        <Component>About</Component>
                    </Component.Flex>
                </Component>
                <Component style={{textAlign:"end"}} className="nav__flexItem">
                    <Component className="nav__last">
                        <Component className="nav__cart">
                            <BsCartFill></BsCartFill>
                        </Component>
                        <Component className="nav__signIn">
                            Sign in
                        </Component>
                    </Component>
                </Component>
            </Component.Flex>
        </Component>
    )
}