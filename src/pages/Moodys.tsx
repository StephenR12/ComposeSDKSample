import Article from "../components/Article";
import Divider from "../components/Divider";
import DateRangeFilter from "../examples-filters/DateRangeFilter";
import MemberFilter from "../examples-filters/MemberFilter";
import NivoLineChart from "../examples-chart-components/nivo/NivoLineExampleInput";
import NivoBumpChart from "../examples-chart-components/nivo/NivoBumpExample";
import NivoHeatChart from "../examples-chart-components/nivo/NivoHeapMapExample";
import * as DM from "../examples-chart-components/connected/sample-ecommerce";
import { Data, filters, measures } from "@sisense/sdk-data";
import { SetStateAction, useState } from "react";
import { DateRangeFilterTile } from "@sisense/sdk-ui";
import SubTitle from "../components/SubTitle";

export default function Moodys() {
  //Date Range Filter
  const [dateRangeFilter, setDateRangeFilter] = useState(
    filters.dateRange(DM.Commerce.Date.Days)
  );

  //Expected line
  const [expected, setExpectedOption] = useState("150000");
  const handleExpectedChange = (e: { target: { value: string } }) => {
    setExpectedOption(e.target.value);
  };

  //Dim Option Change
  const [dimOption, setDimOption] = useState("Gender");
  const handleDimOptionChange = (e: { target: { value: string } }) => {
    setDimOption(e.target.value);
  };

  //Measure Option Change
  const [measureOption, setMeasureOption] = useState("Revenue");
  const handleMeasureOptionChange = (e: { target: { value: string } }) => {
    setMeasureOption(e.target.value);
  };

  return (
    <Article title="Moody's Analytics" description={""}>
      <div id="parent" style={{ display: "flex" }}>
        <div style={{ alignItems: "center", width: "60%" }}>
          <DateRangeFilterTile
            title="Date Range"
            dataSource="Sample ECommerce"
            attribute={DM.Commerce.Date.Days}
            filter={dateRangeFilter}
            onChange={(filter) => {
              setDateRangeFilter(filter);
            }}
          />
        </div>
        <div style={{ alignItems: "center", width: "20%" }}>
          <h3 id="Measure">Measure Swapper</h3>
          <select
            onChange={handleMeasureOptionChange}
            style={{ textAlign: "center" }}
          >
            <option value="Revenue">Revenue</option>
            <option value="Cost">Cost</option>
            <option value="Quantity">Quantity</option>
          </select>
        </div>
        <div style={{ alignItems: "center", width: "20%" }}>
          <h3 id="Dim">Break By Swapper</h3>
          <select
            onChange={handleDimOptionChange}
            style={{ textAlign: "center" }}
          >
            <option value="Gender">Gender</option>
            <option value="AgeRange">Age Range</option>
            <option value="Condition">Condition</option>
          </select>
        </div>
      </div>
      <Divider />
      <div id="parent" style={{ display: "flex" }}>
        <div style={{ alignItems: "center", width: "60%" }}>
          <label>
            Set Expected:{" "}
            <input
              name="myInput"
              defaultValue="150000.00"
              onChange={handleExpectedChange}
            />
          </label>
        </div>
        <div style={{ alignItems: "center", width: "60%" }}>
          <p>
            Radio buttons:
            <label style={{ padding: "10px" }}>
              <input type="radio" name="myRadio" value="option1" />
              Ecommerce
            </label>
            <label style={{ padding: "10px" }}>
              <input type="radio" name="myRadio" value="option2" />
              Banking
            </label>
            <label style={{ padding: "10px" }}>
              <input type="radio" name="myRadio" value="option3" />
              Financial
            </label>
          </p>
        </div>
      </div>
      <NivoLineChart
        filters={dateRangeFilter}
        dim={dimOption}
        measure={measureOption}
        expected={expected}
      />
      <Divider />
      {/* <NivoBumpChart />
      <Divider />
      <NivoHeatChart /> */}
    </Article>
  );
}
