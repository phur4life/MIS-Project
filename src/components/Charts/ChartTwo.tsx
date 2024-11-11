import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

const InventoryChart = () => {
	const [inventories, setInventories] = useState([]);
	const [categories, setCategories] = useState([]);
	const [itemQuantity, setItemQuantity] = useState([]);

	useEffect(() => {
		const fetchInventory = async () => {
			try {
				const response = await fetch("/api/inventory", {
					method: "GET",
				});
				if (response.ok) {
					const data = await response.json();
					setInventories(data);
				} else {
					console.log("Inventory Fetch Failed");
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetchInventory();
	}, []);

	useEffect(() => {
		if (inventories.length > 0) {
			setCategories(inventories.map((item) => item.itemName)); // Update categories with itemName
			setItemQuantity(inventories.map((item) => item.quantity));
		}
	}, [inventories]);

	// console.log(categories, itemQuantity);

  const options: ApexOptions = {
    chart: {
			type: "bar", // Explicitly set to "bar" and recognized as such by ApexOptions
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
				columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
			categories: categories,
      labels: {
        style: {
					colors: ["#6B7280"],
        },
      },
    },
    yaxis: {
      title: {
				text: "Quantity",
        style: {
					fontSize: "15px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
		colors: ["#3B82F6"],
    tooltip: {
      y: {
        formatter: (val) => `${val} units`,
      },
    },
  };

  const series = [
    {
			name: "Quantity",
			data: itemQuantity,
    },
  ];

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Inventory
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-3.5">
          <ReactApexChart
            options={options} // Pass the options with explicit ApexOptions type
            series={series}
            type="bar" // Ensure that the chart type here matches the one in options
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryChart;
