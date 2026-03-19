"use client";

import { useIsMobile } from '@/hooks/useBreakpoints';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import TrainIcon from '@mui/icons-material/Train';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SIDEBAR_STATE_KEY = "sidebar-collapsed-state";
const DRAWER_WIDTH = 256;
const DRAWER_COLLAPSED_WIDTH = 77;

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  collapsed: boolean;
  isMobile: boolean;
  onMobileClick?: () => void; // ✅ ADDED: Callback to close mobile drawer
}

const NavItem = ({ to, icon: Icon, label, collapsed, isMobile, onMobileClick }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={to}
        selected={isActive}
        onClick={() => {
          // ✅ FIXED: Close mobile drawer when navigating
          if (isMobile && onMobileClick) {
            onMobileClick();
          }
        }}
        sx={{
          borderRadius: 1,
          mx: 1,
          my: 0.5,
          justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: collapsed && !isMobile ? 0 : 40,
            color: isActive ? 'white' : 'grey.400',
          }}
        >
          <Icon size={20} />
        </ListItemIcon>
        {(!collapsed || isMobile) && (
          <ListItemText
            primary={label}
            slotProps={{
              primary: {
                sx: {
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                }
              }
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export function AppSidebar() {
  const isMobile = useIsMobile();
  const { signOut } = useClerk();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobile) {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(collapsed));
    }
  }, [collapsed, isMobile]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ✅ FIXED: Actually close the mobile drawer
  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          px: 1,
        }}
      >
        {(!collapsed || isMobile) && (
          <Typography variant="h6" fontWeight={600}>
            DriveDesk
          </Typography>
        )}
        {!isMobile && (
          <IconButton
            size="small"
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              ml: 'auto',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }}
          >
            {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', mt: 2 }}>
        {/* Main Section */}
        <Box sx={{ mb: 3 }}>
          {(!collapsed || isMobile) && (
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 1,
                color: 'grey.400',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Main
            </Typography>
          )}
          <List dense>
            <NavItem
              to="/home/dashboard"
              icon={HomeIcon}
              label="Dashboard"
              collapsed={collapsed}
              isMobile={isMobile}
              onMobileClick={handleMobileNavClick} // ✅ ADDED
            />
            <NavItem
              to="/home/lessons"
              icon={CalendarMonthIcon}
              label="Lessons"
              collapsed={collapsed}
              isMobile={isMobile}
              onMobileClick={handleMobileNavClick} // ✅ ADDED
            />
            <NavItem
              to="/home/cars"
              icon={DirectionsCarIcon}
              label="Cars"
              collapsed={collapsed}
              isMobile={isMobile}
              onMobileClick={handleMobileNavClick} // ✅ ADDED
            />
            <NavItem
              to="/home/instructors"
              icon={PersonIcon}
              label="Instructors"
              collapsed={collapsed}
              isMobile={isMobile}
              onMobileClick={handleMobileNavClick} // ✅ ADDED
            />
            <NavItem
              to="/home/trainees"
              icon={TrainIcon}
              label="Trainees"
              collapsed={collapsed}
              isMobile={isMobile}
              onMobileClick={handleMobileNavClick} // ✅ ADDED
            />
          </List>
        </Box>

        {/* Settings Section */}
        <Box>
          {(!collapsed || isMobile) && (
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 1,
                color: 'grey.400',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Settings
            </Typography>
          )}
          <List dense>
            <NavItem
              to="/settings"
              icon={SettingsIcon}
              label="Settings"
              collapsed={collapsed}
              isMobile={isMobile}
              onMobileClick={handleMobileNavClick} // ✅ ADDED
            />
          </List>
        </Box>
      </Box>

      {/* Sign Out Button */}
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Divider sx={{ mb: 2 }} />
        {collapsed && !isMobile ? (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => signOut({ redirectUrl: '/auth/login' })}
            sx={{
              minWidth: 'auto',
              px: 1,
            }}
          >
            <LogoutIcon fontSize="small" />
          </Button>
        ) : (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => signOut({ redirectUrl: '/auth/login' })}
            startIcon={<LogoutIcon fontSize="small" />}
          >
            Sign Out
          </Button>
        )}
      </Box>
    </Box>
  );

  // Mobile view with AppBar and temporary Drawer
  if (isMobile) {
    return (
      <>
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
              DriveDesk
            </Typography>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
            // ✅ ADDED: Blur backdrop when drawer is open
            
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  // Desktop view with permanent Drawer
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        transition: 'width 0.3s ease-in-out',
        '& .MuiDrawer-paper': {
          width: collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease-in-out',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}