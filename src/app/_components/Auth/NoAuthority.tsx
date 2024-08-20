export default function NoAuthority({ message }) {
  return (
    <div className="text-center">
      <div className="font-bold text-2xl text-gray-700">페이지 접근 권한이 없습니다.</div>
      <div className="text-slate-500">{message}</div>
    </div>
  );
}
