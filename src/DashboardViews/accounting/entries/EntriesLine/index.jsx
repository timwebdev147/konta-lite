import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import PropTypes from 'prop-types'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from '../../../styles.module.scss';
import customStyles from './index.module.scss';
import { EditStockLineModal } from "components/editStockLocationModal/editStockLineModal"
import { useParams } from "react-router-dom"
import { EditEntryLineModal } from "components/dataEdit/entry/entryLine"



const EntriesLine = () => {
    const [location, setStockLocation] = useState([])
    const [stockLines, setStockLines] = useState([])
     const [totalLines, setTotalLines] = useState(null)
    const [lineIds, setLineIds] = useState([])
    const [showStockLineModal, setShowStockLineModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const cookie = window.localStorage.getItem("cookie")
    let { id } = useParams()
    
    async function get_stockLocation() {
        axios.get(`http://localhost:9000/api/entry/${id}`, {
            headers: {
                cookiee: cookie.toString(),
               
            }
        })
            .then(res => {
                let data = res.data.data[0];
                setStockLocation(data);
                
                console.log("**DATA**", data);
                setLineIds(data.moveLineList);
            })
            .catch(err => {
                console.log("**ERROR**", err);
            })
    }

    function get_stock_lines() {
        console.log("***LINES_IDs***", lineIds);
        let lines = [];
        if(lineIds.length > 0 ){
        lineIds?.map(async (line) => {
            axios.get(`http://localhost:9000/api/entryline/${line.id}`, {
                headers: {
                    cookiee: cookie.toString(), 
                }
            })
                .then(res => {
                    console.log(res.data);
                    let data = res.data.data[0];
                    setStockLines([
                        ...stockLines,
                        data
                    ])
                })
                .catch(err => {
                    console.log("**ERROR**", err);
                })

        }
        
        )}
        console.log("***LINES***", stockLines);
    }

    function showModal(props) {
        document.body.style.overflowY = "hidden"
        if (props == "stockLocationLine") {
            setShowStockLineModal(true)
        }
    }

    function submit(fields) {
        const formData = {}
        fields.forEach(field => {
            formData[field.name] = field.value
        })
        console.log("******FORMDATA*****", formData);
        axios.post("http://localhost:9000/api/entryline/create", formData, {
            headers: {
                cookiee: cookie.toString(),
            }
        }).then(res => {
            console.log(res);
            toast.success("Entry line has been created")
            setShowStockLineModal(false)
            document.body.style.overflowY = "scroll";
            get_stockLocation();
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        get_stockLocation();
    }, [])
    useEffect(() => {
        get_stock_lines();
    }, [lineIds])




    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox sx={{ flexGrow: 1 }} mt={2} >
                    <Box className={styles.container}>
                        <div className={customStyles.stockInfos}>
                            <div>
                                <div>Tier</div>
                                <div>{location?.partner?.fullName}</div>
                            </div>
                            <div>
                                <div>Société</div>
                                <div>{location?.company?.name}</div>
                            </div>
                            <div>
                                <div>Journal</div>
                                <div>{location?.journal?.name}</div>
                            </div>
                            <div>
                                <div>periode</div>
                                <div>{location?.period?.name}</div>
                            </div>
                        </div>
                        <br/>
                        <div className={styles.newItemContainer}>
                        <p className={styles.litle}>Lines du ecriture : </p>
                            <button onClick={() => showModal("stockLocationLine")} className={styles.button}>Ajouter une ligne de ecriture</button>
                        </div>
                        <div className={customStyles.itemLists}>
                            <div className={customStyles.listHead}>
                                <div className={customStyles.productCol} >Compte comptable</div>
                                <div>Credit</div>
                                <div>Debit</div>
                                <div>A payer / A utiliser</div>
                                <div>Créé le</div>
                                <div>Date d&apos;échéance</div>
                            </div>
                            {
                                stockLines.map((entryline, index) => (
                                    <div key={index} className={customStyles.list}>
                                        <div className={customStyles.productCol}>{entryline.account?.label}</div>
                                        <div> {parseInt(entryline.credit).toFixed(2)}</div>
                                        <div>{parseInt(entryline.debit).toFixed(2)}</div>
                                        <div>{entryline.amountRemaining}</div>
                                        <div>{entryline.date}</div>
                                        <div>{entryline.dueDate}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.total}>
                            <p>Total : {lineIds.length} lignes de ecriture</p>
                        </div>
                    </Box>
                </MDBox>
            </DashboardLayout>

            {
                showStockLineModal == true ?
                    <EditEntryLineModal currentEntry={location.id} submit={submit} close={setShowStockLineModal} /> : null
            }
        </>
    )
}

export default EntriesLine