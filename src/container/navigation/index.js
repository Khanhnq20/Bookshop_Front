import React from "react";
import Logo from "../../components/logo";
import Component from "../../components/root";
import { BsSearch } from 'react-icons/bs';
import {Row, Col} from 'react-bootstrap';
import Form from '../../components/form';
import Text from "../../components/text";
import { getGenre, logout } from "../../api/config";
import { Link, useNavigate } from "react-router-dom";
import {useAthContext} from "../../store/authorContext";
import {AiOutlineShoppingCart} from "react-icons/ai"
import { toast } from "react-toastify";
import CartBar from "../cartBar";
import { useCartContext } from "../../store/cartContext";
import FormComponent from "../../components/form";
import Dropdown from 'react-bootstrap/Dropdown';

export default function NavigationContainer({...resProp}){
    const [toggle,setToggle] = React.useState(false);
    const [show,setShow] = React.useState(false);
    const [genres,setGenres] = React.useState([]);
    const [state,functions] = useCartContext();
    const {role} = useAthContext();
    React.useEffect(()=>{
        getGenre().then(response => {
            const {data} = response;
            if(Array.isArray(data)){
                setGenres(data);
            }
        })
    },[])
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const handleShowBar = () =>{
        setShow(true);
    }

    return(
        <>
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
                                                <Link style={{ textDecoration: "none"}}  to={`/filterProduct/${item.id}`}>
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
                        <Component className="nav__cart"
                            onClick={handleShowBar}
                        >
                            <AiOutlineShoppingCart className="nav__cartIcon"></AiOutlineShoppingCart>
                            <Component className="nav__cartQuantity">{state?.cart?.length}</Component>
                        </Component>
                        <Component className="nav__signIn">
                            <CheckLogged></CheckLogged>
                        </Component>
                    </Component>
                </Component>
            </Component.Flex>
        </Component>
        <Component>
            <CartBar 
            showBar={show} 
            handleClose={()=>{setShow(false)}}></CartBar>
        </Component>
        </>

    )
}

function CheckLogged() {
    const {isLogin,role} = useAthContext();
    if(!isLogin){
        return (
            <Link to="/auth/login">Sign in</Link>
        )
    }else if(role === "user"){
        return(<AvatarUserDropDown></AvatarUserDropDown>)
    }else if(role === "staff"){
        return (<AvatarStaffDropDown></AvatarStaffDropDown>)
    }
    return(
        <AvatarAdminDropDown></AvatarAdminDropDown>
    )
    // return <Button onClick={onLogout}>Log out</Button>   
}

function AvatarAdminDropDown() {
        const {userID, logout} = useAthContext();
        const [state,functions] = useCartContext();
        const navigate = useNavigate();
    return (
    <Dropdown>
        <Dropdown.Toggle style={{background:"none",color:"none",border:"none",padding:0,width:"40px",boxShadow:"none"}} variant="success" id="dropdown-basic">
            <FormComponent.Image 
            style={{margin:0,padding:0}}
            height="40px"
            weight="40px"
            src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg"
            
            />
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item>
                <Link to={`/personal/${userID}`}style={{textDecoration: "none",color:"black"}}>
                    Personal
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/userManagement" style={{textDecoration: "none",color:"black"}}>
                    User Management
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/staffManagement" style={{textDecoration: "none",color:"black"}}>
                    Staff Management
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/purchaseHistory" style={{textDecoration: "none",color:"black"}}>
                    Purchase History
                </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={() =>{
                state?.setCart([]);
                logout(() =>{
                    toast.success("Log out");
                }, () =>{
                    toast.error("Server has been stucked to trigger this action");
                })
                navigate("/");
            }}>Log out</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    );
}

function AvatarUserDropDown() {
        const {userID, setLogin} = useAthContext();
            const onLogout = () =>{
        logout().then(()=>{
            setLogin(false);
            toast.success("Log out");
            localStorage.removeItem("cart");
        }).catch(() =>{
            toast.error("cannot logout")
        });

    }
    return (
    <Dropdown>
        <Dropdown.Toggle style={{background:"none",color:"none",border:"none",padding:0,width:"40px",boxShadow:"none"}} variant="success" id="dropdown-basic">
            <FormComponent.Image 
            style={{margin:0,padding:0}}
            height="40px"
            weight="40px"
            src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg"
            
            />
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item>
                <Link to={`/personal/${userID}`}style={{textDecoration: "none",color:"black"}}>
                    Personal
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/getPurchased" style={{textDecoration: "none",color:"black"}}>
                    Purchase History
                </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={onLogout}>Log out</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    );
}

function AvatarStaffDropDown() {
        const {userID, setLogin} = useAthContext();
            const onLogout = () =>{
        logout().then(()=>{
            setLogin(false);
            toast.success("Log out");
            localStorage.removeItem("cart");
        }).catch(() =>{
            toast.error("cannot logout")
        });

    }
    return (
    <Dropdown>
        <Dropdown.Toggle style={{background:"none",color:"none",border:"none",padding:0,width:"40px",boxShadow:"none"}} variant="success" id="dropdown-basic">
            <FormComponent.Image 
            style={{margin:0,padding:0}}
            height="40px"
            weight="40px"
            src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg"
            
            />
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item>
                <Link to={`/personal/${userID}`}style={{textDecoration: "none",color:"black"}}>
                    Personal
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/purchaseHistory" style={{textDecoration: "none",color:"black"}}>
                    Purchase History
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/productManagement" style={{textDecoration: "none",color:"black"}}>
                    Product Management
                </Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link to="/genres" style={{textDecoration: "none",color:"black"}}>
                    Genre Management
                </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={onLogout}>Log out</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    );
}