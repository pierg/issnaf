import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import { MemberCard } from "components";

const Members = () => {
    const { data, isLoading, isError } = useList({ resource: "users" });

    const allMembers = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Members List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                {allMembers.map((member) => (
                    <MemberCard
                        key={member._id}
                        id={member._id}
                        name={member.name}
                        email={member.email}
                        avatar={member.avatar}
                        location={member.location}
                        occupation={member.occupation}
                        noOfPosts={member.allPosts.length}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Members;
