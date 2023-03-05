import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
    CardActions,
    Chip
} from "@pankod/refine-mui";

import { PostCardProps } from "interfaces/post";

const PostCard = ({
    id,
    title,
    location,
    keywords,
    photo,
    postType
}: PostCardProps) => {
    return (
        <Card
            component={Link}
            to={`/posts/show/${id}`}
            sx={{
                maxWidth: "330px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
            }}
            elevation={0}
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={photo}
                alt="card image"
                sx={{ borderRadius: "10px" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {title}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <Place
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                marginTop: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191">
                            {location}
                        </Typography>
                    </Stack>
                    <Box width="100%" display="flex" gap="5px" flexWrap="wrap">

                    {keywords.map((keyword) => (
                            <Chip key={keyword} label={keyword} color="primary" />
                        ))}
                    </Box>
                </Stack>
                <Stack
                    px={1.5}
                    py={0.5}
                    borderRadius={1}
                    bgcolor="#dadefa"
                    height="fit-content"
                    direction="column" gap={4}
                >
                    <Typography fontSize={12} fontWeight={600} color="secondary">
                        {postType}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
      </CardActions>
        </Card>
    );
};

export default PostCard;
