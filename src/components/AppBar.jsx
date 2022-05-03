import { ArrowBack as ArrowBackIcon, Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, AppBar as MUIAppBar, Toolbar, Typography, styled } from '@mui/material';
import { Link, useMatch } from 'react-router-dom';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../hooks/use-app-context';

const MenuButton = styled(IconButton)(({ theme }) => ({ marginRight: theme.spacing(2) }));

const AppBar = ({ children = null }) => {
  const { openDrawer: handleOpenDrawer } = useAppContext();
  const match = useMatch('/events/*');

  return (
    <Fragment>
      <MUIAppBar>
        <Toolbar>
          {match
            ? (
              <MenuButton
                aria-label="ホームに戻る"
                color="inherit"
                component={Link}
                edge="start"
                size="large"
                to="/"
              >
                <ArrowBackIcon />
              </MenuButton>
            )
            : (
              <MenuButton
                aria-label="メニューを開く"
                color="inherit"
                edge="start"
                onClick={handleOpenDrawer}
                size="large"
              >
                <MenuIcon />
              </MenuButton>
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
