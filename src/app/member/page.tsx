import React, { useEffect, useState } from "react";
import MemberTable from "./memberTable";
import { StatCardProps, StatCard } from "@/components/StatCard/statCard";

async function getData(): Promise<StatCardProps[]> {
	return [
		{
			icon: "tdesign:member",
			color: "#3FD97F",
			title: "Total Members",
			value: "0",
			growthRate: 0,
		},
		{
			icon: "mdi:account-online-outline",
			color: "#3FD97F",
			title: "Active Members",
			value: "0",
			growthRate: 0,
		},
		{
			icon: "mdi:account-pending-outline",
			color: "#3FD97F",
			title: "Pending Members",
			value: "12",
			growthRate: 12,
		},
	];
}

const MemberPage = async () => {
	const cards = await getData();

	return (
		<div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:gap-7.5">
				{cards.map((card, index) => (
					<StatCard
						key={index}
						icon={card.icon}
						color={card.color}
						title={card.title}
						value={card.value}
						growthRate={card.growthRate}
					/>
				))}
			</div>

			<div className="bg-white p-4 mt-6 rounded-[10px]">
				<MemberTable />
			</div>
		</div>
	);
};

export default MemberPage;
