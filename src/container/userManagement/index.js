import React from 'react';
import Component from '../../components/root';
import Table from 'react-bootstrap/Table';

const UserManagementContainer = () => {
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
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </Component>
    )
}

export default UserManagementContainer;