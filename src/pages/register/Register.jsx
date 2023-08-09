import styles from './register.module.scss'
import logo from '../../images/logo.png'
import {BsFillCreditCard2BackFill} from 'react-icons/bs'
import {HiOutlineDesktopComputer} from 'react-icons/hi'
import {FaRobot} from 'react-icons/fa'
import firstImg from '../../images/medal_leader.png'
import secondImg from '../../images/usersmostlikelytorecommend_mid-market.png'
import thirdImg from '../../images/leader_europe.png'
import fourthImg from '../../images/highperformer_mid-market.png'
import fithImg from '../../images/bestestimatedroi_small-business.png'
import { createRef, useEffect, useRef, useState } from 'react'
import {RiEyeCloseLine, RiEyeLine} from "react-icons/ri"
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'


function Register({translatePage, lang}){
    

    const [passwordVisibility, setPasswordVisibility] = useState('password')
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState('password')
    const [selectOptions, setOptions] = useState()
    // const [lang, setLang] = useState(locale)





    const imgMedal = [
        {
            path: firstImg
        },
        {
            path: secondImg
        },
        {
            path: thirdImg
        },
        {
            path: fourthImg
        },
        {
            path: fithImg
        },
    ]

    const fields = [
        {
            label: 'First name',
            value: '',
            type: 'text',
            class: 'halfwidth',
            translateId: "register.form.first_name"
        },
        {
            label: 'Last name',
            value: '',
            type: 'text',
            class: 'halfwidth',
            translateId: "register.form.last_name"
        },
        {
            label: 'Work email address',
            value: '',
            type: 'email',
            class: 'fullwidth',
            translateId: "register.form.work_email"
        },
        {
            label: 'Work phone number',
            value: '',
            type: 'text',
            class: 'fullwidth',
            translateId: "register.form.work_phone_number"
        },
        {
            label: 'Company name',
            value: '',
            type: 'text',
            class: 'halfwidth',
            translateId: "register.form.company_name"
        },
        {
            label: 'Country',
            value: '',
            type: 'dropdown',
            translateId: "register.form.country",
            options: [
                "Self-employed",
                "2-10",
                "11-50",
                "51-200",
                "201-500",
                "500+"
            ],
            class: 'halfwidth'
        },
        {
            label: 'How did you hear about us',
            value: '',
            type: 'dropdown',
            translateId: "register.form.how_did_you_hear_about_us",
            options: [
                "Google/Search engine",
                "Recommended by friend or colleague",
                "Social media",
                "Blog or Publication",
                "Event",
                "Recommended by my accountant or consultant",
                "Online advertisement",
                "CFO connect",
                "Capter, G2 or Trustpilot",
                "Print magazine or newspaper",
                "Billboard or outdoor advertising",
                "Podcast",
                "Webinar",
                "Other"
            ],
            class: 'fullwidth'
        },
        {
            label: 'choose three of your interests',
            value: '',
            type: 'multiselect',
            translateId: "register.form.choose_interest",
            options: [
                {value: "Invoice", label: "Invoice"},
                {value: "Crm", label: "Crm"},
                {value: "Accountability", label: "Accountability"},
                {value: "Stock", label: "Stock"},
                {value: "document", label: "document"},
            ],
            class: 'fullwidth'
        },
        {
            label: 'Password',
            name: "password",
            prop: 'password',
            value: '',
            type: passwordVisibility,
            translateId: "register.form.password",
            class: 'fullwidth'
        },
        {
            label: 'Confirm Password',
            name: "password",
            prop: 'cpassword',
            value: '',
            translateId: "register.form.confirm_password",
            type: confirmPasswordVisibility,
            class: 'fullwidth'
        },
    ]

    useEffect(() => {
        let select = document.getElementById('multiSelect')
        console.log(select);
    })

    const myRefs = useRef([]);
    myRefs.current = fields.map((field, index) => myRefs.current[index] ?? createRef());

    function fullOpacity(select) {
        select.current.classList.add(styles.fullOpacity)
        console.log(select.current);
    }


    function togglePasswordVisibility(prop){
        if (prop == "password") {
            if (passwordVisibility == "password") {
                setPasswordVisibility("text")
            }
            else(
                setPasswordVisibility("password")
            )
        }else{
            if (confirmPasswordVisibility == "password") {
                setConfirmPasswordVisibility("text")
            }
            else(
                setConfirmPasswordVisibility("password")
            )
        }
    }



    return(
        <>
        <div className={styles.register}>
            <div className={styles.nav}>
            <img src={logo} alt="" />
            {/* <button onClick={() => translatePage(lang == "fr"? "en": "fr")}>{lang == "fr"? "french to english": "english to french"}</button> */}
            <select value={lang} name="" id="">
                <option onClick={e => translatePage(e.target.value)} value="fr">French</option>
                <option onClick={e => translatePage(e.target.value)} value="en">English</option>
            </select>
            </div>
            <div className={styles.row}>
                <div className={styles.column + " " + styles.about}>
                    <section>
                        <h1>
                            <FormattedMessage
                            id="register.section_one.heading"
                            defaultMessage={"Book your free demo of Konta"}
                            />
                        </h1>
                        <p>
                            <FormattedMessage
                            id="register.section_one.text"
                            defaultMessage={"Control spending and increase efficiency across your business with smart debit cards, effortless expense management and automated bookkeeping."}
                            />
                        </p>
                    </section>
                    <section>
                        <div>
                            <span>
                            <BsFillCreditCard2BackFill className={styles.icon} />
                            </span>
                            <span>
                                <strong>
                                    <FormattedMessage
                                    id="register.section_two.card_one.title"
                                    defaultMessage={"Secure payments"}
                                    />
                                </strong>
                                <p>
                                    <FormattedMessage
                                    id="register.section_two.card_one.text"
                                    defaultMessage={"Clever company cards, expenses and invoice management."}
                                    />
                                </p>
                            </span>
                        </div>
                        <div>
                            <span>
                            <HiOutlineDesktopComputer className={styles.icon} />
                            </span>
                            <span>
                                <strong>
                                    <FormattedMessage
                                    id="register.section_two.card_two.title"
                                    defaultMessage={"Powerful software"}
                                    />
                                </strong>
                                <p>
                                    <FormattedMessage
                                    id="register.section_two.card_two.text"
                                    defaultMessage={"Track payments, manage approvals and control employee spending."}
                                    />
                                </p>
                            </span>
                        </div>
                        <div>
                            <span>
                            <FaRobot className={styles.icon} />
                            </span>
                            <span>
                                <strong>
                                    <FormattedMessage
                                    id="register.section_two.card_three.title"
                                    defaultMessage={"Awesome automation"}
                                    />
                                </strong>
                                <p>
                                    <FormattedMessage
                                    id="register.section_two.card_three.text"
                                    defaultMessage={"98% receipt collection, automated accounting and expense reports."}
                                    />
                                </p>
                            </span>
                        </div>
                    </section>
                    <section>
                        <p>
                                    <FormattedMessage
                                    id="register.reviews"
                                    defaultMessage={"TRUSTED AND USED BY THOUSANDS OF FINANCE TEAMS AND EMPLOYEES!"}
                                    />
                        </p>
                        <div className={styles.gallery}>
                        {
                            imgMedal.map((image, index) => (
                                <img src={image.path} key={index} alt="" />
                            ))
                        }
                        </div>
                    </section>
                    
                </div>
                <div className={styles.column + " " + styles.form}>
                    <form action="">
                        {
                            fields.map((field, index) => (
                                field.type != "dropdown"?
                                field.type == "multiselect"?
                            
                                <div className={styles[field.class] }>
                                    <label htmlFor="">
                                        <FormattedMessage 
                                        id={field.translateId}
                                        defaultMessage={field.label}
                                        />
                                        <span>*</span>
                                    </label>
                                    <Select 
                                    id='multiSelect'
                                    className={styles.basic_multi_select}   
                                    isMulti options={field.options} 
                                    placeholder={
                                            <FormattedMessage 
                                            id={"register.form.choose_interest.placeholder"}
                                            defaultMessage={"Select..."}
                                            />
                                    }
                                    />
                                </div>:
                                <div className={styles[field.class] } >
                                    <label htmlFor="">
                                        <FormattedMessage 
                                        id={field.translateId}
                                        defaultMessage={field.label}
                                        />
                                        <span>*</span>
                                    </label>
                                    <input type={field.type} key={index} />
                                    {
                                        field.name == "password"?
                                        field.type == "password"?
                                        <RiEyeCloseLine onClick={() => togglePasswordVisibility(field.prop)} className={styles.pass_icon} />:
                                        <RiEyeLine onClick={() => togglePasswordVisibility(field.prop)} className={styles.pass_icon} />:
                                        null
                                    }
                                </div>
                                :
                                <div className={styles[field.class] }>
                                    <label htmlFor="">
                                        <FormattedMessage 
                                        id={field.translateId}
                                        defaultMessage={field.label}
                                        />
                                        <span>*</span>
                                    </label>
                                <select 
                                name=""
                                ref={myRefs.current[index]} 
                                onClick={() => fullOpacity(myRefs.current[index])} id="select">
                                    <option hidden value="">
                                        <FormattedMessage 
                                        id="register.form.how_did_you_hear_about_us.placeholder"
                                        defaultMessage="please select"
                                        />
                                    </option>
                                    {
                                        field.options?.map((option, index) => (
                                            <option value="" key={index}>{option}</option>
                                        ))
                                    }
                                </select>

                                </div>
                            ))
                        }
                                <div className={styles.checkbox}>
                                    <input type="checkbox" />
                                    <label htmlFor="">
                                        <FormattedMessage
                                            id='register.form.agreement'
                                            defaultMessage={"I agree to be contacted by Spendesk for informational and marketing purposes according to the "}
                                        />
                                    &nbsp;
                                    <a href=''>
                                        <FormattedMessage id='register.form.agreement.PP_link' defaultMessage={'Privacy Policy'}/>
                                    </a>.<span>*</span>
                                    </label>
                                </div>
                                <button>
                                    <FormattedMessage id='register.form.submit' defaultMessage={'Submit form'} />
                                </button>
                                <p className={styles.lastText}>
                                    <FormattedMessage id='register.form.quick_info' defaultMessage={'No credit card required. No need to install software.'} />
                                </p>
                    </form>

                </div>
            </div>
        </div>
        </>
    )
}


export default Register;