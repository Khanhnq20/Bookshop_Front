import React from 'react';
import Component from '../../components/root';
import Table from 'react-bootstrap/Table';
import { getUser } from '../../api/admin';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const UserManagementContainer = () => {

     const [user,setUser] = React.useState({
    getUser:[]
    })
    const [text,setText] = React.useState()
    React.useEffect(() => {
        getUser(text).then(res => {
            const data = res.data;
            setUser({
                getUser:[...data]
            })
        });
    }, [text])

    const handleChange = (e) =>{
        setText(e.target.value);
    }
    return (
        <Component className="user">
                <Form className="genre__createForm"  style={{maxWidth:"800px",margin:"0 auto"}}>
                    <Form.Group className="" >
                        <Form.Control
                            type="text"
                            name="f_user"
                            placeholder="User Name Or Email"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Component style={{ display: "flex", justifyContent: "center", marginBottom:"20px",paddingLeft: "10px" }}>
                        <Button variant="primary">Search</Button>
                    </Component>
                </Form>
            <Table striped bordered hover style={{maxWidth:"800px",margin:"0 auto"}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                {user?.getUser?.map((item,index)=>{
                    return(
                        <tbody>
                            <tr>
                            <td key={index}>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
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
    )
}

export default UserManagementContainer;