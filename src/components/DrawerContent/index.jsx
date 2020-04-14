import { Link as AnchorLink, AppBar, IconButton, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Check as CheckIcon, Code as CodeIcon, GitHub as GitHubIcon, Home as HomeIcon, RssFeed as RssFeedIcon, Settings as SettingsIcon, Twitter as TwitterIcon } from '@material-ui/icons';
import React, { Fragment, Suspense, lazy, useContext } from 'react';
import AppContext from '../../app-context';
import { Link } from 'react-router-dom';
import { site } from '../../constant';

const Logout = lazy(() => import('./Logout'));

const useStyles = makeStyles(theme => ({
  content: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
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
      <Typography className={classes.content}>
        {site.description}
      </Typography>
      <List component="nav">
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
            <li key={`${primary}${to}`}>
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
          <li>
            <ListItem
              button
              component={AnchorLink}
              href="/api/1"
              underline="none"
            >
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="API v1" />
            </ListItem>
          </li>
          {admin && (
            <Suspense fallback={<LinearProgress />}>
              <li>
                <Logout />
              </li>
            </Suspense>
          )}
        </ul>
      </List>
      <Typography
        align="center"
        className={classes.content}
      >
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
      </Typography>
      <Typography
        align="center"
        className={classes.content}
      >
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
