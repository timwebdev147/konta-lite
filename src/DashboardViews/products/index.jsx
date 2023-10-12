import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from './index.module.scss'
import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { InvoiceProductEdit } from "components/invoiceEdit"
import { toast } from "react-toastify"



const InvoiceSupplier = () => {
    const [showList, setShowList] = useState("")
    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProduct] = useState(null)
    const [showProductModal, setShowProductModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const cookie = window.localStorage.getItem("cookie")

    function get_products(pageNumber){

        axios.get("http://localhost:9000/api/product", {
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
        if(props == "product"){
            setShowProductModal(true)
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
                get_products(page)
            }
            else if (pagination > 1) {
                let page = pagination - 1;
                setPagination(page)
                get_products(page)
            }
    }

    function submit(fields) {
        const formData = {}
        fields.forEach(field => {
            formData[field.name] = field.value
        })
        axios.post("http://localhost:9000/api/product/create", formData, {
            headers: {
                cookiee: cookie.toString()
            }
        }).then(res => {
            console.log(res);
            get_products()
            toast.success("product has been created")
            setShowProductModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        get_products()
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
        <button onClick={() => showModal("product")} className={styles.button}>Ajouter un nouvel article</button>
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
            <div>Nom de l’article</div>
            <div className={styles.midCont}>
                <div>Quantité facturée</div>
                <div>Prix unitaire</div>
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
                        <p>{product.name}</p>
                        <p>Identifiant article: 0001</p>
                    </div>
                </div>
                <div className={styles.midCont}>
                    <div>0 Unité(s)</div>
                    <div>{parseInt(product.salePrice).toFixed(2)} €</div>
                    <div>04 Sept 2023</div>
                </div>
                <div><Icon>more_vert</Icon></div>
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
    showProductModal == true?
    <InvoiceProductEdit submit={submit} close={setShowProductModal}/>: null
}
</>
)
}

export default InvoiceSupplier