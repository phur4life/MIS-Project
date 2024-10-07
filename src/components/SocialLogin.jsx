import {doSocialLogin} from "@/app/actions"
const SocialLogin = () => {
  return (
    <form action={doSocialLogin} className="flex gap-8">
      <button
        type="submit"
        name="action"
        value="google"
        className="p-3 border rounded-lg bg-cyan-500"
      >
        Sign in with Google
      </button>
    </form>
  );
};

export default SocialLogin;
