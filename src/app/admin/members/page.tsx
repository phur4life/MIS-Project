import React, { useEffect, useState } from "react";
import MemberTable from "./memberTable";

const MemberPage = async () => {
	return (
		<div>
			<div className="p-4 rounded-[10px]">
				<MemberTable />
			</div>
		</div>
	);
};

export default MemberPage;
