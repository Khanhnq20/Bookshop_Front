import React from 'react';
import Component from '../../components/root';
import Table from 'react-bootstrap/Table';
import { getStaff } from '../../api/admin';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';


const StaffManagementContainer = () => {
    const [staff,setStaff] = React.useState({
    getStaff:[]
    })
    const [text,setText] = React.useState()
    React.useEffect(() => {
        getStaff(text).then(res => {
            const data = res.data;
            setStaff({
                getStaff:[...data]
            })
        });
    }, [text])

    const handleChange = (e) =>{
        setText(e.target.value);
    }
    return (
        <Component className="user">
            <Component style={{maxWidth:"800px",margin:"0 auto"}}>
                <Form className="genre__createForm"  style={{maxWidth:"800px",margin:"0 auto"}}>
                    <Form.Group className="" >
                        <Form.Control
                            type="text"
                            name="f_staff"
                            placeholder="Staff Name Or Email"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Component style={{ display: "flex", justifyContent: "center", marginBottom:"20px",paddingLeft: "10px" }}>
                        <Button variant="primary">Search</Button>
                    </Component>
                </Form>
                <Component style={{marginBottom:"20px"}}>
                    <Link to={`/registerStaff`}>
                        <Button variant="primary">Create New Staff</Button>
                    </Link>
                </Component>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th style={{whiteSpace:"nowrap"}}>Staff Name</th>
                        <th>Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    {staff?.getStaff?.map((item,index)=>{
                        return(
                            <tbody>
                                <tr>
                                <td key={index}>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td style={{whiteSpace:"nowrap"}}>
                                    <Link to={`/personal/${item.id}`}>
                                        <Button variant="primary">Detail</Button>
                                    </Link>
                                    
                                    <Link style={{marginLeft:"10px"}} to={`/changePassword/${item.id}`}>
                                        <Button variant="success">Change Password</Button>
                                    </Link>
                                </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </Table>
            </Component>
        </Component>
    )
}


export default StaffManagementContainer;