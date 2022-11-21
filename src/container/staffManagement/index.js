import React from 'react';
import Component from '../../components/root';
import Table from 'react-bootstrap/Table';
import { getStaff } from '../../api/admin';
import Button from 'react-bootstrap/Button';

const StaffManagementContainer = () => {
    const [staff,setStaff] = React.useState([]);
    React.useEffect(()=>{
        getStaff().then(res=>{
            let data = res.data;
            setStaff(data)
        })
    },[])
    return (
        <Component className="user">
            <Component style={{maxWidth:"800px",margin:"0 auto"}}>
                <Component style={{marginBottom:"20px"}}>
                    <Button variant="primary">Create New Staff</Button>
                </Component>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Staff Name</th>
                        <th>Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    {staff?.map((item,index)=>{
                        return(
                            <tbody>
                                <tr>
                                <td key={index}>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>@mdo</td>
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