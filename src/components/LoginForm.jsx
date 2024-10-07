import SocialLogin from "./SocialLogin";
const LoginForm = () => {
  return (
    <>
      <form className="flex flex-col gap-3 items-center m-6 ">
        <SocialLogin />
      </form>
    </>
  );
};

export default LoginForm;
