import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const EditEmployeeModal = ({ close, submit }) => {
    const [formFields, setFormFields] = useState([])
    const [currencies, setCurencies] = useState([])
    const [companies, setCompanies] = useState([])
    const [departments, setDepartments] = useState([])
    const [languages, setLanguages] = useState([])
    const cookie = window.localStorage.getItem("cookie")
    const host = "http://localhost:9000/api";
    let form = [
        {
            sectionName: "Informations sur l'employée ",
            subSections: [
                {
                    type: "radio",
                    radioLabel: "Sexe *",
                    value: undefined,
                    name: "sex",
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
                    radioLabel: "Nom *",
                    required: "true",
                    name: "name",
                    value: undefined,
                    placeholder: "Entrez le nom"

                },
                {
                    type: "text",
                    radioLabel: "Prénom *",
                    required: "true",
                    name: "firstName",
                    value: undefined,
                    placeholder: "Entrez le prénom"

                },
                {
                    type: "text",
                    radioLabel: "Télephone",
                    name: "mobilePhone",
                    value: undefined,
                    placeholder: "Entrez le prénom"

                },
                {
                    type: "text",
                    radioLabel: "Address ",
                    name: "address",
                    value: undefined,
                    placeholder: "Entrez l'addresse"

                },
                {
                    type: "multiline",
                    name: "description",
                    value: undefined,
                    radioLabel: "Description (optionnel)",
                    placeholder: "Entrez une description"

                },
                {
                    type: "select",
                    radioLabel: "Langue",
                    name: "language",
                    value: undefined,
                    options: languages
                },
                {
                    type: "select",
                    radioLabel: "Devise",
                    name: "curency",
                    value: undefined,
                    options: currencies
                },
            ]
        },
        {
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
    ];

    useEffect(() => {
        setFormFields(form);
    }, []);

    useEffect(() => {
        setFormFields(form);
    }, [currencies, languages, companies, departments]);

    useEffect(() => {
        getCurencies();
        getLanguages();
        getCompanies();
        getDepartments();
    }, []);



    function handleChange(value, sectionIndex, index) {

        let clonedFields = [...formFields];
        clonedFields[sectionIndex].subSections[index].value = value;
        setFormFields(clonedFields);
    }

    function handleSubmit(event) {
        event.preventDefault();
        submit(formFields);
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

    function getLanguages() {
        axios.get(`${host}/model/data/com.axelor.apps.base.db.Language`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let languagess = res.data.data;
                setLanguages(languagess)
                console.log("*********", languagess);
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
                                                            value={field.value}
                                                            onChange={e => handleChange(e.target.value, sectionIndex, index,)}
                                                        >
                                                            {
                                                                field.options.map((option, index) => (
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
                                                                defaultValue=""
                                                                name="radio-buttons-group"
                                                                required={field.required}
                                                                onChange={e => handleChange(e.target.value, sectionIndex, index)}
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
                                                                        required={field.required}
                                                                        type={field.type} onChange={e => handleChange(e.target.value, index)}
                                                                        id="outlined-multiline-static" rows={10} label={field.placeholder} variant="outlined"
                                                                    /> :
                                                                    <TextField
                                                                        className={styles.input} key={index}
                                                                        required={field.required}
                                                                        type={field.type} onChange={e => handleChange(e.target.value, sectionIndex, index)}
                                                                        id="outlined-basic" label={field.placeholder} variant="outlined"
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
    close: PropTypes.func,
    submit: PropTypes.func
}