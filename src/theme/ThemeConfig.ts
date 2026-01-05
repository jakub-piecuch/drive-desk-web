import { createTheme } from '@mui/material/styles';

const paperColor = '#222222'

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