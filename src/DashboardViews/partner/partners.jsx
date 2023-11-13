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
import dayjs from "dayjs"



const Partners = () => {
    const [showList, setShowList] = useState("")
    const [partners, setPartners] = useState([])
    const [totalPartners, setTotalPartners] = useState(null)
    const [showPartnerModal, setshowPartnerModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    const cookie = window.localStorage.getItem("cookie")
    const [showActionsIndex, setShowActionsIndex] = useState(null)

    function getPartners(pageNumber){
        axios.get("http://localhost:9000/api/partner", {
            headers: {
                cookiee: cookie.toString(),
                pagination: pageNumber || 0
            }
        })
        .then(res => {
            let partners = res.data.data;
            setTotalPartners(res.data.total)
            setPartners(partners)
            console.log(partners);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }

    function delete_partner(id){

        
        axios.delete(`http://localhost:9000/api/partner/${id}`, {
            headers: {
                cookiee: cookie.toString()
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.status == -1) {
                
                return toast.error(res.data.data.message)
            }
            let filter_partners = partners.filter(item => {
                return item.id != id;
            })
            setPartners(filter_partners)
            setTotalPartners(totalPartners - 1)
            toast.success("partner has been deleted successfully")
        }).catch(error => console.log(error))
    }

    function show_actions(index){
        if(index == showActionsIndex){
            setShowActionsIndex(null)
        }else{
            setShowActionsIndex(index)
        }
    }

    useEffect(() => {
        getPartners()
    }, [])

    function showModal(props){
        document.body.style.overflowY = "hidden"
        if(props == "product"){
            setshowPartnerModal(true)
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
                getPartners(page)
            }
            else if (pagination > 1) {
                let page = pagination - 1;
                setPagination(page)
                getPartners(page)
            }
    }

    function submit(fields) {
        const formData = {}
        
        fields.forEach(field => {
            if (field.type == "checkbox") {
                field.checkbox.forEach(checkbox => {
                    formData[checkbox.name] = checkbox.value
                })
            }else{
                formData[field.name] = field.value
            }
        })

        // return console.log(formData);
        axios.post("http://localhost:9000/api/partner/create", formData, {
            headers: {
                cookiee: cookie.toString()
            }
        }).then(res => {
            console.log(res);
            getPartners()
            toast.success("Partner has been created")
            setshowPartnerModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        getPartners()
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
                <div>phone</div>
                <div>language</div>
                <div>Date de création</div>
            </div>
            <div>Actions</div>
        </div>
        {
            partners?.map((partner, index) => (

            <div key={index} className={styles.product}>
                <div className={styles.name}>
                    <span className={styles.iconCont}><Icon>event_note</Icon></span>
                    <div className={styles.text}>
                        <p>{partner.fullName}</p>
                        <p>Client email: {partner.emailAddress?.name}</p>
                    </div>
                </div>
                <div className={styles.midCont}>
                    <div>{partner.mobilePhone || "---"}</div>
                    <div>{partner.language?.name || "---"}</div>
                    <div>{dayjs(partner.createdOn).format('YYYY-MM-DD')}</div>
                </div>
                <div>
                    <Icon onClick={() => show_actions(index)}>more_vert</Icon>
                    <div className={showActionsIndex == index ? styles.actions: styles.hide}>

                    <div><Icon>edit</Icon> modifier</div>
                    <div onClick={() => delete_partner(partner.id)}><Icon>delete</Icon> supprimer</div>
                    <div onClick={() => showModal(true)}><Icon>print</Icon> exporter</div>

                    </div>
                </div>
            </div>

            ))
        }
    </div>
    <div className={styles.total}>
        <p>Total : {totalPartners} Partners</p>
        <div><span onClick={() => updatePagination("decrease")}><Icon>keyboard_arrow_left</Icon></span> {pagination} <span onClick={() => updatePagination("increase")}><Icon>keyboard_arrow_right</Icon></span></div>
    </div>
</Box>
</MDBox>
</DashboardLayout>

{
    showPartnerModal == true?
    <PartnerEdit submit={submit} close={setshowPartnerModal}/>: null
}
</>
)
}

export default Partners