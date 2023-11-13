import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.scss';

export const EditStockLocationModal = ({ editStock, close, submit }) => {
    const [formFields, setFormFields] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stockLocations, setStockLocations] = useState([]);
    const [addressData, setAddressData] = useState([]);
    const [formData, setFormData] = useState({
        name: undefined,
        parentStockLocation:  editStock != undefined ? '' : undefined,
        typeSelect: editStock != undefined ? '' : undefined,
        address: undefined,
        addressL6: undefined,
        company: editStock != undefined ? '' : undefined,
    });
    const host = "http://localhost:9000/api";
    const cookie = window.localStorage.getItem("cookie");
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
            radioLabel: "Type de stock",
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
        editStock != undefined ? getEditData() : ''
    }, []);

    useEffect(() => {
        getCompanies();
        getStockLocations()
    }, []);

    useEffect(() => {
        setFormFields(form);
    }, [companies, stockLocations, formData]);


  

    async function getEditData()  {
        console.log("***Stock on edit ***", editStock)
        if (editStock?.address?.id) {
        let addressData;
            await axios.get(`${host}/model/data/com.axelor.apps.base.db.Address/${editStock.address.id}`, {
                headers: {
                    cookiee: cookie.toString(),
                }
            })
                .then(res => {
                    addressData = res.data.data[0];
                    setAddressData(addressData)
                    console.log("***Edit AddressData******", addressData);
                })
                .catch(err => {
                    console.log("??????? ERREUR ?????", err);
                })
                
            }
            setEditData(addressData)
            
    }

    function setEditData(addressData) {
        console.log("************ Stock on setData  ******,", addressData)
        let clonedData = formData;
        clonedData.name = editStock?.name;
        clonedData.company = editStock?.company?.id;
        clonedData.typeSelect = editStock?.typeSelect;
        clonedData.parentStockLocation = editStock?.mobilePhone;
        clonedData.address = addressData?.addressL4;
        clonedData.addressL6 = addressData?.addressL6;
        setFormData(clonedData);
        console.log("************ EditFormsFildsValue ******,", clonedData)
    }

    // function handleChange(value, index) {

    //     let clonedFields = [...formFields];
    //     clonedFields[index].value = value;
    //     setFormFields(clonedFields);
    //     console.log(formFields)
    // }

    function handleChange(value, name) {
        let clonedData =formData;
        clonedData[name] = value;
        setFormData(clonedData);
        setFormFields(form);
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

    function handleSubmit(event) {
        event.preventDefault();
        submit(formData);
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
                                            value={formData[field.name]}
                                            required={field.required}
                                            onChange={e => handleChange(e.target.value, field.name)}
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
                                                    value={formData[field.name]}
                                                    type={field.type} 
                                                    onChange={e => handleChange(e.target.value, field.name)}
                                                    id="outlined-basic"
                                                    label={editStock == undefined ? field.placeholder : ''}
                                                    variant="outlined"
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
    editStock: PropTypes.object,
    isEdit: PropTypes.bool,
    close: PropTypes.func,
    submit: PropTypes.func
}