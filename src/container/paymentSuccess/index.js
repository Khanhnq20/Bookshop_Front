import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import {TiTick} from "react-icons/ti";
import Button from 'react-bootstrap/Button';
import {Link, useSearchParams } from "react-router-dom";
import { confirmStatus } from "../../api/user";



export default function PaymentSuccessContainer(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [history,setHistory] = React.useState();
    const vnp_Amount = Number(searchParams.get('vnp_Amount'));
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    React.useEffect(()=>{
        confirmStatus(vnp_TxnRef).then(res =>{
            setHistory(res.data);
            console.log(res.data);
        })
    },[])
    return(
        <Component className="pSuccess" style={{minHeight:"100vh"}}>
            <Component className="pSuccess__form">
                <Text.Title style={{color:"#198754",fontSize:"28px",fontWeight:"600"}}>Payment Successfully</Text.Title>
                <Component className="pSuccess__iconForm">
                    <TiTick className="pSuccess__icon"></TiTick>
                </Component>
                <Component className="pSuccess__infoForm">
                    <Component className="pSuccess__content">
                        <Text>Payment Type</Text>
                        <Text.Info>VNPay</Text.Info>
                    </Component>
                    <Component className="pSuccess__content">
                        <Text>Bank</Text>
                        <Text.Info>{vnp_BankCode}</Text.Info>
                    </Component>
                    <Component className="pSuccess__content">
                        <Text>Phone Number</Text>
                        <Text.Info>{history?.phoneNumber}</Text.Info>
                    </Component>
                    <Component className="pSuccess__content">
                        <Text>Date</Text>
                        <Text.Info>{history?.date}</Text.Info>
                    </Component>
                    <Component className="pSuccess__content">
                        <Text>Amount Paid</Text>
                        <Text.Info>{(vnp_Amount/100).toLocaleString("en-US")} VND</Text.Info>
                    </Component>
                    <Component className="pSuccess__content">
                        <Text>Transaction Id</Text>
                        <Text.Info>{vnp_TransactionNo}</Text.Info>
                    </Component>
                </Component>
                <Component className="pSuccess__buttonForm">
                    <Link to="/">
                        <Button variant="success" style={{marginTop:"20px"}}>Continue shopping</Button>
                    </Link>
                </Component>
            </Component>
        </Component>
    )
}