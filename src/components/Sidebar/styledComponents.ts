import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/system';

const drawerWidth = 200;
export const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  // flexshrink: 0;
  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    box-sizing: border-box;
  }
`;

export const LogoContainer = styled(Box)`
  img {
    height: 40px;
  }
`;
