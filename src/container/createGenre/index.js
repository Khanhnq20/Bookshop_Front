import React from "react";
import Component from "../../components/root";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from "../../components/button";
import { Formik } from "formik";
import * as yup from 'yup';
import { createGenre, getGenre,deleteGenre } from "../../api/config";

let genresSchema = yup.object().shape({
    genre: yup.string().required()
})
export default function CreateGenreContainer(){
    const [state,setState] = React.useState({
        data: []
    })
    React.useEffect(()=>{
        getGenre().then(response =>{
            const {data} = response;
            console.log(data);
            setState({
                ...state,
                data: data
            })
        });
    },[]);
    const [toggle, setToggle] = React.useState(false);
    return(
        <Component className="genre">
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
                        {state.data.map(e =>{

                        return <tr>
                            <td style={{ padding: "10px 5px" }}>{e.id}</td>
                            <td style={{ padding: "10px 5px" }}>{e.name}</td>
                            <td style={{ padding: "10px 0" }}>
                                <Button onClick={() => {
                                    deleteGenre(e.id);
                                    setState(oldState => {
                                        return {
                                            ...oldState,
                                            data: oldState.data.filter(i => i.id !== e.id)
                                        }
                                    })    
                                }} className="button delete">Detele</Button>
                            </td>
                        </tr>
                        })}
                    </tbody>
                </Table>
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
                            <Button className="button submit" onClick={handleSubmit}>Add</Button>
                        </Component>
                    </Form>
                )
            }}
            </Formik>
        </Component>
    )
}