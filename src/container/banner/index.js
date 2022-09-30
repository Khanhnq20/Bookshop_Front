import React from "react";
import Form from "../../components/form";
import Component from "../../components/root";

export default function BannerContainer(){
    return(
        <Component className="banner">
            <Form.Image className="banner__image" src="https://img.freepik.com/free-vector/flat-world-book-day-banners_52683-58170.jpg?t=st=1658808742~exp=1658809342~hmac=dfa384b030b348960e7a6ae51af6435014aa731ba994af49ab98963a8143fa92&w=1380">
            </Form.Image>
        </Component>
    )
}