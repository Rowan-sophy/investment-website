import { useRef,useState,useEffect} from "react";
import './LogIn.css'
import {CheckCircleOutlined,CloseCircleOutlined} from "@ant-design/icons"
import { Link } from "react-router-dom";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const REGISTER_URL = '/register';
const Register=()=>{
    const nameRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])
    //any time user name changes we would check the validation of the user name
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])
    //any time ethier password or matchpassword change will have a validation check
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit= async(e)=>{
        e.preventDefualt()

    }
    return(
        <>
             {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <div className="logSection">  
                <section>
                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                     <div className="head-logSection">
                         <h1>Register</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                            Username:
                           <CheckCircleOutlined className={validName ? "valid" : "hide"} />
                           <CloseCircleOutlined className={validName || !user ? "hide" : "invalid"}/>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={nameRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                           
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                       { /**so if the user focus are true and the username are not empty and
                        *  if there are not a valid name then the
                        * insturction will be showen and is not set to dis play none but is taking of the screen
                        * 
                        */}
                        
                        <label htmlFor="password">
                            Password:
                            <CheckCircleOutlined  className={validPwd ? "valid" : "hide"} />
                            <CloseCircleOutlined  className={validPwd || !pwd ? "hide" : "invalid"} />
                           
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                             <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> 
                            <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <CheckCircleOutlined  className={validMatch && matchPwd ? "valid" : "hide"} />
                            <CloseCircleOutlined  className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            
                            Must match the first password input field.
                        </p>

                        <button className="btnSign" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <button className="btnSign">
                           <Link to='/LogIn'>LogIn</Link>
                        </button>
                    </p>
                </section>
            </div>
            )}
        </>
    )

}

export default Register;