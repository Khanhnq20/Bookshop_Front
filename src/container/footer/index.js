import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import Logo from "../../components/logo";
import {MdLocationOn } from 'react-icons/md';
import { TiSocialFacebook, TiSocialYoutube, TiSocialLinkedin } from 'react-icons/ti';
import { SiZalo } from 'react-icons/si';
import { MdOutlineMail } from 'react-icons/md'


export default function FooterContainer(){
    return(
        <Component className="footer">
            <Component.Flex className="footer__flex">
                <Component className="footer__item">
                    <Text.Title className="footer__title">About Us</Text.Title>
                    <Logo style={{marginBottom:"15px"}}></Logo>
                    <Text.Subtitle className="footer__text">BoKo was established in 
                        2020 in Da Nang - Vietnam, BoKo brand is one of the leading 
                        bookstore systems in the Vietnamese market
                    </Text.Subtitle>
                </Component>
                <Component className="footer__item">
                    <Text.Title className="footer__title">Company Infomation</Text.Title>
                    <Component>
                        <Component>
                            <Text.Subtitle style={{display:"inline-block",marginBottom:"10px"}} className="footer__text">
                                <MdLocationOn style={{paddingRight:"2px"}}></MdLocationOn>   
                                    654 Ngo Quyen, An Hai Bac Dictrict, Da Nang City
                            </Text.Subtitle>
                        </Component>
                        <Text.Subtitle className="footer__text">Hotline: 0107773684</Text.Subtitle>
                        <Text.Subtitle className="footer__text">Represent: Nguyen Khanh</Text.Subtitle>
                        <Text.Subtitle className="footer__text">Email: contactboko@gmail.com</Text.Subtitle>
                    </Component>
                </Component>
                <Component className="footer__item">
                    <Text.Title className="footer__title">Company Policy</Text.Title>
                    <Component>
                        <Text.Link className="footer__policy">Shipping and Delivery</Text.Link>
                        <Text.Link className="footer__policy">Sales policy</Text.Link>
                        <Text.Link className="footer__policy">Return Policy</Text.Link>
                        <Text.Link className="footer__policy">Privacy Policy</Text.Link>
                    </Component>
                </Component>
                <Component className="footer__item">
                    <Text.Title className="footer__title">Contact with Us</Text.Title>
                    <Component.Flex className="footer__iconForm">
                        <Text.Link href="">
                            <TiSocialFacebook className="footer__iconContact"></TiSocialFacebook>
                        </Text.Link>
                        <Text.Link>
                            <SiZalo className="footer__iconContact"></SiZalo>
                        </Text.Link>
                        <Text.Link>
                            <MdOutlineMail className="footer__iconContact"></MdOutlineMail>
                        </Text.Link>
                        <Text.Link>
                            <TiSocialYoutube className="footer__iconContact"></TiSocialYoutube>
                        </Text.Link>
                        <Text.Link>
                            <TiSocialLinkedin className="footer__iconContact"></TiSocialLinkedin>
                        </Text.Link>
                    </Component.Flex>
                </Component>
            </Component.Flex>
            <Component>
                <Text.Subtitle className="footer__copyright">Copyright © BoKo 2022</Text.Subtitle>
            </Component>
        </Component>
    )
}