import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./style.module.scss"
import axios from "axios";





const EditModal = ({open, handleClose, partner}) => {
    let cookie = window.localStorage.getItem("cookie")
    const fields = [
        {
            name: "name",
            label: "name",
            value: "",
            type: "string",
        }, 
        {
            name: "companyStr",
            label: "company name",
            value: "",
            type: "string"
        }, 
        {
            name: "mobilePhone",
            label: "phone number",
            value: "",
            type: "string"
        }, 
        {
            name: "currency",
            label: "currency",
            value: "",
            type: "select",
            menu: [
                {
                    value: "usd",
                    label: "dollar"
                },
                {
                    value: "xof",
                    label: "Cefas"
                },
                {
                    value: "ngn",
                    label: "naira"
                },
                {
                    value: "eur",
                    label: "euros"
                },
                {
                    value: "gbp",
                    label: "british pounds"
                },
            ]
        }, 
        {
            name: "language",
            label: "language",
            value: "",
            type: "select",
            menu: [
                {
                    value: "en",
                    label: "english"
                },
                {
                    value: "fr",
                    label: "france"
                },
            ]
        }, 
        {
            name: "emailAddress",
            label: "Email address",
            value: "",
            type: "email"
        }, 
        {
            name: "firstName",
            label: "first name",
            value: "",
            type: "string"
        }, 
        {
            name: "description",
            label: "description",
            value: ""
        }, 
        {
            name: "companySet",
            label: "company name",
            value: "",
            type: "multiline"
        }, 
        {
            name: "fullName",
            label: "full name",
            value: "",
            type: "string"
        }, 
        // {
        //     name: "user",
        //     value: ""
        // }
    ]

    const [formFields, setFormFields] = useState(fields)

    function handleChange (value, index){
        let formData = [...formFields]
        formData[index].value = value;
        setFormFields(formData)
        console.log(formFields);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };


      function submit (){
        let reqObj = {}
        formFields.forEach(field => {
            let key = field.name
            reqObj[key] = field.value
        })
        axios.post(`http://localhost:9000/api/partner/${partner}/create`, reqObj,{
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        console.log(reqObj);
      }


return (
    <Modal
        open={open}
        onClose={handleClose}
    aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a {partner}
            </Typography>
            <form className={styles.form} action="">
                {
                    formFields.map((field, index) => (
                        field.type == "select"?
                        <FormControl key={index} sx={{width: '47%' }} >
                        
                        <InputLabel sx={{overflow: "visible"}} id="demo-simple-select-label">{field.label}</InputLabel>
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
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={field.value}
                        label={field.label}
                        onChange={e => handleChange(e.target.value, index)}
                        >{
                            field.menu.map((option, index) => (
                                <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                        </Select></FormControl>:
                        <TextField
                        className={styles.input} key={index} 
                        type={field.type} onChange={e => handleChange(e.target.value, index)} 
                        id="outlined-basic" label={field.label} variant="outlined" 
                        />
                    ))
                }
                <Button onClick={() => submit()} variant="contained" disableElevation className={styles.button} >Create</Button>
                {/* <button className={styles.button} type={'sumit'}>create</button> */}
            </form>
        </Box>
    </Modal>
)
}

EditModal.propTypes = {
    open: PropTypes.string,
    partner: PropTypes.string,
    handleClose: PropTypes.func
}


export default EditModal;