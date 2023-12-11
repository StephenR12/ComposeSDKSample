import Article from "../components/Article";
import Divider from "../components/Divider";
import DateRangeFilter from "../examples-filters/DateRangeFilter";
import MemberFilter from "../examples-filters/MemberFilter";
import NivoLineChart from "../examples-chart-components/nivo/NivoLineExample";
import NivoBumpChart from "../examples-chart-components/nivo/NivoBumpExample";
import NivoHeatChart from "../examples-chart-components/nivo/NivoHeapMapExample";


export default function Gallery() {
  return (
    <Article title="Gallery" description={""}>
      <NivoLineChart />
      <Divider />
      <NivoBumpChart />
      <Divider />
      <NivoHeatChart />
    </Article>
  );
}
