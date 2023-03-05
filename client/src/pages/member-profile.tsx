import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";

import { Profile } from "components";

const MemberProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  console.log(data);

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      id={myProfile._id}
      type="Member"
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

export default MemberProfile;
