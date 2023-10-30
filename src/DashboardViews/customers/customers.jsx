// import { Grid } from "@mui/material";
// import axios from "axios";
// import MDBox from "components/MDBox";
// import Card from "components/card/Card";
// import ControlNav from "components/controlNav/ControlNav";
// import EditModal from "components/editModal/EditModal";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { useEffect, useState } from "react";




// const Customers = () => {
    
// const [customers, setCustomers] = useState()
// const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };



//     let cookie = window.localStorage.getItem("cookie")
    

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <ControlNav totalItems={customers?.length} toggle={() => handleOpen()} />
//             <MDBox sx={{ flexGrow: 1 }} mt={2} >
//             <EditModal open={open} handleClose={() => handleClose()} partner={"Customer"} />
//             <Grid container spacing={2}>
//                 {
//                     customers?.map((customer, index) => (
//                         <Card 
//                             fullname={customer.fullName}
//                             partnerCategory={customer.partnerCategory?.name}
//                             email={customer.emailAddress?.name}
//                             picture={customer.fullname}
//                             fiscalPosition={customer.fiscalPosition}
//                             mobilePhone={customer.mobilePhone}
//                             companyStr={customer.companyStr}
//                             key={index} 
//                          />
//                     ))
//                 }
//             </Grid>
//             </MDBox>
//         </DashboardLayout>
//     )
// }



// export default Customers;







import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from './index.module.scss'
import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { CompanyEdit } from "components/dataEdit"
import { PartnerEdit } from "components/dataEdit";



const Customers = () => {
    const [showList, setShowList] = useState("")
    const [customers, setCustomers] = useState([])
    const [totalCustomers, setTotalCustomers] = useState(null)
    const [showCustomerModal, setshowCustomerModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const cookie = window.localStorage.getItem("cookie")

    function getCustomers(pageNumber){
        axios.get("http://localhost:9000/api/partner", {
            headers: {
                cookiee: cookie.toString(),
                pagination: pageNumber
            }
        })
        .then(res => {
            let partners = res.data.data;
            let customers = partners?.filter(data =>  data.isCustomer == true)
            setTotalCustomers(res.data.total)
            setCustomers(partners)
            console.log(partners);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }

    

    useEffect(() => {
        getCustomers()
    }, [])
    function showModal(props){
        document.body.style.overflowY = "hidden"
        if(props == "product"){
            setshowCustomerModal(true)
        }
    }
    
    function show(props){
        if(props == "first" && showList != "first"){
            setShowList("first")
        }
        if(props == "second" && showList != "second"){
            setShowList("second")
        }
    }

    function hide(props){
        if(props == "first"){
            setShowList('')
        }
        if(props == "second"){
            setShowList('')
        }
    }
    
    function updatePagination(props){
            if (props == "increase" ) {
                let page = pagination + 1;
                setPagination(page)
                getCustomers(page)
            }
            else if (pagination > 1) {
                let page = pagination - 1;
                setPagination(page)
                getCustomers(page)
            }
    }

    function submit(fields) {
        const formData = {}
        fields.forEach(field => {
            formData[field.name] = field.value
        })
        axios.post("http://localhost:9000/api/partner/${partner}/create", formData, {
            headers: {
                cookiee: cookie.toString()
            }
        }).then(res => {
            console.log(res);
            getCustomers()
            toast.success("Partner has been created")
            setshowCustomerModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        getCustomers()
    },[])




return (
    <>
<DashboardLayout>
<DashboardNavbar />
<MDBox sx={{ flexGrow: 1}} mt={2} >
<Box className={styles.container}>
    <div className={styles.filter}>
        <div className={styles.tous}><span ></span><p>Tous</p></div>
    </div>
    <div className={styles.newArticleContainer}>
        <span>exporter<Icon>keyboard_arrow_down</Icon></span>
        <button onClick={() => showModal("product")} className={styles.button}>Ajouter un nouvel Client</button>
    </div>
    <div className={styles.searchBox}>
        <div>
                {
                    showList != ""?
                    <div></div>:
                    null
                }
                <input onFocus={() => show("first")} onBlur={() => {setTimeout(() => {hide("first")}, 500)}} placeholder="Rechercher un article ou numero d'identifant" type="text" />
                <Icon className={styles.inputIcon}>search</Icon>
            </div>
    </div>
    <div className={styles.productLists}>
        <div className={styles.tags}>
            <div>Nom de l’enterprise</div>
            <div className={styles.midCont}>
                <div>ifu</div>
                <div>devise</div>
                <div>Date de création</div>
            </div>
            <div>Actions</div>
        </div>
        {
            customers?.map((customer, index) => (

            <div key={index} className={styles.product}>
                <div className={styles.name}>
                    <span className={styles.iconCont}><Icon>event_note</Icon></span>
                    <div className={styles.text}>
                        <p>{customer.fullName}</p>
                        <p>company name: {customer.emailAddress?.name}</p>
                    </div>
                </div>
                <div className={styles.midCont}>
                    <div>{customer.mobilePhone || "---"}</div>
                    <div>{customer.partnerCategory?.name || "---"}</div>
                    <div>04 Sept 2023</div>
                </div>
                <div><Icon>more_vert</Icon></div>
            </div>

            ))
        }
    </div>
    <div className={styles.total}>
        <p>Total : {totalCustomers} Customers</p>
        <div><span onClick={() => updatePagination("decrease")}><Icon>keyboard_arrow_left</Icon></span> {pagination} <span onClick={() => updatePagination("increase")}><Icon>keyboard_arrow_right</Icon></span></div>
    </div>
</Box>
</MDBox>
</DashboardLayout>

{
    showCustomerModal == true?
    <PartnerEdit submit={submit} close={setshowCustomerModal}/>: null
}
</>
)
}

export default Customers