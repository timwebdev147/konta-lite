import { Grid } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import Card from "components/card/Card";
import ControlNav from "components/controlNav/ControlNav";
import EditModal from "components/editModal/EditModal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";




const Customers = () => {
    
const [customers, setCustomers] = useState()
const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



    let cookie = window.localStorage.getItem("cookie")
    function getCustomers(){
        axios.get("http://localhost:9000/api/partner", {
            headers: {
                hello: "timzy",
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let partners = res.data.data;
            let customers = partners?.filter(data => {return data.isCustomer == true})
            setCustomers(customers)
            console.log(customers);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }

    

    useEffect(() => {
        getCustomers()
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ControlNav totalItems={customers?.length} toggle={() => handleOpen()} />
            <MDBox sx={{ flexGrow: 1 }} mt={2} >
            <EditModal open={open} handleClose={() => handleClose()} partner={"Customer"} />
            <Grid container spacing={2}>
                {
                    customers?.map((customer, index) => (
                        <Card 
                            fullname={customer.fullName}
                            partnerCategory={customer.partnerCategory?.name}
                            email={customer.emailAddress?.name}
                            picture={customer.fullname}
                            fiscalPosition={customer.fiscalPosition}
                            mobilePhone={customer.mobilePhone}
                            companyStr={customer.companyStr}
                            key={index} 
                         />
                    ))
                }
            </Grid>
            </MDBox>
        </DashboardLayout>
    )
}



export default Customers;