
import React from "react";
import Component from "../../components/root";
import Text from "../../components/text";
import Form from 'react-bootstrap/Form';
import {Spinner} from 'react-bootstrap';
import FormComponent from '../../components/form/index';
import { useParams } from "react-router-dom";
import { getSinglePurchaseHistory, getSingleUser } from "../../api/admin";
import {MdVerified} from 'react-icons/md';
import {GoUnverified} from 'react-icons/go'


export default function PurchaseHistoryDetailContainer(){
    const [history,setHistory] = React.useState({});
    const [user,setUser] = React.useState({});
    const [loading,setLoading] = React.useState(false);
    const param = useParams();
    React.useEffect(()=>{
        if(param?.id){
            const {id} = param;
                setLoading(true);
                getSinglePurchaseHistory(id).then(res => {
                    let data = res.data;
                    setHistory(data);
                })      
        }
    },[param])
        return(
            <Form className="payment">
                <Component.Flex className="payment__parent">
                    <Component className="payment__flex-1" style={{minHeight:"100vh"}}>
                        <Component style={{marginBottom:"50px"}}>
                            <Text style={{marginBottom:"10px",fontWeight:"600",fontSize:"18px",marginTop:"10px"}}>Payment Information</Text>
                            <Component.Grid style={{gap:"10px"}} className="payment__gridForm">
                                <Component className="pSuccess__content">
                                    <Text>User Name</Text>
                                    <Text.Info>{history?.user?.name}</Text.Info>
                                </Component>
                                <Component className="pSuccess__content">
                                    <Text>Email</Text>
                                    <Text.Info>{history?.user?.email}</Text.Info>
                                </Component>
                                <Component className="pSuccess__content">
                                    <Text>Phone Number</Text>
                                    <Text.Info>{history?.phoneNumber}</Text.Info>
                                </Component>
                                <Component className="pSuccess__content">
                                    <Text>Address</Text>
                                    <Text.Info>{history?.address}</Text.Info>
                                </Component>
                                <Component className="pSuccess__content">
                                    <Text>Purchase Date</Text>
                                    <Text.Info>{history?.date}</Text.Info>
                                </Component>
                                <Component className="pSuccess__content">
                                    <Text>Status</Text>
                                    {history?.confirmStatus ? <Text.Info style={{color:"green"}}>Successfully</Text.Info> 
                                        : 
                                    <Text.Info style={{color:"red"}}>Failed</Text.Info>}
                                </Component>
                                <Component className="pSuccess__content">
                                    <Text>Verify</Text>
                                    {history?.verify ? <MdVerified style={{color:'green',fontSize:"25px"}}></MdVerified> 
                                        : 
                                    <GoUnverified style={{color:'red',fontSize:"25px"}}></GoUnverified>}
                                </Component>
                            </Component.Grid>
                        </Component>
                        <Component className="payment__deliveryForm">
                            <Text style={{fontWeight:"600",fontSize:"18px"}}>Payment methods</Text>
                            <Component>
                                    <Form.Group>
                                        <Component className='payment__20k'>
                                            <FormComponent.Image  
                                                style={{display:"inline-block",marginRight:"15px"}}
                                                height="40px" 
                                                width="40px" 
                                                src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/202166185_2021396718013233_8499389898242103910_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=pjAGSkpO-a4AX_9rQtQ&_nc_ht=scontent.fdad3-6.fna&oh=00_AfCNQoV9SaUJZiounlWlHiFjIb4mSTLhHDW7sbgdfi0Rew&oe=637DACE9"/>
                                            <Form.Check 
                                                inline
                                                name="group1"
                                                checked= {true}
                                                type={"radio"}
                                                value="VNPay"
                                                id={`default-radio-2`}
                                                label={`VNPay payment`}
                                            />
                                        </Component>
                                    </Form.Group>
                            </Component>
                        </Component>
                    </Component>

                    {/* state2 */}
                    <Component className="payment__flex-2">
                        <Text.Title style={{fontSize:"18px",textAlign:"left",margin:0}}>List Product</Text.Title>
                        <Component>
                            <Component name="purchasedProducts">
                                {history?.purchasedProducts?.map((item,index) =>{
                                    return(
                                    <Component> 
                                        <Component className = "payment__productForm" key={index}>
                                            <Component className="payment__productInfo">
                                                <FormComponent.Image style={{borderRadius:"8px",overflow:"hidden"}} 
                                                    src={item?.products?.fileImage}
                                                    height="100px" width="100px"
                                                    />
                                                <Component>
                                                    <Text className="payment__productContent" style={{fontWeight:"600"}}>{item?.products?.name}</Text>
                                                    <Text className="payment__productContent">Type : {item.type}</Text>
                                                    <Text className="payment__productContent">Quantity : {item.quantity}</Text>
                                                </Component>
                                            </Component>
                                            <Text style={{color:"red"}}>{item.totalProductsFee.toLocaleString("en-US")} VND</Text>
                                        </Component>
                                    </Component>
                                )})}
                            <Component className="payment__fee">
                                <Component className="payment__productFee">
                                    <Text style={{color:"#717171"}}>Total Product Fee</Text>
                                    <Text className="payment__price">{(history?.purchasedProducts?.reduce((total,item) => 
                                    item.totalProductsFee + total,0))?.toLocaleString("en-US") || 0} VND</Text>
                                </Component>
                                <Component className="payment__deliveryFee">
                                    <Text style={{color:"#717171"}}>Delivery Fee</Text>
                                    <Text className="payment__price">{history?.deliveryFee?.toLocaleString("en-US")} VND</Text>
                                </Component>
                            </Component>
                            <Component className="payment__totalFee">
                                <Text style={{fontSize:"18px",fontWeight:"600"}}>Total</Text>
                                <Text  className="payment__price" style={{fontSize:"18px"}}>{((history?.purchasedProducts?.reduce((total,item) => 
                                item.totalProductsFee + total,0)) + history?.deliveryFee).toLocaleString("en-US")} VND</Text>
                            </Component>
                            
                            </Component>
                        </Component>
                    </Component>
                </Component.Flex>
            </Form>
        )}