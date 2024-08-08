import Link from "next/link";

export type Color = {
  blue: "blue";
  green: "green";
  red: "red";
  yellow: "yellow";
};

type Props = {
  color: "blue" | "green" | "red" | "yellow";
  text: string;
  href: string;
};

export default function Tag({ color, text, href }: Props) {
  const className = `p-1 pr-2 pl-2 rounded-lg text-${color}-800 bg-${color}-200 mr-2 z-30`;
  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}
