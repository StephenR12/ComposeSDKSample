import { useState } from "react";

import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../../connected/sample-ecommerce";
import { Data, Filter, measures } from "@sisense/sdk-data";

import { MayHaveLabel, ResponsivePie } from "@nivo/pie";

export default function ExecuteQueryChart() {
  return (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[DM.Commerce.AgeRange]}
      measures={[
        measures.sum(DM.Commerce.Revenue, "Total Revenue")
      ]}
      filters={[]}
    >
      {(data: Data) => {
        console.log("Before Transformation Pie Chart");
        console.log(data);
        const nivoData = TranslateSisenseDataToD3(data);

        return (
          <div style={{ height: 600, width: '100%' }}>
            <ResponsivePie
              data={nivoData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.7}
              enableArcLabels={false}
              arcLinkLabel={d => `${d.id} (${d.formattedValue})`}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: "spectral" }}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              animate={false}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />{" "}
          </div>
        );
      }}
    </ExecuteQuery>
  );
}

function TranslateSisenseDataToD3(data: Data) {
    interface Row { 
      [key:string]: any
    }
    type D3Data = Array<MayHaveLabel>;
    
    const d3Data:D3Data = [];
    const ids:Array<string> = [];
    const title = data.columns[1].name;
    data.rows.forEach((row: Row) => {
      
      //If empty add first element with Id
      if (d3Data.length === 0 || !ids.includes(row[0].text)) {
        ids.push(title)
        const d3DataId = {
          label: row[0].text,
          id: row[0].text,
          value: row[1].data.toFixed(2)
        }
        d3Data.push(d3DataId);
      }
      else {
          console.log("Returned empty or incorrect query");
      }
    })
    console.log("After Transformation");
    console.log(d3Data);
  
    //only return one for this exercise
    return d3Data;
  }
