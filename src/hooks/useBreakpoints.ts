'use client';

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm')) 
  || useMediaQuery(theme.breakpoints.between('sm', 'md'));
}

export function useIsDesktop() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
}