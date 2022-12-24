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
import Navigation from '../../../components/Navigation/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getPublishedPosts } from '../../../services/post';
import { setLoading, setPosts } from './postsSlice';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import _ from 'lodash'

const theme = createTheme();

const PostsPage = () => {
  const postsReducer = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    getPublishedPosts()
      .then(data => {
        const mappedData = _.map(data, (post) => ({
          ...post,
          images: _.map(
            _.split(post.images, '[SEPARATOR]'),
            data_url => ({ data_url })
          ),
        }))
        dispatch(setPosts(mappedData))
        dispatch(setLoading(false))
      }).catch(() => {
        dispatch(setLoading(false))
      })
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>
        <Container style={{ marginTop: '30px' }}>
          <Grid container spacing={6}>
            {_.map(
              _.orderBy(postsReducer.posts, ['createdAt'], ['desc']),
              (post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={_.get(post, 'images.0.data_url') || '/default.jpg'}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                          {post.title}
                        </span>
                        <span>
                          {`${post.price}$`}
                        </span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton>
                        <FavoriteBorderIcon color="error" />
                      </IconButton>
                      <Button size="small">
                        <Link href={`/post/${post.id}`} variant="body2">
                          View
                        </Link>
                      </Button>
                      <Button size="small">
                        <Link href={`/post/${post.id}/edit`} variant="body2">
                          Edit
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider >
  );
}

export default PostsPage;
