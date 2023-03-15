import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';

import qdrantLogo from '../../svgs/qdrant-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { LogoContainer, StyledDrawer } from './styledComponents';

const HOME_PAGE = {
  label: 'Home',
  path: '/',
  icon: HomeOutlinedIcon,
};

export const PAGES = [
  HOME_PAGE,
  {
    label: 'Collections',
    path: '/collections',
    icon: CollectionsBookmarkOutlinedIcon,
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
