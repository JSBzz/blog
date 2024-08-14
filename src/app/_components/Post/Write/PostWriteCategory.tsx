export default function PostWriteCategory({
  postData,
  setPostData,
  categoryData,
}: {
  postData: any;
  setPostData: any;
  categoryData: any;
}) {
  return (
    <div>
      <label className="mr-2">카테고리</label>
      <select
        //@ts-ignore
        value={postData.category?.id}
        onChange={(e) => {
          setPostData({ ...postData, category: e.target.value });
        }}
      >
        <option value={0}>없음</option>
        {categoryData?.map((category: { id: number; category_name: string }) => {
          return (
            <option key={`category-${category.id}`} value={category.id}>
              {category.category_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
