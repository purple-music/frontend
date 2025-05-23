import Link from "next/link";

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <Link href="/test/another-test-1">With Prefetch</Link>
      <Link href="/test/another-test-2" prefetch={false}>
        Without Prefetch
      </Link>
    </div>
  );
}
