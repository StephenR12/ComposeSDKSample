import { useState } from "react";

import { ButtonGroup } from "../../components/ButtonGroup";
import { ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../connected/sample-ecommerce";
import CodeHighlight from "../../components/CodeHighlight";
import CodeBlock from "../../components/CodeBlock";
import SubTitle from "../../components/SubTitle";
import Paragraph from "../../components/Paragraph";
import { Data, measures } from "@sisense/sdk-data";

import { ResponsiveHeatMap } from "@nivo/heatmap";

export default function ExecuteQueryChart() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="ExecuteQuery">HeatMap Visualization</SubTitle>
            <Paragraph>
              Run the HeatMap chart from Nivo.
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>

        {view === "Preview" && (
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[DM.Commerce.Date.Years, DM.Commerce.Gender]}
            measures={[measures.sum(DM.Commerce.Revenue, 'Total Revenue'), measures.sum(DM.Commerce.Cost, 'Total Cost')]}
            filters={[]}
          >
            {(data: Data) => {
              console.log(data);
              const nivoData = TranslateSisenseDataToD3(data);

              return <div style={{height: 600}}>
             <ResponsiveHeatMap data={nivoData}
              margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
              valueFormat=">-.2s"
              axisTop={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -90,
                  legend: '',
                  legendOffset: 46
              }}
              axisRight={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Gender',
                  legendPosition: 'middle',
                  legendOffset: 70
              }}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Gender',
                  legendPosition: 'middle',
                  legendOffset: -72
              }}
              colors={{
                  type: 'diverging',
                  scheme: 'red_yellow_blue',
                  divergeAt: 0.5,
                  minValue: 0,
                  maxValue: 30000000
              }}
              emptyColor="#555555"
              legends={[
                  {
                      anchor: 'bottom',
                      translateX: 0,
                      translateY: 30,
                      length: 400,
                      thickness: 8,
                      direction: 'row',
                      tickPosition: 'after',
                      tickSize: 3,
                      tickSpacing: 4,
                      tickOverlap: false,
                      tickFormat: '>-.2s',
                      title: 'Revenue →',
                      titleAlign: 'start',
                      titleOffset: 4
                  }
              ]}
              
          /> </div> //add to add div for nivo charts
              // return <LineChart dataSet={data}
              //                  dataOptions={{
              //                    category: [{name: 'Months', type: 'datetime'}],
              //                    value: [{name: 'Total Revenue'}, {name: 'Total Cost'}],
              //                    breakBy: [{name: 'Gender', type: 'string'}],
              //                  }}
              //                  onDataPointClick= {(point, nativeEvent) => {
              //                   console.log('clicked', point, nativeEvent);
              //                 }}
              //         />;
            }}
          </ExecuteQuery>
        )}

        {view === "React" && (
          <CodeBlock language="tsx">
            {
            `// This is not the real React for this chart
import React from "react";
import { BarChart, ExecuteQuery } from "@sisense/sdk-ui";
import { Data, measures } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";

export default function App() {
  return (
    <>
      <ExecuteQuery
        dataSource={DM.DataSource}
        dimensions={[DM.Commerce.Date.Years]}
        measures={[measures.sum(DM.Commerce.Quantity, 'Total Quantity')]}
        filters={[]}
      >
        {(data: Data) => {
          return <BarChart dataSet={data}
                           dataOptions={{
                             category: [{name: 'Years', type: 'datetime'}],
                             value: [{name: 'Total Quantity'}],
                             breakBy: []
                           }}
                  />;
        }}
      </ExecuteQuery>
    </>
  );
}`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}

function TranslateSisenseDataToD3(data: Data) {
  interface Row { 
    [key:string]: any
  }
  interface D3DataId {
    id: string
    color?: string
    data: XY[]
  }
  type D3Data = Array<D3DataId>
  interface XY {
    x: string
    y: number
  }

  const d3Data:D3Data = [];
  const ids:Array<string> = [];
  data.rows.forEach((row: Row) => {
    
    //If empty add first element with Id
    if (d3Data.length === 0 || !ids.includes(row[1].data)) {
      ids.push(row[1].data)
      const d3DataId = {
        id: row[1].data,
        data: [{
          x: row[0].text,
          y: row[3].data
        }]
      }
      d3Data.push(d3DataId);
    }
    else {
        //if id for breakby already exists then add to that list
        const pos = ids.indexOf(row[1].data);
        d3Data[pos].data.push({x: row[0].text, y:row[3].data});
    }
  })
  console.log(d3Data);
  return d3Data;
}