export const getPostCategories = async (type: "sub" | "main") => {
  const response = await fetch(`/api/category?type=${type}`);
  const result = await response.json();
  return result;
};

export const savePostCategory = async (
  categoryName: string,
  insertTarget: string,
  selectedMain: string
) => {
  await fetch("/api/category", {
    method: "post",
    body: JSON.stringify({
      categoryName: categoryName,
      categoryCode: categoryName.toUpperCase().replaceAll(" ", "_"),
      parentCategoryCode: insertTarget == "sub" ? selectedMain : null,
    }),
  });
};
