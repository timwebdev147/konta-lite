import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';


const EmployeeCard = ({ fullname, department, poste, picture, mobilePhone, companyStr }) => {





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


    return (
        <Grid item xs={4}>
            <Item>
                <img src='' alt='hello' />
                <strong>{fullname ? fullname : "--"}</strong>
                <p>{mobilePhone ? mobilePhone : "--"}</p>
                <p><strong>Société </strong>: {companyStr ? companyStr : "--"}</p>
                <p><strong>Département </strong>:{department ? department : "--"} </p>
                <p><strong>Poste </strong>:{poste ? poste : "--"} </p>
            </Item>
        </Grid>
    )
}

EmployeeCard.propTypes = {
    fullname: PropTypes.string,
    picture: PropTypes.string,
    mobilePhone: PropTypes.string,
    companyStr: PropTypes.string,
    department: PropTypes.string,
    poste: PropTypes.string,
};


export default EmployeeCard;