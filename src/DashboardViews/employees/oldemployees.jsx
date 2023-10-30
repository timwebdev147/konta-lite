import { Grid } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import EmployeeCard from "components/card/EmployeeCard";
import ControlNav from "components/controlNav/ControlNav";
import EditModal from "components/editModal/EditModal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";




const Employees = () => {

    const [employees, setEmployees] = useState()
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    let cookie = window.localStorage.getItem("cookie")
    function getEmployees() {
        axios.get("http://localhost:9000/api/employee", {
            headers: {
                hello: "timzy",
                cookiee: cookie.toString()
            }
        })
            .then(res => {
                let employees = res.data.data;
                // let employees = datas?.filter(data => { return data.isCustomer == true })
                setEmployees(employees)
                console.log(employees);
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }



    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ControlNav totalItems={employees?.length} toggle={() => handleOpen()} />
            <MDBox sx={{ flexGrow: 1 }} mt={2} >
                <EditModal open={open} handleClose={() => handleClose()} partner={"Employee"} />
                <Grid container spacing={2}>
                    {
                        employees?.map((employee, index) => (
                            <EmployeeCard
                                fullname={employee.name}
                                picture={employee.name}
                                poste={employee.name}
                                department={employee.name}
                                mobilePhone={employee.name}
                                companyStr={employee.name}
                                key={index}
                            />
                        ))
                    }
                </Grid>
            </MDBox>
        </DashboardLayout>
    )
}



export default Employees;