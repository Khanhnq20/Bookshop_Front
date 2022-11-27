import React from "react";
import {Image} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Component from "../../components/root";
import Text from "../../components/text";
import Button from "../../components/button";
import { FaTimesCircle, FaTimes } from "react-icons/fa";
import { Formik, FieldArray } from 'formik';
import { createProduct } from "../../api/product";
import { getGenre } from "../../api/config";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let productSchema = yup.object().shape({
    name: yup.string().required("Product name is a required field"),
    author: yup.string().required("Author is a required field"),
    language: yup.string().required("Language is a required field"),
    publishDay: yup.date().typeError("Publish day should be entered as yyyy/mm/dd").required("Publish day is a required field"),
    pages: yup.number().required("Pages is a required field"),
    description: yup.string().required("Description is a required field"),
    genreIds: yup.array().min(1)
})


export default function CreateProductContainer(){
    const [toggle,setToggle] = React.useState(false);
    const [currentIndex , setCurrentIndex] = React.useState(0);
        const navigate = useNavigate();
    const ToggleFormatHandler = () => {
        setToggle(e=>!e);
    }
    const [imageURL, setImageUrl] = React.useState("");
    const [genre, setGenre] = React.useState({
        data: []
    })
    const genreIdsOptionRef = React.useRef();
    
    React.useEffect(() => {
        getGenre().then(response => {
            const { data } = response;
            setGenre({
                ...genre,
                data: data
            })
        });
    }, []);


    return(
    <Formik initialValues={{
        name: '',
        author: '',
        genreIds:[],
        language: '',
        description: '',
        publishDay: Date,
        pages: '',
        isRemaining: false,
        fileImage: File,
        type: [{
            name: 'Soft',
            price: '',
            isDefault: false,
            inventory: 0
        }]
    }}
    validationSchema={productSchema}
    onSubmit={(values,formikHelper) => {
        formikHelper.setSubmitting(false);
        const formSubmit = {
            ...values,
            type: values.type.filter((_, indx) => indx !== currentIndex)
        }
        createProduct(formSubmit).then(res=>{
            navigate("/productManagement");
            toast.success("Created");
        });

    }}
    >
        {({values,touched,errors,handleSubmit,handleChange, handleBlur,handleReset,setFieldValue}) =>{
            return <Component className="createProduct">
                <Component>
                    <Component>
                        <Text.Title>Create New Product</Text.Title>
                    </Component>
                    <Form className="createProduct__entireForm" onSubmit={handleSubmit}>
                        <Component style={{textAlign:"center"}}>
                            <Form.Group controlId="file">
                                <Form.Control type="file"
                                onChange={(e) =>{
                                    const file = e.target.files[0];
                                    setFieldValue("fileImage", file);
                                    
                                    const fileReader = new FileReader();

                                    fileReader.addEventListener("loadend", (e)=>{
                                        setImageUrl(fileReader.result);
                                    })
                                    fileReader.readAsDataURL(file);

                                }}></Form.Control>
                                <Image style={{margin:"20px"}} src={imageURL || "https://cdn-icons-png.flaticon.com/512/2232/2232688.png"} width="auto" height={"200px"}></Image>
                            </Form.Group>
                        </Component>
                        <Component.Grid className="createProduct__grid">
                            <Form.Group className="createProduct__form1" >
                                <Form.Control
                                    type="text" 
                                    isInvalid={touched.name && errors.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="name"
                                    placeholder="Product name" />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="createProduct__form1_1" >
                                <Form.Control 
                                type="text" 
                                name="author" 
                                placeholder="Author"
                                isInvalid={touched.author && errors.author}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback> 
                            </Form.Group>
                            <Form.Group className="createProduct__form2">
                                <Form.Control 
                                    type="text"
                                    name="language"
                                    placeholder="Language"
                                    isInvalid={touched.language && errors.language}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.language}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="createProduct__form2">
                                <Form.Control
                                    type="text"
                                    name="publishDay"
                                    placeholder="Publish Day"
                                    isInvalid={touched.publishDay && errors.publishDay}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.publishDay}
                                />
                                <Form.Control.Feedback type="invalid">{errors.publishDay}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="createProduct__form2">
                                <Form.Control
                                    type="text"
                                    name="pages"
                                    placeholder="Pages"
                                    isInvalid={touched.pages && errors.pages}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="createProduct__form3">
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    rows={3}
                                    placeholder="Description"
                                    isInvalid={touched.description && errors.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Form.Group>

                            <Component style={{ display: "flex", gap: "10px", margin: "10px", gridColumn:"1/span 3",justifyContent:"center"}}>
                                <Component style={{display:"flex", maxWidth: "500px" }}>
                                    <Text.Subtitle className="createProduct__genreTitle">Add The Genres</Text.Subtitle>
                                    <Form.Select name="genreIds"
                                        className="formatInner__select"
                                        ref={genreIdsOptionRef}
                                        
                                        aria-label="Default select example">
                                        {genre.data.map(e => {
                                            return (
                                                <option value={e.id}>{e.name}</option>
                                                )
                                            })}
                                    </Form.Select>
                                    <FieldArray name="genreIds" render={arrayHelpers => {
                                        return <Button style={{ margin: "0", height: "fit-content",marginLeft:"10px" }} onClick={() => {
                                            const currentGenreId = parseInt(genreIdsOptionRef.current.value);
                                            if(!values.genreIds.includes(currentGenreId)){
                                                arrayHelpers.push(currentGenreId);
                                    
                                            }
                                        }}>Add</Button>
                                    }}></FieldArray>
                                </Component>
                            </Component>

                            <Form.Group className="createProduct__form4">
                                <Component className="createProduct__listGenre">
                                    {/* <Text.Subtitle className="createProduct__genre">Title</Text.Subtitle>
                                    <Text.Subtitle className="createProduct__genre">Title</Text.Subtitle>
                                <Text.Subtitle className="createProduct__genre">Title</Text.Subtitle> */}
                                    {values.genreIds.map(value => {
                                        return <Text.Subtitle className="createProduct__genre">{genre.data.find(g => {
                                            return value === g.id;
                                        }).name} 
                                        <FaTimes style={{marginBottom:"1px",cursor:"pointer"}} onClick={() => {
                                                setFieldValue("genreIds", values.genreIds.filter(e => e !== value))
                                        }}></FaTimes>
                                        </Text.Subtitle>
                                    })}
                                </Component>
                            </Form.Group>
                        </Component.Grid>
                    
                        <Component className="createProduct__formFormat">
                            <Button className="button format">
                                Format +
                            </Button>
                            <Component>
                                <FieldArray name="type"
                                    render={arrayHelpers => {

                                        return <>
                                            <Component.Flex className="formatInner__flex">
                                                <Component>
                                                    <Form.Select className="formatInner__select" name={`type.${values.type.length - 1}.name`} aria-label="Default select example" onChange={handleChange}>
                                                        <option value="Soft">Soft</option>
                                                        <option value="Hard">Hard</option>
                                                    </Form.Select>
                                                </Component>
                                                <Form.Group>
                                                    <Form.Control
                                                        className="formatInner__item"
                                                        type="text"
                                                        placeholder="Price"
                                                        value={values.type[currentIndex].price}
                                                        name={`type.${values.type.length - 1}.price`}
                                                        isInvalid={touched.price && errors.price}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Control
                                                        className="formatInner__item"
                                                        type="text"
                                                        placeholder="Inventory"
                                                        value={values.type[currentIndex].inventory}
                                                        name={`type.${values.type.length - 1}.inventory`}
                                                        isInvalid={touched.inventory && errors.inventory}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <Form.Control.Feedback type="invalid">{errors.inventory}</Form.Control.Feedback>
                                                </Form.Group>
                                                <Button style={{ margin: "0", height: "fit-content" }} onClick={() => {
                                                    arrayHelpers.push({
                                                        name: 'Soft',
                                                        price: '',
                                                        isDefault: false,
                                                        inventory: 0
                                                    });
                                    
                                                    setCurrentIndex(values.type.length);
                                                }}>Add</Button>
                                            </Component.Flex>

                                            <Component>
                                                <Component style={{display:"flex",flexDirection:"column",gap:"10px", width: "fit-content", margin: "0 auto", padding: "5px" }}>
                                                    {
                                                        values.type.map((item, index) => {

                                                            return index !== currentIndex && <Component style={{display:"flex",margin:"10px"}}>
                                                                <Component.Flex className="createProduct__formatFlex">
                                                                    <Component.Span className="createProduct__formatItem">
                                                                        <Text.Label className="text__label textFormat">Type</Text.Label>
                                                                        <Text.Info className="text__info textFormat">{item.name}</Text.Info>
                                
                                                                    </Component.Span>
                                                                    <Component.Span className="createProduct__formatItem">
                                                                        <Text.Label className="text__label textFormat">Price</Text.Label>
                                                                        <Text.Info className="text__info textFormat">{item.price}</Text.Info>
                                                                    </Component.Span>
                                                                    <Component.Span className="createProduct__formatItem">
                                                                        <Text.Label className="text__label textFormat">Inventory</Text.Label>
                                                                        <Text.Info className="text__info textFormat">{item.inventory}</Text.Info>
                                                                    </Component.Span>
                                                                </Component.Flex>
                                                                <Component className="createProduct__times" onClick={() => {
                                                                    arrayHelpers.remove(index);
                                                                    setCurrentIndex(i => i - 1);
                                                                }}>
                                                                    <FaTimesCircle></FaTimesCircle>
                                                                </Component>
                                                            </Component>
                                                        })
                                                    }

                                                </Component>
                                            </Component>
                                        </>
                                    }}
                                >
                                </FieldArray>
                            </Component>
                        </Component>

                        
                        
                        <Component style={{display:"flex",justifyContent:"center",padding:"10px"}}>
                            <Button onClick={() => {
                                handleSubmit();
                            }}>Submit</Button>
                        </Component>
                        {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                    </Form>
                </Component>
            </Component>
        }}
    </Formik>
    )
}

