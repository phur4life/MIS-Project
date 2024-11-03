import DefaultLayout from "@/components/Layout/DefaultLayout";
import ChartOne from "../../components/Charts/ChartOne";
import ChartTwo from "../../components/Charts/ChartTwo";
import DataStatsOne from "../../components/DataStats/DataStatsOne";
import ChartThree from "../../components/Charts/ChartThree";
import ChartFour from "../../components/Charts/ChartFour";
const Dashboard = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-6">
        <div>
          <DataStatsOne />
        </div>
        <div>
          <div className="flex justify-center w-auto">
            <ChartOne/>
            <ChartTwo/>
          </div>
          <div className="flex justify-center">
            <ChartThree />
            <ChartFour />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Dashboard;
