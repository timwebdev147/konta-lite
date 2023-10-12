import MDBox from 'components/MDBox';
import style from './controlNav.module.scss';
import { Button, Icon } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { FormatListBulleted, NavigateBefore, NavigateNext, TextSnippet, WindowSharp } from '@mui/icons-material';
import PropTypes from 'prop-types';


const ControlNav = ({totalItems, toggle}) => {


    

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    black: "#000000"
  },
});

function refreshPage(){
  window.location.reload(false)
}





    return (
        <>
        <MDBox className={style.nav} >
            <div  >
            <Button color='black'  variant="text">
                <Icon className={style.icon} onClick={toggle} >add</Icon>
            </Button>
            <Button onClick={() => refreshPage()} sx={{fontWeight: 'bold',  width: 10, padding: 0, height: 20}}  color='black'  variant="text">
                <Icon className={style.icon} >refresh</Icon>
            </Button>
            </div>
            <div>
                <span className={style.pagination} >1 to {totalItems} of {totalItems}</span>
                <span>
                <Button color='black'  variant="text">
                <NavigateBefore className={style.icon}  />
                </Button>
                <Button color='black'  variant="text">
                <NavigateNext className={style.icon}  />
                </Button>
                </span>
                <span>
                <Button color='black'  variant="text">
                <FormatListBulleted className={style.icon}  />
                </Button>
                <Button color='black'  variant="text">
                <WindowSharp className={style.icon}  />
                </Button>
                <Button color='black'  variant="text">
                <TextSnippet className={style.icon}  />
                </Button>
                </span>
            </div>
        </MDBox>
        
        </>
    )
}

ControlNav.propTypes = {
  totalItems: PropTypes.number,
  toggle: PropTypes.func

};




export default ControlNav;