import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.scss';

export const EditStockLocationModal = ({ close, submit }) => {
    const [formFields, setFormFields] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stockLocations, setStockLocations] = useState([]);
    const host = "http://localhost:9000/api";
    const form = [
        {
            type: "select",
            radioLabel: "Entrepise *",
            name: "company",
            value: undefined,
            required: true,
            placeholder: "Choisissez l'entreprise",
            options: companies
        },
        {
            type: "text",
            radioLabel: "Nom *",
            name: "name",
            required: true,
            value: undefined,
            placeholder: "Entrez le nom de l'entrepôt"

        },
        {
            type: "select",
            radioLabel: "Entrepôt parent",
            name: "parentStockLocation",
            value: undefined,
            placeholder: "Entrepôt parent",
            options: stockLocations

        },
        {
            type: "select",
            radioLabel: "Type de client",
            name: "typeSelect",
            value: undefined,
            options: [
                {
                    "id": "1",
                    "name": "Interne"
                },
                {
                    "id": "2",
                    "name": "Externe"
                },
                {
                    "id": "3",
                    "name": "Virtuel"
                }
            ]
        },
        {
            type: "text",
            name: "address",
            value: undefined,
            required: true,
            radioLabel: "Addresse de l'emplacement *",
            placeholder: "Entrez d'addresse de ce entrepôt "

        },
        {
            type: "text",
            name: "addressL6",
            value: undefined,
            radioLabel: "Complément d'addresse (optionnel)",
            placeholder: "Entrez un complémnet d'addresse"

        },
    ]


    useEffect(() => {
        setFormFields(form);
    }, []);

    useEffect(() => {
        setFormFields(form);
    }, [companies, stockLocations]);

    useEffect(() => {
        getCompanies();
        getStockLocations()
    }, []);

    const cookie = window.localStorage.getItem("cookie");

    function handleChange(value, index) {

        let clonedFields = [...formFields];
        clonedFields[index].value = value;
        setFormFields(clonedFields);
        console.log(formFields)
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

    function getStockLocations() {
        axios.get(`${host}/stock`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let stockLocationss = res.data.data;
                setStockLocations(stockLocationss)
                console.log("*********", stockLocationss);
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }

    function handleSubmit(event){
        event.preventDefault();
        submit(formFields);
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.first}>
                    <p>Ajouter d’un emplacement de stock </p>
                    <Icon onClick={() => { document.body.style.overflowY = "scroll"; close(false) }} className={styles.icon}>highlight_off</Icon>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.client}>
                        {
                            formFields.map((field, index) => (
                                field.type == "select" ?
                                    <FormControl className={styles.formControl} key={index} sx={{ width: '100%' }} >

                                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                                        <Select className={styles.select}
                                            sx={{
                                                color: "black",
                                                '.MuiSelect-icon': {
                                                    display: 'block',
                                                },
                                                '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                                                    padding: '0.70em !important',
                                                }
                                            }}
                                            id="demo-simple-select"
                                            value={field.value}
                                            required={field.required}
                                            onChange={e => handleChange(e.target.value, index)}
                                        >
                                            {
                                                field.options.map((option, index) => (
                                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                                ))
                                            }
                                        </Select></FormControl> :
                                    <FormControl key={index} className={styles.formControl}>
                                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                                        {
                                            field.type == "text" ?
                                                <TextField
                                                    required={field.required}
                                                    className={styles.input} key={index}
                                                    type={field.type} onChange={e => handleChange(e.target.value, index)}
                                                    id="outlined-basic" label={field.placeholder} variant="outlined"
                                                /> : <></>
                                        }
                                    </FormControl>
                            ))
                        }
                    </div>
                    <button type='submit' className={styles.button} >Enregistrer</button>
                </form>


            </div>
        </div>
    )
}

EditStockLocationModal.propTypes = {
    close: PropTypes.func,
    submit: PropTypes.func
}