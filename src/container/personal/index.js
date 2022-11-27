import React from 'react';
import { useParams } from 'react-router-dom';
import { getPersonal, getRole } from '../../api/config';
import Component from '../../components/root';
import Text from "../../components/text";
import {FaUserCircle,FaTimes} from "react-icons/fa";
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { userUpdate } from '../../api/admin';
import { toast } from 'react-toastify';


let userSchema = yup.object().shape({
    name: yup.string().required(),
    phoneNumber: yup.number().required(),
})
const PersonalContainer = () => {
    const [user,setUser] = React.useState({});
    const [role,setRole] = React.useState();
    const [toggle,setToggle] = React.useState(false);
    const param = useParams();
    React.useEffect(()=>{
        
        getPersonal(param['id']).then(res =>{
            const data = res.data;
            setUser(data);
        });

        getRole(param['id']).then(res=>{
            const data = res.data;
            setRole(data)
        })
    },[param])
    const handleToggleOff = ()=>{
        setToggle(false);
    }
    const handleToggleOn = ()=>{
        setToggle(true);
    }
    return (
        <Formik
        initialValues={{
            name:'',
            phoneNumber:''
        }}
        validationSchema={userSchema}

        onSubmit={(values,formikHelper) => {
            formikHelper.setSubmitting(false);
            console.log(user?.id);
            userUpdate(values.name,values.phoneNumber,user?.id).then(() =>{
                setToggle(false);
                toast.success("Updated")
                setUser(o => ({...o, name: values.name,phoneNumber: values.phoneNumber}));
            })
        }}
        >
            {({ touched, errors, handleSubmit, handleChange, handleBlur }) =>{
                return(<>
                <Component className="personal">
                    <Component className="personal__form">
                        <Component className="personal__user">
                            <FaUserCircle style={{background:"white",overflow:"hidden",borderRadius:"50%",color:"#696969",border:"3px solid white"}}></FaUserCircle>
                        </Component>
                        <Component.Flex className="personal__content">
                            <Component className="pSuccess__content">
                                <Text>Role</Text>
                                <Text.Info>{role}</Text.Info>
                            </Component>
                            <Component className="pSuccess__content">
                                <Text>User Name</Text>
                                <Text.Info>{user?.name}</Text.Info>
                            </Component>
                            <Component className="pSuccess__content">
                                <Text>Email</Text>
                                <Text.Info>{user?.email}</Text.Info>
                            </Component>
                            <Component className="pSuccess__content">
                                <Text>Gender</Text>
                                <Text.Info>{user?.gender}</Text.Info>
                            </Component>
                            <Component className="pSuccess__content">
                                <Text>Day of Birth</Text>
                                <Text.Info>{(user?.dayOfBirth)?.slice(0,10)}</Text.Info>
                            </Component>
                            <Component className="pSuccess__content">
                                <Text>Phone Number</Text>
                                <Text.Info>{user?.phoneNumber}</Text.Info>
                            </Component>
                            <Button variant="success" onClick={handleToggleOn} style={{marginTop:"15px"}}>Update</Button>
                        </Component.Flex>
                    </Component>
                </Component>
                {toggle &&
                <Form className="update__person" onSubmit={handleSubmit}>
                    <Component className="update__form" style={{margin:"0 auto"}}>
                        <FaTimes style={{position:"absolute",fontSize:"30px",cursor:"pointer",right:"0",top:0,transform:"translate(30px,-40px)",zIndex:"1000",color:"gray"}} 
                        onClick={handleToggleOff}></FaTimes>
                        <Component className="personal__user">
                            <FaUserCircle style={{background:"white",overflow:"hidden",borderRadius:"50%",color:"#696969",border:"3px solid white"}}></FaUserCircle>
                        </Component>
                        <Component.Flex className="personal__content">
                            <Text.Title style={{fontSize:"20px",marginTop:"10px"}}>Update Your Infomation</Text.Title>
                            <Form.Group className="" >
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    isInvalid={touched.name && errors.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="" >
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    isInvalid={touched.phoneNumber && errors.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                            </Form.Group>
                            <Button onClick={handleSubmit} variant="success" style={{marginTop:"15px"}}>Submit</Button>
                        </Component.Flex>
                    </Component>
                </Form>
                }
                </>
                )
            }}
        </Formik>
    )
}




export default PersonalContainer;