
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from "../src/lib/AlurakutCommons";

const GlobalStyle = createGlobalStyle`
  /*RESET CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #898180;
    background-image: url('https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80');
   
  }

  h2{
    color:#ffffff;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;   
    
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  ${AlurakutStyles};
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
