import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Navigation from '../../../components/Navigation/Navigation'

const cards = [1];

const theme = createTheme();

const PostsPage = () => {
  useEffect(() => {
    console.log('Load');
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>

        <Container
          sx={{
            bgcolor: 'background.paper',
            mt: 8,
            mb: 6,
          }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12}>
                <Card
                  sx={{ height: '10rem', display: 'flex', flexDirection: 'column' }}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
                        alt="random"
                      />

                    </Grid>
                    <Grid item xs={8}>

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Heading
                        </Typography>
                        <Typography>
                          This is a media card. You can use this section to describe the
                          content.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <FavoriteBorderIcon color="error" />
                        {/* <Button size="small">Edit</Button> */}
                      </CardActions>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default PostsPage;
