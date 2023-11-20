/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "pages/login/Login";
import SignUp from "pages/register/Register";

// @mui icons
import Icon from "@mui/material/Icon";
import Employees from "DashboardViews/employees";
import Partners from "DashboardViews/partner/partners";
import InvoiceCustomer from "DashboardViews/invoicing/customerInvoice";
import Product from "DashboardViews/products";
import Company from "DashboardViews/company";
import Invoices from "DashboardViews/invoicing/customerInvoice/viewInvoice";
import Entries from "DashboardViews/accounting/entries";
import Payments from "DashboardViews/accounting/payments";
import StockLocations from "DashboardViews/stockLocations";
import StockLocationDetails from "DashboardViews/stockLocations/stocksLocationDetails";
import EntriesLine from "DashboardViews/accounting/entries/EntriesLine";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "dashboard",
  //   component: <Dashboard />,
  // },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "rtl",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "Partner",
    key: "Partners",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "partner",
    component: <Partners />,
  },
  // {
  //   type: "collapse",
  //   name: "Suppliers",
  //   key: "suppliers",
  //   icon: <Icon fontSize="small">warehouse</Icon>,
  //   route: "suppliers",
  //   component: <Suppliers />,
  // },
  {
    type: "collapse",
    name: "Employees",
    key: "employees",
    icon: <Icon fontSize="small">warehouse</Icon>,
    route: "employees",
    component: <Employees />,
  },
  {
    type: "collapse",
    name: "Invoice",
    icon: <Icon fontSize="small">money</Icon>,
    key: "viewInvoice",
    route: "invoice",
    component: <Invoices/>,
  },
  {
    // type: "collapse",
    icon: <Icon fontSize="small">money</Icon>,
    name: "Create",
    key: "createInvoice",
    route: "invoice/create",
    component: <InvoiceCustomer/>
  },
  // {
  //   // type: "collapse",
  //   name: "Invoice",
  //   key: "Invoice",
  //   icon: <Icon fontSize="small">money</Icon>,
  //   collapse: [
  //     {
  //       name: "Invoice",
  //       key: "viewInvoice",
  //       route: "invoice/",
  //       component: <Invoices/>
  //     },
  //     {
  //       name: "Create",
  //       key: "createInvoice",
  //       route: "invoice/create",
  //       component: <InvoiceCustomer/>
  //     }
  //   ]
  // },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    icon: <Icon fontSize="small">request_quote</Icon>,
    route: "product/edit",
    component: <Product/>
  },
  {
    type: "collapse",
    name: "company",
    key: "company",
    icon: <Icon fontSize="small">business</Icon>,
    route: "company/edit",
    component: <Company />
  },
  {
    type: "collapse",
    name: "Emplacement de Stocks",
    key: "stocks",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "stocks",
    component: <StockLocations />
  },
  {
    // type: "collapse",
    name: "Details de Stock",
    key: "stocksDetails",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "stocks/:id",
    component: <StockLocationDetails />,
  },
  {
    type: "title",
    title: "accounting",
    name: "accounting",
    key: "accounting",
  },
  {
    type: "collapse",
    name: "Entries",
    key: "entries",
    route: "accounting/entries",
    icon: <Icon fontSize="small">business</Icon>,
    component: <Entries/>
  },
  {
    // type: "collapse",
    name: "Details de Ecriture",
    key: "Ecriture",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "entries/:id",
    component: <EntriesLine />,
  },
  // {
  //   type: "collapse",
  //   name: "Payments",
  //   key: "payments",
  //   route: "accounting/payments",
  //   icon: <Icon fontSize="small">business</Icon>,
  //   component: <Payments/>
  // }
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
