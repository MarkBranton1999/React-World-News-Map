import * as React from 'react';
import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AppContext from '../AppContext';

export default function ArticleList(props) {
  const articles = useContext(AppContext);
  return (
    <List sx={{ width: '100%', height:'100%', bgcolor: 'background.paper', overflowY: 'scroll', position: 'fixed'}}>
      { articles[props.country]?articles[props.country].map((article) => {
        return (
          <div>
            <ListItem alignItems="flex-start" button component="a" href={article.url}>
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src={article.urlToImage}/>
            </ListItemAvatar>
            <ListItemText
              primary={article.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    By {article.author}
                  </Typography>
                  {" — " + article.description}
                </React.Fragment>
              }
            />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      }): <div/>}
    </List>
  );
}