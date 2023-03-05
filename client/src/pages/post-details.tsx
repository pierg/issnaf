/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack, Chip} from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
} from "@mui/icons-material";

import { CustomButton } from "components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const PostDetails = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const postDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === postDetails.creator.email;

    const handleDeletePost = () => {
        const response = confirm(
            "Are you sure you want to delete this post?",
        );
        if (response) {
            mutate(
                {
                    resource: "posts",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/posts");
                    },
                },
            );
        }
    };

    const sendEmail = () => {
        const email = `mailto:${postDetails.creator.email}`;
        window.location.href = email;
      };

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={postDetails.photo}
                        alt="post_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="post_details-img"
                    />


                    <Box mt="15px" position="relative">
                    <Stack
                        position="absolute"
                        top="0"
                        right="0"
                        px={1.5}
                        py={0.5}
                        borderRadius={1}
                        bgcolor="#dadefa"
                        height="fit-content"
                        direction="column"
                        gap={4}
                    >
                        <Typography fontSize={16} fontWeight={600} color="secondary">
                        {postDetails.postType}
                        </Typography>
                    </Stack>

                    <Box>
    <Typography
        fontSize={22}
        fontWeight={600}
        mt="5px"
        py={4.5}
        color="#11142D"
    >
        {postDetails.title}
    </Typography>
    <Stack
        mt="-10px"
        direction="row"
        alignItems="center"
        gap={0.5}
    >
        <Place sx={{ color: "#808191" }} />
        <Typography fontSize={14} color="#808191">
            {postDetails.location}
        </Typography>
    </Stack>
</Box>

<Stack mt="25px" direction="row" spacing={1}>
                        {postDetails.keywords.map((keyword: string) => (
                            <Chip key={keyword} label={keyword} color="primary" />
                        ))}
                    </Stack>

                    <Stack mt="25px" direction="column" gap="10px">
                        <Typography fontSize={14} color="#808191">
                        {postDetails.description}
                        </Typography>
                    </Stack>
                    </Box>

                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(postDetails.creator.avatar)
                                        ? postDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {postDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    {postDetails.creator.occupation}
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    {postDetails.creator.location}
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {postDetails.creator.allPosts.length}{" "}
                                Posts
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#3A98B9"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/posts/edit/${postDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeletePost();
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Box>
                        <CustomButton
                            title="Send an Email"
                            backgroundColor="#3A98B9"
                            color="#FCFCFC"
                            fullWidth
                            handleClick={sendEmail}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PostDetails;
