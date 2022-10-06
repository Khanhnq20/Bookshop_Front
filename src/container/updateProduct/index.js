import React from "react";
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Component from "../../components/root";
import Text from "../../components/text";
import Button from "../../components/button";
import { FaTimesCircle, FaTimes } from "react-icons/fa";
import { Formik, FieldArray } from 'formik';
import { getSingleProduct, updateProduct, updateProductImage } from "../../api/product";
import { getGenre } from "../../api/config";
import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

let productSchema = yup.object().shape({
    name: yup.string().required("Product name is a required field"),
    author: yup.string().required("Author is a required field"),
    language: yup.string().required("Language is a required field"),
    publishDay: yup.date().typeError("Publish day should be entered as yyyy/mm/dd").required("Publish day is a required field"),
    pages: yup.number().required("Pages is a required field"),
    description: yup.string().required("Description is a required field"),
})


export default function UpdateProductContainer(id) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [imageURL, setImageUrl] = React.useState("")
    const navigation = useNavigate();
    const [genre, setGenre] = React.useState({
        data: []
    })
    const genreIdsOptionRef = React.useRef();
    const searchParams = useParams();
    const [productSingle,setProductSingle] = React.useState({});
    const [initialFormValues, setInitialFormValues] = React.useState({
        name: productSingle?.name,
        author: productSingle?.author,
        genreIds: productSingle?.genres?.map(g => g.id),
        language: productSingle?.language,
        description: productSingle?.description,
        publishDay: productSingle?.publishDay,
        pages: productSingle?.pages,
        isRemaining: false,
        type: productSingle?.type?.map(i => ({
            name: i.name,
            price: i.price,
            isDefault: i.isDefault,
            inventory: i.inventory
        }))?.concat({
            name: 'Soft',
            price: 0,
            isDefault: false,
            inventory: 0
        }) || [{
            name: 'Soft',
            price: 0,
            isDefault: false,
            inventory: 0
        }]
    });


    React.useEffect(() => {
        
        setLoading(true);
        if(searchParams['id']){
            const {id} = searchParams;
            getSingleProduct(id).then(
                response => {
                    const {data} = response;
                    setProductSingle(data);
                    setCurrentIndex(data?.type?.length);
                    setLoading(false);
                }
            ).catch(e => {
                setLoading(false);
                console.log(e);
            })
        }
        getGenre().then(response => {
            const { data } = response;

            setGenre({
                ...genre,
                data: data
            })
        });
    }, []);

    React.useEffect(() => {
        if(productSingle.fileImage){
            converseString(productSingle.fileImage);
            setImageUrl(productSingle.fileImage);
        }
        if(productSingle){
            console.log(productSingle);
            setInitialFormValues({
                name: productSingle?.name,
                author: productSingle?.author,
                genreIds: productSingle?.productGenres?.map(g => g.genreId),
                language: productSingle?.language,
                description: productSingle?.description,
                publishDay: productSingle?.publishDay,
                pages: productSingle?.pages,
                isRemaining: false,
                type: productSingle?.type?.map(i => ({
                    name: i.name,
                    price: i.price,
                    isDefault: i.isDefault,
                    inventory: i.inventory
                }))?.concat({
                    name: 'Soft',
                    price: 0,
                    isDefault: false,
                    inventory: 0
                }) || [{
                    name: 'Soft',
                    price: 0,
                    isDefault: false,
                    inventory: 0
                }]
            })
        }
    }, [productSingle])

    function converseString(url){
        setLoading(true);
        axios.get(url).then(
            response => {
                const blob = response.blob();
                let metadata = {
                    type: 'image/jpeg'
                };
                let file = new File([blob], "test.jpg", metadata);
                setLoading(false);
            }
        ).catch(e => {
            setLoading(false);
        })
    }

    if(loading) return <h2>LoadingL</h2>;
    return (
        //update-image
        <>
            <Formik
            initialValues={{
                fileImage: productSingle?.fileImage
            }}
            enableReinitialize={true}
            onSubmit={(values, formikHelper) => {
                formikHelper.setSubmitting(false);
                if(values.fileImage){
                    updateProductImage(values.fileImage, productSingle.id);
                }
            }}
            >
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur, handleReset, setFieldValue }) => {
                    console.log(values);
                    return (
                            <Component>
                                <Component>
                                    <Text.Title style={{margin:"20px"}}>Update Product's Image</Text.Title>
                                </Component>
                                <Component>
                                <Form className="createProduct__entireForm" onSubmit={handleSubmit} style={{textAlign:"center"}}>
                                    <Form.Group controlId="file" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                        <Form.Control type="file"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setFieldValue("fileImage", file);

                                                const fileReader = new FileReader();

                                                fileReader.addEventListener("loadend", (e) => {
                                                    setImageUrl(fileReader.result);
                                                })
                                                fileReader.readAsDataURL(file);

                                            }}></Form.Control>
                                        <Image src={imageURL || "https://tinyurl.com/2mcfxrmt"} width="190px" height={"250px"} style={{margin:"20px"}}></Image>
                                    </Form.Group>
                                    <Button.Update type="submit">Update Image</Button.Update>
                                </Form>
                                </Component>
                            </Component>
                    )}}
            </Formik>

            {/*Update-form-content-product*/}

            <Formik initialValues={initialFormValues}
                enableReinitialize={true}
                validationSchema={productSchema}
                onSubmit={(values, formikHelper) => {
                    formikHelper.setSubmitting(false);
                    const formSubmit = {
                        ...values,
                        type: values.type.filter((_, indx) => indx !== currentIndex)
                    }
                    updateProduct(formSubmit,productSingle.id).then(r => {
                        navigation({pathname:"/"})
                    });

                }}
            >
                {({ values, touched, errors, handleSubmit, handleChange, handleBlur, setFieldValue }) => {
                    return <Component className="createProduct">
                        {/* <pre>{JSON.stringify(productSingle, null, 4)}</pre> */}
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                        <Component>
                            <Component>
                                <Text.Title>Update Product</Text.Title>
                                <Component>
                                    <FaTimes></FaTimes>
                                </Component>
                            </Component>
                            <Form className="createProduct__entireForm" onSubmit={handleSubmit}>
                                <Component.Grid className="createProduct__grid">
                                    <Form.Group className="createProduct__form1" >
                                        <Form.Control
                                            type="text"
                                            isInvalid={touched.name && errors.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="name"
                                            value={values.name}
                                            placeholder="Product name" />
                                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="createProduct__form1_1" >
                                        <Form.Control
                                            type="text"
                                            name="author"
                                            placeholder="Author"
                                            value={values.author}
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
                                            value={values.language}
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
                                            value={values.publishDay}
                                            isInvalid={touched.publishDay && errors.publishDay}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.publishDay}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="createProduct__form2">
                                        <Form.Control
                                            type="text"
                                            name="pages"
                                            placeholder="Pages"
                                            value={values.pages}
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
                                            value={productSingle.description}
                                            isInvalid={touched.description && errors.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                    </Form.Group>

                                    {/*Add genres*/}
                                    
                                    <Component style={{ display: "flex", gap: "10px", margin: "10px", gridColumn: "1/span 3", justifyContent: "center" }}>
                                        <Component style={{ display: "flex", maxWidth: "500px" }}>
                                            <Text.Subtitle className="createProduct__genreTitle">Add The Genres</Text.Subtitle>
                                            <Form.Select
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
                                                return <Button style={{ margin: "0", height: "fit-content", marginLeft: "10px" }} onClick={() => {
                                                    const currentGenreId = parseInt(genreIdsOptionRef.current.value);
                                                    if (!values?.genreIds?.includes(currentGenreId)) {
                                                        arrayHelpers.push(currentGenreId);
                                                    }
                                                }}>Add</Button>
                                            }}></FieldArray>
                                        </Component>
                                    </Component>

                                    {/* List genres*/}

                                    <Form.Group className="createProduct__form4">
                                        <Component className="createProduct__listGenre">
                                            {values?.genreIds?.map(value => {
                                                return <Text.Subtitle className="createProduct__genre">{genre?.data?.find(g => {
                                                    return value === g.id;
                                                })?.name}
                                                    <FaTimes style={{ marginBottom: "1px", cursor: "pointer" }} onClick={() => {
                                                        setFieldValue("genreIds", values.genreIds.filter(e => e !== value))
                                                    }}></FaTimes>
                                                </Text.Subtitle>
                                            })}
                                        </Component>
                                    </Form.Group>
                                </Component.Grid>
                                
                                {/* Add Format*/}
                                
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
                                                            <Form.Select className="formatInner__select" 
                                                            name={`type.${values?.type?.length - 1}.name`} aria-label="Default select example" 
                                                            onChange={handleChange}>
                                                                <option value="Soft">Soft</option>
                                                                <option value="Hard">Hard</option>
                                                            </Form.Select>
                                                        </Component>
                                                        <Form.Group>
                                                            <Form.Control
                                                                className="formatInner__item"
                                                                type="text"
                                                                placeholder="Price"
                                                                value={Number(values?.type?.[currentIndex]?.price).toString()}
                                                                name={`type.${values?.type?.length - 1}.price`}
                                                                isInvalid={touched.price && errors.price}
                                                                onChange={(e) =>{
                                                                    setFieldValue(`values.type.${currentIndex}.price`, parseFloat(e.target.value.replace(/^0+/, '')));
                                                                    handleChange(e);
                                                                }}
                                                                onBlur={handleBlur}
                                                            />
                                                            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Control
                                                                className="formatInner__item"
                                                                type="text"
                                                                placeholder="Inventory"
                                                                value={values?.type?.[currentIndex]?.inventory}
                                                                name={`type.${values?.type?.length - 1}.inventory`}
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
                                                            setCurrentIndex(values?.type?.length);
                                                        }}>Add</Button>
                                                    </Component.Flex>

                                                    {/*Show Added Format*/}

                                                    <Component>
                                                        <Component style={{ width: "fit-content", margin: "0 auto", padding: "5px" }}>
                                                            {
                                                                values?.type?.map((item, index) => {
                                                                    return index !== currentIndex && <div key={index}>
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
                                                                    </div>
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



                                <Component style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                                    <Button onClick={() => {
                                        console.log("sdsd")
                                        handleSubmit();
                                    }}>Submit</Button>
                                </Component>
                            </Form>
                        </Component>
                    </Component>
                }}
            </Formik>
        </>
    )
}