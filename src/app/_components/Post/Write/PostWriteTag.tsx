export default function PostWriteTag({
  postData,
  setPostData,
  inputTag,
  setInputTag,
}: {
  postData: any;
  setPostData: any;
  inputTag: any;
  setInputTag: any;
}) {
  return (
    <div>
      <div className="mt-2">
        <input
          className="border w-32 mr-2 p-1 rounded-md"
          value={inputTag}
          onChange={(e) => {
            setInputTag(e.target.value);
          }}
        />
        <button
          className="bg-slate-200 p-1 rounded-md"
          onClick={() => {
            if (inputTag.replaceAll(" ", "") != "" && !postData.tags.includes(inputTag)) {
              setInputTag("");
              setPostData({ ...postData, tags: [...postData.tags, inputTag] });
            }
          }}
        >
          태그 추가
        </button>
      </div>
      <div>
        <h1 className="mt-2">태그</h1>
        <div className="border m-auto p-2 gap-y-2 min-h-11">
          {postData?.tags?.map((tagName: string, idx: any) => {
            return (
              <span className="bg-slate-200 p-1 rounded-md m-1 text-wrap" key={`add-tag-${idx}`}>
                {tagName}{" "}
                <button
                  onClick={() => {
                    setPostData({
                      ...postData,
                      tags: postData.tags.filter((tag: any) => {
                        return tag != tagName;
                      }),
                    });
                  }}
                >
                  x
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
