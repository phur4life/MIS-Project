import Signup from "@/components/Auth/Signup";
const signup = () => {
	return (
		<div className="bg-primary h-screen w-screen flex justify-center items-center">
			<div className="max-w-lg rounded-xl overflow-hidden shadow-lg bg-white">
				<div className="px-6 py-4">
					<Signup />
				</div>
			</div>
		</div>
	);
};

export default signup;
