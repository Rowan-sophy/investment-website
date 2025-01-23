import { useState,useEffect,useRef } from "react";
import './LogIn.css'
import Register from "./Register";
import { Link } from "react-router-dom";

const LogIn =()=>{
    const userRef = useRef(null);
    const errRef = useRef(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        
            userRef.current.focus();
        
        
        
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    /**in second useeffect we're going to empty out any error messege we might have , 
     * if the user changees the user state or user passowerd state , 
     * so if he change any things in ethier of those input will make will make the error disapear becuase they read it and make our adjusment */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            userRef.current.focus();
        }
        setUser('')
        setPwd('');
        setSuccess(true)

    }
   
    return(
        <>
             {success ? (
                 <div className="logSection">  
                <section className="successSection" >
                    <h1 className="link-home">You are logged in!</h1>
                    <p className="link-home">
                        <a href="/">Go to Home</a>
                    </p>
                </section>
                </div>
            ) : (
        <div className="logSection">     
        <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                   <div className="head-logSection">
                      <h1 >Sign In</h1>
                    </div> 
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                   
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                  <div className="second-logsection">
                     <button className="btnSign" >
                          SIGN IN
                     </button>
                    </div>
                    </form>
                    <p>
                        Need an Account?<br />
                     <button className="btnSign" >
                     <Link to='/Register'>Register</Link>
                    </button>
                       
                    </p>
                    
                    
        </section>
        </div>  
            )}
        </>
    )
}
export default LogIn;