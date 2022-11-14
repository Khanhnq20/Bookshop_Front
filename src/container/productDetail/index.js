import React from "react";
import FormComponent from "../../components/form";
import Component from "../../components/root";
import Text from "../../components/text";
import Button from "../../components/button";
import { BiMinus, BiPlus } from 'react-icons/bi';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { ListGroup,Row, Col} from 'react-bootstrap';
import { getSingleProduct } from "../../api/product";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { getGenre } from "../../api/config";
import { useCartContext } from "../../store/cartContext";
import { useAuthorContext } from "../../store";
import { toast } from "react-toastify";

export default function ProductDetailContainer() {
    const [quantity,setQuantity] = React.useState(1);
    const [inventory,setInventory] = React.useState();
    const [genres,setGenres] = React.useState([])
    const locationParams = useParams();
    const [product, setProduct] = React.useState({}); 
    const {isLogin} = useAuthorContext();
    const [state, functions] = useCartContext();
    const [error,setError] = React.useState("");
    const navigate = useNavigate();
    const [productCart,setProductCart] = React.useState({
        id: 0,
        image:"",
        name:"",
        type:'',
        price:0,
        quantity:0
    })
    
    React.useEffect(() => {
        if(locationParams?.id){
            const {id} = locationParams;
            getSingleProduct(id).then(response => {
                const { data } = response;
                console.log(data);
                if(typeof data === 'object'){
                    setProduct(data);
                }
            })
            
        }
        getGenre().then(response => {
            const {data} = response;
            if(Array.isArray(data)){
                setGenres(data)
            }
        })
    }, []);

    React.useEffect(() => {
        setProductCart(o => ({...o,image: product?.fileImage,
            id: product?.id,
            name:product?.name,quantity:quantity}));
    }, [product,quantity])
    
    React.useEffect(() => {
        if(quantity > inventory){
            setQuantity(inventory)
        }
    }, [inventory,quantity])

    const handleMinus=()=>{
        if(quantity === 1){
            return;
        }
        setQuantity(i => --i)
    }
    const handlePlus=()=>{
        
        if(quantity === 99){
            return;
        }
        setQuantity(o => o + 1)
    }
    const handleSubmit=(book)=>{
        if(isLogin){
            functions.addToCart(book);
        }
        else {
            toast.warn("Please login first");
            navigate("/auth/login");
        }
    }   
    const validateInventory = (callback) =>{
        let error;
        if(!inventory){
            error = "Pls check the type"
            setError(error)
        }
        callback(error);
    }

    return(
        <Component.Wrapper className="productDetail">
            <Component className="productDetail__flex">
                <Component className="productDetail__item1">
                    <FormComponent.Image className="productDetail__image" src={product?.fileImage || "https://tinyurl.com/2mcfxrmt"}></FormComponent.Image>
                </Component>
                <Component className="productDetail__item2">
                    <Component>
                        <Text.Title className="productDetail__title">{product?.name}</Text.Title>
                        <Component className="productDetail__label">
                            <Text.Label>Author</Text.Label>
                            <Text.Info href="">{product?.author}</Text.Info>
                        </Component>
                        <Component className="productDetail__label">
                            <Text.Label>Genres</Text.Label>
                            <Text style={{marginLeft:"5px"}}>
                                <Text.Info style={{display:"flex"}} href="">{product?.productGenres?.map(currentGenres => {
                                    return genres.find(g => {
                                        return currentGenres.genreId === g.id
                                    })?.name}).join(",  ")}
                                </Text.Info>
                            </Text>
                        </Component>
                        <Text className="productDetail__format" style={{ marginBottom: "10px" }}>Format</Text>
                        <Component>
                            <Form style={{ display: "flex" }}>
                                {product?.type?.map((item,index) => {
                                    return(
                                        <ListGroup key={index} className="mb-4">
                                            <Form.Group as={ListGroup.Item} style={{ marginRight: "5px" }} className="productDetail__formSelect">
                                                <Form.Check
                                                    inline
                                                    label={item.name}
                                                    name="group1"
                                                    type="radio"
                                                    onChange={(e) => {
                                                        setInventory(item.inventory);
                                                        setProductCart(o =>({...o,type:item?.name,price:item.price}))
                                                    }}
                                                    id={`inline-radio-${++index}`}
                                                />
                                                <Text.Price style={{ textAlign: "center" }}>{item.price?.toLocaleString("en-US")} VND</Text.Price>
                                            </Form.Group>
                                        </ListGroup>
                                    )
                                })}
                            </Form>
                            {error && <p style={{color:"red",paddingLeft:"5px"}}>{error}</p>}
                        </Component>
                    </Component>
                    <Component className="productDetail__quantityAdd">
                        <Component.Span className="productDetail__quantityForm">
                                <BiMinus style={{cursor:'pointer',marginLeft:'5px'}}
                                    onClick={handleMinus}
                                ></BiMinus>
                                <FormComponent.Input className="productDetail__quantity"
                                    style={{paddingLeft:'5px'}}
                                    type='number'
                                    value={quantity}
                                    max={99}
                                    onChange={(i) =>{setQuantity(Number(i.target.value) > 99 ? 99 : i.target.value)}}
                                ></FormComponent.Input>
                                <BiPlus style={{cursor:'pointer'}}
                                    onClick={handlePlus}
                                ></BiPlus>
                        </Component.Span>
                        <Component.Span>
                            <Button className="productDetail__button"
                                onClick={()=>{
                                    validateInventory(error =>{
                                        console.log(error);
                                        if(!error){
                                            handleSubmit(productCart);
                                            setError("")
                                        }
                                    });
                                }}
                            >Add to Cart</Button>
                        </Component.Span>
                    </Component>
                    <Component>
                        <Component className="productDetail__label">
                            <Component className="productDetail__topic">
                                <Text.Label>Inventory</Text.Label>
                                <Text.Label>Publish Day</Text.Label>
                                <Text.Label>Pages</Text.Label>
                                <Text.Label>Language</Text.Label>
                            </Component>
                            <Component className="productDetail__info">
                                <Text.Info>{inventory || "Stocking"}</Text.Info>
                                <Text.Info>{product?.publishDay}</Text.Info>
                                <Text.Info>{product?.pages}</Text.Info>
                                <Text.Info>{product?.language}</Text.Info>
                            </Component>
                        </Component>
                    </Component>
                </Component>
            </Component>
            <Component className="productDetail__tab">
                <Component className="productDetail__tab1">
                    <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3 tab"
                    >
                        <Tab eventKey="home" title="Description">
                            <Text className="tab__text">{product?.description}</Text>
                        </Tab>
                        <Tab eventKey="profile" title="Rating">
                            wonderful
                        </Tab>
                    </Tabs>
                </Component>
                <Component className="productDetail__tab2">
                    <Text>
                        MIỄN PHÍ chuyển hàng COD Toàn Quốc cho đơn hàng từ 200 USD
                        Hỗ trợ đổi sản phẩm trong 14 ngày kể từ ngày nhận hàng với điều kiện hàng mới chưa qua sử dụng và còn nguyên tem mác.
                        Bảo hành sản phẩm trong vòng 6 tháng đối với lỗi từ nhà sản xuất (lỗi keo, lỗi chỉ,..).
                    </Text>
                </Component>
            </Component>
        </Component.Wrapper>
    )
}
