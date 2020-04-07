import { Link as AnchorLink, AppBar, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Check as CheckIcon, Code as CodeIcon, GitHub as GitHubIcon, Home as HomeIcon, RssFeed as RssFeedIcon, Settings as SettingsIcon, Twitter as TwitterIcon } from '@material-ui/icons';
import React, { Fragment, useContext } from 'react';
import AppContext from '../app-context';
import { Link } from 'react-router-dom';
import { site } from '../constant';

const useStyles = makeStyles(theme => ({
  li: { listStyleType: 'none' },
  lists: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '80vw',
    minWidth: '240px'
  },
  ul: { padding: 0 }
}));

const DrawerContent = () => {
  const classes = useStyles();
  const { admin } = useContext(AppContext);
  const { setDrawerOpen } = useContext(AppContext);

  return (
    <Fragment>
      <AppBar
        elevation={0}
        position="static"
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
          >
            {site.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography paragraph>
        {site.description}
      </Typography>
      <List
        className={classes.lists}
        component="nav"
      >
        <ul className={classes.ul}>
          {[
            {
              Icon: HomeIcon,
              primary: 'Home',
              to: '/'
            },
            {
              Icon: SettingsIcon,
              primary: 'Settings',
              to: '/settings'
            },
            {
              Icon: CheckIcon,
              primary: 'Status',
              to: '/status'
            }
          ].map(({ Icon, primary, to }) => (
            <li
              className={classes.li}
              key={`${primary}${to}`}
            >
              <ListItem
                button
                component={Link}
                onClick={() => setDrawerOpen(false)}
                to={to}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={primary} />
              </ListItem>
            </li>
          ))}
          <li className={classes.li}>
            <ListItem
              button
              component={AnchorLink}
              href="/api/1"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="API v1" />
            </ListItem>
          </li>
        </ul>
      </List>
      {admin && (
        <Button
          href="/admin/logout"
          variant="contained"
        >
          {'Logout'}
        </Button>
      )}
      <IconButton
        href={`https://twitter.com/${site.twitter}`}
        rel="noopener noreferrer"
        target="_blank"
        title="Twitter"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        href="/rss"
        title="RSS"
      >
        <RssFeedIcon />
      </IconButton>
      <IconButton
        href={`https://github.com/${site.author}/kyukou`}
        rel="noopener noreferrer"
        target="_blank"
        title="GitHub"
      >
        <GitHubIcon />
      </IconButton>
      <Typography paragraph>
        <AnchorLink
          href="/"
          title={site.name}
        >
          {site.name}
        </AnchorLink>
        {` ${site.version} by `}
        <AnchorLink
          href={`https://github.com/${site.author}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {`@${site.author}`}
        </AnchorLink>
        {' · Open Sourced on '}
        <AnchorLink
          href={`https://github.com/${site.author}/kyukou`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {'GitHub'}
        </AnchorLink>
      </Typography>
    </Fragment>
  );
};

export default DrawerContent;
