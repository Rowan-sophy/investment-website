import React from "react";
import {  Row, Col} from "antd";


import { Collapse } from "antd";

const QuestionAnswer=({questions})=>{
    const items= [
        {
          key: '0',
          label:questions[0].question ,
          children: questions[0].answer,
        },
        {
          key: '1',
          label:questions[1].question ,
          children: questions[1].answer,
        }, {
          key: '2',
          label:questions[2].question ,
          children: questions[2].answer,
        }, {
          key: '3',
          label:questions[3].question ,
          children: questions[3].answer,
        },
      
      ];
 return(
    <div style={{background:"none"}}>
       <div className="home-heading-container" style={{paddingTop:'96px',paddingBottom:'48px',paddingLeft:'24px',background:'none'}}>
        <Row style={{background:'none'}}>
          < Col lg={12} xs={24}  md={24} sm={24}className="title-container" style={{background:'none'}}>
               <h2 className="home-title" > Questions & Answers </h2>
          </Col>
        </Row>
        </div>
      <Collapse items={items} bordered={false} defaultActiveKey={['0']} style={{background:'none'}}/>
    </div>
 )
}
export default QuestionAnswer;