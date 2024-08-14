export default function PostWriteTitle({
  postData,
  setPostData,
}: {
  postData: any;
  setPostData: any;
}) {
  return (
    <div>
      <label htmlFor="title" className="">
        제목
      </label>
      <input
        id="title"
        className=" t-4 flex w-full border rounded-md p-2"
        value={postData.title}
        onChange={(e) => {
          setPostData({ ...postData, title: e.target.value });
        }}
      />
    </div>
  );
}
