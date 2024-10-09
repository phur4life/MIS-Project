import Signup from "@/components/Auth/signup/index";
const signup = () => {
  return (
    <div className="bg-primary h-screen w-screen flex justify-center items-center">
      <div className="max-w-md rounded-2xl overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <Signup/>
        </div>
      </div>
    </div>
  );
};

export default signup;
