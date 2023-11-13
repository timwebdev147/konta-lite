import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from '../styles.module.scss';
import { useNavigate } from "react-router-dom"
import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { EditStockLocationModal } from "../../components/editStockLocationModal"
import { ConfirmationModal } from "../../components/confirmationModal"
import { toast } from "react-toastify"



const StockLocations = () => {
    const [showList, setShowList] = useState("")
    const [locations, setStockLocations] = useState([])
    const [selectedId, setSelectedId] = useState(0)
    const [currentStock, setCurrentStock] = useState(0)
    const [totalStockLocations, setTotalStockLocation] = useState(null)
    const [showStockLocationModal, setShowStockLocationModal] = useState(false)
    const [showStockLocation, setShowStockLocation] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const navigate = useNavigate()
    const cookie = window.localStorage.getItem("cookie")

    function get_stockLocations(pageNumber) {

        axios.get("http://localhost:9000/api/stock", {
            headers: {
                cookiee: cookie.toString(),
                pagination: pageNumber
            }
        })
            .then(res => {
                let stockLocationss = res.data.data;
                let total = res.data.total;
                setTotalStockLocation(total)
                setStockLocations(stockLocationss)
                console.log(stockLocationss);
            })
            .catch(err => {
                console.log(err, cookie);
            })
    }
    function showModal(props) {
        document.body.style.overflowY = "hidden"
        if (props == "stockLocation") {
            setShowStockLocationModal(true)
        }
        if (props == "stockLocationEdit") {
            setShowEditModal(true)
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
            get_stockLocations(page)
        }
        else if (pagination > 1) {
            let page = pagination - 1;
            setPagination(page)
            get_stockLocations(page)
        }
    }

    function submit(formData) {
        // const formData = {}
        // fields.forEach(field => {
        //     formData[field.name] = field.value
        // })
        console.log("******FORMDATA*****", formData);
        axios.post("http://localhost:9000/api/stock/create", formData, {
            headers: {
                cookiee: cookie.toString(),
            }
        }).then(res => {
            console.log(res);
            get_stockLocations()
            toast.success("Stock créé avec succès !")
            setShowStockLocationModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }

    function onMenuOpen(data) {
        if (selectedId == data.id) {
            setSelectedId(0)
            setCurrentStock();
        } else {
            setSelectedId(data.id);
            setCurrentStock(data);
        }
    }

    function onDelete() {
        axios.delete(`http://localhost:9000/api/stock/${selectedId}`, {
            headers: {
                cookiee: cookie.toString(),
            }
        }).then(res => {
            get_stockLocations()
            toast.success("Stock supprimer avec succès !")
            setShowDeleteModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => {
            console.log("*****DELETE ERROR ****", err)
            toast.error("Erreur de suppression de Stock !")
            setShowDeleteModal(false)
        })
    }

    function onDeleteCanled() {
        setShowDeleteModal(false)
    }

    useEffect(() => {
        get_stockLocations()
    }, [])




    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox sx={{ flexGrow: 1 }} mt={2} >
                    <Box className={styles.container}>
                        <div className={styles.filter}>
                            <div className={styles.tous}><span ></span><p>Tous</p></div>
                            <div className={styles.service}><span ></span><p>Interne</p></div>
                            <div className={styles.produit}><span ></span><p>Externe</p></div>
                            <div className={styles.debours}><span ></span><p>Virtuel</p></div>
                        </div>
                        <div className={styles.newItemContainer}>
                            <span>exporter<Icon>keyboard_arrow_down</Icon></span>
                            <button onClick={() => showModal("stockLocation")} className={styles.button}>Ajouter un emplacement de stock</button>
                        </div>
                        <div className={styles.searchBox}>
                            <div>
                                {
                                    showList != "" ?
                                        <div></div> :
                                        null
                                }
                                <input onFocus={() => show("first")} onBlur={() => { setTimeout(() => { hide("first") }, 500) }} placeholder="Rechercher un stock ou numero d'identifant" type="text" />
                                <Icon className={styles.inputIcon}>search</Icon>
                            </div>
                        </div>
                        <div className={styles.itemLists}>
                            <div className={styles.tags}>
                                <div>Nom de Stock</div>
                                <div className={styles.midCont}>
                                    <div> Société</div>
                                    <div>Addresse</div>
                                    <div>Type</div>
                                </div>
                                <div>Actions</div>
                            </div>
                            {
                                locations?.map((stocklocation, index) => (

                                    <div key={index} className={styles.item} >
                                        <div className={styles.name}>
                                            <span className={styles.iconCont}><Icon>person_outline</Icon></span>
                                            <div className={styles.text}>
                                                <p>{stocklocation.name}</p>
                                                <p>stock</p>
                                            </div>
                                        </div>
                                        <div className={styles.midCont}>
                                            <div>{stocklocation.company?.name}</div>
                                            <div>{stocklocation.address?.fullName}</div>
                                            <div>{stocklocation.typeSelect == 1 ? "Interne" : stocklocation.typeSelect == 2 ? "Externe" : "Virtuel"}</div>
                                        </div>
                                        <div
                                        >
                                            <Icon onClick={() => onMenuOpen(stocklocation)} >more_vert</Icon>
                                            {stocklocation.id === selectedId && (
                                                <div className={`${styles.optionnemu}  `}>
                                                    <Icon className={`${styles.option} ${styles.showoption} `} onClick={() => navigate(`/account/stocks/${stocklocation.id}`)}>visibility</Icon>
                                                    <Icon className={`${styles.option} ${styles.editoption} `} onClick={() => showModal("stockLocationEdit")} >edit</Icon>
                                                    <Icon className={`${styles.option} ${styles.deleteoption} `} onClick={() => setShowDeleteModal(true)} >delete</Icon>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.total}>
                            <p>Total : {totalStockLocations} emplacements de Stock</p>
                            <div><span onClick={() => updatePagination("decrease")}><Icon>keyboard_arrow_left</Icon></span> {pagination} <span onClick={() => updatePagination("increase")}><Icon>keyboard_arrow_right</Icon></span></div>
                        </div>
                    </Box>
                </MDBox>
            </DashboardLayout>

            {
                showStockLocationModal == true ?
                    <EditStockLocationModal submit={submit} close={setShowStockLocationModal} /> : null
            }
            {showEditModal == true ?
                <EditStockLocationModal submit={submit} editStock={currentStock} close={setShowEditModal} /> : null}
            {showDeleteModal == true ?
                <ConfirmationModal onCancel={onDeleteCanled} cancel="Annuler" confirm="Valider"
                    text="Voullez-vous vraiment supprimer cet stock ?" onConfirm={onDelete} /> : null}
            {showStockLocation == true ?
                <EditStockLocationModal submit={submit} close={setShowStockLocation} /> : null}
        </>
    )
}

export default StockLocations