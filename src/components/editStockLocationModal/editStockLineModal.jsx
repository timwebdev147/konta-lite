import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../invoiceEdit/index.module.scss';

export const EditStockLineModal = ({ currentStock, close, submit }) => {
    const [formFields, setFormFields] = useState([]);
    const [products, setProducts] = useState([]);
    const [units, setUnits] = useState([]);
    const host = "http://localhost:9000/api";
    const form = [
        {
            type: "select",
            radioLabel: "Produit *",
            name: "product",
            value: undefined,
            placeholder: "Choisissez le produit",
            options: products
        },
        {
            type: "select",
            radioLabel: "Unité *",
            name: "unit",
            value: undefined,
            placeholder: "Choisissez l'unité",
            options: units
        },
        {
            type: "text",
            radioLabel: "Quantité courante",
            name: "currentQty",
            value: undefined,
            placeholder: "Entrez la quantité courante du produit"

        },
        {
            type: "text",
            radioLabel: "Quantité future",
            name: "futureQty",
            value: undefined,
            placeholder: "Entrez la quantité total prévu pour le produit"

        },
    ]


    useEffect(() => {
        setFormFields(form);
    }, []);

    useEffect(() => {
        getProducts();
        getUnits()
    }, []);

    useEffect(() => {
        setFormFields(form);
    }, [products, units]);


    const cookie = window.localStorage.getItem("cookie");

    function getProducts() {
        axios.get(`${host}/product`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let data = res.data.data;
                setProducts(data)
                console.log("****PRODUCTS*****", data);
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }

    function getUnits() {
        axios.get(`${host}/unit`, {
            headers: {
                cookiee: cookie.toString(),
            }
        })
            .then(res => {
                let data = res.data.data;
                setUnits(data)
                console.log("*********", data);
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
            type: "text",
            radioLabel: "Stock courante",
            name: "stockLocation",
            value: currentStock,
            placeholder: "Stock ocurante"
        },);
        submit(clonedFields);
    }


    return (
        <div className={styles.container}>
            <div>
                <div className={styles.first}>
                    <p>Ajouter d’une ligne de stock </p>
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

EditStockLineModal.propTypes = {
    currentStock: PropTypes.number,
    close: PropTypes.func,
    submit: PropTypes.func
}