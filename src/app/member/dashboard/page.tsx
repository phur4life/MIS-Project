"use client";
import Layout from "@/components/Layout1/Layout";
import ChartOne from "../../../components/Charts/ChartOne";
import ChartTwo from "../../../components/Charts/ChartTwo";
import DataStatsOne from "../../../components/DataStats/DataStatsOne";
import ChartThree from "../../../components/Charts/ChartThree";
import ChartFour from "../../../components/Charts/ChartFour";
const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <DataStatsOne />
        </div>
        <div>
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="w-full xl:w-[49%]">
              <ChartOne />
            </div>
            <div className="w-full xl:w-[48%]">
              <ChartTwo />
              <ChartFour/>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full xl:w-[48%]">
              <ChartThree />
            </div>
            <div className="w-full xl:w-[48%] flex flex-col justify-center">
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
