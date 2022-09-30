import React from "react";
import Logo from "../../components/logo";
import Component from "../../components/root";
import { BsSearch, BsCartFill } from 'react-icons/bs';
import Form from '../../components/form';
import Text from "../../components/text";

export default function NavigationContainer({...resProp}){
    const [toggle,setToggle] = React.useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    return(
        <Component className="nav" {...resProp}>
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
                        <Component><Text.Link>Home</Text.Link></Component>
                        <Component><Text.Link>Blog</Text.Link></Component>
                        <Component className="nav__genres">
                            <Text.Link onClick={handleToggle} className="nav__genresItem">Genres</Text.Link>
                            {toggle && 
                                <Component.Table className="nav__table">
                                    <tr>
                                        <td><Text.Link>Fiction</Text.Link></td>
                                        <td><Text.Link>Mystery</Text.Link></td>
                                        <td><Text.Link>Thriller</Text.Link></td>
                                        <td><Text.Link>Nonfiction</Text.Link></td>
                                    </tr>
                                    <tr>
                                        <td><Text.Link>Historical</Text.Link></td>
                                        <td><Text.Link>Romance</Text.Link></td>
                                        <td><Text.Link>Literature</Text.Link></td>
                                        <td><Text.Link>Best Seller</Text.Link></td>
                                    </tr>
                                    <tr>
                                        <td><Text.Link>Economics & Finance</Text.Link></td>
                                        <td><Text.Link>Comic</Text.Link></td>
                                        <td><Text.Link>Self-help</Text.Link></td>
                                        <td><Text.Link>Novel</Text.Link></td>
                                    </tr>
                                </Component.Table>
                            }
                        </Component>
                        <Component><Text.Link>About</Text.Link></Component>
                    </Component.Flex>
                </Component>
                <Component style={{textAlign:"end"}} className="nav__flexItem">
                    <Component className="nav__last">
                        <Component className="nav__cart">
                            <BsCartFill></BsCartFill>
                        </Component>
                        <Component className="nav__signIn">
                            <Text.Link href="/login">Sign in</Text.Link>
                        </Component>
                    </Component>
                </Component>
            </Component.Flex>
        </Component>
    )
}