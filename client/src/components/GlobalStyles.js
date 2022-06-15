import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
      --primary-color: #3F6844;   //using
      --thirdary-color: #5DAA68;
      --secondary-color: #FAF1CF;  //using
      --fourth-color: #4E3883;
      --fifth-color: #FFDDCC;
      --sixth-color: #4D724D;
      --seventh-color: #8DB48E;
      --eigth-color: #F5F5F5;
      --accent-bg-color: rgba(204, 85, 0, 0.1);
      --page-horizontal-padding: 20px;
      --header-height: 50px;
      --max-content-width: 1200px;  
      --heading-font-family: 'Noteworthy', 'Comic Sans MS', 'Chalkduster', 'Roboto', sans-serif;
      --user-img-width: 120px;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3 {
      color: var(--primary-color);
      font-family: var(--heading-font-family);
    }
    h2 {
      font-size: 28px;
    }
    button{
        font-family:var(--heading-font-family);
        background-color: var(--primary-color);  
        color: var(--secondary-color); 
        padding: 5px 15px;
        border-radius: 1em;
        border: none;
        cursor: pointer;
        font-size: 20px;

        :hover {
        background-color: var(--thirdary-color);
        color: var(--secondary-color);
        }
    }

    header {
        color: var(--primary-color);
        font-family: var(--heading-font-family);
    }

`;
