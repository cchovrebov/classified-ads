import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navigation from '../../../components/Navigation/Navigation';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import AddCardIcon from '@mui/icons-material/AddCard';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux'
import { setPost } from './categoriesSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';



const theme = createTheme();

const CategoriesList = () => {
  const postCreateReducer = useSelector((state) => state.postCreateReducer);
  const dispatch = useDispatch()

  const [checked, setChecked] = useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleInputChange = (value, inputName) => {
    dispatch(setPost({ inputName, value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit');
  };

  // title: req.body.title,

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <main>

        <Container
          sx={{
            bgcolor: 'background.paper',
            mt: 12,
            mb: 12,
            xs: 12,
          }} maxWidth="xs">
          <Grid container spacing={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AddCardIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create category
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit}
                style={{ width: '100%' }}>
                <FormControl style={{ width: '100%', marginTop: '12px' }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    autoFocus
                    error={postCreateReducer?.error?.title?.show}
                    helperText={postCreateReducer?.error?.title?.show ? postCreateReducer.error.title.message : ''}
                    onInput={(e) => handleInputChange(e.target.value, 'title')}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Grid>
          <Container
            sx={{
              bgcolor: 'background.paper',
              mt: 12,
              mb: 12,
              xs: 12,
            }} maxWidth="xs">

            <Grid container fullWidth spacing={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                }}
              >

                <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem
                        key={value}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar n°${value + 1}`}
                              src={`/static/images/avatar/${value + 1}.jpg`}
                            />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Grid>
          </Container>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default CategoriesList;
