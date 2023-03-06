import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";

const CreatePost = () => {
  const { data: user } = useGetIdentity();
  const [postImage, setPostImage] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPostImage({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!postImage.name) return alert("Please upload a post image");

    let keywordsArray: string[] = [];
    if (typeof data.keywords === "string") {
      keywordsArray = data.keywords
        .split(",")
        .map((keyword: string) => keyword.trim());
    }

    await onFinish({
      ...data,
      keywords: keywordsArray,
      photo: postImage.url,
      email: user.email,
    });
  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      postImage={postImage}
    />
  );
};

export default CreatePost;
