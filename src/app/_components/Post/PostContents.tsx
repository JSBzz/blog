export default function PostContents({ data }: { data: any }) {
  return (
    <div>
      <div
        className="min-h-60 bg-neutral-100 break-words w-full p-4 tiptap rounded-md dark:bg-slate-700"
        dangerouslySetInnerHTML={{ __html: data?.contents }}
      />
    </div>
  );
}
