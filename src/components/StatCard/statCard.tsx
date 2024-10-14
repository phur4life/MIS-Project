import React from "react";
import { Icon } from "@iconify/react";

export type StatCardProps = {
	icon: string;
	color: string;
	title: string;
	value: string;
	growthRate: number;
};

export const StatCard: React.FC<StatCardProps> = ({
	icon,
	color,
	title,
	value,
	growthRate,
}) => {
	return (
		<div className="rounded-[10px] bg-white p-6 shadow-1 border flex justify-between items-center">
			{/* Left Section */}
			<div>
				<h4 className="mb-4 text-gray-700">{title}</h4>
				<span className="text-3xl font-medium">{value}</span>
				<div className="flex mt-4 items-center gap-1">
					{growthRate > 0 ? (
						<>
							<Icon
								icon="streamline:graph-arrow-increase"
								style={{ color: "green", fontSize: "24px" }}
							/>
							<span style={{ color: "green" }}>{growthRate}%</span>
							<span className="text-sm text-gray-700">Up from yesterday</span>
						</>
					) : (
						<>
							<Icon
								icon="streamline:graph-arrow-decrease"
								style={{ color: "red", fontSize: "24px" }}
							/>
							<span style={{ color: "red" }}>{growthRate}%</span>
							<span className="text-sm text-gray-700">Down from yesterday</span>
						</>
					)}
				</div>
			</div>

			{/* Right Section (Icon) */}
			<div
				className="flex items-center justify-center h-16 w-16 rounded-[12px]"
				style={{ backgroundColor: color }}
			>
				<Icon icon={icon} width={32} />
			</div>
		</div>
	);
};
