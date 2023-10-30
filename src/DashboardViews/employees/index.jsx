import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from './index.module.scss'
import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { EditEmployeeModal } from "../../components/editEmployeeModel"
import { toast } from "react-toastify"



const Employees = () => {
    const [showList, setShowList] = useState("")
    const [employees, setEmployees] = useState([])
    const [totalEmployees, setTotalEmployee] = useState(null)
    const [showEmployeeModal, setShowEmployeeModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const cookie = window.localStorage.getItem("cookie")

    function get_employees(pageNumber){

        axios.get("http://localhost:9000/api/employee", {
            headers: {
                cookiee: cookie.toString(),
                pagination: pageNumber
            }
        })
        .then(res => {
            let employeess = res.data.data;
            let total = res.data.total;
            setTotalEmployee(total)
            setEmployees(employeess)
            console.log(employeess);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }
    function showModal(props){
        document.body.style.overflowY = "hidden"
        if(props == "employee"){
            setShowEmployeeModal(true)
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
                get_employees(page)
            }
            else if (pagination > 1) {
                let page = pagination - 1;
                setPagination(page)
                get_employees(page)
            }
    }

    function submit(fields) {
        const formData = {}
        fields.forEach(section => {
            section.subSections.forEach(field => {
                formData[field.name] = field.value
            })
        })
        console.log("******FORMDATA*****", formData);
        axios.post("http://localhost:9000/api/employee/create", formData, {
            headers: {
                cookiee: cookie.toString(),
            }
        }).then(res => {
            console.log(res);
            get_employees()
            toast.success("employee has been created")
            setShowemployeeModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        get_employees()
    },[])




return (
    <>
<DashboardLayout>
<DashboardNavbar />
<MDBox sx={{ flexGrow: 1}} mt={2} >
<Box className={styles.container}>
    <div className={styles.filter}>
        <div className={styles.tous}><span ></span><p>Tous</p></div>
        <div className={styles.service}><span ></span><p>Service</p></div>
        <div className={styles.produit}><span ></span><p>Produit</p></div>
        <div className={styles.debours}><span ></span><p>Debours</p></div>
    </div>
    <div className={styles.newArticleContainer}>
        <span>exporter<Icon>keyboard_arrow_down</Icon></span>
        <button onClick={() => showModal("employee")} className={styles.button}>Ajouter un nouveau employee</button>
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
    <div className={styles.employeeLists}>
        <div className={styles.tags}>
            <div>Nom de lemployee</div>
            <div className={styles.midCont}>
                <div> Téléphone Pro</div>
                <div>travail / Jour</div>
                <div>Date de création</div>
            </div>
            <div>Actions</div>
        </div>
        {
            employees?.map((employee, index) => (

            <div key={index} className={styles.employee}>
                <div className={styles.name}>
                    <span className={styles.iconCont}><Icon>person_outline</Icon></span>
                    <div className={styles.text}>
                        <p>{employee.name}</p>
                        <p>{employee.weeklyPlanning?.name}</p>
                    </div>
                </div>
                <div className={styles.midCont}>
                    <div>{employee.mobileProPhone}</div>
                    <div>{parseInt(employee.dailyWorkHours).toFixed(2)} h</div>
                    <div>{employee.createdOn}</div>
                </div>
                <div><Icon>more_vert</Icon></div>
            </div>

            ))
        }
    </div>
    <div className={styles.total}>
        <p>Total : {totalEmployees} employées</p>
        <div><span onClick={() => updatePagination("decrease")}><Icon>keyboard_arrow_left</Icon></span> {pagination} <span onClick={() => updatePagination("increase")}><Icon>keyboard_arrow_right</Icon></span></div>
    </div>
</Box>
</MDBox>
</DashboardLayout>

{
    showEmployeeModal == true?
    <EditEmployeeModal submit={submit} close={setShowEmployeeModal}/>: null
}
</>
)
}

export default Employees