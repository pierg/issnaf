import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import { Link } from "@pankod/refine-react-router-v6";
import {
    Box,
    Stack,
    Typography,
    TextField,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { useMemo } from "react";

import { PostCard, CustomButton } from "components";

const AllPosts = () => {
    const navigate = useNavigate();

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    const allPosts = data?.data ?? [];

    const currentPrice = sorter.find((item) => item.field === "keywords")?.order;

    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
            postType:
                logicalFilters.find((item) => item.field === "postType")
                    ?.value || "",
        };
    }, [filters]);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

    return (
        <Box>
            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color="#11142d">
                        {!allPosts.length
                            ? "There are no posts"
                            : "All Posts"}
                    </Typography>
                    <Box
                        mb={2}
                        mt={3}
                        display="flex"
                        width="84%"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            mb={{ xs: "20px", sm: 0 }}
                        >
                            <CustomButton
                                title={`Sort date ${
                                    currentPrice === "asc" ? "↑" : "↓"
                                }`}
                                handleClick={() => toggleSort("keywords")}
                                backgroundColor="#5A98B9"
                                color="#fcfcfc"
                            />
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Search by title"
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.postType}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "postType",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {[
                                    "Top-Down",
                                    "Bottom-Up",
                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type.toLowerCase()}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                            <CustomButton
                                title="Add Post"
                                handleClick={() => navigate("/posts/create")}
                                backgroundColor="#5A98B9"
                                color="#fcfcfc"
                                icon={<Add />}
                            />
                        </Box>
                    </Box>
                    
                </Stack>
            </Box>

            <Box mt="20px" sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    gap: 3,
                }}>
                {allPosts?.map((post) => (
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

            {/* <TableContainer>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Keywords</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allPosts?.map((post) => (
                        <TableRow key={post._id} component={Link} to={`/posts/show/${post._id}`}>
                        <TableCell component="th" scope="row">
                            {post.title}
                        </TableCell>
                        <TableCell>{post.location}</TableCell>
                        <TableCell>{post.keywords}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer> */}

            {allPosts.length > 10 && (
                <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                    <CustomButton
                        title="Previous"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor="#5A98B9"
                        color="#fcfcfc"
                        disabled={!(current > 1)}
                    />
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Page{" "}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </Box>
                    <CustomButton
                        title="Next"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#5A98B9"
                        color="#fcfcfc"
                        disabled={current === pageCount}
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={10}
                        onChange={(e) =>
                            setPageSize(
                                e.target.value ? Number(e.target.value) : 10,
                            )
                        }
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                Show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </Box>
    );
};

export default AllPosts;
