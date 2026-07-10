import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Hide scrollbar but keep scrolling */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  /* Firefox */
  body {
    margin: 0; /* Remove default margin from the body */
    padding: 0; /* Remove default padding from the body */
    box-sizing: border-box; /* Ensure padding and border are included in the element's total width and height */
  }

  /* Ensure that all elements have consistent box-sizing */
  *, *::before, *::after {
    box-sizing: inherit;
  }

  /* Optional: Set a base font and background color */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #F7F7F7; /* Matches the background of the main container */
  }

  /* Remove any default margin from h1, h2, etc. */
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  /* Make sure the navbar has no extra margin or padding */
  .navbar {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
