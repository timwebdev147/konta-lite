import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchListBox } from 'DashboardViews/components';

export const ClientEdit = ({close}) => {
    const form = [
        {
            sectionName: "Le client",
            subSections: [
                {
                    type: "radio",
                    radioLabel: "Type de client *" ,
                    radio: [
                        {
                            label: "Particulier",
                            value: "particulier"
                        },
                        {
                            label: "Entreprise",
                            value: "enterprise"
                        }
                    ]
                },
                {
                    type: "radio",
                    radioLabel: "Localisation du client *" ,
                    radio: [
                        {
                            label: "France",
                            value: "france"
                        },
                        {
                            label: "International",
                            value: "international"
                        }
                    ]
                }
            ]
        },
        {
            sectionName: "Informations du client ",
            subSections: [
                {
                    type: "radio",
                    radioLabel: "Genre *" ,
                    radio: [
                        {
                            label: "Madame",
                            value: "madame"
                        },
                        {
                            label: "Monsieur",
                            value: "monsieur"
                        },
                        {
                            label: "Non spécifié",
                            value: "non"
                        }
                    ]
                },
                {
                    type: "text",
                    radioLabel: "Nom de famille *",
                    placeholder: "Nom de famille",
                    
                },
                {
                    type: "text",
                    radioLabel: "Prénom *",
                    placeholder: "Prénom",
                    
                },
                {
                    type: "text",
                    radioLabel: "Numéro de téléphone *",
                    placeholder: "Entrez le numero",
                    
                },
                {
                    type: "text",
                    radioLabel: "Adresse email *",
                    placeholder: "Entrez L'email",
                    
                },
            ]
        },
        {
            sectionName: "Adresse ",
            subSections: [
                {
                    type: "text",
                    radioLabel: "Recherche d’adresse",
                    placeholder: "Recherche d’adresse",
                    
                },
                {
                    type: "text",
                    radioLabel: "Adresse *",
                    placeholder: "Adresse",
                    
                },
                {
                    type: "text",
                    radioLabel: "Complément d’adresse (optionnel)",
                    placeholder: "Entrez le complément d’adresse",
                    
                },
                {
                    type: "text",
                    radioLabel: "Code Postal *",
                    placeholder: "Entrez le code postal",
                    
                },
                {
                    type: "text",
                    radioLabel: "Ville *",
                    placeholder: "Entrez le ville",
                    
                },
            ]
        }
    ]
    const [formFields, setFormFields] = useState(form)

return(
<div className={styles.container}>
    <div>
        <div className={styles.first}>
            <p>Modifier le client</p>
            <Icon onClick={() => {document.body.style.overflowY = "scroll"; close(false)}} className={styles.icon}>highlight_off</Icon>
        </div>
        <div className={styles.formContainer}>
            <FormGroup>
                {
                    formFields.map((field, index) => (
            <div key={index} className={styles.client}>
                <label htmlFor="">{field.sectionName}</label>
                {
                    field.subSections.map((subSection, index) => (
            <FormControl key={index} className={styles.formControl}>
            <FormLabel className={styles.formLabel}>{subSection.radioLabel}</FormLabel>
            {subSection.type == "radio"? 
            <RadioGroup
                className={styles.RadioGroup}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >{
                subSection.radio.map((radio, index) => (
                    <FormControlLabel key={index} value={radio.value} control={<Radio sx={{ color: "#1eb386"}} />} label={radio.label} />

                ))
            }
            </RadioGroup>:
            <TextField id="outlined-basic" label={subSection.placeholder} variant="outlined" />
            }  
            </FormControl>
                    ))
                }
                
            </div>
                ))
                }
            </FormGroup>

        </div>
        <button className={styles.button}>Enregistrer</button>

    </div>
</div>
)
}

export const ProductEdit = ({close, submit}) => {
    const form = [
        {
            type: "radio",
            radioLabel: "Type d'article *" ,
            name: "productTypeSelect",
            value: "",
            radio: [
                {
                    label: "Service",
                    value: "service"
                },
                {
                    label: "Produit",
                    value: "storable"
                }
            ]
        },
        {
            type: "text",
            radioLabel: "Nom *",
            name: "name",
            value: "",
            placeholder: "Entrez le nom"
            
        },
        {
            type: "multiline",
            name: "internalDescription",
            value: "",
            radioLabel: "Description (optionnel)",
            placeholder: "Entrez une description"
            
        },
        {
            type: "select",
            radioLabel: "Unité",
            name: "unit",
            value: "",
            options: [
                {
                    name: "Aucune",
                    value: "aucune"
                },
                {
                    name: "Unité(s)",
                    value: "unite"
                },
                {
                    name: "Heure(s)",
                    value: "heure"
                },
                {
                    name: "Jour(s)",
                    value: "jour"
                }
            ]
        },
        {
            type: "text",
            radioLabel: "Prix unitaire HT (€) *",
            name: "salePrice",
            value: "",
            placeholder: "Entrer un prix"
        }
    ]
    const [formFields, setFormFields] = useState(form)
    const cookie = window.localStorage.getItem("cookie")

    function handleChange(value, index) {

        let clonedFields = [...formFields];
        clonedFields[index].value = value;
        setFormFields(clonedFields);
        console.log(formFields)
    }

    
    
    return(
        <div className={styles.container}>
            <div>
                <div className={styles.first}>
                    <p>Ajouter un nouvel article </p>
                    <Icon onClick={() => {document.body.style.overflowY = "scroll"; close(false)}} className={styles.icon}>highlight_off</Icon>
                </div>
                <div className={styles.formContainer}>
            <form className={styles.client}>
                {
                    formFields.map((field, index) => (
                        field.type == "select"?
                        <FormControl className={styles.formControl} key={index} sx={{width: '100%' }} >
                        
                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                        <Select className={styles.select}
                        sx={{ 
                            color: "black",
                            // padding: '0.70em',
                            '.MuiSelect-icon': {
                                display: 'block',
                            },
                            '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                                padding: '0.70em !important',
                            }
                        }}
                        id="demo-simple-select"
                        value={field.value}
                        onChange={e => handleChange(e.target.value, index)}
                        >
                            {/* <MenuItem value="">
                                <em>Aucune</em>
                            </MenuItem> */}
                            {
                            field.options.map((option, index) => (
                                <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                            ))
                        }
                        </Select></FormControl>:

                        field.type == "radio"?
                        <FormControl key={index} className={styles.formControl}>
                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                        <RadioGroup
                            className={styles.RadioGroup}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={e => handleChange(e.target.value, index)}
                        >{
                            field.radio.map((radio, index) => (
                                <FormControlLabel key={index} value={radio.value} control={<Radio sx={{ color: "#1eb386"}} />} label={radio.label} />

                            ))
                        }
                        </RadioGroup>
                        </FormControl>:

                        <FormControl key={index} className={styles.formControl}>
                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                        {
                            field.type == "multiline"?
                            <TextField
                            className={styles.input} key={index} 
                            multiline
                            type={field.type} onChange={e => handleChange(e.target.value, index)} 
                            id="outlined-multiline-static" rows={10} label={field.placeholder} variant="outlined" 
                            />:
                            <TextField
                            className={styles.input} key={index} 
                            type={field.type} onChange={e => handleChange(e.target.value, index)} 
                            id="outlined-basic" label={field.placeholder} variant="outlined" 
                            />
                        }
                        </FormControl>
                    ))
                }
            </form>

        </div>
        <button onClick={() => submit(formFields)} className={styles.button}>Enregistrer</button>
    
            </div>
        </div>
    )
}
export const CompanyEdit = ({close, submit}) => {
    const form = [
        // {
        //     type: "radio",
        //     radioLabel: "Type d'enterprise *" ,
        //     name: "productTypeSelect",
        //     value: "",
        //     radio: [
        //         {
        //             label: "Service",
        //             value: "service"
        //         },
        //         {
        //             label: "Produit",
        //             value: "storable"
        //         }
        //     ]
        // },
        {
            type: "text",
            radioLabel: "Nom d'enterprise *",
            name: "name",
            value: "",
            placeholder: "Entrez le nom d'enterprise"
            
        },
        {
            type: "text",
            radioLabel: "code d'enterprise *",
            name: "code",
            value: "",
            placeholder: "Entrez trois lettres code d'enterprise"
            
        },
        {
            type: "multiline",
            name: "notes",
            value: "",
            radioLabel: "Note (optionnel)",
            placeholder: "Entrez une note"
            
        },
        {
            type: "select",
            radioLabel: "Devise",
            name: "currency",
            value: ""
        },
        {
            type: "text",
            radioLabel: "IFU *",
            name: "ifu",
            value: "",
            placeholder: "Entrer votre IFU"
        }
    ]
    const [formFields, setFormFields] = useState(form)
    const cookie = window.localStorage.getItem("cookie")
    const [currencies, setCurrencies] = useState([])


    function get_currencies(){
        axios.get("http://localhost:9000/api/currency", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let currency = res.data.data;
            setCurrencies(currency)
            console.log("currencies", currency);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }

    function handleChange(value, index) {

        let clonedFields = [...formFields];
        clonedFields[index].value = value;
        setFormFields(clonedFields);
        console.log(formFields)
    }

    useEffect(() => {
        get_currencies()
    }, [])

    
    
    return(
        <div className={styles.container}>
            <div>
                <div className={styles.first}>
                    <p>Ajouter un nouvel enterprise </p>
                    <Icon onClick={() => {document.body.style.overflowY = "scroll"; close(false)}} className={styles.icon}>highlight_off</Icon>
                </div>
                <div className={styles.formContainer}>
            <form className={styles.client}>
                {
                    formFields.map((field, index) => (
                        field.type == "select"?
                        <FormControl className={styles.formControl} key={index} sx={{width: '100%' }} >
                        
                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                        <Select className={styles.select}
                        sx={{ 
                            color: "black",
                            // padding: '0.70em',
                            '.MuiSelect-icon': {
                                display: 'block',
                            },
                            '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                                padding: '0.70em !important',
                            }
                        }}
                        id="demo-simple-select"
                        value={field.value}
                        onChange={e => handleChange(e.target.value, index)}
                        >
                        <MenuItem ><em>sélectionner une devise</em></MenuItem>
                        {
                            currencies?.map((currency, index) => (

                            <MenuItem key={index} value={currency.id}>{currency.code}</MenuItem>
                            ))
                        }
                        </Select></FormControl>:

                        field.type == "radio"?
                        <FormControl key={index} className={styles.formControl}>
                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                        <RadioGroup
                            className={styles.RadioGroup}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={e => handleChange(e.target.value, index)}
                        >{
                            field.radio.map((radio, index) => (
                                <FormControlLabel key={index} value={radio.value} control={<Radio sx={{ color: "#1eb386"}} />} label={radio.label} />

                            ))
                        }
                        </RadioGroup>
                        </FormControl>:

                        <FormControl key={index} className={styles.formControl}>
                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                        {
                            field.type == "multiline"?
                            <TextField
                            className={styles.input} key={index} 
                            multiline
                            type={field.type} onChange={e => handleChange(e.target.value, index)} 
                            id="outlined-multiline-static" rows={10} label={field.placeholder} variant="outlined" 
                            />:
                            <TextField
                            className={styles.input} key={index} 
                            type={field.type} onChange={e => handleChange(e.target.value, index)} 
                            id="outlined-basic" label={field.placeholder} variant="outlined" 
                            />
                        }
                        </FormControl>
                    ))
                }
            </form>

        </div>
        <button onClick={() => submit(formFields)} className={styles.button}>Enregistrer</button>
    
            </div>
        </div>
    )
}
export const PartnerEdit = ({close, submit}) => {
    const form = [
        
        {
            type: "checkbox",
            radioLabel: "Type d'partenaire *" ,
            // name: "productTypeSelect",
            // value: "",
            checkbox: [
                {
                    label: "Client",
                    name: "isCustomer",
                    value: false
                },
                {
                    label: "Fournisseur",
                    name: "isSupplier",
                    value: false
                },
                {
                    label: "Employe",
                    name: "isEmployee",
                    value: false
                },
                {
                    label: "Transporteur",
                    name: "isCarrier",
                    value: false
                }
            ]
        },
        {
            name: "name",
            radioLabel: "full name",
            value: "",
            type: "text",
            placeholder: "Entrez le nom d'client",
        }, 
        {
            name: "companyStr",
            radioLabel: "company name",
            value: "",
            placeholder: "Entrez le nom d'enterprise",
            type: "text"
        }, 
        {
            name: "mobilePhone",
            radioLabel: "phone number",
            placeholder: "Entrez votre numero d'telephone",
            value: "",
            type: "text"
        }, 
        {
            name: "ifu",
            radioLabel: "IFU",
            placeholder: "Entrez votre IFU",
            value: "",
            type: "text"
        }, 
        {
            name: "currency",
            radioLabel: "currency",
            value: "",
            type: "select",
            em: "sélectionner une devise",
        }, 
        {
            name: "language",
            radioLabel: "language",
            value: "",
            type: "select",
            em: "sélectionner une language",
        }, 
        {
            name: "emailAddress",
            radioLabel: "Email address",
            value: "",
            placeholder: "Entrez le email d'address",
            type: "text"
        }, 
        // {
        //     name: "firstName",
        //     label: "first name",
        //     value: "",
        //     type: "string"
        // }, 
        {
            name: "description",
            radioLabel: "description",
            type: "multiline",
            value: ""
        }, 
        // {
        //     name: "companySet",
        //     label: "company name",
        //     value: "",
        //     type: "multiline"
        // }, 
        // {
        //     name: "fullName",
        //     label: "full name",
        //     value: "",
        //     type: "string"
        // }, 
        // {
        //     name: "user",
        //     value: ""
        // }
    ]

    const [formFields, setFormFields] = useState(form)
    const cookie = window.localStorage.getItem("cookie")
    const [currencies, setCurrencies] = useState([])
    const [languages, setLanguages] = useState([])







    function get_currencies_and_language(){


        //fetch currencies
        axios.get("http://localhost:9000/api/currency", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let currency = res.data.data;
            setCurrencies(currency)
            console.log("currencies", currency);
        })
        .catch(err => {
            console.log(err, cookie);
        })


        //fetch languages
        axios.get("http://localhost:9000/api/language", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let language = res.data.data;
            setLanguages(language)
            console.log("language", language);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }
    
    

    function handleChange(value, index, childIndex) {

        let clonedFields = [...formFields];
        if (clonedFields[index].type == "checkbox") {
            clonedFields[index].checkbox[childIndex].value = value;
            
        }else{
            clonedFields[index].value = value;
        }
        setFormFields(clonedFields);
        console.log(formFields)

    }

    useEffect(() => {
        get_currencies_and_language()
    }, [])


return(
    <div className={styles.container}>
        <div>
            <div className={styles.first}>
                <p>Ajouter un nouvel Client </p>
                <Icon onClick={() => {document.body.style.overflowY = "scroll"; close(false)}} className={styles.icon}>highlight_off</Icon>
            </div>
            <div className={styles.formContainer}>
        <form className={styles.client}>
            {
                formFields.map((field, index) => (
                    field.type == "select"?
                    <FormControl className={styles.formControl} key={index} sx={{width: '100%' }} >
                    
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    <Select className={styles.select}
                    sx={{ 
                        color: "black",
                        // padding: '0.70em',
                        '.MuiSelect-icon': {
                            display: 'block',
                        },
                        '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                            padding: '0.70em !important',
                        }
                    }}
                    id="demo-simple-select"
                    value={field.value}
                    onChange={e => handleChange(e.target.value, index)}
                    >
                        <MenuItem ><em>{field.em}</em></MenuItem>
                    {
                        field.name == "currency"?
                        currencies?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        )):
                        languages?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        ))

                    }
                    </Select></FormControl>:

                    field.type == "radio"?
                    <FormControl key={index} className={styles.formControl}>
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    <RadioGroup
                        className={styles.RadioGroup}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={e => handleChange(e.target.value, index)}
                    >{
                        field.radio.map((radio, index) => (
                            <FormControlLabel key={index} value={radio.value} control={<Radio sx={{ color: "#1eb386"}} />} label={radio.label} />

                        ))
                    }
                    </RadioGroup>
                    </FormControl>:

                    field.type == "checkbox"?
                    
                    <FormControl key={index} className={styles.formControl}> 
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    <FormGroup 
                    className={styles.RadioGroup}>
                        {
                            field.checkbox.map((checkbox, childIndex) => (
                                <FormControlLabel key={childIndex} control={<Checkbox onChange={e => handleChange(e.target.checked, index, childIndex)} />} label={checkbox.label} />

                            ))
                        }
                    {/* <FormControlLabel required control={<Checkbox value={27} />} label="Required" />
                    <FormControlLabel disabled control={<Checkbox value={30} />} label="Disabled" /> */}
                    </FormGroup>
                    </FormControl>:

                    <FormControl key={index} className={styles.formControl}>
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    {
                        field.type == "multiline"?
                        <TextField
                        className={styles.input} key={index} 
                        multiline
                        type={field.type} onChange={e => handleChange(e.target.value, index)} 
                        id="outlined-multiline-static" rows={10} label={field.placeholder} variant="outlined" 
                        />:
                        <TextField
                        className={styles.input} key={index} 
                        type={field.type} onChange={e => handleChange(e.target.value, index)} 
                        id="outlined-basic" label={field.placeholder} variant="outlined" 
                        />
                    }
                    </FormControl>
                ))
            }
        </form>

    </div>
    <button onClick={() => submit(formFields)} className={styles.button}>Enregistrer</button>

        </div>
    </div>
)
}
export const EntryEdit = ({close, submit}) => {
    const form = [
        
        
        {
            name: "company",
            radioLabel: "company",
            value: "",
            type: "select",
            em: "sélectionner une enterprise",
        }, 
        {
            name: "journal",
            radioLabel: "journal",
            value: "",
            type: "select",
            em: "sélectionner une journal",
        },
        
        {
            name: "partner",
            radioLabel: "partner",
            value: "",
            type: "select",
            em: "sélectionner une tier",
        },
        {
            name: "period",
            radioLabel: "period",
            value: "",
            type: "select",
            em: "sélectionner une periode",
        },
        {
            name: "paymentMode",
            radioLabel: "payment mode",
            value: "",
            type: "select",
            em: "sélectionner une mode de paiment",
        },
        {
            name: "currency",
            radioLabel: "currency",
            value: "",
            type: "select",
            em: "sélectionner une devise",
        }
    ]

    const [formFields, setFormFields] = useState(form)
    const cookie = window.localStorage.getItem("cookie")
    const [company, setCompany] = useState([])
    const [journal, setJournal] = useState([])
    const [period, setPeriod] = useState([])
    const [paymentMode, setPaymentMode] = useState([])
    const [currency, setCurrency] = useState([])
    const [partner, setPartner] = useState([])
    const [languages, setLanguages] = useState([])
    







    function get_modelsData(){



        //fetch company
        axios.get("http://localhost:9000/api/company", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let company = res.data.data;
            setCompany(company)
            console.log("company", company);
        })
        .catch(err => {
            console.log(err, cookie);
        })

        //fetch partner
        axios.get("http://localhost:9000/api/partner", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let partner = res.data.data;
            setPartner(partner)
            console.log("partner", partner);
        })
        .catch(err => {
            console.log(err, cookie);
        })


        //fetch period
        axios.get("http://localhost:9000/api/period", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let period = res.data.data;
            setPeriod(period)
            console.log("period", period);
        })
        .catch(err => {
            console.log(err, cookie);
        })


        //fetch journal
        axios.get("http://localhost:9000/api/journal", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let journal = res.data.data;
            setJournal(journal)
            console.log("journal", journal);
        })
        .catch(err => {
            console.log(err, cookie);
        })


        //fetch payment mode
        axios.get("http://localhost:9000/api/paymentmode", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let paymentmode = res.data.data;
            setPaymentMode(paymentmode)
            console.log("payment mode", paymentmode);
        })
        .catch(err => {
            console.log(err, cookie);
        })


        //fetch currency
        axios.get("http://localhost:9000/api/currency", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let currency = res.data.data;
            setCurrency(currency)
            console.log("currency", currency);
        })
        .catch(err => {
            console.log(err, cookie);
        })


        //fetch languages
        axios.get("http://localhost:9000/api/language", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let language = res.data.data;
            setLanguages(language)
            console.log("language", language);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }
    
    

    function handleChange(value, index, childIndex) {

        let clonedFields = [...formFields];
        if (clonedFields[index].type == "checkbox") {
            clonedFields[index].checkbox[childIndex].value = value;
            
        }else{
            clonedFields[index].value = value;
        }
        setFormFields(clonedFields);
        console.log(formFields)

    }

    useEffect(() => {
        get_modelsData()
    }, [])


return(
    <div className={styles.container}>
        <div>
            <div className={styles.first}>
                <p>Ajouter un nouvel ecriture </p>
                <Icon onClick={() => {document.body.style.overflowY = "scroll"; close(false)}} className={styles.icon}>highlight_off</Icon>
            </div>
            <div className={styles.formContainer}>
        <form className={styles.client}>
            
            {
                formFields.map((field, index) => (
                    field.type == "select"?
                    <FormControl className={styles.formControl} key={index} sx={{width: '100%' }} >
                    
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    <Select className={styles.select}
                    sx={{ 
                        color: "black",
                        // padding: '0.70em',
                        '.MuiSelect-icon': {
                            display: 'block',
                        },
                        '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                            padding: '0.70em !important',
                        }
                    }}
                    id="demo-simple-select"
                    value={field.value}
                    onChange={e => handleChange(e.target.value, index)}
                    >
                        <MenuItem ><em>{field.em}</em></MenuItem>
                    {
                        field.name == "company"?
                        company?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        )):
                        field.name == "journal"?
                        journal?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        )):
                        field.name == "partner"?
                        partner?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        )):
                        field.name == "paymentMode"?
                        paymentMode?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        )):
                        field.name == "period"?
                        period?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        )):
                        currency?.map((currency, index) => (

                        <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                        ))

                    }
                    </Select></FormControl>:

                    field.type == "radio"?
                    <FormControl key={index} className={styles.formControl}>
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    <RadioGroup
                        className={styles.RadioGroup}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={e => handleChange(e.target.value, index)}
                    >{
                        field.radio.map((radio, index) => (
                            <FormControlLabel key={index} value={radio.value} control={<Radio sx={{ color: "#1eb386"}} />} label={radio.label} />

                        ))
                    }
                    </RadioGroup>
                    </FormControl>:

                    field.type == "checkbox"?
                    
                    <FormControl key={index} className={styles.formControl}> 
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    <FormGroup 
                    className={styles.RadioGroup}>
                        {
                            field.checkbox.map((checkbox, childIndex) => (
                                <FormControlLabel key={childIndex} control={<Checkbox onChange={e => handleChange(e.target.checked, index, childIndex)} />} label={checkbox.label} />

                            ))
                        }
                    {/* <FormControlLabel required control={<Checkbox value={27} />} label="Required" />
                    <FormControlLabel disabled control={<Checkbox value={30} />} label="Disabled" /> */}
                    </FormGroup>
                    </FormControl>:

                    <FormControl key={index} className={styles.formControl}>
                    <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                    {
                        field.type == "multiline"?
                        <TextField
                        className={styles.input} key={index} 
                        multiline
                        type={field.type} onChange={e => handleChange(e.target.value, index)} 
                        id="outlined-multiline-static" rows={10} label={field.placeholder} variant="outlined" 
                        />:
                        <TextField
                        className={styles.input} key={index} 
                        type={field.type} onChange={e => handleChange(e.target.value, index)} 
                        id="outlined-basic" label={field.placeholder} variant="outlined" 
                        />
                    }
                    </FormControl>
                ))
            }
        </form>

    </div>
    <button onClick={() => submit(formFields)} className={styles.button}>Enregistrer</button>

        </div>
    </div>
)
}

ClientEdit.propTypes ={
    close: PropTypes.func
}
ProductEdit.propTypes ={
    close: PropTypes.func,
    submit: PropTypes.func
}
CompanyEdit.propTypes ={
    close: PropTypes.func,
    submit: PropTypes.func
}

PartnerEdit.propTypes ={
    close: PropTypes.func,
    submit: PropTypes.func
}
EntryEdit.propTypes ={
    close: PropTypes.func,
    submit: PropTypes.func
}