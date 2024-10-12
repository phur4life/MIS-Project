import { Icon } from "@iconify/react";
import React from "react";
import { dataStats } from "../../../types/dataStats";

const dataStatsList = [
	{
		icon: "ion:newspaper-outline",
		color: "#3FD97F",
		title: "Total Requests",
		value: "0",
		growthRate: 0,
	},
	{
		icon: "ion:newspaper-outline",
		color: "#3FD97F",
		title: "Pending Requests",
		value: "0",
		growthRate: 0,
	},
	{
		icon: "ion:newspaper-outline",
		color: "#3FD97F",
		title: "In-Progress Requests",
		value: "12",
		growthRate: 12,
	},
	{
		icon: "ion:newspaper-outline",
		color: "#3FD97F",
		title: "Completed Requests",
		value: "0",
		growthRate: 0,
	},
];

const DataStatsOne: React.FC<dataStats> = () => {
	return (
		<>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md-gap-6 xl:grid-cols-4 2xl:gap-7.5">
				{dataStatsList.map((item, index) => (
					<div
						key={index}
						className="rounded-[10px] bg-white p-6 shadow-1 border flex"
					>
						<div className="">
							<div className="m-1">
								<h4 className="mb-4 text-gray-700">{item.title}</h4>
								<span className="text-3xl font-medium">{item.value}</span>
							</div>
							<div className="flex mt-4">
								{item.growthRate > 0 ? (
									<div className="flex justify-between gap-1">
										<Icon
											icon="streamline:graph-arrow-increase"
											style={{ color: "green", fontSize: "24px" }}
										/>
										<span style={{ color: "green" }}>{item.growthRate}%</span>{" "}
										<span className="text-sm text-gray-700">
											Up from yesterday
										</span>
									</div>
								) : (
									<div className="flex justify-between gap-1">
										<Icon
											icon="streamline:graph-arrow-decrease"
											style={{ color: "red", fontSize: "24px" }}
										/>
										<span style={{ color: "red" }}>{item.growthRate}%</span>{" "}
										<span className="text-sm text-gray-700">
											Down from yesterday
										</span>
									</div>
								)}
							</div>
						</div>
						<div className="flex bg-primary h-16 w-16 items-center justify-center rounded-[12px]">
							<Icon icon={item.icon} width={32} />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default DataStatsOne;
