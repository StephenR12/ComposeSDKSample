import { LineChart, ExecuteQuery, PieChart } from "@sisense/sdk-ui";
import * as DM from "../connected/sample-ecommerce";

import { Data, measures } from "@sisense/sdk-data";

import { ArrowUpIcon } from "@heroicons/react/24/solid";

import NivoPieChart from "../ken/Portfolio/PieChart";
import PortfolioTable from "../ken/Portfolio/Table";

export default function Portfolio() {

  return (
    <div className="container">
        <div className="rounded-box" style={{backgroundColor:"#FFFFFF"}}>
          <h2 style={{color:"black"}}>Portfolio Composition</h2>
          <div style={{display:"inline-flex", alignItems: "center"}}>
            <NivoPieChart/>
            <PortfolioTable/>
          </div>
        </div>
      </div>
  )
}