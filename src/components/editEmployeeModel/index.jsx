import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const EditEmployeeModal = ({ editEmployee, isEdit, close, submit }) => {
    const cookie = window.localStorage.getItem("cookie")
    const host = "http://localhost:9000/api";
    const [currencies, setCurencies] = useState([])
    const [companies, setCompanies] = useState([])
    const [departments, setDepartments] = useState([])
    const [partners, setPartners] = useState([])
    const [editPartner, setEditPartner] = useState([])
    const [editContract, setEditContract] = useState([])
    const [isContract, setIsContract] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({
        sexSelect: editEmployee != undefined ? '' : undefined,
        weeklyWorkHours: undefined,
        isContract: false,
        mobileProPhone: undefined,
        contactPartner: editEmployee != undefined ? '' : undefined,
        companySet: editEmployee != undefined ? '' : undefined,
        companyDepartment: editEmployee != undefined ? '' : undefined,
        employment: undefined,
        monthlyGlobalCost: undefined,
        duration: undefined,
        startDate: undefined,
    });


    const form = [
        {
            sectionName: "Informations sur l'employée ",
            subSections: [
                {
                    type: "select",
                    radioLabel: "Partenaire",
                    required: "true",
                    name: "contactPartner",
                    value: undefined,
                    options: partners,
                    placeholder: ""

                },
                {
                    type: "radio",
                    radioLabel: "Sexe *",
                    value: undefined,
                    name: "sexSelect",
                    radio: [
                        {
                            label: "Homme",
                            value: "M"
                        },
                        {
                            label: "Femme",
                            value: "F"
                        }
                    ]
                }, 
                {
                    type: "text",
                    radioLabel: "Téléphone pro",
                    required: "false",
                    name: "mobileProPhone",
                    value: undefined,
                    placeholder: "Entrez le téléphone professionnel"

                },
                {
                    type: "number",
                    radioLabel: "Travail  par semaine (h)",
                    name: "weeklyWorkHours",
                    value: undefined,
                    placeholder: "Nombre d'heure de travail par semaine"

                },
                {
                    type: "radio",
                    radioLabel: "Inclure un contrat de travail ? ",
                    name: "isContract",
                    value: undefined,
                    placeholder: "Entrez l'addresse",
                    radio: [{label: "NON", value: false}, {label: "OUI", value: true}]
                },
            ]
        },
        // formData.isContract ? 
        {
            condition: "isContract",
            sectionName: "Contrat de travail ",
            subSections: [
                {
                    type: "select",
                    radioLabel: "Entrepise *",
                    name: "companySet",
                    required: "true",
                    value: undefined,
                    placeholder: "Choisissez l'entreprise",
                    options: companies
                },
                {
                    type: "select",
                    radioLabel: "Département de service",
                    name: "companyDepartment",
                    value: undefined,
                    placeholder: "Le département",
                    options: departments
                },
                {
                    type: "text",
                    radioLabel: "Poste",
                    name: "employment",
                    value: undefined,
                    placeholder: "Intitulé du poste",
                },
                {
                    type: "text",
                    radioLabel: "Salaire mensuel global",
                    name: "monthlyGlobalCost",
                    value: undefined,
                    placeholder: "Indiquer le salaire mensuel global",
                },
                {
                    type: "text",
                    radioLabel: "Durée du contrat",
                    name: "duration",
                    value: undefined,
                    placeholder: "Durée du contrat",
                },
                {
                    type: "date",
                    radioLabel: "Date de début",
                    name: "startDate",
                    value: undefined,
                    placeholder: "Date de début",
                },
            ]
        } 
    ]

    async function getEditData()  {
        if (editEmployee?.id) {
        let partner;
        let contract;
            await axios.get(`${host}/partner/${editEmployee.contactPartner.id}`, {
                headers: {
                    cookiee: cookie.toString(),
                }
            })
                .then(res => {
                    partner = res.data.data[0];
                    setEditPartner(partner)
                })
                .catch(err => {
                    console.log("??????? ERREUR ?????", err);
                })
                editEmployee.mainEmploymentContract ?
            await axios.get(`${host}/employmentcontract/${editEmployee.mainEmploymentContract.id}`, {
                headers: {
                    cookiee: cookie.toString(),
                }
            })
                .then(res => {
                    contract = res.data.data[0];
                    setEditContract(contract)
                })
                .catch(err => {
                    console.log("??????? ERREUR ?????", err);
                }) : null

                setEditData(partner, contract)
               
        }
    }

    useEffect(() => {
        setFormFields(form);
    }, []);

    useEffect(() => {
        editEmployee != undefined ? getEditData() : ''
    }, []);


    useEffect(() => {
        getCurencies();
        getPartners();
        getCompanies();
        getDepartments();
    }, []);

    useEffect(() => {
        setFormFields(form);
    }, [currencies, partners, companies, departments, editPartner, editContract, formData]);

    function setEditData(partner, contract) {
        let clonedData = formData;
        clonedData.sexSelect = editEmployee.sexSelect;
        clonedData.name = partner?.name;
        clonedData.firstName = partner?.firstName;
        clonedData.mobilePhone = partner?.mobilePhone;
        clonedData.address = partner?.address;
        clonedData.description = partner?.description;
        clonedData.language = partner?.language?.id;
        clonedData.curency = partner?.curency?.id;
        clonedData.companySet = contract?.payCompany?.id;
        clonedData.companyDepartment = contract?.companyDepartment?.id;
        clonedData.employment = contract?.employment;
        clonedData.monthlyGlobalCost = contract?.monthlyGlobalCost;
        clonedData.duration = contract?.duration;
        clonedData.startDate = contract?.startDate;
        setFormData(clonedData);
        console.log("************ EditFormsFildsValue ******,", clonedData)
    }


    function handleChange(value, name) {
        let clonedData =formData;
        clonedData[name] = value;
        setFormData(clonedData);
        setFormFields(form);
        console.log(clonedData);
        console.log(isContract);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // submit(formFields);
        submit(formData);
    }


    function getCurencies() {
        axios.get(`${host}/currency`, {
            headers: {
                cookiee: cookie.toString(),
                // pagination: pageNumber
            }
        })
            .then(res => {
                let curenciess = res.data.data;
                setCurencies(curenciess)
                console.log("*********", curenciess);
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }

    function getCompanies() {
        axios.get(`${host}/model/data/com.axelor.apps.base.db.Company`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let companiess = res.data.data;
                setCompanies(companiess)
                console.log("*********", companiess);
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }

    function getDepartments() {
        axios.get(`${host}/model/data/com.axelor.apps.base.db.CompanyDepartment`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let departmentss = res.data.data;
                setDepartments(departmentss)
                console.log("*********", departmentss);
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }

    function getPartners() {
        axios.get(`${host}/partners`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let data = res.data.data;
                setPartners(data)
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }



    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.first}>
                    <p>Ajouter un nouvel Employee </p>
                    <Icon onClick={() => { document.body.style.overflowY = "scroll"; close(false) }} className={styles.icon}>highlight_off</Icon>
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.client}>
                        <FormGroup>
                            {
                                formFields.map((section, sectionIndex) => (
                                    section.condition == "isContract" && isContract != "true"? null:
                                    <div key={sectionIndex} className={styles.client}>
                                        <label htmlFor="">{section.sectionName}</label>
                                        {
                                            section.subSections.map((field, index) => (
                                                field.type == "select" ?
                                                    <FormControl className={styles.formControl} key={index} sx={{ width: '100%' }} >
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
                                                            required={field.required}
                                                            disabled={isEdit}
                                                            value={formData[field.name]}
                                                            // onChange={e => handleChange(e.target.value, sectionIndex, index,)}
                                                            onChange={e => handleChange(e.target.value, field.name)}
                                                        >
                                                            {
                                                                partners.map((option, index) => (
                                                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                                                ))
                                                            }
                                                        </Select></FormControl> :

                                                    field.type == "radio" ?
                                                        <FormControl key={index} className={styles.formControl}>
                                                            <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                                                            <RadioGroup
                                                                className={styles.RadioGroup}
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                value={formData[field.name]}
                                                                name="radio-buttons-group"
                                                                disabled={isEdit}
                                                                required={field.required}
                                                                // onChange={e => handleChange(e.target.value, sectionIndex, index)}
                                                                
                                                                onChange={e => { handleChange(e.target.value, field.name); field.name == "isContract"? setIsContract(e.target.value): null}}
                                                            >{
                                                                    field.radio.map((radio, index) => (
                                                                        <FormControlLabel key={index} value={radio.value} control={<Radio sx={{ color: "#1eb386" }} />} label={radio.label} />

                                                                    ))
                                                                }
                                                            </RadioGroup>
                                                        </FormControl> :

                                                        <FormControl key={index} className={styles.formControl}>
                                                            <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                                                            {
                                                                field.type == "multiline" ?
                                                                    <TextField
                                                                        className={styles.input} key={index}
                                                                        multiline
                                                                        value={formData[field.name]}
                                                                        id="outlined-multiline-static" rows={10} 
                                                                         label={isEdit == undefined ? field.placeholder : ''} 
                                                                        variant="outlined"
                                                                        disabled={isEdit}
                                                                        required={field.required}
                                                                        type={field.type} 
                                                                        // onChange={e => handleChange(e.target.value, index)}
                                                                        onChange={e => handleChange(e.target.value, field.name)}
                                                                    /> :
                                                                    <TextField
                                                                        className={styles.input} key={index}
                                                                        id="outlined-basic" 
                                                                        label={isEdit == undefined ? field.placeholder : ''} variant="outlined"
                                                                        disabled={isEdit}
                                                                        value={formData[field.name]}
                                                                        required={field.required}
                                                                        type={field.type} 
                                                                        // onChange={e => handleChange(e.target.value, sectionIndex, index)}
                                                                        onChange={e => handleChange(e.target.value, field.name)}
                                                                    />
                                                            }
                                                        </FormControl>
                                            ))
                                        }

                                    </div>
                                ))
                            }
                        </FormGroup>
                    </div>

                </div>

                <button type="submit" className={styles.button}>Enregistrer</button>

            </form>
        </div>
    )
}

EditEmployeeModal.propTypes = {
    close: PropTypes.func
}
EditEmployeeModal.propTypes = {
    editEmployee: PropTypes.object,
    isEdit: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func
}