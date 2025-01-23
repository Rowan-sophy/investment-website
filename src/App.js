import logo from './logo.svg';

import 'antd/dist/reset.css';
import './App.css';

import {Routes,Route,Link} from 'react-router-dom';
import {Layout,Typography, Space,Col,Row,Input } from "antd";

import { Navbar, mobileResponsive,Footer,News,CompanyDetails,QuestionAnswer} from './component';
import Homepage from './component/Homepage';

import LogIn from './login/LogIn';
import Register from './login/Register'
import MarketTrends from './component/MarketTrends';

function App() {
  return (
    <div className='app' >
      <div className='navbar'>
      <Navbar/>
      </div>
      <div  className='main'>
        <Layout>
        <div className='routes'>
          <Routes>
              <Route path="/"  element={<Homepage />} />
             
              <Route exact path='/CompanyDetails' element={<CompanyDetails/>} />
              <Route exact path='/news' element={<News/>}/> 
              <Route exact path='/LogIn' element={<LogIn/>}/> 
              <Route exact path='/Register' element={<Register/>}/>
              <Route exact path='/MarketTrends' element={<MarketTrends/>}/> 
             
            </Routes>
          </div>
        </Layout>
    
      </div>
      <Footer/>
    </div>
  );
}

export default App;
