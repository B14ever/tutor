import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { createTheme,ThemeProvider } from "@mui/material/styles";
import Form from './Component/Context/Form.jsx'
import AthuContext from './Component/Context/AthuContext.jsx'
const theme = createTheme({
  typography: {
    fontFamily: ['Oswald', 'sans-serif'].join(","),
   
  },
  palette: {
    secondary: {
      main: '#16db65',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AthuContext>
        <Form>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
        </Form>
      </AthuContext>
    </React.StrictMode>
  </BrowserRouter>
)
