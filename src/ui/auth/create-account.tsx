import Link from "next/link";

export function CreateAccount({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link href={href} className="link">
      {label}
    </Link>
  );
}
