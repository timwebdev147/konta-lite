import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import styles from './index.module.scss'
import MDBox from "components/MDBox"
import { Box, Icon } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { CompanyEdit } from "components/dataEdit"



const Payments = () => {
    const [showList, setShowList] = useState("")
    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProduct] = useState(null)
    const [showCompanyModal, setShowCompanyModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const [showActionsIndex, setShowActionsIndex] = useState(null)
    const cookie = window.localStorage.getItem("cookie")

    function get_companies(pageNumber){

        axios.get("http://localhost:9000/api/company", {
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
            setShowCompanyModal(true)
        }
    }

    function delete_product(id){

        let filter_product = products.filter(product => {
            return product.id != id;
        })
        setProducts(filter_product)
        setTotalProduct(totalProducts - 1)

        axios.delete(`http://localhost:9000/api/product/delete/${id}`, {
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
        <button onClick={() => showModal("product")} className={styles.button}>Ajouter un nouvel enterprise</button>
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
            products?.map((product, index) => (

            <div key={index} className={styles.product}>
                <div className={styles.name}>
                    <span className={styles.iconCont}><Icon>event_note</Icon></span>
                    <div className={styles.text}>
                        <p>{product.name}</p>
                        <p>company code: {product.code}</p>
                    </div>
                </div>
                <div className={styles.midCont}>
                    <div>{product.ifu || "---"}</div>
                    <div>{product.currency?.code || "---"}</div>
                    <div>04 Sept 2023</div>
                </div>
                <div onClick={() => show_actions(index)}>
                    <Icon>more_vert</Icon>
                    <div className={showActionsIndex == index ? styles.actions: styles.hide}>

                    <div><Icon>edit</Icon> modifier</div>
                    <div onClick={() => delete_product(product.id)}><Icon>delete</Icon> supprimer</div>
                    <div onClick={() => toPDF()}><Icon>print</Icon> exporter</div>

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

export default Payments