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
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navigation from '../../../components/Navigation/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getPublishedPosts, likePost, removeLike, removePost } from '../../../services/post';
import { setLoading, setPosts } from './postsSlice';
import { setPosts as setLikedPosts } from '../LikedPosts/likedPostsSlice';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import _ from 'lodash'

const theme = createTheme();

const PostsPage = () => {
  const postsReducer = useSelector((state) => state.postsReducer);
  const likedPostsReducer = useSelector((state) => state.likedPostsReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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

  const handleLike = async (postId) => {
    const likedPost = await likePost({ postId });
    dispatch(setLikedPosts([
      likedPost,
      ...likedPostsReducer.posts
    ]));
  }

  const handleUnlike = async (postId) => {
    await removeLike(postId);
    const likedPosts = _.filter(likedPostsReducer.posts, post => post.id !== postId);
    dispatch(setLikedPosts(likedPosts));
  }

  const handlePostRemove = async (postId) => {
    await removePost(postId);
    const posts = _.filter(postsReducer.posts, post => post.id !== postId);
    dispatch(setPosts(posts))
  }

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
                      {_.find(likedPostsReducer.posts, { id: post.id }) ? (
                        <IconButton onClick={() => handleUnlike(post.id)}>
                          <FavoriteIcon color="error" />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleLike(post.id)}>
                          <FavoriteBorderIcon color="error" />
                        </IconButton>
                      )}
                      <Button size="small">
                        <Link href={`/post/${post.id}`} variant="body2">
                          View
                        </Link>
                      </Button>
                      {(userReducer.user.role === 'admin' || userReducer.user.id === post.user) && (
                        <Button size="small">
                          <Link href={`/post/${post.id}/edit`} variant="body2">
                            Edit
                          </Link>
                        </Button>
                      )}
                      {(userReducer.user.role === 'admin' || userReducer.user.id === post.user) && (
                        <Button onClick={() => handlePostRemove(post.id)} size="small">
                          Remove
                        </Button>
                      )}
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
