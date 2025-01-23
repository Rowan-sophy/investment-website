import React from "react";
import { useGetNewsQuery } from "../servies/newsAPI";
import '../newsStyle.css'
import {Typography,Col,Card} from 'antd';
import moment from 'moment';
const {Text,Title} = Typography;


const NewsCart=({data,startingPoint,endingPoint})=>{
    return(
        <>
        {data?.data?.news?.slice(startingPoint,endingPoint)?.map((news,i)=>(
          
          
            <Col key={i} className="sub-container" >
                
               <Card hoverable  key={i}  className={` ${startingPoint!=2 || i!=0 ?"normal-card2": "change-card" } ${startingPoint===2 && i===1 ?'smallestRectangle':{height:'250px ' }} ${startingPoint==0 && i==0?"mainRecthangle":"normal-card2"}`} >
                 <a href={news.article_url} target="blank" rel="noreferrer">
                         <div className="news-text">
                         <h5 className="news-text-title">{news.source}</h5>
                         <span className="news-text-span">{moment(news.post_time_utc).startOf('ss').fromNow()}</span>
                         </div>
                         
                         <img src={news.article_photo_url} alt={news.source}></img>
                     <div className="news-image-container">
                         <Title className={`news-title ${startingPoint==0 && i==0?"mainRecthangleTitle":"normaltitle"}  ${startingPoint===2 && i===1 ?'smallestRectangleTitle':''}`} level ={4}>{news.article_title === 50 ? `${news.article_title.substring(0, 50)}...` : news.article_title}</Title>
                     </div>
                 </a>
               </Card>
             </Col>
                ))}
      </>
    )
   
}
export default NewsCart;