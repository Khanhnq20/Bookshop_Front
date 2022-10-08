import React from "react";
import Logo from "../../components/logo";
import Component from "../../components/root";
import { BsSearch, BsCartFill } from 'react-icons/bs';
import {Row, Col} from 'react-bootstrap';
import Form from '../../components/form';
import Text from "../../components/text";
import { getGenre } from "../../api/config";
import { Link } from "react-router-dom";

export default function NavigationContainer({...resProp}){
    const [toggle,setToggle] = React.useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const [genres,setGenres] = React.useState([])
    React.useEffect(()=>{
        getGenre().then(response => {
            const {data} = response;
            if(Array.isArray(data)){
                setGenres(data);
            }
        })
    },[])
    
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
                            <Component>
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <Text className="nav__topic">Home</Text>
                                </Link>
                            </Component>
                        <Component><Text className="nav__topic">Blog</Text></Component>
                        <Component className="nav__genres">
                            <Text onClick={handleToggle} className="nav__genresItem">Genres</Text>
                            {toggle && 
                                <Row xs={2} sm={4} className="nav__table">
                                    {genres.map((item,index) =>{
                                        return(
                                            <>
                                                <Link style={{ textDecoration: "none"}} to={`/filterProduct/${item.id}`}>
                                                    <Col xs={'6'} sm="3" key={index}>
                                                        <span><Text className="nav__genresChoose">{item.name}</Text></span>
                                                    </Col>
                                                </Link>
                                            </>
                                        )
                                    })}
                                </Row>
                            }
                        </Component>
                        <Component><Text className="nav__topic">About</Text></Component>
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