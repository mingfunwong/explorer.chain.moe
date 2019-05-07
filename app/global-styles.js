import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .fa, .far, .fas {
    font-family: "Font Awesome 5 Free" !important;
  }
  .fab {
    font-family: "Font Awesome 5 Brands" !important;
  }
  .header-brand-img {
    height: 2.3rem;
  }
  .header .avatar{
    border-radius: initial;
    background-size: contain;
    background-color: initial;
  }
  .single-row{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header .badge{
    position: relative;
    top: -0.1rem;
  }
  .header .dropdown-item[href='${window.location.protocol}//${
  window.location.host
}'] {
    background: #efefef;
  }
  .avatar.sm{
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }
`;

export default GlobalStyle;
