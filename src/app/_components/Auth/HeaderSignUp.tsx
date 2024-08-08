import Link from "next/link";

export default function SignUp() {
  return (
    <div>
      <Link className="text-blue-900 absolute right-56 p-0 top-2" href="/signup" passHref>
        <pre>{`create\naccount`}</pre>
      </Link>
    </div>
  );
}
