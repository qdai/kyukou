import { ArrowBack as ArrowBackIcon, Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, AppBar as MUIAppBar, Toolbar, Typography } from '@mui/material';
import { Link, useMatch } from 'react-router-dom';
import React, { Fragment, useContext } from 'react';
import AppContext from '../app-context';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({ menuButton: { marginRight: theme.spacing(2) } }));

const AppBar = ({ children = null }) => {
  const classes = useStyles();
  const { openDrawer: handleOpenDrawer } = useContext(AppContext);
  const match = useMatch('/events/*');

  return (
    <Fragment>
      <MUIAppBar>
        <Toolbar>
          {match
            ? (
              <IconButton
                aria-label="ホームに戻る"
                classes={{ root: classes.menuButton }}
                color="inherit"
                component={Link}
                edge="start"
                size="large"
                to="/"
              >
                <ArrowBackIcon />
              </IconButton>
            )
            : (
              <IconButton
                aria-label="メニューを開く"
                classes={{ root: classes.menuButton }}
                color="inherit"
                edge="start"
                onClick={handleOpenDrawer}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
          <Typography
            component="h2"
            variant="h6"
          >
            {children}
          </Typography>
        </Toolbar>
      </MUIAppBar>
      <Toolbar />
    </Fragment>
  );
};

AppBar.propTypes = { children: PropTypes.node };

AppBar.defaultProps = { children: null };

export default AppBar;
