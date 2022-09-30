import React from "react";
import Component from "../../components/root";
import Form from "../../components/form";
import Text from "../../components/text";
import { MdOutlineLocalShipping, MdOutlineHighQuality } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi"

export default function BokoBrand(){
    return(
        <Component className="bokoBrand">
            <Component.Flex className="bokoBrand__flex">
                <Component className="bokoBrand__item">
                    <Form.Image className="bokoBrand__image" src="https://tinyurl.com/4xfk3p5m">
                    </Form.Image>
                </Component>
                <Component style={{ background:"#FFF0D9"}} className="bokoBrand__item">
                    <Text.Title className="bokoBrand__title">Why BoKo?</Text.Title>
                    <Component className="bokoBrand__info">
                        <Component.Flex className="bokoBrand__infoFlex">
                            <Component>
                                <MdOutlineLocalShipping className="bokoBrand__ship"></MdOutlineLocalShipping>
                            </Component>
                            <Component>
                                <Text.Subtitle className="bokoBrand__subTitle">Free Shipping</Text.Subtitle>
                                <Text className="bokoBrand__text">Free COD delivery nationwide for orders from VND 500,000.</Text>
                            </Component>
                        </Component.Flex>
                        <Component.Flex className="bokoBrand__infoFlex">
                            <Component>
                                <HiOutlineUserGroup className="bokoBrand__ship"></HiOutlineUserGroup>
                            </Component>
                            <Component>
                                <Text.Subtitle className="bokoBrand__subTitle">Support 24/7</Text.Subtitle>
                                <Text className="bokoBrand__text">Professional team support customers via hotline 0107773034.</Text>
                            </Component>
                        </Component.Flex>
                        <Component.Flex className="bokoBrand__infoFlex">
                            <Component>
                                <MdOutlineHighQuality className="bokoBrand__ship"></MdOutlineHighQuality>
                            </Component>
                            <Component>
                                <Text.Subtitle className="bokoBrand__subTitle">High Quality</Text.Subtitle>
                                <Text className="bokoBrand__text">Books are inspected and carefully packaged.</Text>
                                <Text className="bokoBrand__text">111% refund if you buy fake goods.</Text>
                            </Component>
                        </Component.Flex>
                    </Component>
                </Component>
            </Component.Flex>
        </Component>
    )
}