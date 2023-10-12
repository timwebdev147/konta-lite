import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

export const InvoiceClientEdit = ({close}) => {
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

export const InvoiceProductEdit = ({close, submit}) => {
    const form = [
        {
            type: "radio",
            radioLabel: "Type de client *" ,
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

InvoiceClientEdit.propTypes ={
    close: PropTypes.func
}
InvoiceProductEdit.propTypes ={
    close: PropTypes.func,
    submit: PropTypes.func
}