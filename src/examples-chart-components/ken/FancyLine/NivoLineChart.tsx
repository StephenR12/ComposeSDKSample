import { useState } from "react";

import { LineChart, ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "../../connected/sample-ecommerce";
import { Data, measures } from "@sisense/sdk-data";

import { ResponsiveLine } from "@nivo/line"

type Props = {
  measure: string;
};

export default function ExecuteQueryChart(props: Props) {

  return (   
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[DM.Commerce.Date.Months]}
            measures={[measureSelector(props.measure)]}
            filters={[]}
          >
            {(data: Data) => {
              console.log("Before Transformation");
              console.log(data);
              const nivoData = TranslateSisenseDataToD3(data);

              return <div style={{height: 400}}>
             <ResponsiveLine data={nivoData}
              enableSlices="x"
              colors={{scheme: 'greys'}}
              margin={{ top: 50, right: 0, bottom: 0, left: 60 }}
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
              enablePoints={false}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              curve="basis"
              enableArea={true}
              areaOpacity={1}
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
  const title = data.columns[1].name;
  data.rows.forEach((row: Row) => {
    
    //If empty add first element with Id
    if (d3Data.length === 0 || !ids.includes(title)) {
      ids.push(title)
      const d3DataId = {
        id: title,
        data: [{
          x: row[0].text,
          y: row[1].data
        }]
      }
      d3Data.push(d3DataId);
    }
    else {
        //if id for breakby already exists then add to that list
        const pos = ids.indexOf(title);
        d3Data[pos].data.push({x: row[0].text, y:row[1].data});
    }
  })
  console.log("After Transformation");
  console.log(d3Data);

  //only return one for this exercise
  return d3Data;
}

function measureSelector(measure: string) {
  if (measure === "Cost") {
    return measures.sum(DM.Commerce.Cost, "Total Cost");
  }
  if (measure === "Quantity") {
    return measures.sum(DM.Commerce.Quantity, "Total Quantity");
  } else {
    return measures.sum(DM.Commerce.Revenue, "Total Revenue");
  }
}