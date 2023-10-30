import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from './index.module.scss'
import { useState } from "react";
import axios from "axios";


export function SearchListBox({data, select, isSelected}){

        


    return (
        <Box className={styles.container} >
            {
                data?.map((item, index) => (
                    
                    <span onClick={() => {select(item);}} key={index}>
                    <p >{item.simpleFullName || item.fullName || item.productName}</p>
                    <div></div>
                    </span>
                ))
            }
        </Box>
    )
}

SearchListBox.propTypes = {
data: PropTypes.array,
select: PropTypes.func,
isSelected: PropTypes.func
}