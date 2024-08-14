export default function CommentBox({ data, session }: { data: any; session: any }) {
  console.log(" data?.writer_id: ", data?.writer_id);
  console.log("session?.user?.id: ", session?.user?.id);
  console.log("data?.guest_nickname: ", data?.guest_nickname);
  return (
    <div className="border rounded-md mt-5 shadow-md">
      <div className="min-h-24 grid grid-rows-[34px,]">
        <div className="p-1 border-b justify-between flex bg-gray-100">
          {data?.guest_nickname ? (
            <div>{data?.guest_nickname}(GUEST)</div>
          ) : (
            <div>{data?.user?.nickname}</div>
          )}
          <span className="text-right">{data?.created_at}</span>
        </div>
        <div className="p-1">{data?.comment}</div>
      </div>
      <div className="text-right h-8 min-h-8">
        {(data?.guest_nickname || data?.writer_id == session?.user?.id) && (
          <button className="text-right pr-1 pl-1 bg-slate-200 mr-1">수정</button>
        )}
        {(data?.guest_nickname || data?.writer_id == session?.user?.id) && (
          <button className="text-right pl-1 bg-slate-200 mr-1">삭제</button>
        )}
      </div>
    </div>
  );
}
