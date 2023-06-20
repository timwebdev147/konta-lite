import style from './login.module.scss'
import logo from "../../images/logo.png"
import google_logo from "../../images/google-logo.svg"
import microsoft_logo from "../../images/microsoft-logo.svg"
import lock_icon from "../../images/lock_icon.svg"
import business_info from "../../images/contract.png"

function Login(params) {

    const footer_nav = [
        {
            link: '',
            text: 'Terms of service',
        },
        {
            link: '',
            text: 'Privacy policy',
        },
        {
            link: '',
            text: 'Legal notice',
        },
        {
            link: '',
            text: 'Cookie policy',
        },
        {
            link: '',
            text: 'Cookie settings',
        },
    ]
    


    return (
        <>
        <div className={style.login}>
            <div className={style.form}>
                <img src={logo} alt="" />
                <div className={style.oidc}>
                    <button><img src={google_logo} className={style.oidc_icon} alt="" /> Google</button>
                    <button><img src={microsoft_logo} className={style.oidc_icon} alt="" /> Microsoft</button>
                    <button><img src={lock_icon} className={style.oidc_icon} alt="" /> SAML SSO</button>
                </div>
                <div className={style.or}>Or</div>

                <div className={style.inputContainer}>
                    <input type="text" placeholder='Email' />
                    <input type="text" placeholder='Password' />

                    <button>Sign in</button>

                </div>
                <div className={style.noAccount}>
                    <p>Don't have an account? <a href="">Sign up</a></p>
                </div>

                <div className={style.footer}>
                    {
                        footer_nav?.map((nav, index) => (
                            <a key={index} href="">{nav.text}</a>
                        ))
                    }
                </div>
            
            </div>
            <div className={style.wallpaper}>
                <h1>Manage Your Finances without hassle</h1>
                <p>Thanks to the performance analysis tools, you can follow your progress and anticipate your decisions.</p>
                <img src={business_info} alt="" />
                <a href="">Book a demo</a>
            </div>
        </div>
        </>
    )
}

export default Login;