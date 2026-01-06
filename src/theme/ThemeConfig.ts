import { BorderBottom } from '@mui/icons-material';
import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const paperColor = '#222222'
const borderColor = '#282828'

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  defaultColorScheme: 'dark', // ← THIS FIXES THE FLASH
  shape: {
    borderRadius: 6
  },
  typography: {
    // Using Inter font (common with Tailwind/Next.js) with system font fallbacks
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    // Fine-tune the typography scale to match Tailwind defaults
    fontSize: 16, // Base font size (Tailwind default is 16px but MUI default is 14px)

    h1: {
      fontSize: '2.25rem', // text-4xl
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.875rem', // text-3xl
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem', // text-2xl
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem', // text-xl
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem', // text-lg
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem', // text-base
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem', // text-base (16px)
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem', // text-sm (14px)
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem', // text-sm
      fontWeight: 500,
      textTransform: 'none', // Remove uppercase transformation
    },
    caption: {
      fontSize: '0.75rem', // text-xs
      lineHeight: 1.5,
    },
  },
  components: {
   MuiCssBaseline: {
      styleOverrides: {
        // ============================================================================
        // REACT-BIG-CALENDAR COMPREHENSIVE BORDER OVERRIDE
        // ============================================================================
        
        // Base Calendar Container
        '.rbc-calendar': {
          backgroundColor: paperColor,
          borderRadius: '6px',
          border: '1px solid',
          padding: '16px',
          height: '100%',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },

        // ============================================================================
        // MONTH VIEW - Grid Cell Borders
        // ============================================================================
        
        '.rbc-month-view': {
          border: `1px solid ${borderColor}`,
          borderRadius: '6px',
          overflow: 'hidden',
        },
        
        // Month rows (horizontal lines)
        '.rbc-month-row': {
          borderTop: `1px solid ${borderColor}`,
          borderColor: borderColor,
        },
        
        // Individual row backgrounds
        '.rbc-row-bg': {
          borderColor: borderColor,
        },
        
        // Day cells background (vertical lines between days)
        '.rbc-day-bg': {
          borderLeft: `1px solid ${borderColor}`,
        },
        '.rbc-day-bg:first-child': {
          borderLeft: 'none',
        },
        
        // Date cells (the numbered date cells)
        '.rbc-date-cell': {
          padding: '8px',
          borderColor: borderColor,
        },
        
        // Row segments
        '.rbc-row-segment': {
          padding: '0 2px 2px',
        },
        
        // Row content wrapper
        '.rbc-row-content': {
          borderColor: borderColor,
        },

        // ============================================================================
        // HEADERS - Day Names
        // ============================================================================
        
        '.rbc-header': {
          padding: '10px 3px',
          fontWeight: 600,
          color: '#ffffff',
          borderBottom: `1px solid ${borderColor}`,
          borderLeft: `1px solid ${borderColor}`, // Vertical separators
        },
        '.rbc-header:first-child': {
          borderLeft: 'none',
        },
        '.rbc-header + .rbc-header': {
          borderLeft: `1px solid ${borderColor}`,
        },

        // ============================================================================
        // WEEK/DAY VIEW - Time Slots
        // ============================================================================
        
        '.rbc-time-view': {
          border: `1px solid ${borderColor}`,
          borderRadius: '6px',
          overflow: 'hidden',
        },
        
        // Time slot rows (horizontal hour lines)
        '.rbc-time-slot': {
          borderTop: `1px solid ${borderColor}`,
        },
        
        // Day slot time slots (inside each day column)
        '.rbc-day-slot .rbc-time-slot': {
          borderTop: `1px solid ${borderColor}`,
        },
        
        // Time content wrapper
        '.rbc-time-content': {
          borderTop: `2px solid ${borderColor}`,
          borderLeft: `1px solid ${borderColor}`,
        },
        
        // Time header (the day name headers in week view)
        '.rbc-time-header': {
          borderBottom: `1px solid ${borderColor}`,
        },
        
        '.rbc-time-header-content': {
          borderLeft: `1px solid ${borderColor}`,
        },
        
        // Timeslot groups (vertical day columns)
        '.rbc-timeslot-group': {
          borderLeft: `1px solid ${borderColor}`,
        },
        
        // Day slot columns
        '.rbc-day-slot': {
          borderLeft: `1px solid ${borderColor}`,
        },
        '.rbc-day-slot:first-child': {
          borderLeft: 'none',
        },
        
        // Time column (the left column with times)
        '.rbc-time-column': {
          borderRight: `1px solid ${borderColor}`,
        },
        
        // Time gutter (left edge time labels)
        '.rbc-time-gutter': {
          borderRight: `1px solid ${borderColor}`,
        },
        
        // Label container (time labels in gutter)
        '.rbc-label': {
          borderTop: `1px solid ${borderColor}`,
        },

        // ============================================================================
        // AGENDA VIEW
        // ============================================================================
        
        '.rbc-agenda-view': {
          border: `1px solid ${borderColor}`,
          borderRadius: '6px',
          overflow: 'hidden',
        },
        
        '.rbc-agenda-table': {
          borderColor: borderColor,
          
          // Table cells
          'thead > tr > th': {
            borderBottom: `1px solid ${borderColor}`,
          },
          'tbody > tr > td': {
            borderTop: `1px solid ${borderColor}`,
          },
        },
        
        '.rbc-agenda-date-cell, .rbc-agenda-time-cell': {
          whiteSpace: 'nowrap',
          padding: '12px',
          borderLeft: `1px solid ${borderColor}`,
        },
        
        '.rbc-agenda-event-cell': {
          padding: '12px',
        },

        // ============================================================================
        // EVENTS & INTERACTIONS
        // ============================================================================
        
        '.rbc-event': {
          padding: '2px 5px',
          fontSize: '0.875rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          border: 'none', // Remove any default borders from events
        },
        
        '.rbc-event:hover': {
          opacity: '0.8 !important',
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        },
        
        '.rbc-selected': {
          backgroundColor: '#2d6633 !important',
        },
        
        '.rbc-slot-selection': {
          backgroundColor: 'rgba(60, 136, 67, 0.3)',
          border: `1px dashed ${borderColor}`,
        },

        // ============================================================================
        // TOOLBAR
        // ============================================================================
        
        '.rbc-toolbar': {
          padding: '10px 0',
          marginBottom: '10px',
          flexWrap: 'wrap',
          gap: '10px',
        },
        
        '.rbc-toolbar button': {
          color: '#ffffff',
          borderColor: borderColor,
          backgroundColor: paperColor,
          padding: '6px 12px',
          fontSize: '0.875rem',
          borderRadius: '6px',
          border: `1px solid ${borderColor}`,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: borderColor,
            color: '#ffffff'
          },
          '&:active, &.rbc-active': {
            backgroundColor: '#3c8843',
            color: '#ffffff',
            borderColor: borderColor,
          },
        },
        
        '.rbc-toolbar-label': {
          fontSize: '1.25rem',
          fontWeight: 600,
          textTransform: 'capitalize',
        },

        // ============================================================================
        // OVERLAYS & POPUPS
        // ============================================================================
        
        '.rbc-overlay': {
          background: paperColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          padding: '8px',
          zIndex: 1000,
        },
        
        '.rbc-overlay-header': {
          borderBottom: `1px solid ${borderColor}`,
          padding: '8px',
          margin: '-8px -8px 8px',
          fontWeight: 600,
        },
        
        '.rbc-show-more': {
          backgroundColor: 'transparent',
          color: 'inherit',
          fontSize: '0.75rem',
          padding: '2px 4px',
          margin: '2px',
          borderRadius: '2px',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(60, 136, 67, 0.1)',
            color: '#3c8843',
          },
        },

        // ============================================================================
        // SPECIAL STATES
        // ============================================================================
        
        '.rbc-today': {
          backgroundColor: 'rgba(60, 136, 67, 0.1)',
        },
        
        '.rbc-off-range-bg': {
          backgroundColor: '#313131',
        },
        
        '.rbc-off-range': {
          opacity: 0.5,
        },
        
        '.rbc-current-time-indicator': {
          backgroundColor: '#3c8843',
          height: '2px',
        },

        // ============================================================================
        // RESPONSIVE MOBILE STYLES
        // ============================================================================
        
        '@media (max-width: 768px)': {
          '.rbc-toolbar': {
            flexDirection: 'column',
            alignItems: 'stretch',
          },
          '.rbc-toolbar > *': {
            marginBottom: '8px',
          },
          '.rbc-toolbar button': {
            width: '100%',
          },
          '.rbc-header': {
            padding: '8px 2px',
            fontSize: '0.75rem',
          },
          '.rbc-event': {
            fontSize: '0.75rem',
            padding: '1px 3px',
          },
        },

        // ============================================================================
        // NUCLEAR OPTION - Override ANY remaining white borders
        // ============================================================================
        
        // This catches any classes I might have missed
        '[class*="rbc-"]': {
          borderColor: `${borderColor} !important`,
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
          }
        },
        paper: {
          background: paperColor
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: paperColor
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(35px)'
        },
        paper: {
          background: '#1a1a1a',
          border: '1px solid',
          borderColor: '#282828',
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: '2',
          minWidth: '180',
          boxShadow: 'none',
          border: '1px solid',
          borderColor: '#282828'
        }
      },
      defaultProps: {
        elevation: 2
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#171717',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5EB567',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5EB567',
          },
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #282828'
        },
        head: {
          color: '#858585',
          fontWeight: 'bold',
        },
        body: {
          // fontWeight: 'bold',
        },
        stickyHeader: {
          backgroundColor: paperColor
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none', // Keep button text as-is (not uppercase)
          fontWeight: 500,
        }
      }
    }
  },
  colorSchemes: {
    dark: {
      palette: {
        divider: '#282828',
        background: {
          default: '#1a1a1a',
          paper: paperColor
        },
        primary: {
          main: '#3c8843',
        },
        grey: {
          700: '#1a1a1a',
          900: '#171717'
        },
        text: {
          secondary: '#858585'
        }
      }
    }
  }
});