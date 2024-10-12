"use client";

import Header from "@/components/Header";

export default function Home() {
	return (
		<div>
			<Header
				sidebarOpen={undefined}
				setSidebarOpen={function (arg0: boolean): void {
					throw new Error("Function not implemented.");
				}}
			/>
		</div>
	);
}
