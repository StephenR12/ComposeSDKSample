import { LineChart, ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../connected/sample-ecommerce";

import { Data, measures } from "@sisense/sdk-data";

import { ArrowUpIcon } from "@heroicons/react/24/solid";

interface Row { 
  [key:string]: any
}

export default function StatCard() {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[]}
      measures={[
        measures.sum(DM.Commerce.Revenue, "Total Revenue"), 
        measures.sum(DM.Commerce.Quantity, "Total Quantity"), 
        measures.sum(DM.Commerce.Cost, "Total Cost")]}
      filters={[]}
    >
      {(data: Data) => {
        console.log("Indicators Data");
        console.log(data);
        let revenue = 0;
        let quantity = 0;
        let cost = 0;
        const result:Row = data.rows[0];
        if (result[0].data) {
          revenue = result[0].data;
        }
        if (result[1].data) {
          quantity = result[1].data;
        }
        if (result[2].data) {
          cost = result[2].data;
        }  

        return (
          <div className="container">
            <div className="rounded-box" style={{ backgroundColor: "#40A66F" }}>
              <h2>Total Portfolio Value</h2>
              <div className="cards-container">
                <div className="card large" style={{ width: "33%" }}>
                  <div className="statistic">
                    <p className="l-stats-title">Current Value</p>
                    <p className="l-stats-value">${(revenue/100).toFixed(2)}</p>
                    <div
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <ArrowUpIcon
                        width={"2em"}
                        height={"2em"}
                        color={"white"}
                        style={{ verticalAlign: "-1em" }}
                      />
                      <p className="l-stats-secondary">37.8% Net Cash Flow</p>
                    </div>
                  </div>
                </div>
                <div style={{ width: "21%" }}>
                  <p className="s-stats-title">Gain</p>
                  <div className="card small">
                    <p className="s-stats-value">+$77,000.34</p>
                  </div>
                </div>
                <div style={{ width: "21%" }}>
                  <p className="s-stats-title">Return</p>
                  <div className="card small">
                    <div
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <ArrowUpIcon
                        width={"3em"}
                        height={"3em"}
                        color={"white"}
                        style={{ verticalAlign: "-1em" }}
                      />
                      <p className="s-stats-value">56.01%</p>
                    </div>
                  </div>
                </div>
                <div style={{ width: "21%" }}>
                  <p className="s-stats-title">Distribution</p>
                  <div className="card small">
                    <div
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <ArrowUpIcon
                        width={"3em"}
                        height={"3em"}
                        color={"white"}
                        style={{ verticalAlign: "-1em" }}
                      />
                      <p className="s-stats-value">56.01%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ExecuteQuery>
  );
}
