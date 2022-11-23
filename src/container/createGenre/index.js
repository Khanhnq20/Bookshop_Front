import React from "react";
import Component from "../../components/root";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Formik } from "formik";
import * as yup from 'yup';
import { createGenre,deleteGenre } from "../../api/config";
import { searchGenre } from "../../api/product";


let genresSchema = yup.object().shape({
    genre: yup.string().required()
})
export default function CreateGenreContainer(){
        const [genre,setGenre] = React.useState({
        getProduct:[]
    })
    const [text,setText] = React.useState()
    React.useEffect(() => {
        searchGenre(text).then(res => {
            const data = res.data;
            console.log(data);
            setGenre({
                getGenre:[...data]
            })
        });
    }, [text])

    const handleChange = (e) =>{
        setText(e.target.value);
        console.log(text)
    }
    const [toggle, setToggle] = React.useState(false);
    return(
        <Component className="genre">
            <Component style={{margin:"0 auto",maxWidth:"800px"}}>
                <Form className="genre__createForm"  style={{marginBottom:"20px"}}>
                    <Form.Group className="" >
                        <Form.Control
                            type="text"
                            name="f_genre"
                            placeholder="Genre Name"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Component style={{ display: "flex", justifyContent: "center", paddingLeft: "10px" }}>
                        <Button variant="primary">Search</Button>
                    </Component>
                </Form>
                <Component className="genre__createGenre">
                    <Button onClick={() => setToggle(e=>!e)} className="genre__createButton">Create Genres</Button>
                    {toggle && <Component><FormCreateGenres></FormCreateGenres></Component>}
                </Component>
                <Component className="genre__tableForm">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Genres Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genre?.getGenre?.map(e =>{
                            return <tr>
                                <td style={{ padding: "10px 5px" }}>{e.id}</td>
                                <td style={{ padding: "10px 5px" }}>{e.name}</td>
                                <td style={{ padding: "10px 0" }}>
                                    <Button 
                                    variant="danger"
                                    style={{marginLeft:"10px"}}
                                    onClick={() => {
                                        deleteGenre(e.id);
                                        setGenre(oldState => {
                                            return {
                                                ...oldState,
                                                data: oldState.data.filter(i => i.id !== e.id)
                                            }
                                        })    
                                    }}>Detele</Button>
                                </td>
                            </tr>
                            })}
                        </tbody>
                    </Table>
                </Component>
            </Component>
        </Component>
    )
}

function FormCreateGenres(){
    return(
        <Component>
            <Formik
            initialValues={{
                genre:''
            }}
            
            validationSchema={genresSchema}
            onSubmit={(values,formikHelper) => {
                formikHelper.setSubmitting(false);
                createGenre(values.genre)
            }}
            >{({ touched, errors, handleSubmit, handleChange, handleBlur }) => {
                return(
                    <Form className="genre__createForm" onSubmit={handleSubmit}>
                        <Form.Group className="" >
                            <Form.Control
                                type="text"
                                name="genre"
                                placeholder="Genre Name"
                                isInvalid={touched.genre && errors.genre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
                        </Form.Group>
                        <Component style={{ display: "flex", justifyContent: "center", paddingLeft: "10px" }}>
                            <Button variant="primary" onClick={handleSubmit}>Add</Button>
                        </Component>
                    </Form>
                )
            }}
            </Formik>
        </Component>
    )
}