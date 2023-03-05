import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack, Card, CardContent, Grid, Button} from "@pankod/refine-mui";
import JsonData from "data/data.json";
import { Description, CheckCircle, Gavel } from '@mui/icons-material';
import { Link } from 'react-router-dom';


import {
    PieChart,
    PostsStats,
    TotalStats,
    PostCard,
} from "components";


const Home = () => {
    const { data: postsData, isLoading: postsLoading, isError: postsError } = useList({
        resource: "posts",
        config: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    const { data: usersData, isLoading: usersLoading, isError: usersError } = useList({ resource: "users" });

    const allMembers = usersData?.data ?? [];

    const latestPosts = postsData?.data ?? [];

    if (postsLoading || usersLoading)  return <Typography>Loading...</Typography>;
    if (postsError || usersError) return <Typography>Something went wrong!</Typography>;

    return (
        
        <Box>
        
        <Box
      sx={{
        bgcolor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        px: 4,
      }}
    >
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 2 }}>
        Welcome to Meet in the Middle
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
        A platform for an all italian cross-industry and academic collaboration where ideas “top-down” are matched with skills “bottom-up”.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" color="primary" size="large" component={Link} to="/posts">
        See Posts
        </Button>
        <Button variant="contained" color="primary" size="large" component={Link} to="/members">
        See Members
        </Button>
        <Button variant="outlined" color="primary" component={Link} to="/users">
          Sign Up
        </Button>
      </Box>
    </Box>


<Box mt={6}>
  <Typography variant="h4" fontWeight={700} color="#11142D">
    Our Objectives
  </Typography>
  <Grid container spacing={3} mt={3}>
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Description fontSize="large" color="primary" />
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            Connect
          </Typography>
          <Typography variant="body1">
            We will launch a platform on ISSNAF BAC where individuals can register and create a profile to showcase their skills. Individuals will be asked to identify their interest as "top down" or "bottom up".
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Gavel fontSize="large" color="primary" />
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            Empower
          </Typography>
          <Typography variant="body1">
            To register for "Meet in the Middle", individuals must complete a short questionnaire about their profile, expertise, and interests. Registered individuals can submit posts about an idea or collaboration that they would like to implement and the skill/expertise needed.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <CheckCircle fontSize="large" color="primary" />
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            Celebrate
          </Typography>
          <Typography variant="body1">
            We will organize a first "Meet in the Middle" event where participants will share their ideas for new startup ventures or scientific partnerships (top down) and will meet up and partner with individuals with the right skills (bottom up). The newly formed team will have a month to assess feasibility of ideas and execution.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>


            {/* <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Posts Top-Down"
                    value={2}
                    series={[75, 25]}
                    colors={["#2A98B9", "#c4e8ef"]}
                />
                <PieChart
                    title="Posts Bottom-Up"
                    value={3}
                    series={[25, 75]}
                    colors={["#2A98B9", "#c4e8ef"]}
                />
            </Box>

             */}

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography variant="h5" fontWeight={700} color="#11142D">
                Latest Posts
  </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestPosts.map((post) => (
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
        </Box>
    );
};

export default Home;
