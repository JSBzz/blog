export default function PostContents({ data }: { data: any }) {
  return (
    <div className="bg-slate-50">
      <div
        className="min-h-60 bg-slate-50 break-words w-full p-4 tiptap rounded-md"
        dangerouslySetInnerHTML={{ __html: data?.contents }}
      />
    </div>
  );
}
