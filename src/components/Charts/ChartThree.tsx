import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

const ChartThree: React.FC = () => {
	const [data, setData] = useState([]);
	const [members, setMembers] = useState([]);
	const [users, setUsers] = useState([]);
	const [totalCount, setTotalCount] = useState(0); // Track the total count

	useEffect(() => {
		const fetchInventory = async () => {
			try {
				const response = await fetch("/api/users", {
					method: "GET",
				});
				if (response.ok) {
					const data = await response.json();
					setData(data);
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
		if (data.length > 0) {
			const filteredMembers = data.filter((item) => item.role === "member");
			const filteredUsers = data.filter((item) => item.role === "user");
			const count = filteredMembers.length;
			//	console.log("Filtered members count:", count);
			setTotalCount(count); // Make sure count is correctly calculated
			//console.log(totalCount);
			setMembers(filteredMembers);
			setUsers(filteredUsers);
		}
	}, [data]); // Re-run this effect when 'data' changes

	// Calculate percentages for members or users
	const percentage = (data) => {
		const filteredData = data.filter((d) => d.currentYear);
		const yearCounts = { "1": 0, "2": 0, "3": 0, "4": 0 };

		filteredData.forEach((d) => {
			if (d.currentYear) {
				yearCounts[d.currentYear]++;
			}
		});

		const yearPercentages = {};
		const totalStudents = filteredData.length;

		for (let year in yearCounts) {
			yearPercentages[year] = (yearCounts[year] / totalStudents) * 100;
		}

		const yearData = [
			{
				label: "First Year",
				percentage: yearPercentages["1"] || 0,
				color: "#0061FF",
			},
			{
				label: "Second Year",
				percentage: yearPercentages["2"] || 0,
				color: "#4589FF",
			},
			{
				label: "Third Year",
				percentage: yearPercentages["3"] || 0,
				color: "#A8BFFF",
			},
			{
				label: "Fourth Year",
				percentage: yearPercentages["4"] || 0,
				color: "#CFD8FF",
			},
		];

		return yearData;
	};

	// Percentage data for members and users
	const member = percentage(members);
	const user = percentage(users);

	// State for selected option
	const [selectedOption, setSelectedOption] = useState("Member");
	const selectedData = selectedOption === "Member" ? member : user;

	// Prepare chart data
	const series = selectedData.map((item) => item.percentage);
	const colors = selectedData.map((item) => item.color);
	const labels = selectedData.map((item) => item.label);

	// Options for ApexCharts
	const options = {
		chart: {
			fontFamily: "Satoshi, sans-serif",
			type: "donut",
		},
		colors: colors,
		labels: labels,
		legend: {
			show: false,
			position: "bottom",
		},
		plotOptions: {
			pie: {
				donut: {
					size: "75%",
					background: "transparent",
					labels: {
						show: true,
						name: {
							show: true,
							offsetY: -10,
						},
						value: {
							show: true,
							offsetY: 10,
							fontSize: "22px",
							fontWeight: "bold",
							color: "#1D1D1D",
							formatter: () => totalCount, // Display totalCount dynamically
						},
						total: {
							show: false,
							label: "Total Members",
							fontSize: "14px",
							fontWeight: "500",
							color: "#858585",
							formatter: () => (totalCount == 0 ? members.length : totalCount),
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		responsive: [
			{
				breakpoint: 2600,
				options: {
					chart: {
						width: 300,
					},
				},
			},
			{
				breakpoint: 640,
				options: {
					chart: {
						width: 200,
					},
				},
			},
		],
	};

	const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedOption(event.target.value as string);
	};

	return (
		<div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
			<div className="mb-9 justify-between gap-4 sm:flex">
				<div>
					<h4 className="text-body-2xlg font-bold text-dark ">
						Member Distribution
					</h4>
				</div>
				{/* <div>
					<DefaultSelectOption
						options={["Member", "User"]}
						value={selectedOption}
						onChange={handleSelectChange}
					/>
				</div> */}
			</div>

			<div className="mb-8">
				<div className="mx-auto flex justify-center">
					<ReactApexChart options={options} series={series} type="donut" />
				</div>
			</div>

			<div className="mx-auto w-full max-w-[350px]">
				<div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
					{selectedData.map((item, index) => (
						<div key={index} className="w-full px-7.5 sm:w-1/2">
							<div className="flex w-full items-center">
								<span
									className="mr-2 block h-3 w-full max-w-3 rounded-full"
									style={{ backgroundColor: item.color }}
								></span>
								<p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
									<span>{item.label}</span>
									<span>{item.percentage}%</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ChartThree;
