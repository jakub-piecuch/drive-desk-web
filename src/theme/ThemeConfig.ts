import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {        
        // KLUCZOWE: Definicja kolorów bazowych dla całej strony
        background: {
          // Ten kolor tła ustawia CssBaseline dla znacznika <body>
          default: '#636363', // Bardzo jasnoszary, żeby nie było całkowicie biało
          paper: '#FFFFFF',    // Kolor tła dla komponentów takich jak Card, Paper, Dialog
        },

        // KLUCZOWE: Definicja domyślnych kolorów tekstu
        text: {
          primary: '#171717', // Domyślny kolor tekstu (niemal czarny)
          secondary: '#4B5563', // Kolor dla mniej ważnych tekstów
        },

        // 2. Twoje kolory akcentujące
        primary: {
          main: '#5EB567', 
        },
        // secondary: {
        //   main: '#38BDF8',
        // },
      },

      // 3. Globalne style komponentów
      components: {
        // ... tutaj możesz dodawać swoje globalne modyfikacje dla Button, TextField, etc.
        MuiCssBaseline: {
          styleOverrides: {
            // Możesz dodać style do body, które nadpiszą resztki
            body: {
              // Użyj czcionki zdefiniowanej przez Next.js (z layout.tsx)
              fontFamily: 'latin',
            }
          }
        }
      },
    }
  }

  // colorSchemes: {
  //   dark: {
  //     palette: {
  //       primary: {
  //         light: green[200],
  //         main: green[400],
  //         dark: green[600],
  //       },
  //       background: {
  //         default: "#f8fafc"
  //       }
  //     }
  //   }
  // }
});
