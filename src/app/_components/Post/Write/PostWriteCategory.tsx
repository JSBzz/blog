export default function PostWriteCategory({
  postData,
  setPostData,
  categoryData,
  setSubCategory,
  subCategoryData,
}: {
  postData: any;
  setPostData: any;
  categoryData: any;
  setSubCategory: any;
  subCategoryData: any;
}) {
  console.log("subCategoryData: ", subCategoryData);
  console.log("postData: ", postData);
  return (
    <div>
      <label className="mr-2">메인 카테고리</label>
      <select
        value={postData?.mainCategory}
        onChange={(e) => {
          setSubCategory(
            categoryData?.sub.filter((subData: any) => {
              if (subData.parent_category_code == e.target.value) {
                return subData;
              }
            })
          );
          setPostData({ ...postData, mainCategory: e.target.value });
        }}
      >
        <option value={0}>없음</option>
        {categoryData?.main?.map(
          (category: { id: number; category_name: string; category_code: string }) => {
            return (
              <option key={`category-${category.id}`} value={category.category_code}>
                {category.category_name}
              </option>
            );
          }
        )}
      </select>
      <label className="mr-2">서브 카테고리</label>
      <select
        value={postData?.subCategory}
        onChange={(e) => {
          setPostData({ ...postData, subCategory: e.target.value });
        }}
      >
        <option value={0}>없음</option>
        {subCategoryData?.map((subData: any) => {
          return (
            <option key={`category-${subData.id}`} value={subData.category_code}>
              {subData.category_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
