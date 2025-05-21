import React from "react";
import  {useState ,useEffect,useRef} from "react";
import {DebounceInput} from 'react-debounce-input'
import "../HomeStyle.css"
import '../newsStyle.css'
import phone from '../images/iPhone X Flying Mockup.png';
import { HomeOutlined,DollarOutlined  } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { motion, useMotionValue, useTransform, animate ,useScroll } from "framer-motion";
import QuestionAnswer from "./QuestionAnswer";
import TextAnimation from "./TextAnimation";
import { Row,Col ,Card,Typography,Select,Segmented ,Flex,Progress,Collapse} from "antd";
import { useGetStockesQuery,useGetProfilesQuery,useGetFinancailsQuery,useGetRecommendationsQuery } from "../servies/StockAPI";
import LineChart from "./LineChart";
import UseScreenSize from "./useScreenSize";
import useShapeMotion from "./useShapeMotion";
import NumberAnimation from "./NumberAnimation";
import Loader from "./Loader";
import Lenis from 'lenis';


const CompanyDetails =({simplified})=>{
    const[company,setCompany]=useState('Apple')
    const[timeperiod,setTimePeriod]=useState('1m')
    const {data : stockCompany ,isFetching} =useGetStockesQuery(company);
   const [searchTerm, setSearchTerm] = useState();
   const [clickedInput, setClickedInput] = useState(false);
   const count = useMotionValue(0);
   const screenSize=UseScreenSize();
   const shapeMotion=useShapeMotion();
  const rounded = useTransform(count, Math.round)
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  }) 
  const QuestionAns=[  {
    question: '	What does the "Stock Price in Last 30 Days" section show?',
   answer: "This section displays the historical trend of the company's stock price over the past 30 days, providing insights into stock market performance and price fluctuations.",
   
  
  },
  {
    question: "	What information is included in the Company Profile Snapshot and History",
    answer: "This section offers a brief overview of the company's background and its products/services, as well as a snapshot of its financial statements, enabling users to assess the company's financial profit trends and history.",
    
  },
  {
    question: "What are the key metrics provided, and how do they impact investment decisions?",
    answer: "Key metrics such as Total Debt, Debt to Equity, Revenue Growth, Total Revenue, and Revenue Per Share are detailed, aiding users in analyzing the company's financial health and making informed stock recommendations based on financial statement trends.",
  }
  ,
  {
    question:"Recommendation Section guide stock buying/selling decisions throughout the year?" ,
    answer: "The recommendation section offers insights on when to buy or sell the stock in each quarter, aligning with stock recommendation trends and aiding users in capitalizing on stock market opportunities based on financial performance",
    
  }]
  
   

    
     useEffect(()=>{
         if(searchTerm) setCompany(company.replace(company,searchTerm))
      
     },[searchTerm])
     useEffect(() => {
      const animation = animate(count, 50, { duration: 2 });
  
      return animation.stop;
    }, []);
    useEffect( () => {
      const lenis = new Lenis()
  
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
  
      requestAnimationFrame(raf)
    }, [])
    
     const ticker=stockCompany?.body[0]?.symbol
     console.log(ticker);
    const {data : choosenTicker ,isfetching} =useGetProfilesQuery(ticker)
    const {data : FinancialData, } =useGetFinancailsQuery(ticker)
    const {data : recommendation } =useGetRecommendationsQuery(ticker)
    const recommendationTrends=recommendation?.body?.trend
    console.log(FinancialData);
    let arr=[];
    const time = ['1m','5m','15m','30m'];
    const keyMetrics=[
    { 
    title:"Key Metrics about stock price",
     fristRow:{
            title:'current stock price',
            value:`${FinancialData?.body?.currentPrice?.raw}`,
              sign:" $"
     } ,
     secondRow:{
             title:' Total Cash Per Share',
             value:`${FinancialData?.body?.totalCashPerShare?.raw}`,
               sign:" $"
      },
     thirdRow:{
           title:'Operating Cashflow',
             value:`${FinancialData?.body?.operatingCashflow?.raw}`,
               sign:" $"
        }
    },
   { 
      title:"Key Metrics about company's cash",
      fristRow:{
             title:'Debt To Equity',
             value:`${FinancialData?.body?.debtToEquity?.raw}`,
               sign:" %"
      } ,
      secondRow:{
              title:'Company Total Debt',
              value:`${FinancialData?.body?.totalDebt.raw} `,
                sign:" $"
       },
      thirdRow:{
              title:'Target Mean Price',
              value: `${FinancialData?.body?.targetMeanPrice?.raw}`,
                sign:""
         }
    },
    {
      title:"Key Metrics about  Revenue",
      fristRow:{
             title:'Revenue Growth',
             value:`${FinancialData?.body?.revenueGrowth?.fmt}`,
             sign:" %"
      } ,
      secondRow:{
              title:' Total Revenue ',
              value:`${FinancialData?.body?.totalRevenue?.raw}`,
              sign:" $"
       },
      thirdRow:{
              title:'Revenue Per Share',
              value:`${FinancialData?.body?.revenuePerShare?.raw}`,
                sign:" $"
             
         }
    },
  ]
  const paragragh='Explore real-time stock price charts,company financial data and recommendation trends for any company '
  const classStyle='page-sub-title'
  const LoaderStyle='loaderStyle';
  const paragrahpStyle='animation-completed';
  const recommendationDescrion= [
    {
      key: '0',
      label:'the meaning of thr recommendation trends' ,
      children:<p className="notePara2">**strong buy signifies that how many analysts have suggesting buying that stock for its high potential<br/>
      **Buy means that analysts have recommended "Buy",expecting the stock to outperform the market.<br/>
      **Hold indicates that analysts recommend "Holding" means no strong reason to either buy or sell it at the current price<br/>
      ** Sell indicates that  analysts have issued a Sell becuase the stock is overvalued and that its price is likely to decline</p> ,
    },
    
  
  ];

    
    
    return(
      <>
      {simplified?
         <>
         <Row className="dataContainer">
             <Col xs={24} sm={24} lg={24} xl={14} className="chart-container" style={{height:'400px'}} >
                 <div className="chart-ticker-title-container">
                   <p className="chart-ticker-title">THE CHANGE IN PRICE IN {ticker} COMPANY</p>
                  </div>
                 
                   <div className="simplified-segment" >
                       <Segmented   defaultValue="1m"  onChange={(value) => setTimePeriod(value)}   options={['1m', '5m', '15m','30m']} />
                   </div>
                  <LineChart ticker={ticker} time={timeperiod} simplified />  
              
              </Col> 
            
            <Col lg={24}  sm={24} xs={24} xl={10} >
              <Row className="sub-container2">
                <Col span={24}  >
                  <Card  className="normal-cardsimple" >
                      <h2 className="CardMetricsTitle2">Key Metrics about stock price</h2>
                             <Row className="KeyMetricsRow2" >
                                 <Col  className="keyMetricsColsimple3" lg={16} xs={14}> 
                                   <Row className="background"><p className="metricsParasimple" style={{margin:"0px",fontWeight:'700'}}>current stock price</p></Row>
                                   <Row className="background"> <p className="KeyMetricsDescrib" style={{margin:"0px"}}>Reflects market valuation & sentiment</p></Row>
                                 </Col>
                                 <Col  className="keyMetricsColsimple3" lg={8} xs={10}>
                                  <Row style={{background:'none'}}>
                                    <Col className="KeyMetricsRow" >
                                       <NumberAnimation from={0} to={FinancialData?.body?.currentPrice?.raw} />
                                    </Col>
                                    <Col className="KeyMetricsRow">
                                      <span className="metricsPara">$</span>
                                    </Col>
                                  </Row>
                                   </Col>
                              </Row>
                              <Row className="KeyMetricsRow2">
                                <Col  className="keyMetricsColsimple3" lg={16} xs={14}> 
                                  <Row className="background"> <p className="metricsParasimple" style={{margin:"0px", fontWeight:'700'}}> Total Cash Per Share</p></Row> 
                                  <Row className="background"> <p className="KeyMetricsDescrib" style={{margin:"0px"}}>Indicates liquidity & investment potential</p></Row>
                                </Col>
                                <Col  className="keyMetricsColsimple3" lg={8} xs={10}>
                                 <Row style={{background:'none'}}>
                                    <Col className="KeyMetricsRow" >
                                       <NumberAnimation from={0} to={FinancialData?.body?.totalCashPerShare?.raw} />
                                    </Col>
                                    <Col className="KeyMetricsRow">
                                        <span className="metricsPara">$</span>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                  </Card>
                </Col>
              </Row>
              <Row className="sub-container2">
                <Col span={24}  style={{paddingBottom:'0px'}}>
                  <Card className="normal-cardsimple">
                        <h2 className="CardMetricsTitle2">Key Metrics about  Revenue</h2>
                            <Row className="KeyMetricsRow2">
                                <Col  className="keyMetricsColsimple3" lg={16} xs={16}> 
                                  <Row className="background"><p className="metricsParasimple" style={{margin:"0px",fontWeight:'700'}}>Revenue Growth</p></Row>
                                  <Row className="background"> <p className="KeyMetricsDescrib" style={{margin:"0px"}}>Signals growth potential & competitive advantage</p></Row>
                                </Col>
                                 <Col  className="keyMetricsColsimple3" lg={8} xs={8}>
                                   <Row style={{background:'none'}}>
                                       <Col className="KeyMetricsRow" >
                                           <NumberAnimation from={0} to={FinancialData?.body?.revenueGrowth?.fmt} />
                                         </Col>
                                         <Col className="KeyMetricsRow">
                                            <span className="metricsPara">%</span>
                                        </Col>
                                   </Row>
                                 </Col>
                             </Row>

                           <Row className="KeyMetricsRow2">
                              <Col  className="keyMetricsColsimple3" lg={16} xs={16}> 
                               <Row className="background"> <p className="metricsParasimple" style={{margin:"0px",fontWeight:'700'}}> Revenue Per Share(RPS)</p></Row>
                               <Row className="background"> <p className="KeyMetricsDescrib" style={{margin:"0px"}}> Measures revenue efficiency & valuation</p></Row>
                              </Col>
                              <Col  className="keyMetricsColsimple3" lg={8} xs={8}>
                                 <Row style={{background:'none'}}>
                                     <Col className="KeyMetricsRow" >
                                          <NumberAnimation from={0} to={FinancialData?.body?.revenuePerShare?.raw} />
                                      </Col>
                                       <Col className="KeyMetricsRow">
                                            <span className="metricsPara">$</span>
                                       </Col>
                                   </Row>
                                </Col>
                             </Row>

                   </Card>
                </Col>
              </Row>
            </Col>
         </Row>
        </>:
        <div ref={container} style={{position:'relative'}}>
        
        <Row className="row-title-container-page" >
           <div className="home-heading-container-page"  xs={24} >
              <Row className="ROW-title">
                 < Col  className="title-container" >
                   <h1 className="home-title-page3"> COMPANIES ANALAYSIS </h1>
                 </Col> 
             </Row>
              <Row className="textAnimation" >
                <TextAnimation text={paragragh} classStyle={classStyle} paraStyle={paragrahpStyle}/>
                  
              </Row> 
         </div>     
        </Row>
        { (isFetching)?  <Loader classname={LoaderStyle}/>:<>
        <Row className="show-type2" style={{justifyContent:'left',alignItems:'flex-start'}}>
          <DebounceInput
            placeholder="Search any company in market"
            value={searchTerm}
            debounceTimeout={3000}
            onFocus={(e)=>setClickedInput(true)}
            className={!clickedInput?"searchInputFocus":"searchInput"}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </Row>
          <div style={{marginBottom:'24px',marginTop:'32px'}}>
          <Breadcrumb
                  items={[
                              {
                                 href: '',
                                 title: (
                                              <>
                                                  <HomeOutlined />
                                                 <span>Home</span>
                                                </>
                                          ),
                             },
                            {
                                   title:  (
                                    <>
                                        <DollarOutlined />
                                       <span>Companies Anlaysis</span>
                                      </>
                                ),
                             },
                           ]}
            className="Breadcrumb-style"    />
      <h2 className="second-title"> {company} Company Overview</h2>
      <span className="second-sub-title" >Track stock price fluctuations with interactive charts showing price changes over 30 days. Gain insights into stock performance and trends</span>
      </div>
        <div className="chart-container-box">
          <Col className="chart-container">
             <div className="chart-ticker-title-container">
                   <p className="chart-ticker-title">Visualize Stock Price Changes For {ticker} </p>
             </div>
          <div className="tab-style">
          <Segmented
             defaultValue="1m"
              onChange={(value) => setTimePeriod(value)}
              options={['1m', '5m', '15m','30m']}
            />
          </div>
          
       
          
          
          <LineChart ticker={ticker} time={timeperiod}/>
          </Col>
          <Col className="company-profile-style"  > 
                  <Card className="normal-card">
                     <div className="summary-container">
                       <h4  className="chart-ticker-title">Company profile Snapshot </h4>
                       <p style={{color:'#24223e' ,opacity:'80%' }}>{choosenTicker?.body?.longBusinessSummary}</p>
                     </div>
                   </Card>

              </Col>
        </div>
             
          
        
        <div className="home-heading-container" style={{paddingTop:'80px'}}>
          <Row>
            < Col span={22} className="title-container">
                 <h2 className="home-title" > Financial Performance Overview </h2>
            </Col>
            
          </Row>
          <Row>
             <p className="sub-title" style={{marginBottom:'0px'}}>
             Explore key metrics like stock price, revenue growth, and more for comprehensive insights <br/>
             
             </p>
          </Row> 
            

        </div>
        
        <Row className="dataContainer">

              
                  <Row span={24}>
                    
                      { keyMetrics.map((Metric)=>(
                        <Col className="anlaysis-container1" lg={8} xs={24} >
                            <Card className="colorfulrectanglePage2" style={{padding:'0px'}} >
                            <h2 className="CardMetricsTitle">{Metric.title}</h2>
                            <Row className="KeyMetricsRow">
                              <Col  className="keyMetricsCol"  lg={12} xs={12} > <p className="metricsPara">{Metric.fristRow.title}</p></Col>
                              <Col  className="keyMetricsCol2"  lg={12} xs={12} > 
                              <Row style={{background:'none'}}>
                                <Col  className="KeyMetricsRow">
                                   <NumberAnimation from={0} to={Metric.fristRow.value} />
                                </Col>
                                <Col  className="KeyMetricsRow">
                                   <span className="metricsPara">{Metric.fristRow.sign}</span>
                                 </Col>
                               </Row>
                            </Col>
                            
                            </Row>
                           
                             <Row className="KeyMetricsRow">
                               <Col  className="keyMetricsCol" lg={12} xs={12} ><p className="metricsPara">{Metric.secondRow.title}</p></Col> 
                               <Col  className="keyMetricsCol2"  lg={12} xs={12}>
                               <Row  style={{background:'none'}}>
                                   <Col  className="KeyMetricsRow" >
                                      <NumberAnimation from={0} to={Metric.secondRow.value} />
                                    </Col>
                                    < Col  className="KeyMetricsRow">
                                      <span className="metricsPara">{Metric.secondRow.sign}</span>
                                    </Col>
                                 </Row>
                                </Col> 
                               
                            </Row>
                            <Row className="KeyMetricsRow">
                               <Col  className="keyMetricsCol"  lg={12} xs={12} ><p className="metricsPara">{Metric.thirdRow.title} </p></Col> 
                               <Col  className="keyMetricsCol2"  lg={12} xs={12}>
                               <Row style={{background:'none'}}>
                                  <Col  className="KeyMetricsRow">
                                      <NumberAnimation from={0} to={Metric.thirdRow.value} />
                                  </Col>
                                  <Col  className="KeyMetricsRow">
                                     <span className="metricsPara">{Metric.thirdRow.sign}</span>
                                   </Col>
                                 </Row>
                                </Col> 
                            </Row> 
                       </Card>
                       </Col>
                 ) )}
                   
                    </Row> 
        </Row>
        <Row className="recomendation-section" >
        
          <div className="Recomendation-container">
             <motion.div className="iphonePhoto-container" style={{y: shapeMotion.translateY}}>
                  <img src={phone} className="iphonephoto"/>
              </motion.div>
              <Row  style={{background:'none'}}>
              <Col lg={14} xs={24} style={{background:'inherit'}}>
                 <Row className="recomendation-title"><p style={{margin:'0px'}} className="recommendationpara">Recomendation Trends</p></Row>
                    <Row style={{background:'none'}}>
                        { recommendationTrends?.map((Trends)=>(
             
                              <Col className="progress-container">
                                      <p className="recommendationPragragh">{Trends.period}<br/><span className="recommendationDescribtion">{Trends.period=="0m"? "This refers to analyst recommendations from one month ago":`This refers to analyst recommendations from ${(Trends.period).substr(1, 1)} month ago`}</span></p>
                                      <Flex gap='small' wrap className="flex-style" >
                                           <span className="recommendationSpan"> Strong Buy</span> <Progress  percent={Trends.strongBuy} format={()=>`${Trends?.strongBuy} analysts`}   className="progress-style" />
                                           <span className="recommendationSpan"> Hold</span>   <Progress  percent={Trends.hold} format={()=>`${Trends?.hold} analysts`}  className="progress-style"/>
                                            <span className="recommendationSpan"> Sell</span>  <Progress  percent={Trends.sell} format={()=>`${Trends?.sell} analysts`}   className="progress-style"/>
                                           <span className="recommendationSpan"> Buy</span>  <Progress  percent={Trends.buy} format={()=>`${Trends?.buy} analysts`}  className="progress-style" />
                                      </Flex>
                               </Col>
                                ))
                         }
                     </Row>
                    <Row className="background">
                              <Collapse items={recommendationDescrion} bordered={false}  defaultActiveKey={['0']} style={{background:'none'}}/>
                     </Row>
             </Col>
             <Col lg={10}  xs={24}  className="recomendation-subsection">
              
             </Col>
             </Row>
         </div>
       
         { screenSize.width>800? <>
           <Row style={{background:'none'}} ref={shapeMotion.container}>
        
           <Col lg={12} xs={24} style={{background:'none'}}>
              <QuestionAnswer questions={ QuestionAns}/>
           </Col>
           <Col lg={12} xs={24} style={{background:'none'}}></Col>
         </Row>
         </>
         
         :<>
         <Row style={{background:'none'}} ref={shapeMotion.container}>
         <Col lg={12} xs={24} style={{background:'none'}} className="spacecol"></Col>
         <Col lg={12} xs={24} style={{background:'none'}}>
            <QuestionAnswer questions={ QuestionAns}/>
         </Col>
        
       </Row>
       </>
         }
        </Row>  
       </>}
        </div>}
        </>)
}
export default CompanyDetails;