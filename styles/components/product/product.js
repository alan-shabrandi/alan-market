import styled from "styled-components";

export const ProductWrapper = styled.div`
  .product-grid__container {
    padding-top: 100px;
  }

  .product-comments {
    h2 {
      position: relative;
      &::after {
        content: " ";
        display: inline-block;
        width: 4em;
        height: 3px;
        background-color: rgb(0, 62, 124);
        position: absolute;
        top: 130%;
        right: 0;
      }
    }
    > li:first-child {
      display: flex;
      justify-content: space-between;
    }
  }

  .product-name {
    font-size: 16px;
    line-height: 30px;
    font-weight: bold;
  }

  .product-feature {
    font-weight: 300;
  }

  .product-comment {
    flex-direction: column;
    align-items: start;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    .product-comment__header {
      display: flex;
      border-bottom: 1px solid #f0f0f1;
      padding-bottom: 10px;
      width: 100%;
      .product-rating-number {
        padding: 0px 8px;
        line-height: 25px;
        border-radius: 3px;
        color: white;
        font-size: 13px;
      }
      .product-rating-stars {
        margin: 0px 10px;
      }
      .product-comment-date {
        font-size: 15px;
        margin: 0px 15px;
        color: #a1a3a8;
      }

      .product-comment-username {
        font-size: 15px;
        color: #a1a3a8;
      }
    }
    .product-comment__comment {
      margin-top: 20px;
      font-weight: 800;
    }
  }
`;
