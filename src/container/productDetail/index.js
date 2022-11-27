import React from "react";
import FormComponent from "../../components/form";
import Component from "../../components/root";
import Text from "../../components/text";
import Button from 'react-bootstrap/Button';
import { BiMinus, BiPlus } from 'react-icons/bi';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { ListGroup,Row, Col} from 'react-bootstrap';
import { getSingleProduct } from "../../api/product";
import { commentProduct, getComment } from "../../api/user";
import { useNavigate, useParams } from "react-router-dom";
import { getGenre, getRole } from "../../api/config";
import { useCartContext } from "../../store/cartContext";
import { useAthContext } from "../../store";
import { toast } from "react-toastify";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { getSingleUser } from "../../api/admin";

export default function ProductDetailContainer() {
    const [quantity,setQuantity] = React.useState(1);
    const [inventory,setInventory] = React.useState();
    const [genres,setGenres] = React.useState([])
    const locationParams = useParams();
    const [product, setProduct] = React.useState({}); 
    const {isLogin} = useAthContext();
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
            toast.success("Added!");
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
            <Component style={{margin:"0 auto"}}>
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
                                <Button style={{padding:"10px 15px 10px 15px",whiteSpace:"no-wrap"}}
                                    variant="danger"
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
                            <Comment></Comment>
                        </Tab>
                    </Tabs>
                </Component>
                <Component className="productDetail__tab2">
                    <Text>
                        FREE COD shipping nationwide for orders from 200 USD.
                        Support to exchange products within 14 days from the date of receipt with the condition that the goods are new, unused and with tags intact.
                        Product warranty within 6 months against manufacturer defects (glue error, thread error, ..).
                    </Text>
                </Component>
            </Component>
        </Component.Wrapper>
    )
}

const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
  let styleClass = "star-rating-blank";
  if (rating && rating >= starId) {
    styleClass = "star-rating-filled";
  }
 
  return (
    <Component
      className="star"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <svg
        height="30px"
        width="30px"
        class={styleClass}
        viewBox="0 0 25 23"
        data-rating="1"
      >
        <polygon
          stroke-width="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </Component>
  );
};

function Comment() {
    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
    const [evaluate,setEvaluate] = React.useState();
    const [comment, setComment] = React.useState("");;
    const [user,setUser] = React.useState({});
    const [error,setError] = React.useState();
    const locationParams = useParams();
    const {userID} = useAthContext();

    React.useEffect(() => {
    getSingleUser(userID).then(res=>{
        let data = res.data;
        console.log(res.data);
        setUser(data);
    })
}, [userID])

    React.useEffect(() => {
        const {id} = locationParams;
        getComment(id).then(res =>{
            let data = res.data;
            setEvaluate(data);
            if(data.length === 0){
                setEvaluate([])
            }
        })
}, [])
  const handleChange = (e) =>{
    setComment(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = () =>{
    console.log(locationParams?.id)
    if(!comment){
        setError("Enter somethings to comment");
    }
    if(rating === 0){
        setError("Pls rating")
    }else if(locationParams?.id){
        const {id} = locationParams;
        setError("");
        commentProduct(comment,rating,user?.name,user?.email,id).then(()=>{
            var data = {
                content : comment,
                rate : rating,
                author : user?.name,
                emailAth: user?.email
            }
            setEvaluate(o =>[...o, data]);
            setRating(0);
            toast.success("Successful evaluation!")
        })
    }
  }
  const stars = [1, 2, 3, 4, 5];
 
  return (<>
    {evaluate?.map((item,index) =>{
        return(
            <Component key={index}>
                <Component class="header">
                    <FormComponent.Image 
                        style={{margin:0,padding:0}}
                        height="45px"
                        weight="45px"
                        src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg"
                        
                    />
                    <Component>
                        <Text style={{fontWeight:"600"}}>{item.author}</Text>
                        <Text.Info style={{fontSize:"13px",marginTop:"5px"}}>{item.emailAth}</Text.Info>
                    </Component>
                    <Component style={{display:"flex",transform:"translate(40%)"}}>
                        {stars.map((star, i) => (
                        <Star
                        key={i}
                        starId={i}
                        rating={item.rate}
                        />
                        ))}
                    </Component>
                </Component>
                <Component>
                    <Text style={{margin:"12px 5px"}}>{item.content}</Text>
                </Component>
            </Component>
        )
    })}
    {/* commentFormSubmit */}
    <Form>
        <Component className="comment__form">
        <Component class="header">
            <FormComponent.Image 
                style={{margin:0,padding:0}}
                height="45px"
                weight="45px"
                src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg"
                
            />
            <Component>
                <Text style={{fontWeight:"600"}}>{user?.name || "Guest"}</Text>
                <Text.Info style={{fontSize:"13px",marginTop:"5px"}}>{user?.email || "Loading"}</Text.Info>
            </Component>
        </Component>
        <Component style={{display:"flex"}}>
            {stars.map((star, i) => (
            <Star
                key={i}
                starId={i}
                rating={hoverRating || rating}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(i)}
            />
            ))}
        </Component>
                <Form.Group className="" >
                    <Component>
                        <FloatingLabel
                            controlId="floatingTextarea"
                            label="Comment"
                            className="mb-3"
                        >
                        <Form.Control
                            as="textarea" 
                            name="comment"
                            
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Component>
                    {error && <Text style={{color:"red"}}>{error}</Text>}
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary">Comment</Button>
        </Component>
    </Form>
  </>
  );
}