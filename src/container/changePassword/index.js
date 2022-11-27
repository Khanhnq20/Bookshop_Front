import { Formik } from 'formik'
import React from 'react'
import Component from '../../components/root'
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { changePassword } from '../../api/admin';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Text from '../../components/text';
import { toast } from 'react-toastify';
import FormComponent from '../../components/form';

let passwordSchema = yup.object().shape({
    password: yup.string().required("This field is requied").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    passwordConfirm: yup.string().required("This field is requied").oneOf([yup.ref("password"), null], "Passwords must match")
})

export default function ChangePassContainer() {
    const [error,setError] = React.useState();
    const param = useParams();
    const navigater = useNavigate()
    return (<Formik
    initialValues={{
        password:'',
        passwordConfirm:""
    }}
    validationSchema={passwordSchema}

        onSubmit={(values,formikHelper) => {
            formikHelper.setSubmitting(false);
            changePassword(param['id'],values.password).then(() =>{
                toast.success("Changed!");
                navigater("/");
            })
        }}
    >
    {({touched, errors, handleSubmit, handleChange, handleBlur}) => {
        return(
            <Component style={{minHeight:"100vh",padding:"15px"}}>
                <Form onSubmit={handleSubmit} style={{maxWidth:"350px",margin:"0 auto",transform:"translateY(30%)",display:"flex",flexDirection:"column",gap:"15px"}}>
                    <Component style={{textAlign:"center"}}>
                        <FormComponent.Image width="130px" src="https://cdn.dribbble.com/users/66224/screenshots/1609819/lock.jpg"/>
                    </Component>
                    <Text.Title style={{fontSize:"20px"}}>Change The Password</Text.Title>
                {error && <Text style={{color:'red',textAlign:"center"}}>{error}</Text>}
                    <Form.Group>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            isInvalid={touched.password && errors.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            name="passwordConfirm"
                            placeholder="Enter password again"
                            isInvalid={touched.passwordConfirm && errors.passwordConfirm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">{errors.passwordConfirm}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Component>
        )}}
    </Formik>
    )
}
