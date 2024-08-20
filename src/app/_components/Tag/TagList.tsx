import { SelectedTag, Tag } from "./Tag";

export async function TagListAll({
  tagList,
  selectedTagName,
  selectedCategoryCode,
}: {
  tagList: any;
  selectedTagName: string | null;
  selectedCategoryCode: string;
}) {
  console.log("tagList: ", tagList);
  console.log("selectedTagName: ", decodeURIComponent(selectedTagName));
  return tagList.map((tag: any) => {
    if (tag.tag_name == decodeURIComponent(selectedTagName)) {
      return (
        <SelectedTag
          text={`${tag?.tag_name} ${tag?._count ? "(" + tag._count + ")" : ""}`}
          key={`tag-${tag.tag_name}`}
        />
      );
    }
    return (
      <Tag
        key={`tag-${tag?.tag_name}`}
        text={`${tag?.tag_name} ${tag?._count ? "(" + tag._count + ")" : ""}`}
        href={`/post/filter/${tag?.tag_name}/${selectedCategoryCode}`}
      />
    );
  });
}

export async function TagListInPost({ tagList }: { tagList: any }) {
  return tagList.map((tag: any) => {
    return (
      <Tag
        key={`tag-${tag?.tag_name}`}
        text={`${tag?.tag_name}`}
        href={`/post/filter/${tag?.tag_name}/ALL`}
      />
    );
  });
}
