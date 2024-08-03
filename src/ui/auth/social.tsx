import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function Social() {
  return (
    <div className="flex w-full gap-2">
      <button className="btn btn-outline flex-1">
        <FcGoogle className="h-5 w-5" />
      </button>
      <button className="btn btn-outline flex-1">
        <FaGithub className="h-5 w-5" />
      </button>
    </div>
  );
}
