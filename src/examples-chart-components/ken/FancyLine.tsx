import { LineChart, ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../connected/sample-ecommerce";
import { SetStateAction, useState } from "react";

import { Data, measures } from "@sisense/sdk-data";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

import DefaultLineAreaChart from "../ken/FancyLine/DefaultLineChart";
import NivoLineChart from "../ken/FancyLine/NivoLineChart";


export default function FancyLine() {

      //Measure Option Change
  const [measureOption, setMeasureOption] = useState("Revenue");
  const handleMeasureOptionChange = (e: { target: { value: string } }) => {
    setMeasureOption(e.target.value);
  };

  return (
    <div className="container">
        <div className="rounded-box" style={{backgroundColor:"#368DD4", paddingBottom:"0px"}}>
            <div style={{ display: "flex" }}>
                <p style={{color: "white", fontSize: "2em"}}>Net Worth</p>
                <div style={{ marginLeft: "auto",alignItems: "center" }}>
                    <select
                        onChange={handleMeasureOptionChange}
                        style={{ textAlign: "center",fontSize:"2em", borderRadius: "5px" }}
                    >
                        <option value="Revenue">Revenue</option>
                        <option value="Cost">Cost</option>
                        <option value="Quantity">Quantity</option>
                    </select>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <h2>$17.22 M</h2>
                <div className="growth-indicator">
                    <div className="indicator-box">
                        <div style={{display:"inline-flex", alignItems: "center"}}>
                            <ChevronUpIcon width={"2em"} height={"2em"} color={"green"} style={{verticalAlign:"-1em"}}/>
                            <p className="growth-text">2.5M Last 7 Days</p>
                        </div>
                    </div>
                </div>
            </div>
          <div>
            <NivoLineChart measure={measureOption}/>
          </div>
        </div>
      </div>
  )
}