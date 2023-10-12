import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import Modal from '@mui/material/Modal';
import Card from "components/card/Card";
import ControlNav from "components/controlNav/ControlNav";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import EditModal from "components/editModal/EditModal";
import { useNavigate } from "react-router-dom";




const Suppliers = () => {
    
const [suppliers, setSuppliers] = useState()
const [open, setOpen] = useState(false);
const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };






    let cookie = window.localStorage.getItem("cookie")
    function getSuppliers(){
        axios.get("http://localhost:9000/api/partner", {
            headers: {
                hello: "timzy",
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let partners = res.data.data;
            let suppliers = partners?.filter(data => {return data.isSupplier == true})
            setSuppliers(suppliers)
            if(res.data.status == 401){
                navigate("/login")
            }
            console.log(suppliers);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }

    useEffect(() => {
        getSuppliers()
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ControlNav totalItems={suppliers?.length} toggle={() => handleOpen()} />
            <MDBox sx={{ flexGrow: 1 }} mt={2} >
            <EditModal open={open} handleClose={() => handleClose()} partner={"Supplier"} />
            <Grid container spacing={2}>
                {
                    suppliers?.map((supplier, index) => (
                        <Card 
                            fullname={supplier.fullName}
                            partnerCategory={supplier.partnerCategory?.name}
                            email={supplier.emailAddress?.name}
                            picture={supplier.fullname}
                            fiscalPosition={supplier.fiscalPosition}
                            mobilePhone={supplier.mobilePhone}
                            companyStr={supplier.companyStr}
                            key={index} 
                         />
                    ))
                }
            </Grid>
            </MDBox>
        </DashboardLayout>
    )
}



export default Suppliers;