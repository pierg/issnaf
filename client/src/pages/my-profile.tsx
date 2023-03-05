import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile } from "components";

const MyProfile = () => {
    const { data: user } = useGetIdentity();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userid,
    });

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Profile
            type="My"
            id={myProfile._id}
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            posts={myProfile.allPosts}
            location={myProfile.location}
            skills={myProfile.skills}
            occupation={myProfile.occupation}
            description={myProfile.description}
        />
    );
};

export default MyProfile;
