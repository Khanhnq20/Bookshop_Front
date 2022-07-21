import React from "react";
import Form from "../../components/form";
import Component from "../../components/root";

export default function BannerContainer(){
    return(
        <Component className="banner">
            <Form.Image className="banner__image" src="https://img.freepik.com/free-vector/flat-world-book-day-banners_52683-58170.jpg?w=2000">
            </Form.Image>
        </Component>
    )
}