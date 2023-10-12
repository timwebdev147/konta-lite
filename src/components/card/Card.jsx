import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';


const Card = ({fullname, partnerCategory, email, picture, fiscalPosition, mobilePhone, companyStr}) => {





const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        minHeight: '200px',
        fontSize: '15px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        color: theme.palette.text.secondary,
      }));


return(
        <Grid item xs={4}>
        <Item>
                <strong>{fullname? fullname: "T0001 - APOLLO"}</strong>
                <img src='' alt='hello' />
                <p>{mobilePhone? mobilePhone: "+229 23 41 56 78"}</p>
                <p>{email? email: "info@apollo.fr"}</p>
                <p>{partnerCategory? partnerCategory: "PME"}</p>
                <p><strong>Sociétés </strong>: {companyStr? companyStr: "KTA"}</p>
                <p><strong>Position fiscale </strong>:{fiscalPosition? fiscalPosition: ""} </p>

        </Item>
        </Grid>
        )
}

Card.propTypes = {
        fullname: PropTypes.string,
        partnerCategory: PropTypes.string, 
        email: PropTypes.string, 
        picture: PropTypes.string, 
        fiscalPosition: PropTypes.string,
        mobilePhone: PropTypes.string,
        companyStr: PropTypes.string

};


export default Card;