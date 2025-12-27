// src/components/modules/layout/AppSidebar.tsx
"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useIsMobile } from "@/hooks/useMobile";
import {
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  HardHat,
  HomeIcon,
  LogOut,
  Menu,
  Train
} from "lucide-react";
import { signOut } from "next-auth/react";
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
}

const NavItem = ({ to, icon: Icon, label, collapsed, isMobile }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        href={to}
        selected={isActive}
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
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
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
            />
            <NavItem
              to="/home/schedules"
              icon={Calendar}
              label="Schedules"
              collapsed={collapsed}
              isMobile={isMobile}
            />
            <NavItem
              to="/home/cars"
              icon={Car}
              label="Cars"
              collapsed={collapsed}
              isMobile={isMobile}
            />
            <NavItem
              to="/home/instructors"
              icon={HardHat}
              label="Instructors"
              collapsed={collapsed}
              isMobile={isMobile}
            />
            <NavItem
              to="/home/trainees"
              icon={Train}
              label="Trainees"
              collapsed={collapsed}
              isMobile={isMobile}
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
              icon={CircleUserRound}
              label="Settings"
              collapsed={collapsed}
              isMobile={isMobile}
            />
          </List>
        </Box>
      </Box>

      {/* Sign Out Button */}
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Divider sx={{ mb: 2 }} />
        {collapsed && !isMobile ? (
          // Collapsed view - Icon only button
          <Button
            fullWidth
            variant="outlined"
            onClick={() => signOut({ callbackUrl: '/' })}
            sx={{
              minWidth: 'auto',
              px: 1,
            }}
          >
            <LogOut size={16} />
          </Button>
        ) : (
          // Expanded view - Text with icon
          <Button
            fullWidth
            variant="outlined"
            onClick={() => signOut({ callbackUrl: '/' })}
            startIcon={<LogOut size={16} />}
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
          position="sticky"
          elevation={1}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
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
              <Menu />
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