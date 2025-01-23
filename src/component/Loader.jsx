import React from 'react';
import { Spin ,Row ,Col } from 'antd';

const Loader = ({classStyle}) => (
  <Row  style={{background:'none',height:'inherit'}} >
     <Col className={classStyle}  style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100vw',background:'none'}}>
         <Spin  size='large' tip='Loading' style = {{ position:"absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" ,background:'none'} }/>
    </Col>
    </Row>
);

export default Loader;