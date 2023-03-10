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

import './styles.scss';
import qdrantLogo from '../../svgs/qdrant-logo.svg';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 200;

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
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Link to={HOME_PAGE.path}>
          <img className="app-logo" src={qdrantLogo} alt="Qdrant Logo" />
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
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
