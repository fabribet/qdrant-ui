import React, { useEffect } from 'react';
import {
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  HomeOutlined,
  AdminPanelSettingsOutlined,
  CollectionsBookmarkOutlined,
} from '@mui/icons-material';

import qdrantLogo from '../../svgs/qdrant-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { LogoContainer, StyledDrawer } from './styledComponents';

const HOME_PAGE = {
  label: 'Home',
  path: '/',
  icon: HomeOutlined,
};

export const PAGES = [
  HOME_PAGE,
  {
    label: 'Collections',
    path: '/collections',
    icon: CollectionsBookmarkOutlined,
  },
  {
    label: 'Administration',
    path: '/administration',
    icon: AdminPanelSettingsOutlined,
  },
];

export default function Sidebar() {
  const location = useLocation();

  // Change page title on pathname change (this could be done on a higher component such as the Main container)
  useEffect(() => {
    const currentPage = PAGES.find((page) => page.path === location.pathname);
    document.title = `Qdrant DB UI - ${currentPage?.label}`;
  }, [location.pathname]);

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar>
        <Link to={HOME_PAGE.path}>
          <LogoContainer>
            <img className="app-logo" src={qdrantLogo} alt="Qdrant Logo" />
          </LogoContainer>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {PAGES.map((page) => (
          <Link key={page.label} to={page.path}>
            <ListItem key={page.label} disablePadding>
              <ListItemButton selected={location.pathname === page.path}>
                <ListItemIcon>
                  <page.icon />
                </ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </StyledDrawer>
  );
}
