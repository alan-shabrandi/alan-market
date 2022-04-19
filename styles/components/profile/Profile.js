import styled from "styled-components";

export const ProfileWrapper = styled.div`
  .profile-sidebar {
    .Mui-selected {
      background-color: transparent !important;
      border-right: 3px solid #0059b2;
      color: #0059b2;
    }
  }

  .profile-sidebar__userInfo {
    display: flex;
    align-items: center;
    padding: 1.4em;
    border-bottom: 1px solid #f0f0f1;
    .userIcon {
      font-size: 3em;
    }
    .userInfo {
      margin-right: 5px;
      h3 {
        margin-bottom: 2px;
      }
      p {
        margin-top: 0;
      }
    }
    .editIcon {
      margin-right: auto;
      color: rgb(239, 64, 86);
    }
  }
`;
