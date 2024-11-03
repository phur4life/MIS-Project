import SearchForm from "./SearchForm";
import DropdownUser from "./DropdownUser";
import DropdownNotification from "./DropdownNotification";

const Header = (props: {
	sidebarOpen: string | boolean | undefined;
	setSidebarOpen: (arg0: boolean) => void;
}) => {
	return (
		<header className="sticky top-0 z-50 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
			<div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
				<div className="hidden xl:block">
					<div>
						<h1 className="mb-0.5 text-2xl font-bold text-dark text-primary">
							Dashboard
						</h1>
						<p className="font-medium">Maintenace Club</p>
					</div>
				</div>
				<div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
					<ul className="flex items-center gap-2 2xsm:gap-4">
						<SearchForm />
						<DropdownNotification />
					</ul>
					<DropdownUser />
				</div>
			</div>
		</header>
	);
};

export default Header;
