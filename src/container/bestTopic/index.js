import React from "react";
import Form from "../../components/form";
import Component from "../../components/root";
import Button from "../../components/button";

export default function BestTopic(){
    return(
        <Component>
            <Component.Wrapper className="bestTopic__wrapper">
                <Component.Grid className="bestTopic__grid">
                    <Component className="bestTopic__item">
                            <Form.Image className="bestTopic__image" src="https://tinyurl.com/bddd6tbc">
                            </Form.Image>
                            <Button className="bestTopic__button">
                                Literature
                            </Button>
                    </Component>
                    <Component className="bestTopic__item">
                        <Form.Image className="bestTopic__image" src="https://tinyurl.com/bddd6tbc">
                        </Form.Image>
                        <Button className="bestTopic__button">
                            Literature
                        </Button>
                    </Component>
                    <Component className="bestTopic__item">
                        <Form.Image className="bestTopic__image" src="https://tinyurl.com/bddd6tbc">
                        </Form.Image>
                        <Button className="bestTopic__button">
                            Literature
                        </Button>
                    </Component>
                    <Component className="bestTopic__item">
                        <Form.Image className="bestTopic__image" src="https://tinyurl.com/bddd6tbc">
                        </Form.Image>
                        <Button className="bestTopic__button">
                            Literature
                        </Button>
                    </Component>
                </Component.Grid>
            </Component.Wrapper>
        </Component>
    )
}