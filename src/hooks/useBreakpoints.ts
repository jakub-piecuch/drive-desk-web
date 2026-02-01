'use client';

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsMobile() {
  const theme = useTheme();
  const belowSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
  const betweenSmallAndMidBreakpoint = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return belowSmallBreakpoint || betweenSmallAndMidBreakpoint;
}

export function useIsDesktop() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
}