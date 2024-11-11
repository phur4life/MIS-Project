import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Items } from "../sidebar/Items";

const RequestsChart: React.FC = () => {
	//const series = [12, 9, 6, 3, 2, 5, 7]; // Data for each hostel block
	const categories = ["HB", "HA", "RK", "HC", "HD", "NK", "HE"]; // Hostel Block Labels
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchInventory = async () => {
			try {
				const response = await fetch("/api/users", {
					method: "GET",
				});
				if (response.ok) {
					const data = await response.json();
					setUsers(data);
				} else {
					console.log("Inventory Fetch Failed");
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetchInventory();
	}, []);

	const requests = users.map((item) => item.requests);
	const categorizedRequests = requests.map((request, index) => ({
		category: categories[index], // Use index to get the category
		requestCount: request.length, // Get the number of requests in that category
	}));

	const series = categorizedRequests.map((request) => request.requestCount);

	//console.log(series);

	//console.log(categorizedRequests);
	// console.log(requests);
	// console.log(users);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 310, // Adjusted height to match ChartOne
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "55%",
        dataLabels: {
          position: "top", // Show data labels on top of bars
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}`, // Format data labels
      style: {
        fontSize: "16px",
        colors: ["#ADBCF2"], // Color for data labels
      },
    },
    colors: ["#3B82F6"], // Color scheme for bars
    xaxis: {
      categories: categories,
      title: {
        text: "Requests", // X-axis title
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      min: 0, // Set minimum value for x-axis
      max: 15, // Set maximum value for x-axis to expand the range
    },
    yaxis: {
      title: {
        text: "Hostel Block", // Y-axis title
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      labels: {
        offsetX: 10, // Adjust space between y-axis values and labels
				offsetY: 5, // Increase vertical spacing between y-axis values
      },
    },
    title: {
      text: "Requests Send per Hostel Block",
      align: "center",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Requests
          </h4>
        </div>
      </div>

      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={[{ name: "Requests", data: series }]} // Updated to match the series format
            type="bar"
            height={310} // Same height as the ChartOne component
          />
        </div>
      </div>
    </div>
  );
};

export default RequestsChart;
