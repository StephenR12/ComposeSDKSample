/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/ecommerce/orders/order-list/data/dataTableData";

// Sisense
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "sisense/Schemas/ecommerce-master";
import { Data, measures, filters } from "@sisense/sdk-data";

function SisenseOrderList(): JSX.Element {
  const [menu, setMenu] = useState(null);

  const openMenu = (event: any) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDButton variant="gradient" color="info">
            new order
          </MDButton>
          <MDBox display="flex">
            <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark">
                <Icon>block</Icon>
                &nbsp;Clear Filters
              </MDButton>
            </MDBox>
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[
              DM.Commerce.Transaction_ID,
              DM.Commerce.Transaction_Date.Days,
              DM.Commerce.Status,
              DM.Commerce.CustomerName,
              DM.Product.ProductName,
            ]}
            measures={[measures.sum(DM.Commerce.Revenue, "Total Revenue")]}
            filters={[
              filters.members(DM.Commerce.Country, [
                "United States",
                "Germany",
                "United Kingdom",
                "Brazil",
              ]),
              //filters.members(DM.Commerce.CustomerName, ["Angela Perez"]),
            ]}
          >
            {(data: Data) => {
              console.log("Order Table Query Data From Sisense");
              console.log(data);
              const sisenseTableData = TranslateSisenseDataToTable(data);
              //get column inforamation from dataTableData and replace rows with sisense data
              dataTableData.rows = sisenseTableData;
              return <DataTable table={dataTableData} entriesPerPage={false} canSearch />;
            }}
          </ExecuteQuery>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

interface Row {
  [key: string]: any;
}
interface TranslatedRow {
  id: string;
  date: string;
  status: string;
  customer: (
    | string
    | {
        image: any;
      }
  )[];
  product: string;
  revenue: string;
}

function TranslateSisenseDataToTable(data: Data) {
  const translatedRows: Array<TranslatedRow> = [];
  data.rows.forEach((row: Row) => {
    //Create image with first letter of name
    var nameWithProfilePic = [row[3].text, { image: row[3].text.charAt(0) }];
    const translatedRow: TranslatedRow = {
      id: "#".concat(row[0].text),
      date: row[1].text,
      status: row[2].text.toLowerCase(),
      customer: nameWithProfilePic,
      product: row[4].text,
      revenue: "$".concat(row[5].data.toLocaleString("en-US", { maximumFractionDigits: 2 })),
    };
    translatedRows.push(translatedRow);
  });
  console.log("Order List Table");
  console.log(translatedRows);
  return translatedRows;
}

export default SisenseOrderList;
