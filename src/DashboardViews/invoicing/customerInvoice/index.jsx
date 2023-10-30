import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import styles from './index.module.scss'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from 'components/MDBox';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Icon, MenuItem, Select } from '@mui/material';
import logo from '../../../images/logo.png'
import { useEffect, useState } from 'react';
import { SearchListBox } from 'DashboardViews/components';
import axios from 'axios';
import { ClientEdit } from 'components/dataEdit';
import { ProductEdit } from 'components/dataEdit';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


const InvoiceCustomer = () => {
    const [clicked, setClicked] = useState('')
    const [clients, setClients] = useState(null)
    const [products, setProducts] = useState(null)
    const [email, setEmail] = useState(null)
    const [showList, setShowList] = useState('')
    const [showClientModal, setShowClientModal] = useState(false)
    const [showProductModal, setShowProductModal] = useState(false)
    const [selectedClient, setSelectedClient] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [paymentMode, setPaymentMode] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [companies, setCompanies] = useState([])
    const [productQuantity, setProductQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(null)
    const [apprPrice, setApprPrice] = useState(null)
    
    
    function simplifyData(){
        let price = parseInt(selectedProduct?.salePrice)
        price = price.toFixed(2)
        setApprPrice(price)
        setTotalPrice(null)
        setProductQuantity(1)
    }
    function updateQuantity(props){
        if (props == "increase") {
            let quantity = productQuantity + 1;
            setProductQuantity(quantity)
            let total = selectedProduct?.salePrice * quantity;
            total = total.toFixed(2)
            console.log(total);
            setTotalPrice(total)
        }
        else {
            let quantity = productQuantity > 1? productQuantity - 1: 1;
            setProductQuantity(quantity)
            let total = selectedProduct?.salePrice * quantity;
            total = total.toFixed(2)
            setTotalPrice(total)
        }
    }

    function showModal(props){
        document.body.style.overflowY = "hidden"
        if(props == "client"){
            setShowClientModal(true)
        }
        if(props == "product"){
            setShowProductModal(true)
        }
    }

    function open(props){
        if(props == "first" && clicked != "first"){
            setClicked("first")
        }else if(props == "first" && clicked == "first"){
            setClicked("")
        }
        if(props == "second" && clicked != "second"){
            setClicked("second")
        }else if(props == "second" && clicked == "second"){
            setClicked("")
        }
        if(props == "third" && clicked != "third"){
            setClicked("third")
        }else if(props == "third" && clicked == "third"){
            setClicked("")
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
    
    function select(data){

    }

    function getEmail(){
        axios.get(`http://localhost:9000/api/model/data/com.axelor.apps.message.db.EmailAddress/${selectedClient?.emailAddress?.id}`, {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            setEmail(res.data.data[0].address)
        })
        .catch(err => {
            console.log(err);
        })
    }

    let cookie = window.localStorage.getItem("cookie")
    function get_payment_mode_and_currencies(){
        axios.get("http://localhost:9000/api/model/data/com.axelor.apps.account.db.PaymentMode", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let paymentModes = res.data.data;
            setPaymentMode(paymentModes)
            console.log("payment methods", paymentModes);
        })
        .catch(err => {
            console.log(err, cookie);
        })

        axios.get("http://localhost:9000/api/currency", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let currency = res.data.data;
            setCurrencies(currency)
            console.log("currencies", currency);
        })
        .catch(err => {
            console.log(err, cookie);
        })
        
        axios.get("http://localhost:9000/api/company", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let company = res.data.data;
            setCompanies(company)
            console.log("companies", company);
        })
        .catch(err => {
            console.log(err, cookie);
        })
        
    }

    function get_Clients_and_products(){
        axios.get("http://localhost:9000/api/partner", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let clientss = res.data.data;
            setClients(clientss)
            console.log(clientss);
        })
        .catch(err => {
            console.log(err, cookie);
        })

        axios.get("http://localhost:9000/api/product", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let productss = res.data.data;
            setProducts(productss)
            console.log("producst", productss);
        })
        .catch(err => {
            console.log(err, cookie);
        })
    }

    function deleteInfo(props){
        if (props == "client") {
            setSelectedClient(null)
        }else(
            setSelectedProduct(null)
        )
    }
    useEffect(() => {
        getEmail()
        console.log(selectedClient);
    }, [selectedClient])

    useEffect(() => {
        // addProductToArr()
        simplifyData()
        console.log(selectedProduct);
    }, [selectedProduct])

    useEffect(() => {
        get_Clients_and_products()
        get_payment_mode_and_currencies()
    }, [])


return(
    <>
<DashboardLayout>
<DashboardNavbar />
<MDBox sx={{ flexGrow: 1}} mt={2} >
<Box className={styles.container}>
    <div className={styles.firstHalf}>
        
        <div className={styles.indicate}>
            <div><span></span><p>Brouillon</p></div>
            <div><p>Votre facture est automatiquement enregistrée </p></div>
            <div><button>Supprimer ce brouillon </button></div>
        </div>

        <div className={styles.info}>
            <div className={styles.user}>
                <div>
                <p><b>Tantchonta M&apos;PO EI</b></p>
                <p>23 Rue Franklin, 23 Rue Franklin 69120 VAULX-EN-VELIN</p>
                <p>0749471096 | tantchonta.mpo@pivotech.xyz</p>
                <span><label htmlFor="">SIRET:&nbsp;</label>840 151 500 00013</span>
                </div>
                {
                    selectedProduct == null?
                    null:
                <div>
                    <h5>Montant Total</h5>
                    <h3>{totalPrice || apprPrice} €</h3>
                </div>
                }
            </div>
            <div className={styles.facture}>
                <h3>Facture</h3>
                <span>#2023-9-0001</span>
            </div>
            {
                selectedClient == null? null:
            <div className={styles.partnerInfo}>
                <div>
                    <label htmlFor="">Adresse de facturation</label>
                    <h3>{selectedClient.simpleFullName}</h3>
                    <p>{selectedClient.mainAddress || "***** ******************** *****  ******"}</p>
                    <span><label htmlFor="">TEL:&nbsp;</label><p>{selectedClient.mobilePhone}</p></span>
                    <span><label htmlFor="">EMAIL:&nbsp;</label><p>{email}</p></span>
                </div>
            </div>
            }

            <hr />

            <div className={styles.factureInfo}>
                <span>
                    <strong>Date de facture </strong>
                    <p>28/09/2023</p>
                </span>
                <span>
                    <strong>Date de livraison</strong>
                    <p>28/09/2023</p>
                </span>
                <span>
                    <strong>Conditions de règlement </strong>
                    <p>-</p>
                </span>
                <span>
                    <strong>Échéance de paiement</strong>
                    <p>-</p>
                </span>
            </div>

        </div>

        <div className={styles.total}>
            <div className={styles.article}>
                <p>NºArticle </p>
                <div>
                    <p>Quantité</p>
                    <p>Prix unité</p>
                    <p>Total</p>
                </div>
            </div>
            {
                selectedProduct == null?
                null:
            <div className={styles.productList}>
                <p><span>1</span>{selectedProduct?.name}</p>
                <div>
                    <p>{productQuantity}</p>
                    <p>{apprPrice || selectedProduct?.price}</p>
                    <p>{totalPrice == null ? apprPrice: totalPrice} € </p>
                </div>
            </div>
            }
        </div>


    </div>
    <div className={styles.secondHalf}>
        <div className={styles.logoContainer}>
            <img src={logo} alt="" />
        </div>
        <div onClick={() => open("first")} className={clicked == "first"? styles.clicked: null}>
            <span className={styles.listNumber}>1</span>
            <p className={styles.label}>Informations du client</p>
            {
                clicked == "first"?
                <Icon className={styles.icon}>keyboard_arrow_up</Icon>:
                <Icon className={styles.icon}>keyboard_arrow_down</Icon>
            }
        </div>
        {
            selectedClient == null?
        <div className={clicked == "first"? styles.searchBox: styles.hide}>
            <div>
                {
                    showList != ""?
                    <SearchListBox select={setSelectedClient} data={clients} />:
                    null
                }
                <input onFocus={() => show("first")} onBlur={() => {setTimeout(() => {hide("first")}, 500)}} placeholder='Rechercher un client existant' type="text" />
                <Icon className={styles.inputIcon}>search</Icon>
                <span onClick={() => showModal("client")} className={styles.button}><Icon className={styles.buttonIcon}>add</Icon></span>
            </div>
        </div>:
        <>
        <div className={clicked == "first"? styles.displayClient: styles.hide}>
            <div>
                <p>Facturé à</p>
                <div>
                    <div>
                        <span>
                        <Icon className={styles.editIcon}>edit</Icon>
                        </span>
                        <span>
                        <Icon onClick={() => deleteInfo("client")} className={styles.deleteIcon}>delete</Icon>
                            <p>{selectedClient.simpleFullName}</p>

                        </span>

                    </div>
                </div>
            </div>
        </div>
            <div className={clicked == "first"? styles.livraison: styles.hide}>
                <div>   
                <p>Adresse de livraison (optionnelle)</p>
                <span><Icon className={styles.addIcon}>add_circle</Icon>&nbsp;<p>Ajouter</p></span>
                </div>
            </div>
        </>
        }

        <div onClick={() => open("second")} className={clicked == "second"? styles.clicked: null}>
        <span className={styles.listNumber}>2</span>
            <p className={styles.label}>Produits et services facturés </p>
            {
                clicked == "second"?
                <Icon className={styles.icon}>keyboard_arrow_up</Icon>:
                <Icon className={styles.icon}>keyboard_arrow_down</Icon>
            }
        </div>
        {
            selectedProduct == null?
        <div className={clicked == "second"? styles.searchBox: styles.hide}>
            <div>
                {
                    showList != ""?
                    <SearchListBox data={products} select={setSelectedProduct} />:
                    null
                }
                <input onFocus={() => show("second")} onBlur={() => {setTimeout(() => {hide("second")}, 500)}} placeholder='Rechercher un article existant' type="text" />
                <Icon className={styles.inputIcon}>search</Icon>
                <span  onClick={() => showModal("product")} className={styles.button}><Icon className={styles.buttonIcon}>add</Icon></span>
            </div>
        </div>:
        <div className={clicked == "second"? styles.displayProduct: styles.hide}>
            <div>
                <div className={styles.firstRow}>
                    <div className={styles.quantity}>
                        <span onClick={() => updateQuantity("decrease")}>-</span>
                        <span>{productQuantity}</span>
                        <span onClick={() => updateQuantity("increase")}>+</span>
                    </div>
                    <div className={styles.info}>
                        <p>{selectedProduct.fullName}</p>
                        <p>{totalPrice == null ? apprPrice: totalPrice} € par article</p>
                    </div>
                    <Icon className={styles.DPicon}>edit</Icon>
                </div>
                <hr />
                <div className={styles.secondRow}>
                    <div className={styles.info}>
                        <p>Développement web</p>
                        <p>x {productQuantity} = {totalPrice == null ? apprPrice: totalPrice} € </p>
                    </div>
                    <div className={styles.function}>
                        <Icon onClick={() => deleteInfo("product")} className={styles.icon}>delete</Icon>
                        <span className={styles.button}>Valider</span>
                    </div>
                </div>
            </div>
        </div>
        }
        <div onClick={() => open("third")} className={clicked == "third"? styles.clicked: null}>
            <span className={styles.listNumber}>3</span>
            <p className={styles.label}>Livraison et paiement </p>
            <Icon className={styles.icon}>{clicked != "third" ? "keyboard_arrow_down": "keyboard_arrow_up"}</Icon>
        </div>
        <div className={clicked == "third"? styles.liv_et_payment: styles.hide} >
            <form action="">
                {/* date input field */}
            <FormControl className={styles.formControl}  sx={{width: '100%' }} >
                        
                        <FormLabel className={styles.formLabel}>Date de livraison</FormLabel>
                        <DatePicker  defaultValue={dayjs('2022-04-17')} />
            </FormControl>
             {/* currency select field */}
            <FormControl className={styles.formControl}  sx={{width: '100%' }} >
                        
                        <FormLabel className={styles.formLabel}>Devise</FormLabel>
                        <Select className={styles.select}
                        sx={{ 
                            color: "black",
                            // padding: '0.70em',
                            '.MuiSelect-icon': {
                                display: 'block',
                            },
                            '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                                padding: '0.70em !important',
                            }
                        }}
                        displayEmpty
                        id="demo-simple-select"
                        >
                            <MenuItem ><em>sélectionner une devise</em></MenuItem>
                            {
                                currencies?.map((currency, index) => (

                                <MenuItem key={index} value={currency.id}>{currency.name}</MenuItem>
                                ))
                            }
                        </Select>
            </FormControl>
             {/* company select field */}
            <FormControl className={styles.formControl}  sx={{width: '100%' }} >
                        
                        <FormLabel className={styles.formLabel}>Enterprise</FormLabel>
                        <Select className={styles.select}
                        sx={{ 
                            color: "black",
                            // padding: '0.70em',
                            '.MuiSelect-icon': {
                                display: 'block',
                            },
                            '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                                padding: '0.70em !important',
                            }
                        }}
                        displayEmpty
                        id="demo-simple-select"
                        >
                            <MenuItem ><em>sélectionner une enterprise</em></MenuItem>
                            {
                                companies?.map((companies, index) => (

                                <MenuItem key={index} value={companies.id}>{companies.name}</MenuItem>
                                ))
                            }
                        </Select>
            </FormControl>
            {/* conditions select field */}
            <FormControl className={styles.formControl}  sx={{width: '100%' }} >
                        
                        <FormLabel className={styles.formLabel}>Conditions de règlement</FormLabel>
                        <Select className={styles.select}
                        sx={{ 
                            color: "black",
                            // padding: '0.70em',
                            '.MuiSelect-icon': {
                                display: 'block',
                            },
                            '.css-1cohrqd-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                                padding: '0.70em !important',
                            }
                        }}
                        id="demo-simple-select"
                        displayEmpty
                        >
                            
                            <MenuItem  ><em>Selectionnez dans la liste</em></MenuItem>
                                <MenuItem  value={"Immediat"}>Immediat</MenuItem>
                                <MenuItem  value={"10 jours"}>10 jours</MenuItem>
                                <MenuItem  value={"15 jours"}>15 jours</MenuItem>
                                <MenuItem  value={"20 jours"}>20 jours</MenuItem>
                                <MenuItem  value={"30 jours"}>30 jours</MenuItem>
                                <MenuItem  value={"45 jours"}>45 jours</MenuItem>
                                <MenuItem  value={"60 jours"}>60 jours</MenuItem>
                        </Select>
            </FormControl>
             {/* methods of payment checkbox field */}
            <h3>Méthodes de paiement </h3>
            <FormControl className={styles.formControl}  component="fieldset" variant="standard">
                        <FormLabel className={styles.formLabel} component="legend">Type(s) de paiement(s) souhaité(s) </FormLabel>
                        <FormGroup className={styles.formGroup}>
                            {
                                paymentMode?.map((data, index) => (
                                    <FormControlLabel
                                        className={styles.formControlLabel}
                                        key={index}
                                        control={
                                        <Checkbox   name={data.name} />
                                        }
                                        label={data.name}
                                    />
                                ))
                            }
                        </FormGroup>
          </FormControl>
            </form>
        </div>
        <div className={styles.nouveau}>
            <span className={styles.iconContainer} ><Icon>format_list_bulleted</Icon></span>
            <div>
                <b>Ajouter cette facture à mes tâches</b>
                <p>En activant cette option, si la facture n’a pas été payée avant l’échéance de paiement, un rappel sera ajouté à vos tâches. </p>
            </div>
            <input type="radio" name="" id="" />
        </div>
        <button>Finaliser</button>
    </div>
</Box>
</MDBox>
</DashboardLayout>

{
    showClientModal == true?
    <ClientEdit close={setShowClientModal}/>: 
    showProductModal == true?
    <ProductEdit close={setShowProductModal}/>: null
}
</>
)

}


export default InvoiceCustomer;