import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
      --primary-color: #3F6844;   //using
      --secondary-color: #FAF1CF;  //using
      --tertiary-color: #5DAA68;
      --accent-bg-color: rgba(204, 85, 0, 0.1);
      --page-horizontal-padding: 20px;
      --header-height: 50px;
      --max-content-width: 1200px;  
      --heading-font-family: 'Noteworthy', 'Comic Sans MS', 'Chalkduster', 'Roboto', sans-serif;
      --others-font-family: 'Comic Sans MS', 'Roboto', sans-serif;
      --other-font-weight: lighter; 
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
        background-color: var(--tertiary-color);
        color: var(--secondary-color);
        }
    }

    header {
        color: var(--primary-color);
        font-family: var(--heading-font-family);
    }

    p {
        font-family: var(--others-font-family);
    }

`;

export const MealCards = styled.div`
  width: 85vw;
  margin: 0 auto;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 100%;
    list-style-type: none;
  }

  li {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    list-style-type: none;
    margin-top: 60px;
    width: 30%;
    box-shadow: ${(p) =>
      p.isAvailable
        ? "1px 10px 10px 10px green"
        : "1px 10px 10px 10px lightgray"};
    border-radius: 15px;
    border: none;
    height: 350px;

    :hover {
      box-shadow: 1px 10px 10px 10px var(--primary-color);
    }
  }

  img {
    margin-top: 15px;
    object-fit: cover;
    width: 200px;
    height: 200px;
    border-radius: 1.2em;
  }
`;
