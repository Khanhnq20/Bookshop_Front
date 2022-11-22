import React from 'react';
import Component from '../../components/root';
import Table from 'react-bootstrap/Table';
import { getUser } from '../../api/admin';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const UserManagementContainer = () => {
    const [user,setUser] = React.useState([]);
    React.useEffect(()=>{
        getUser().then(res =>{
            let data = res.data;
            console.log(data)
            setUser(data);
        })
    },[])
    return (
        <Component className="user">
            <Table striped bordered hover style={{maxWidth:"800px",margin:"0 auto"}}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                {user?.map((item,index)=>{
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