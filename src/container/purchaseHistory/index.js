import React from 'react'
import Component from '../../components/root'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getPurchaseHistory, getSingleUser } from '../../api/admin';
import Text from "../../components/text";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function PurchaseHistoryContainer() {
    const [purchase,setHistory] = React.useState([]);
        React.useEffect(()=>{
        getPurchaseHistory().then(res => {
            let data = res.data;
            setHistory(data);
        })     
    },[])
    return (
        <Component style={{minHeight:"100vh"}}>
            <Component style={{maxWidth:"800px",margin:"0 auto",transform:"translateY(8%)"}}>
                <Text.Title style={{marginBottom:"20px",fontSize:"27px"}}>Purchase History</Text.Title>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Purchase Date</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    {purchase?.map((item,index)=>{
                        return(
                            <tbody>
                                <tr>
                                <td key={index}>{index+1}</td>
                                <td>{item.date}</td>
                                <td>{item.user?.email}</td>
                                <td>{item.confirmStatus ? "Successfully" : "Failed"}</td>
                                <td>
                                    <Link to={`detail/${item.id}`}>
                                        <Button variant="success">Detail</Button>
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
