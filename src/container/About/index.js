import React from 'react'
import FormComponent from '../../components/form'
import Logo from '../../components/logo'
import Component from '../../components/root'
import Text from '../../components/text'

export default function AboutContainer() {
  return (
    <Component style={{minHeight:"100vh"}}>
        <Text.Title style={{marginTop:"30px"}}>About Us</Text.Title>
        <Component style={{maxWith:"1200px",margin:"0 auto"}}>
            <Text></Text>
            <Component style={{textAlign:"center"}}>
                <FormComponent.Image
                width="53%"
                src="https://www.openlibhums.org/news/id/606/image/127891/"
                style={{marginTop:"20px"}}
                />
            </Component>
            <Component style={{marginTop:"30px"}}>
                <Text style={{textAlign:"center",maxWidth:"1000px",margin:"0 auto"}}>
                    BoKo started as an 
                    idea to help support bookstores and their communities as more 
                    and more people buy books online. We saw an opportunity to create an alternative to 
                    Amazon for socially conscious online shoppers. Amazon sells more than 60% of all books 
                    in the United States and is growing. That shift threatens the future of bookstores and will 
                    hurt readers, authors, and publishers who rely on a healthy, diverse book ecosystem. 
                    We have a better idea — giving our readers the convenience of shopping 
                    online while also supporting independent bookstores.</Text>
            </Component>
            <Component style={{marginTop:"10px"}}>
                <Logo style={{margin:"0 auto"}}></Logo>
            </Component>
        </Component>
    </Component>
  )
}
