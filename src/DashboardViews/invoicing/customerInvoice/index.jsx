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
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


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
    const [selectedProducts, setSelectedProducts] = useState([])
    const [paymentMode, setPaymentMode] = useState([])
    const [paymentCondition, setPaymentCondition] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [companies, setCompanies] = useState([])
    const [productQuantity, setProductQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(null)
    const [variousQuantity, setVariousQuantity] = useState([])
    const [allApprPrice, setAllApprPrice] = useState([])
    const [totalIndexPrices, setTotalIndexPrices] = useState([])
    let cookie = window.localStorage.getItem("cookie")
    const navigate =  useNavigate()
    let    exTaxTotal, inTaxTotal, taxTotal, addressStr = "";
    const [companyId, setCompanyId] = useState("")
    const [currency, setCurrency] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [paymentConditionId, setPaymentConditionId] = useState("")
    const [paymentModeId, setPaymentModeId] = useState("")
    const [invoiceLineList, setInvoiceLineList] = useState([])
    const [isValidated, setIsvalidated] = useState([])


    const formData = {
        "currencyId": currency,
        "paymentCondition": paymentConditionId,
        "paymentModeId": paymentModeId,
        "invoiceLineList": invoiceLineList,
        "partnerId": selectedClient?.id,
        "companyId": companyId,
        "dueDate": dueDate,
        "exTaxTotal": exTaxTotal,
        "inTaxTotal": totalPrice,
        "taxTotal": taxTotal,
        "addressStr": addressStr
    }

    function submit (){
        
        axios.post("http://localhost:9000/api/invoice/create", formData , {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            console.log(res.data);
            toast.success('your invoice has been created successfully')
            navigate("/account/invoice")
        })
        .catch(err => {
            console.log(err);
        })
        console.log(formData);
    }

    function addProducts_to_line(data){
        setSelectedProduct(data)
        let isAvailable = false;
        let Pindex;
        for (let index = 0; index < selectedProducts.length; index++) {
            const element = selectedProducts[index];
            if (element.id == data.id) {
                isAvailable = true;
                Pindex = index
            }
        }
        if (isAvailable) {
            let quantities = variousQuantity.map((quantity, i) => {
                if (i == Pindex) {
                    return quantity + 1;
                }else{
                    return quantity
                }
            })
            let totals = allApprPrice.map((price, i) => {
                if (i == Pindex) {
                    let sum =  price * quantities[Pindex];
                    return sum.toFixed(2);
                }else{
                    return totalIndexPrices[i]
                }
            })
            console.log(quantities);
            setTotalIndexPrices(totals)
            setVariousQuantity(quantities)
            console.log(variousQuantity);
            
        }else{

            setSelectedProducts([
                ...selectedProducts,
                data
            ])
            setVariousQuantity([
                ...variousQuantity,
                1
            ])
            setAllApprPrice([
                ...allApprPrice,
                parseInt(data.salePrice).toFixed(2)
            ])
            setTotalIndexPrices([
                ...totalIndexPrices,
                parseInt(data.salePrice).toFixed(2)
            ])
            setIsvalidated([
                ...isValidated,
                "false"
            ])
        }
        // setInvoiceLineList([
        //     ...invoiceLineList,
        //     data.id
        // ])
        if(totalPrice == null){
            setTotalPrice(parseInt(data?.salePrice))
        }else{
            let total = parseInt(totalPrice) + parseInt(data?.salePrice)
            setTotalPrice(total)
        }
        console.log(isValidated);
    }

    function updateIndexQuantity(index){
        let quantities = variousQuantity.map((quantity, i) => {
            if (i == index) {
                return quantity + 1;
            }else{
                return quantity
            }
        })
        let totals = allApprPrice.map((price, i) => {
            if (i == index) {
                let sum =  price * quantities[index];
                return sum.toFixed(2);
            }else{
                return totalIndexPrices[i]
            }
        })
        let tp = 0;
        for (let i = 0; i < totals.length; i++) {
            let total = totals[i];
            total = parseInt(total)
            tp = total + tp;
            tp = parseInt(tp)
            
        }
        setTotalPrice(tp)
        setTotalIndexPrices(totals)
        setVariousQuantity(quantities)
        console.log(quantities);
    }
    
    function simplifyData(){
        let prices = allApprPrice.map((price, i) => {
            let mPrice = parseInt(price)
            mPrice = mPrice.toFixed(2)
            return mPrice
        })
        setAllApprPrice(prices)
        // setTotalIndexPrices([])
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

        axios.get("http://localhost:9000/api/model/data/com.axelor.apps.account.db.PaymentCondition", {
            headers: {
                cookiee: cookie.toString()
            }
        })
        .then(res => {
            let paymentCondition = res.data.data;
            setPaymentCondition(paymentCondition)
            console.log("payment methods", paymentCondition);
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

    function deleteInfo(props, id, index){

        if (props == "client") {
            setSelectedClient(null)
        }else{
            let filter_products = selectedProducts.filter(item => {
                return item.id != id;
            })
            let filter_quantity = variousQuantity.filter((item, i) => {
                if(i != index){

                    return item
                }
            })
            let filter_apprPrice = allApprPrice.filter((item, i) => {
                if(i != index){

                    return item
                }
            })
            let filter_validateStatus = isValidated.filter((item, i) => {
                if (i != index) {
                    return item
                }
            })
            
            setTotalPrice(totalPrice - totalIndexPrices[index] )
            let filter_totalPrice = totalIndexPrices.filter((item, i) => {
                if(i != index){
                    
                    return item
                }
            })
            console.log(filter_validateStatus);
            setSelectedProducts(filter_products)
            setVariousQuantity(filter_quantity)
            setAllApprPrice(filter_apprPrice)
            setTotalIndexPrices(filter_totalPrice)
            setIsvalidated(filter_validateStatus)
        }
    }

    
    function submitProduct(fields) {
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
            setSelectedProduct(res.data.data[0])
            toast.success("product has been created")
            setShowProductModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }
    function submitClient(fields) {
        const formData = {}
        fields.forEach(field => {
            formData[field.name] = field.value
        })
        axios.post("http://localhost:9000/api/partner/${partner}/create", formData, {
            headers: {
                cookiee: cookie.toString()
            }
        }).then(res => {
            console.log(res);
            setSelectedClient(res.data.data[0])
            toast.success("Partner/client has been created")
            setshowCustomerModal(false)
            document.body.style.overflowY = "scroll";
        }).catch(err => console.log(err))
    }

    function validateProduct(productName, qty, unitId, price, productId, index){
        let formData = {
                productName,
                qty,
                unitId,
                price,
                productId
            }
            let validStatus = isValidated.map((item, i) => {
                if (i == index) {
                    return "true";
                }
                return item;
            })
            setIsvalidated(validStatus)
            axios.post("http://localhost:9000/api/invoiceline", formData , {
                headers: {
                    cookiee: cookie.toString()
                }
            })
            .then(res => {
                let invoiceLineId = res.data.data[0].id;
                setInvoiceLineList([
                    ...invoiceLineList,
                    invoiceLineId
                ])
                console.log(invoiceLineId);
            })
            .catch(err => {
                console.log(err);
            })

            
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
                    <h3>{totalPrice || allApprPrice[0]} €</h3>
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
                selectedProducts.length == 0?
                null:
                selectedProducts.map((item, index) => (

                <div key={index} className={styles.productList}>
                    <p><span>{index + 1}</span>{item?.name}</p>
                    <div>
                        <p>{variousQuantity[index]}</p>
                        <p>{allApprPrice[index]}</p>
                        <p>{totalIndexPrices[index]} € </p>
                    </div>
                </div>
                ))
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
            
        <div className={clicked == "second"? styles.searchBox: styles.hide}>
            <div>
                {
                    showList != ""?
                    <SearchListBox data={products} select={addProducts_to_line} />:
                    null
                }
                <input onFocus={() => show("second")} onBlur={() => {setTimeout(() => {hide("second")}, 500)}} placeholder='Rechercher un article existant' type="text" />
                <Icon className={styles.inputIcon}>search</Icon>
                <span  onClick={() => showModal("product")} className={styles.button}><Icon className={styles.buttonIcon}>add</Icon></span>
            </div>
        </div>
        {
        selectedProducts.length != 0?
        selectedProducts.map((item, index) => (

        <div key={index} className={clicked == "second"? styles.displayProduct: styles.hide}>
            <div>
                <div className={styles.firstRow}>
                    <div className={styles.quantity}>
                        <span onClick={() => updateQuantity("decrease")}>-</span>
                        <span>{variousQuantity[index]}</span>
                        <span onClick={() => updateIndexQuantity(index)}>+</span>
                    </div>
                    <div className={styles.info}>
                        <p>{item.name}</p>
                        <p>{totalIndexPrices[index]} € par article</p>
                    </div>
                    <Icon className={styles.DPicon}>edit</Icon>
                </div>
                <hr />
                <div className={styles.secondRow}>
                    <div className={styles.info}>
                        <p>{item.dtype}</p>
                        <p>x {variousQuantity[index]} = {totalIndexPrices[index]} € </p>
                    </div>
                    <div className={styles.function}>
                        <Icon onClick={() => deleteInfo("product", item.id, index)} className={styles.icon}>delete</Icon>
                        {
                            isValidated[index] == "true"?
                            <span><Icon className={styles.checkIcon}>check_circle_outline</Icon>&nbsp;<p>validated</p></span>
                            :
                            <span onClick={() => validateProduct(item.name, variousQuantity[index], item.unit.id || null, item.salePrice, item.id, index)} className={styles.button}>Valider</span>
                        }
                    </div>
                </div>
            </div>
        </div>

        )): null
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
                        
                        <FormLabel className={styles.formLabel}>Date d&apos;échéance</FormLabel>
                        <DatePicker onChange={(newDate) => setDueDate( newDate.format('YYYY-MM-DD') )}  value={dueDate}  defaultValue={dayjs('2022-04-17')} />
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
                        onChange={e => setCurrency(e.target.value)}
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
                        onChange={e => setCompanyId(e.target.value)}
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
                        onChange={e => setPaymentConditionId(e.target.value)}
                        >
                            
                            <MenuItem><em>Selectionnez dans la liste</em></MenuItem>
                            {
                                paymentCondition?.map((data, index) => (

                                <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
                                ))
                            }
                        </Select>
            </FormControl>
             {/* methods of payment checkbox field */}
            <FormControl className={styles.formControl}  sx={{width: '100%' }}>
                        <FormLabel className={styles.formLabel} >Type(s) de paiement(s) souhaité(s) </FormLabel>
                        {/* <FormGroup onChange={e => setPaymentModeId(e.target.value)}  className={styles.formGroup}>
                            {
                                paymentMode?.map((data, index) => (
                                    <FormControlLabel
                                        className={styles.formControlLabel}
                                        key={index}
                                        control={
                                        <Checkbox value={data.id}   name={data.name} />
                                        }
                                        label={data.name}
                                    />
                                ))
                            }
                        </FormGroup> */}
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
                        onChange={e => setPaymentModeId(e.target.value)}
                        id="demo-simple-select"
                        >
                            <MenuItem ><em>sélectionner une enterprise</em></MenuItem>
                            {
                                paymentMode?.map((data, index) => (

                                <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
                                ))
                            }
                        </Select>
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
        <button onClick={() => submit()}>Finaliser</button>
    </div>
</Box>
</MDBox>
</DashboardLayout>

{
    showClientModal == true?
    <ClientEdit submit={submitClient} close={setShowClientModal}/>: 
    showProductModal == true?
    <ProductEdit submit={submitProduct} close={setShowProductModal}/>: null
}
</>
)

}


export default InvoiceCustomer;