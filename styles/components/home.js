import styled from 'styled-components';

export const HomeStyles = styled.div`
  .home-product__price {
    margin-right: auto;
  }

  .MuiCard-root {
    min-height: 300px;
    position: relative !important;
    &:hover {
      .product-actions {
        opacity: 1;
        pointer-events: auto;
      }
    }
    .product-actions {
      transition: opacity 0.3s ease-in;
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      right: 10px;
      color: red;
      z-index: 1;
    }
  }

  .MuiCardContent-root {
    height: 109px;
    p {
      font-size: 13px;
    }
  }

  .MuiCardActions-root {
    p {
      font-size: 15px;
    }
  }

  .loading-spinner {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
    z-index: 2;
    .css-1xdhyk6 {
      position: absolute;
      top: 37%;
      right: 40%;
    }
  }
`;
