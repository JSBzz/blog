import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

export function Tag({ text, href }: Props) {
  return (
    <Link
      href={href}
      className=" pt-1 pb-1 pr-2 pl-2 rounded-lg text-slate-500 bg-slate-100 border-b-slate-500 border-r-slate-500 border-2 active:border-0 hover:opacity-80 z-30 mr-1"
    >
      {text}
    </Link>
  );
}

export function SelectedTag({ text }: { text: string }) {
  return (
    <div className=" pt-1 pb-1 pr-2 pl-2 rounded-lg text-white bg-slate-400 border-b-slate-500 border-r-slate-500 border-2 z-30 mr-1">
      {text}
    </div>
  );
}
