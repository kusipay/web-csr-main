import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined
  // ArrowDropDownOutlined,
} from '@mui/icons-material';

import FlexBetween from '@/components/FlexBetween';
// import profileImage from "@/assets/profile.jpeg";
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, InputBase, Toolbar } from '@mui/material';
import { setMode } from '@/redux/slices/globalSlice';

function Navbar({
  isSidebarOpen,
  setIsSidebarOpen
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  console.log(theme);

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            sx={{
              // backgroundColor: theme.palette.background.alt,
              borderRadius: '9px',
              gap: '3rem',
              p: '0.1rem 1.5rem'
            }}
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* RIGTH SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
