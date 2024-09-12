import { AuthCard } from "@/components/auth-card/auth-card";
import { AuthCardTitle } from "@/components/auth-card/auth-card-title";
import { AuthFooterAction } from "@/components/auth-card/auth-footer-action";
import { FaExclamationTriangle } from "react-icons/fa";

function ErrorCard() {
  return (
    <AuthCard>
      <AuthCardTitle title={"Error!"} />
      Something went wrong...
      <div className="flex w-full items-center justify-center">
        <FaExclamationTriangle />
      </div>
      <AuthFooterAction href="/auth/login" label="Go back to login page" />
    </AuthCard>
  );
}

export default function Page() {
  return <ErrorCard />;
}
