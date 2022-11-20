import React from 'react';
import { useParams } from 'react-router-dom';
import { getPersonal, getRole } from '../../api/config';
import Component from '../../components/root';
import Text from "../../components/text";
import {FaUserCircle} from "react-icons/fa";

const PersonalContainer = () => {
    const [user,setUser] = React.useState({});
    const [role,setRole] = React.useState();
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
    console.log(user?.name);
    
    return <Component className="personal">
        <Component className="personal__form">
            <Component className="personal__user">
                <FaUserCircle style={{background:"white",overflow:"hidden",borderRadius:"50%",color:"#696969",border:"3px solid white"}}></FaUserCircle>
            </Component>
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
        </Component>
    </Component>
}


export default PersonalContainer;