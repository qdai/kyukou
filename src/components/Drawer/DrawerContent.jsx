import { Link as AnchorLink, AppBar, IconButton, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, styled } from '@mui/material';
import { Check as CheckIcon, Code as CodeIcon, GitHub as GitHubIcon, Home as HomeIcon, RssFeed as RssFeedIcon, Settings as SettingsIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import React, { Fragment, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../constant';
import useAppContext from '../../hooks/use-app-context';

const Logout = lazy(() => import(/* webpackChunkName: "drawer-content-logout" */'./Logout'));

const Content = styled(Typography)(({ theme }) => ({ margin: theme.spacing(1, 2) }));

const Ul = styled('ul')(() => ({
  listStyleType: 'none',
  margin: 0,
  padding: 0
}));

const DrawerContent = () => {
  const { closeDrawer: handleCloseDrawer, isAdmin } = useAppContext();

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
      <Content>
        {site.description}
      </Content>
      <List component="nav">
        <Ul>
          {[
            {
              Icon: HomeIcon,
              primary: 'ホーム',
              to: '/'
            },
            {
              Icon: SettingsIcon,
              primary: '設定',
              to: '/settings'
            },
            {
              Icon: CheckIcon,
              primary: 'ステータス',
              to: '/status'
            }
          ].map(({ Icon, primary, to }) => (
            <li key={`${primary}${to}`}>
              <ListItem
                button
                component={Link}
                onClick={handleCloseDrawer}
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
          {isAdmin && (
            <Suspense fallback={<LinearProgress />}>
              <li>
                <Logout />
              </li>
            </Suspense>
          )}
        </Ul>
      </List>
      <Content align="center">
        <IconButton
          aria-label="Twitter"
          href={`https://twitter.com/${site.twitter}`}
          rel="noopener noreferrer"
          size="large"
          target="_blank"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          aria-label="RSS"
          href="/rss"
          size="large"
        >
          <RssFeedIcon />
        </IconButton>
        <IconButton
          aria-label="GitHub"
          href={`https://github.com/${site.author}/kyukou`}
          rel="noopener noreferrer"
          size="large"
          target="_blank"
        >
          <GitHubIcon />
        </IconButton>
      </Content>
      <Content align="center">
        <AnchorLink href="/">
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
      </Content>
    </Fragment>
  );
};

export default DrawerContent;
