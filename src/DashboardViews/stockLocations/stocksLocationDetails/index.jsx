import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import PropTypes from 'prop-types'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from '../../styles.module.scss';
import customStyles from '../styles.module.scss';
import { EditStockLineModal } from "components/editStockLocationModal/editStockLineModal"
import { useParams } from "react-router-dom"



const StockLocationDetails = () => {
    const [location, setStockLocation] = useState([])
    const [stockLines, setStockLines] = useState([])
     const [totalLines, setTotalLines] = useState(null)
    const [lineIds, setLineIds] = useState([])
    const [showStockLineModal, setShowStockLineModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const cookie = window.localStorage.getItem("cookie")
    let { id } = useParams()
    
    async function get_stockLocation() {
        axios.get(`http://localhost:9000/api/stock/${id}`, {
            headers: {
                cookiee: cookie.toString(),
               
            }
        })
            .then(res => {
                let data = res.data.data[0];
                setStockLocation(data);
                
                console.log("**DATA**", data);
                setLineIds(data.stockLocationLineList);
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
            axios.get(`http://localhost:9000/api/stockline/${line.id}`, {
                headers: {
                    cookiee: cookie.toString(), 
                }
            })
                .then(res => {
                    let data = res.data.data[0];
                    lines.push(data);
                })
                .catch(err => {
                    console.log("**ERROR**", err);
                })

        }
        
        ) 
        setStockLines(lines);}
        console.log("***LINES***", lines);
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
        axios.post("http://localhost:9000/api/stockline/create", formData, {
            headers: {
                cookiee: cookie.toString(),
            }
        }).then(res => {
            console.log(res);
            toast.success("StockLocation line has been created")
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
                                <div>Nom de Stock</div>
                                <div>{location?.name}</div>
                            </div>
                            <div>
                                <div>Société</div>
                                <div>{location?.company?.name}</div>
                            </div>
                            <div>
                                <div>Addresse</div>
                                <div>{location?.address?.fullName}</div>
                            </div>
                            <div>
                                <div>Type</div>
                                <div>{location.typeSelect == 1 ? "Interne" : location.typeSelect == 2 ? "Externe" : "Virtuel"}</div>
                            </div>
                        </div>
                        <br/>
                        <div className={styles.newItemContainer}>
                        <p className={styles.litle}>Lines du stock : </p>
                            <button onClick={() => showModal("stockLocationLine")} className={styles.button}>Ajouter une ligne de stock</button>
                        </div>
                        <div className={customStyles.itemLists}>
                            <div className={customStyles.listHead}>
                                <div className={customStyles.productCol} >Produit</div>
                                <div> Quantité actuelle</div>
                                <div>Quantité future</div>
                                <div>Untité</div>
                                <div>Créé le</div>
                            </div>
                            {
                                stockLines?.map((stockline, index) => (
                                    <div key={index} className={customStyles.list}>
                                        <div className={customStyles.productCol}>{stockline.product?.fullName}</div>
                                        <div> {parseInt(stockline.currentQty).toFixed(2)}</div>
                                        <div>{parseInt(stockline.futureQty).toFixed(2)}</div>
                                        <div>{stockline.unit?.name}</div>
                                    <div>{stockline.createdOn}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.total}>
                            <p>Total : {lineIds.length} lignes de Stock</p>
                        </div>
                    </Box>
                </MDBox>
            </DashboardLayout>

            {
                showStockLineModal == true ?
                    <EditStockLineModal currentStock={location.id} submit={submit} close={setShowStockLineModal} /> : null
            }
        </>
    )
}

export default StockLocationDetails