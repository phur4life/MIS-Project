import ActivityList from "./activityList";
import SchedudleTable from "./schedule";

const ActivityPage = () => {
	return (
		<div>
			<div className="bg-white rounded-[10px] p-4">
				<ActivityList />
			</div>
			<div className="bg-white rounded-[10px] p-4 my-4">
				<SchedudleTable />
			</div>
		</div>
	);
};

export default ActivityPage;
