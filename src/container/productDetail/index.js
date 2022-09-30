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

export default function ProductDetailContainer() {
    function ControlledTabs() {
        const [key, setKey] = React.useState('home');

        return (
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 tab"
            >
                <Tab eventKey="home" title="Home">
                    <Text className="tab__text">nguyen quy khanh</Text>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    
                </Tab>
            </Tabs>
        );
    }
    return(
        <Component.Wrapper className="productDetail">
            <Component className="productDetail__flex">
                <Component className="productDetail__item1">
                    <FormComponent.Image className="productDetail__image" src="https://tinyurl.com/4bfh7s5z"></FormComponent.Image>
                </Component>
                <Component className="productDetail__item2">
                    <Component>
                        <Text.Title className="productDetail__title">The end of the fucking world</Text.Title>
                        <Component className="productDetail__label">
                            <Text.Label>Author</Text.Label>
                            <Text.Info href="">da Vince</Text.Info>
                        </Component>
                        <Text className="productDetail__format">Format</Text>
                        <Component>
                            <Form>
                                    <ListGroup key= "inline-radio" className="mb-3 " horizontal>
                                        <Form.Group as={ListGroup.Item} className="productDetail__formSelect">
                                            <Form.Check
                                                inline
                                                label="Hardcover"
                                                name="group1"
                                                type="radio"
                                                id="inline-radio-1"
                                            />
                                            <Text.Price style={{textAlign: "center"}}>60 USD</Text.Price>
                                        </Form.Group>
                                        <Form.Group as={ListGroup.Item} className="productDetail__formSelect">
                                            <Form.Check
                                                inline
                                                label="Paperback"
                                                name="group1"
                                                type="radio"
                                                id="inline-radio-2"
                                            />
                                            <Text.Price style={{ textAlign: "center" }}>20 USD</Text.Price>
                                        </Form.Group>
                                    </ListGroup>
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
                                <Text.Label>Warehouse</Text.Label>
                                <Text.Label>Author</Text.Label>
                                <Text.Label>Paper</Text.Label>
                                <Text.Label>Type</Text.Label>
                                <Text.Label>Language</Text.Label>
                            </Component>
                            <Component className="productDetail__info">
                                <Text.Info>Stocking</Text.Info>
                                <Text.Info>da Vince</Text.Info>
                                <Text.Info>320</Text.Info>
                                <Text.Info>Paperback</Text.Info>
                                <Text.Info>English</Text.Info>
                            </Component>
                        </Component>
                    </Component>
                </Component>
            </Component>
            <Component className="productDetail__tab">
                <Component className="productDetail__tab1">
                    <ControlledTabs></ControlledTabs>
                </Component>
                <Component className="productDetail__tab2">
                    <Text>
                        MIỄN PHÍ chuyển hàng COD Toàn Quốc cho đơn hàng từ 800k
                        Hỗ trợ đổi sản phẩm trong 14 ngày kể từ ngày nhận hàng với điều kiện hàng mới chưa qua sử dụng và còn nguyên tem mác.
                        Bảo hành sản phẩm trong vòng 6 tháng đối với lỗi từ nhà sản xuất (lỗi keo, lỗi chỉ,..).
                    </Text>
                </Component>
            </Component>
        </Component.Wrapper>
    )
}