import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from './viewInvoice.module.scss'
import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { CompanyEdit } from "components/dataEdit"
import { useNavigate } from "react-router-dom"
import { usePDF } from 'react-to-pdf';
import logo from "../../../images/logo.png";
import dayjs from "dayjs"



const Invoices = () => {
    const [showList, setShowList] = useState("")
    const [showPdf, setShowPdf] = useState(false);
    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProduct] = useState(null)
    const [showCompanyModal, setShowCompanyModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [showActions, setShowActions] = useState('hide')
    const [showActionsIndex, setShowActionsIndex] = useState(null)
    const navigate = useNavigate()
    const cookie = window.localStorage.getItem("cookie")
    const { toPDF, targetRef } = usePDF({filename: 'invoice.pdf'});

    function delete_invoice(id){

        let filter_product = products.filter(product => {
            return product.id != id;
        })
        setProducts(filter_product)
        setTotalProduct(totalProducts - 1)

        axios.delete(`http://localhost:9000/api/invoice/delete/${id}`, {
            headers: {
                cookiee: cookie.toString()
            }
        }).then(res => {
            console.log(res.data);
        }).catch(error => console.log(error))
    }

    function show_actions(index){
        if(index == showActionsIndex){
            setShowActionsIndex(null)
        }else{
            setShowActionsIndex(index)
        }
    }

    function export_invoice(){
        // doc.
    }

    function get_companies(pageNumber){

        axios.get("http://localhost:9000/api/invoice", {
            headers: {
                cookiee: cookie.toString(),
                pagination: pageNumber
            }
        })
        .then(res => {
            let productss = res.data.data;
            let total = res.data.total;
            setTotalProduct(total)
            setProducts(productss)
            console.log(productss);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }
    function showModal(props){
        document.body.style.overflowY = "hidden"
        setShowPdf(props)
        if(props == false){
            document.body.style.overflowY = "scroll"

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
                get_companies(page)
            }
            else if (pagination > 1) {
                let page = pagination - 1;
                setPagination(page)
                get_companies(page)
            }
    }

    function submit(fields) {
        const formData = {}
        fields.forEach(field => {
            formData[field.name] = field.value
        })
        axios.post("http://localhost:9000/api/company/create", formData, {
            headers: {
                cookiee: cookie.toString()
            }
        }).then(res => {
            console.log(res);
            get_companies()
            toast.success("company has been created")
            setShowCompanyModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        get_companies()
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
        <button onClick={() => navigate("/account/invoice/create")} className={styles.button}>Creer une facture</button>
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
            <div>Nom du Client</div>
            <div className={styles.midCont}>
                <div>Nº de facture</div>
                <div>Montant Total</div>
                <div>Date de création</div>
            </div>
            <div>Actions</div>
        </div>
        {
            products?.map((product, index) => (

            <div key={index} className={styles.product}>
                
                <div className={styles.name}>
                    <span className={styles.iconCont}><Icon>event_note</Icon></span>
                    <div className={styles.text}>
                        <p>{product.partner.fullName}</p>
                        <p>{product.statusSelect == 1? "Brouilon": null}</p>
                    </div>
                </div>
                <div className={styles.midCont}>
                    <div>{product.ifu || "---"}</div>
                    <div>{product.inTaxTotal || "---"}</div>
                    <div>{dayjs(product.createdOn).format('DD-MM-YYYY')}</div>
                </div>
                <div >
                    <Icon onClick={() => show_actions(index)}>more_vert</Icon>
                    <div className={showActionsIndex == index ? styles.actions: styles.hide}>

                    <div><Icon>edit</Icon> modifier</div>
                    <div onClick={() => delete_invoice(product.id)}><Icon>delete</Icon> supprimer</div>
                    <div onClick={() => showModal(true)}><Icon>print</Icon> exporter</div>

                    </div>

                    <div className={showActionsIndex == index && showPdf == true? styles.pdfModal: styles.hide}>
                        <div>
                            <div className={styles.pdf} ref={showActionsIndex == index? targetRef: null}>
                            <div className={styles.firstContainer}>
                                <div className={styles.userInfo}>
                                    <div className={styles.logoContainer}>
                                    <img src={logo} alt="" />
                                    </div>
                                    <div>
                                        <p>{product.company.name}</p>
                                        <p>IFU:3201200175817</p>
                                        <p>RCCM:RB/COT/12/A 14165</p>
                                        <p>romaric.nougbognonhou@yahoo.fr</p>
                                        <p>COTONOU</p>
                                        <p>97685239 95232923</p>
                                        <p>--</p>
                                    </div>
                                </div>
                                <div className={styles.factureInfo}>
                                    <h1>Facture</h1>
                                    <div>
                                    <div>Reference</div>
                                    <div>Date</div>
                                    <div>{product.invoiceId}</div>
                                    <div>{product.invoiceDate}</div>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.secondContainer}>
                                <div>
                                    <div className={styles.title}>Client</div>
                                    <div>
                                        <p>
                                            PIVOTECH
                                        </p>
                                        <p>
                                            IFU : 3201810198789
                                        </p>
                                    </div>
                                </div>
                                <div >
                                    <div className={styles.title}>Objet de la facture</div>
                                    <div>
                                        <p>
                                            REALISATION DE SUPPORTS MURAUX & POSE DE
                                        </p>
                                        <p>
                                            PANNEAUX
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                            <div className={styles.thirdContainer}>
                                <div className={styles.column_one}></div>
                                <div className={styles.column_two}></div>
                                <div className={styles.column_three}></div>
                                <div className={styles.column_four}></div>

                                <div className={styles.table}>
                                <div className={styles.firstRow}>
                                <div>Désignation</div>
                                <div>Prix Unitaire</div>
                                <div>Quantité</div>
                                <div>Montant</div>
                                </div>

                                <div className={styles.invoiceLineRow}>
                                <div>FRAIS DE REALISATION (B)</div>
                                <div>20 000</div>
                                <div>1</div>
                                <div>20 000</div>
                                </div>

                                </div>


                            </div>
                            <div className={styles.fourthContainer}>
                                <div className={styles.firstColumn}>
                                    <div>
                                        <p>CODE MECeF/DGI</p>
                                        <p>5OAU-FFIB-JMQL-3QHC-TC6J-N6O4</p>
                                        <p>MECeF NIM <span>ED03002255</span></p>
                                        <p>MECeF Compteurs <span>195/334 FV</span></p>
                                        <p>MECeF Heure <span>19/09/2023 13:11:00</span></p>
                                    </div>
                                    <div>
                                        qrcode
                                    </div>
                                </div>
                                <div className={styles.secondColumn}>
                                    <div>
                                        <p>TOTAL HT</p>
                                        <p>{product.exTaxTotal}</p>
                                    </div>
                                    <div>
                                        <p>TOTAL TVA</p>
                                        <p>{product.taxTotal}</p>
                                    </div>
                                    <div>
                                        <p>NET A PAYER</p>
                                        <p>{product.inTaxTotal}</p>
                                    </div>
                                </div>
                            </div>
                            <p>Arrêté la présente facture à la somme de vingt trois mille six cents FCFA</p>
                            <p>Romaric NOUGBOGNONHOU</p>
                            </div>
                            <button onClick={() => {toPDF(); setShowActionsIndex(null); showModal(false)}}><Icon>download</Icon></button>
                            <button onClick={() => {setShowActionsIndex(null); showModal(false)}}><Icon>cancel</Icon></button>

                        </div>

                    </div>
                </div>
            </div>

            ))
        }
    </div>
    <div className={styles.total}>
        <p>Total : {totalProducts} articles</p>
        <div><span onClick={() => updatePagination("decrease")}><Icon>keyboard_arrow_left</Icon></span> {pagination} <span onClick={() => updatePagination("increase")}><Icon>keyboard_arrow_right</Icon></span></div>
    </div>
</Box>
</MDBox>
</DashboardLayout>

{
    showCompanyModal == true?
    <CompanyEdit submit={submit} close={setShowCompanyModal}/>: null
}
</>
)
}

export default Invoices