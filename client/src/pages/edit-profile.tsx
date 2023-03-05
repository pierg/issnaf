import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import ProfileForm from "components/common/ProfileForm";

const EditProfile = () => {
    const { data: user } = useGetIdentity();
    const [ProfileImage, setProfileImage] = useState({ name: "", url: "" });
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
            setProfileImage({ name: file?.name, url: result }),
        );
    };

    const onFinishHandler = async (data: FieldValues) => {

        let skillsArray: string[] = [];
        if (typeof data.skills === "string") {
        skillsArray = data.skills.split(",").map((skill: string) => skill.trim());
        }
        
        await onFinish({
            ...data,
            skills: skillsArray,
            photo: ProfileImage.url,
            email: user.email,
        });
    };

    return (
        <ProfileForm
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
        />
    );
};

export default EditProfile;
