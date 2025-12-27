import { createTheme } from '@mui/material/styles';

const paperColor = '#222222'

export const theme = createTheme({
  shape: {
    borderRadius: 6
  },
  typography: {
    fontFamily: ''
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6, // And this
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#1a1a1a',

          // backgroundColor: paperColor, // Your custom color
          border: '1px solid',
          borderColor: '#282828'
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
        elevation: 2, // This removes the default elevation shadow
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#171717', // Default border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5EB567', // Hover border color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5EB567', // Focused border color
          },
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #282828'
        },
        head: {  // Targets only header cells
          color: '#858585', // Your primary green
          fontWeight: 'bold', // Optional: make headers bold
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
