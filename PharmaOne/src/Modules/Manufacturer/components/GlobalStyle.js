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
/* Prevent text selection while dragging */
.no-select {
    user-select: none;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none;     /* IE 10+ */
}
.scrollbar {
    position: fixed;
    top: 10px;              /* Small gap from the top */
    bottom: 10px;           /* Small gap from the bottom */
    right: 20px;            /* Position on the right side */
    width: 10px;            /* Width of the scrollbar */
    background-color: #ccc; /* Scrollbar color */
    border-radius: 5px;     /* Rounded edges */
    cursor: pointer;
    z-index: 1000;
}

.scrollbar:hover {
    background-color: #999; /* Darken color on hover for better visibility */
}

.no-select {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
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
