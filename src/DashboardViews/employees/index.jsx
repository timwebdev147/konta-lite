import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from '../styles.module.scss'
import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { EditEmployeeModal } from "../../components/editEmployeeModel"
import { ConfirmationModal } from "../../components/confirmationModal"
import { toast } from "react-toastify"
import dayjs from "dayjs"



const Employees = () => {
    const [showList, setShowList] = useState("")
    const [employees, setEmployees] = useState([])
    const [totalEmployees, setTotalEmployee] = useState(null)
    const [showEmployeeModal, setShowEmployeeModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    const [currentEmployee, setCourentEmployee] = useState()
    const [showDispayModal, setShowDisplayModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const cookie = window.localStorage.getItem("cookie")

    function get_employees(pageNumber) {
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
    function showModal(props) {
        document.body.style.overflowY = "hidden"
        if (props == "employee") {
            setShowEmployeeModal(true)
        }
        if (props == "employeeEdit") {
            setShowDisplayModal(true)
            setIsEdit(true)
        }
        if (props == "employeeDisplay") {
            setShowDisplayModal(true)
            setIsEdit(false)
        }
    }

    function show(props) {
        if (props == "first" && showList != "first") {
            setShowList("first")
        }
        if (props == "second" && showList != "second") {
            setShowList("second")
        }
    }

    function hide(props) {
        if (props == "first") {
            setShowList('')
        }
        if (props == "second") {
            setShowList('')
        }
    }

    function updatePagination(props) {
        if (props == "increase") {
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

    function onMenuOpen(data) {
        console.log("************Id avant***", selectedId)
        console.log("************employee avant ***", currentEmployee);
        if (selectedId == data.id) {
            setSelectedId(0)
            setCourentEmployee();

        } else {
            setSelectedId(data.id);
            setCourentEmployee(data);
        }
        console.log("************Id apres***", selectedId)
        console.log("************employee apres***", currentEmployee);

    }

    function submit(formData) {
        // const formData = {}
        // fields.forEach(section => {
        //     section.subSections.forEach(field => {
        //         formData[field.name] = field.value
        //     })
        // })
        console.log("******FORMDATA*****", formData);
        axios.post("http://localhost:9000/api/employee/create", formData, {
            headers: {
                cookiee: cookie.toString(),
            }
        }).then(res => {
            console.log(res);
            get_employees()
            toast.success("employée créé avec succès !");
            setShowEmployeeModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }

    function onDelete() {       
        axios.delete(`http://localhost:9000/api/employee/${selectedId}`, {
            headers: {
                cookiee: cookie.toString(),
            }
        }).then(res => {
            console.log(res);
            toast.success("Employee supprimer avec succès !")
            setShowDeleteModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => {
            if(err.message){
                toast.error("Suppression echouée : cet employée a un contrat de travail !")
            }else{
                toast.error("Suppression echouée !")
            }
            console.log("*****DELETE ERROR ****", err)
            setShowDeleteModal(false)
        })
    }

    function onDeleteCanled() {
        setShowDeleteModal(false)
    }

    function onEdit() {

    }


    useEffect(() => {
        get_employees()
    }, [])




    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox sx={{ flexGrow: 1 }} mt={2} >
                    <Box className={styles.container}>
                        <div className={styles.filter}>
                            <div className={styles.tous}><span ></span><p>Tous</p></div>
                        </div>
                        <div className={styles.newItemContainer}>
                            <span>exporter<Icon>keyboard_arrow_down</Icon></span>
                            <button onClick={() => showModal("employee")} className={styles.button}>Ajouter un nouveau employee</button>
                        </div>
                        <div className={styles.searchBox}>
                            <div>
                                {
                                    showList != "" ?
                                        <div></div> :
                                        null
                                }
                                <input onFocus={() => show("first")} onBlur={() => { setTimeout(() => { hide("first") }, 500) }} placeholder="Rechercher un article ou numero d'identifant" type="text" />
                                <Icon className={styles.inputIcon}>search</Icon>
                            </div>
                        </div>
                        <div className={styles.itemLists}>
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

                                    <div key={index} className={styles.item}>
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
                                            <div>{dayjs(employee.createdOn).format('DD-MM-YYYY')}</div>
                                        </div>
                                        <div >
                                            <Icon onClick={() => onMenuOpen(employee)} >
                                                more_vert
                                            </Icon>
                                            {employee.id == selectedId && (
                                                <div className={`${styles.optionnemu}  `}>
                                                    <Icon className={`${styles.option} ${styles.showoption} `} onClick={() => showModal("employeeDisplay")} >visibility</Icon>
                                                    <Icon className={`${styles.option} ${styles.editoption} `} onClick={() => showModal("employeeEdit")} >edit</Icon>
                                                    <Icon className={`${styles.option} ${styles.deleteoption} `} onClick={() => setShowDeleteModal(true)} >delete</Icon>
                                                </div>
                                            )}
                                        </div>
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
                showEmployeeModal == true ?
                    <EditEmployeeModal submit={submit} close={setShowEmployeeModal} /> : null
            }
            {
                showDeleteModal == true ?
                    <ConfirmationModal onCancel={onDeleteCanled} cancel="Annuler" confirm="Valider"
                        text="Voullez-vous vraiment supprimer cet employee ?" onConfirm={onDelete} /> : null
            }
            {
                showDispayModal == true ?
                    <EditEmployeeModal submit={onEdit} close={setShowDisplayModal} editEmployee={currentEmployee} isEdit={!isEdit} /> : null
            }
        </>
    )
}

export default Employees