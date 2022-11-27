import React from 'react'
import Component from '../../components/root'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getPurchaseHistory, getSingleUser, verify } from '../../api/admin';
import Text from "../../components/text";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import {MdVerified} from 'react-icons/md'

export default function PurchaseHistoryContainer() {
    const [purchase,setHistory] = React.useState([]);
        const [text,setText] = React.useState()
        React.useEffect(()=>{
        getPurchaseHistory(text).then(res => {
            let data = res.data;
            setHistory(data);
        })  
           
    },[text])

        const handleChange = (e) =>{
        setText(e.target.value);
    }


        const handleVerify = (id,index)=>{
        verify(id).then(()=>{
            let newArr = [...purchase];
            newArr[index].verify = true;
            setHistory(newArr);
            toast.success("Accept successfully");
        })
    }
    return (
        <Component style={{minHeight:"100vh"}}>
            
            <Component style={{maxWidth:"800px",margin:"0 auto",transform:"translateY(8%)"}}>
                <Text.Title style={{marginBottom:"20px",fontSize:"27px"}}>Purchase History</Text.Title>
                <Form className="genre__createForm"  style={{marginBottom:"20px"}}>
                    <Form.Group className="" >
                        <Form.Control
                            type="text"
                            name="f_history"
                            placeholder="Date and Email"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Component style={{ display: "flex", justifyContent: "center", paddingLeft: "10px" }}>
                        <Button variant="primary">Search</Button>
                    </Component>
                </Form>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th style={{whiteSpace:"nowrap"}}>Purchase Date</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Verify</th>
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
                                <td style={{color:"green"}}>{item.verify ? "Accepted" : (<Button variant='primary' onClick={(e)=>{handleVerify(item?.id,index)}}>Accept</Button>)}
                                
                                </td>
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
