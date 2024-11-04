"use client";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import ChartOne from "../../../components/Charts/ChartOne";
import ChartTwo from "../../../components/Charts/ChartTwo";
import DataStatsOne from "../../../components/DataStats/DataStatsOne";
import ChartThree from "../../../components/Charts/ChartThree";
import ChartFour from "../../../components/Charts/ChartFour";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
const Dashboard = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    // Print session data to the console when session changes
    if (session) {
      console.log("Session Data:", session);
    } else if (status === "unauthenticated") {
      console.log("No active session found.");
    }
  }, [session, status]);
  return (
    <DefaultLayout>
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
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="w-full xl:w-[48%]">
              <ChartThree />
            </div>
            <div className="w-full xl:w-[48%] flex flex-col justify-center">
              <ChartFour />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Dashboard;
