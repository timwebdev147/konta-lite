import style from './login.module.scss'
import logo from "../../images/logo.png"
import google_logo from "../../images/google-logo.svg"
import microsoft_logo from "../../images/microsoft-logo.svg"
import lock_icon from "../../images/lock_icon.svg"
import business_info from "../../images/contract.png"
import {RiEyeCloseLine, RiEyeLine} from "react-icons/ri"
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import axios from 'axios'
//library for notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import {  useNavigate } from 'react-router-dom'
import { handleUserInfo } from 'redux/dashboardSlice'
import { useDispatch } from 'react-redux'

function Login({ lang, translatePage}) {
    
useEffect(() => {
}, [lang])

const footer_nav = [
    {
        link: '',
        translateId: "login.footer_link_one",
        text: 'Terms of service',
    },
    {
        link: '',
        translateId: "login.footer_link_two",
        text: 'Privacy policy',
    },
    {
        link: '',
        translateId: "login.footer_link_three",
        text: 'Legal notice',
    },
    {
        link: '',
        translateId: "login.footer_link_four",
        text: 'Cookie policy',
    },
    {
        link: '',
        translateId: "login.footer_link_five",
        text: 'Cookie settings',
    },
]

    

const [passwordVisibility, setPasswordVisibility] = useState('password')
const [password, setPassword] = useState()
const [username, setUsername] = useState()
const cookie = window.localStorage.getItem("cookie")
const navigate = useNavigate()
const dispatch = useDispatch()

function togglePasswordVisibility(){
    if (passwordVisibility == "password") {
        setPasswordVisibility("text")
    }
    else(
        setPasswordVisibility("password")
    )
}



  const login = async (params)  => {
    await axios.post('http://localhost:9000/api/login', {
        password,
        username
    })
    .then(res => {

        toast.success("Login Successful", {
            position: toast.POSITION.TOP_CENTER
          });
        setTimeout(() => {
        return(
            navigate("/account")
        )
        }, 2000)
        console.log(res.data);
        
        window.localStorage.setItem("cookie", res.data.cookie)
        window.localStorage.setItem("ktwaIsLoggedIn", true)
        window.localStorage.setItem("token", res.data.token)
        const cookie = window.localStorage.getItem("cookie")
         axios.get(`http://localhost:9000/api/user/auth/${username}`, {
             headers: {
                 cookiee: cookie,
             }
         }).then(response => {
             dispatch(handleUserInfo(response.data[0]))
         }).catch(err => console.log(err))

    })
    .catch(err => {
        toast.error("incorrect password and email", {
            position: toast.POSITION.TOP_CENTER
        });
        console.log(err)
    })


    
}

useEffect(() => {
    console.log(password, username);

}, [password, username])

useEffect(() => {
    let isLoggedIn = window.localStorage.getItem('ktwaIsLoggedIn')
    if(isLoggedIn == true){
        navigate('/account')
    }
}, [])



return (
    <>
    <div className={style.login}>
    <select value={lang} name="" id="">
            <option onClick={e => translatePage(e.target.value)} value="fr">French</option>
            <option onClick={e => translatePage(e.target.value)} value="en">English</option>
        </select>
        <div className={style.form}>
            <img src={logo} alt="" />
            <div className={style.oidc}>
                <button><img src={google_logo} className={style.oidc_icon} alt="" /> Google</button>
                <button><img src={microsoft_logo} className={style.oidc_icon} alt="" /> Microsoft</button>
                <button><img src={lock_icon} className={style.oidc_icon} alt="" /> SAML SSO</button>
            </div>
            <div className={style.or}>Or</div>

            <div className={style.inputContainer}>
                <div>
                <input name='username' type="email" value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={
                    lang == "en"?  "Email":"E-mail"
                    }
                />
                </div>
                <div>
                <input name='password' type={passwordVisibility} value={password}
                onChange={e => setPassword(e.target.value)}
                    placeholder={
                    lang == "en"?  "Password":"Mot de Passe"
                    }
                    />
                {
                    passwordVisibility == "password"?
                    <RiEyeCloseLine onClick={() => togglePasswordVisibility()} className={style.pass_icon} />:
                    <RiEyeLine onClick={() => togglePasswordVisibility()} className={style.pass_icon} />

                }
                </div>

                <button
                onClick={() => login()}
                >
                        <FormattedMessage
                        id="login.button"
                        defaultMessage={"Sign in"}
                        />
                </button>

            </div>
            <div className={style.noAccount}>
                <p>
                <FormattedMessage
                id="login.no_account"
                defaultMessage={"Don't have an account?"}
                />
                <a href="/register">
                        <FormattedMessage
                        id="login.no_account.link"
                        defaultMessage={"Sign up"}
                        />
                </a></p>
            </div>

            <div className={style.footer}>
                {
                    footer_nav?.map((nav, index) => (
                        <a key={index} href="">
                            <FormattedMessage
                            id={nav.translateId}
                            defaultMessage={nav.text}
                            />  
                        </a>
                    ))
                }
            </div>
        
        </div>
        <div className={style.wallpaper}>
        
            <h1>
            <FormattedMessage
                id="login.wallpaper.header"
                defaultMessage={"Manage Your Finances without hassle"}
            />
            </h1>
            <p>
            <FormattedMessage
                id="login.wallpaper.text"
                defaultMessage={"Thanks to the performance analysis tools, you can follow your progress and anticipate your decisions."}
            />
            </p>
            <img src={business_info} alt="" />
            <a href="/register">
            <FormattedMessage
                id="login.wallpaper.book"
                defaultMessage={"Book a demo"}
            />
            </a>
            <div>
                <div>
            <p className={style.contract_text} >
            <FormattedMessage
                id="login.wallpaper.contract"
                defaultMessage={"Contract"}
            />
            </p>
                </div>
            </div>
        </div>
    </div>
    </>
)
}

Login.propTypes = {
    lang: PropTypes.string,
    translatePage: PropTypes.node,
  };

export default Login;