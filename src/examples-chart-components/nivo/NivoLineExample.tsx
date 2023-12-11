import { useState } from "react";

import { ButtonGroup } from "../../components/ButtonGroup";
import { LineChart, ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../connected/sample-ecommerce";
import CodeHighlight from "../../components/CodeHighlight";
import CodeBlock from "../../components/CodeBlock";
import SubTitle from "../../components/SubTitle";
import Paragraph from "../../components/Paragraph";
import { Data, measures } from "@sisense/sdk-data";

import { ResponsiveLine } from "@nivo/line"

export default function ExecuteQueryChart() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="ExecuteQuery">ExecuteQuery Component</SubTitle>
            <Paragraph>
              ExecuteQuery allows you to run a query and access the results. <br />
              Useful when you want to render multiple charts using same data or
              render the data with your own visualizations.
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
            dimensions={[DM.Commerce.Date.Months, DM.Commerce.Gender]}
            measures={[measures.sum(DM.Commerce.Revenue, 'Total Revenue'), measures.sum(DM.Commerce.Cost, 'Total Cost')]}
            filters={[]}
          >
            {(data: Data) => {
              console.log(data);
              const nivoData = TranslateSisenseDataToD3(data);

              return <div style={{height: 600}}>
             <ResponsiveLine data={nivoData}
              enableSlices="x"
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: true,
                  reverse: false
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  tickSize: 5,
                  tickPadding: 8,
                  tickRotation: -60,
                  legend: 'Date',
                  legendOffset: 60,
                  legendPosition: 'middle'
              }}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'count',
                  legendOffset: -70,
                  legendPosition: 'middle' 
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                  {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemBackground: 'rgba(0, 0, 0, .03)',
                                  itemOpacity: 1
                              }
                          }
                      ]
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
            {`import React from "react";
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