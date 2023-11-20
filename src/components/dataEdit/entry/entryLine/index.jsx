import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../invoiceEdit/index.module.scss';

export const EditEntryLineModal = ({ currentEntry, close, submit }) => {
    const [formFields, setFormFields] = useState([]);
    const [partner, setPartner] = useState([]);
    const [account, setAccount] = useState([]);
    const host = "http://localhost:9000/api";
    const form = [
        {
            type: "select",
            radioLabel: "Tier *",
            name: "partner",
            value: undefined,
            placeholder: "Choisissez votre tier",
            options: partner
        },
        {
            type: "select",
            radioLabel: "Compte *",
            name: "account",
            value: undefined,
            placeholder: "Compte comptable",
            options: account
        },
        {
            type: "text",
            radioLabel: "Credit",
            name: "credit",
            value: undefined,
            placeholder: "credit"

        },
        {
            type: "text",
            radioLabel: "debit",
            name: "debit",
            value: undefined,
            placeholder: "debit"

        },
        {
            type: "text",
            radioLabel: "origine",
            name: "origin",
            value: undefined,
            placeholder: "origine"

        },
        {
            type: "text",
            radioLabel: "description",
            name: "description",
            value: undefined,
            placeholder: "Description"

        },
    ]


    useEffect(() => {
        setFormFields(form);
    }, []);

    useEffect(() => {
        getmodelsData();
    }, []);

    useEffect(() => {
        setFormFields(form);
    }, [partner, account]);


    const cookie = window.localStorage.getItem("cookie");

    function getmodelsData() {
        axios.get(`${host}/model/data/com.axelor.apps.account.db.Account`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let data = res.data.data;
                setAccount(data)
                console.log("****ACCOUNT*****", data);
            })
            .catch(err => {
                console.log(err, cookie);
            })

        axios.get(`${host}/partner`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let data = res.data.data;
                setPartner(data)
                console.log("****PARTNER*****", data);
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

    function handleSubmit() {
        let clonedFields = [...formFields];
        clonedFields.push({
            name: "move",
            value: currentEntry,
        },);
        submit(clonedFields);
    }


    return (
        <div className={styles.container}>
            <div>
                <div className={styles.first}>
                    <p>Ajouter d’une ligne de ecriture </p>
                    <Icon onClick={() => { document.body.style.overflowY = "scroll"; close(false) }} className={styles.icon}>highlight_off</Icon>
                </div>
                <div className={styles.formContainer}>
                    <form className={styles.client}>
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
                                            onChange={e => handleChange(e.target.value, index)}
                                        >
                                            {
                                                field.options.map((option, index) => (
                                                    <MenuItem key={index} value={option.id}>{option.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl> :

                                    <FormControl key={index} className={styles.formControl}>
                                        <FormLabel className={styles.formLabel}>{field.radioLabel}</FormLabel>
                                        {
                                            field.type == "text" ?
                                                <TextField
                                                    className={styles.input} key={index}
                                                    type={field.type} onChange={e => handleChange(e.target.value, index)}
                                                    id="outlined-basic" label={field.placeholder} variant="outlined"
                                                />
                                                : <></>
                                        }
                                    </FormControl>
                            ))
                        }
                    </form>
                </div>
                <button onClick={handleSubmit} className={styles.button}>Enregistrer</button>
            </div>
        </div>
    )
}

EditEntryLineModal.propTypes = {
    currentEntry: PropTypes.number,
    close: PropTypes.func,
    submit: PropTypes.func
}