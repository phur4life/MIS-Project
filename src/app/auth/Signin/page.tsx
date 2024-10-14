import Signin from "@/components/Auth/Signin";
const Login = () => {
  return (
    <div className="bg-primary h-screen w-screen flex justify-center items-center">
      <div className="max-w-md rounded-2xl overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <Signin />
        </div>
      </div>
    </div>
  );
};

export default Login;
