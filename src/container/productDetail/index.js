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
import { useParams } from "react-router-dom";
import { getGenre } from "../../api/config";

export default function ProductDetailContainer() {
    const [inventory,setInventory] = React.useState();
    const [genres,setGenres] = React.useState([])
    const locationParams = useParams();
    const [product, setProduct] = React.useState({});
    React.useEffect(() => {
        if(locationParams?.id){
            const {id} = locationParams;
            getSingleProduct(id).then(response => {
                const { data } = response;
                if(typeof data === 'object'){
                    setProduct(data);
                }
            })
            
        }
        getGenre().then(response => {
            const {data} = response;
            console.log(data);
            if(Array.isArray(data)){
                setGenres(data)
            }
        })
    }, []);

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
                                        <ListGroup key="inline-radio" className="mb-4">
                                            <Form.Group key={index} as={ListGroup.Item} style={{ marginRight: "5px" }} className="productDetail__formSelect">
                                                <Form.Check
                                                    inline
                                                    label={item.name}
                                                    name="group1"
                                                    type="radio"
                                                    onChange={() => {
                                                        setInventory(item.inventory)
                                                    }}
                                                    id={`inline-radio-${++index}`}
                                                />
                                                <Text.Price style={{ textAlign: "center" }}>{item.price} USD</Text.Price>
                                            </Form.Group>
                                        </ListGroup>
                                    )
                                })}
                            </Form>
                        </Component>
                    </Component>
                    <Component className="productDetail__quantityForm">
                        <Component.Span className="productDetail__quantity">
                            <Component.Span className="productDetail__minus"><BiMinus></BiMinus></Component.Span>
                            <Component.Span className="productDetail__number">1</Component.Span>
                            <Component.Span className="productDetail__plus"><BiPlus></BiPlus></Component.Span>
                        </Component.Span>
                        <Component.Span>
                            <Button className="productDetail__button">Add to Cart</Button>
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

// function ControlledTabs() {
//     const [key, setKey] = React.useState('home');
//     const locationParams = useParams();

//     const [product, setProduct] = React.useState({});

//     React.useEffect(() => {
//         if (locationParams?.id) {
//             const { id } = locationParams;

//             getSingleProduct(id).then(response => {
//                 const { data } = response;

//                 if (typeof data === 'object') {
//                     setProduct(data);
//                 }
//             })
//         }
//     }, []);
//     return (
//         <Tabs
//             defaultActiveKey="home"
//             transition={false}
//             id="noanim-tab-example"
//             className="mb-3 tab"
//         >
//             <Tab eventKey="home" title="Description">
//                 <Text className="tab__text">{product?.description}</Text>
//             </Tab>
//             <Tab eventKey="profile" title="Rating">

//             </Tab>
//         </Tabs>
//     );
// }