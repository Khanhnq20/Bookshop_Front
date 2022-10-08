import React from "react";
import Form from "../../components/form";
import Component from "../../components/root";
import Button from "../../components/button";
import {Link} from 'react-router-dom'

export default function BestTopic(){
    return(
        <Component>
            <Component.Wrapper className="bestTopic__wrapper">
                <Component.Grid className="bestTopic__grid">
                    <Component className="bestTopic__item">
                            <Form.Image className="bestTopic__image" src="https://tinyurl.com/bddd6tbc">
                            </Form.Image>
                            <Link to="/filterProduct/2014">
                                <Button className="bestTopic__button">
                                    Literature
                                </Button>
                            </Link>
                    </Component>
                    <Component className="bestTopic__item">
                        <Form.Image className="bestTopic__image" src="https://tinyurl.com/3h49e6vz">
                        </Form.Image>
                        <Link to="/filterProduct/2019">
                            <Button className="bestTopic__button">
                                Historical
                            </Button>
                        </Link>
                    </Component>
                    <Component className="bestTopic__item">
                        <Form.Image className="bestTopic__image" src="https://tinyurl.com/4a5d546d">
                        </Form.Image>
                        <Link to="/filterProduct/2018">
                            <Button className="bestTopic__button">
                                Economics
                            </Button>
                        </Link>
                    </Component>
                    <Component className="bestTopic__item">
                        <Form.Image className="bestTopic__image" src="https://tinyurl.com/2s3nt574">
                        </Form.Image>
                        <Link to="/filterProduct/2007">
                            <Button className="bestTopic__button">
                                Fiction
                            </Button>
                        </Link>
                    </Component>
                </Component.Grid>
            </Component.Wrapper>
        </Component>
    )
}