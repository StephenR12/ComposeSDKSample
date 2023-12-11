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

import StatCard from "../examples-chart-components/ken/StatCard";
import FancyLine from "../examples-chart-components/ken/FancyLine";
import Portfolio from "../examples-chart-components/ken/Portfolio";
import { ButtonGroup } from "../components/ButtonGroup";

export default function Moodys() {
  const [view, setView] = useState("Positions");

  return (
    <Article title="Ken's Project" description={""}>

      <StatCard />
      <Divider />
      <FancyLine />
      <Divider />
      <ButtonGroup
        selected={view}
        onChange={setView}
        labels={["Positions", "Transactions", "Performance"]}
       />
       {view === "Positions" && (
          <Portfolio/>
       )}
       {view === "Transactions" && (
          <p>Transactions</p>
       )}
       {view === "Performance" && (
          <p>Performance</p>
       )}
      
    </Article>
  );
}
