import { ChatBubble, Email, Phone, Place, Edit } from "@mui/icons-material";
import { Box, Stack, Typography, Chip} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { CustomButton } from "components";

import { ProfileProps, PostProps } from "interfaces/common";
import PostCard from "./PostCard";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const Profile = ({ id, type, name, avatar, email, posts, occupation, location, description, skills }: ProfileProps) => {

    const navigate = useNavigate();

    return (

        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                {type} Profile
            </Typography>

            <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2.5,
                    }}
                >
                    <img
                        src="https://www.bells.org/sites/default/files/styles/page_image/public/uc_berkeley_campanile_bell_tower.jpg?itok=-D8iZ4Gq"
                        width={340}
                        height={320}
                        alt="abstract"
                        className="my_profile-bg"
                    />
                    <Box
                        flex={1}
                        sx={{
                            marginTop: { md: "58px" },
                            marginLeft: { xs: "20px", md: "0px" },
                        }}
                    >
                        <Box
                            flex={1}
                            display="flex"
                            flexDirection={{ xs: "column", md: "row" }}
                            gap="20px"
                        >
                            <img
                                src={
                                    checkImage(avatar)
                                        ? avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                width={78}
                                height={78}
                                alt="user_profile"
                                className="my_profile_user-img"
                            />
            
                            <Box
                                flex={1}
                                display="flex"
                                flexDirection="column"
                                sx={{
                                    marginTop: { md: "-80px" },
                                    marginLeft: { xs: "20px", md: "0px" },
                                }}
                                justifyContent="space-between"
                                gap="30px"
                            >
                                <Stack
                                width="100%"
                                mt="25px"
                                direction="row"
                                flexWrap="wrap"
                                gap={2}
                            >
                                <CustomButton
                                    title={!(type === "My") ? "Message" : "Edit"}
                                    backgroundColor="#5A98B9"
                                    color="#FCFCFC"
                                    // fullWidth
                                    icon={
                                        !(type === "My") ? <ChatBubble /> : <Edit />
                                    }
                                    handleClick={() => {
                                        if ((type === "My")) {
                                            navigate(
                                                `/users/edit/${id}`,
                                            );
                                        }
                                    }}
                                />
                            </Stack>
                                <Stack direction="column">
                                    <Typography
                                        fontSize={22}
                                        fontWeight={600}
                                        color="#11142D"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography fontSize={18} color="#808191">
                                        {occupation}
                                    </Typography>
                                </Stack>
                                
                                <Stack direction="column">
                                    <Typography fontSize={16} color="#808191">
                                        {description}
                                    </Typography>
                                </Stack>

                                <Stack direction="column" gap="30px">

                                    <Stack
                                        direction="row"
                                        flexWrap="wrap"
                                        gap="20px"
                                        pb={4}
                                    >
                                        <Stack flex={1} gap="15px">
                                        <Typography
                                            fontSize={14}
                                            fontWeight={500}
                                            color="#808191"
                                        >
                                            Location
                                        </Typography>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                gap="10px"
                                            >
                                                <Place sx={{ color: "#11142D" }} />
                                                <Typography
                                                    fontSize={14}
                                                    color="#11142D"
                                                    noWrap
                                                >
                                                    {location}
                                                </Typography>
                                            </Box>
                                            <Stack mt="25px" direction="row" spacing={1}>
                        {skills.map((skill: string) => (
                            <Chip key={skill} label={skill} color="primary" />
                        ))}
                    </Stack>
                                        </Stack>

                                        <Stack flex={1} gap="15px">
                                            <Typography
                                                fontSize={14}
                                                fontWeight={500}
                                                color="#808191"
                                            >
                                                Email
                                            </Typography>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                gap="10px"
                                            >
                                                <Email sx={{ color: "#11142D" }} />
                                                <Typography
                                                    fontSize={14}
                                                    color="#11142D"
                                                >
                                                    {email}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {posts.length > 0 && (
                <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                    <Typography fontSize={18} fontWeight={600} color="#11142D">
                        {type} Posts
                    </Typography>

                    <Box
                        mt={2.5}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2.5,
                        }}
                    >
                        {posts?.map((post: PostProps) => (
                            <PostCard
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                location={post.location}
                                keywords={post.keywords}
                                photo={post.photo}
                                postType={post.postType}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Profile;
