import { useState } from "react";
import NextLink from "next/link";

import { Button, Link, Menu, MenuItem } from "@material-ui/core";
import {
  AccountCircle,
  ExitToApp,
  ExpandMore,
  KeyboardArrowLeft,
  Person,
  SettingsOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";

import TextWithIcon from "../../TextWithIcon";

const Account = ({ userInfo }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const loginClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      {userInfo ? (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={loginClickHandler}
            className="navbar-account__button"
          >
            <Person />
            <ExpandMore />
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ marginTop: 60 }}
          >
            <MenuItem>
              <NextLink href="/profile/personal-info">
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #f0f0f1",
                    paddingBottom: 10,
                  }}
                >
                  <AccountCircle />
                  <span style={{ marginLeft: 60, marginRight: 10 }}>
                    {userInfo.name}
                  </span>
                  <KeyboardArrowLeft />
                </div>
              </NextLink>
            </MenuItem>
            <MenuItem>
              <NextLink href="/order-history">
                <TextWithIcon
                  icon={<ShoppingBasketOutlined />}
                  text="سفارش ها"
                />
              </NextLink>
            </MenuItem>
            {userInfo.isAdmin && (
              <MenuItem style={{ marginBottom: 10 }}>
                <NextLink href="/admin/dashboard">
                  <Link>
                    <TextWithIcon
                      icon={<SettingsOutlined />}
                      text="پنل مدیریت"
                    />
                  </Link>
                </NextLink>
              </MenuItem>
            )}
            <MenuItem>
              <NextLink href="/logout">
                <Link
                  style={{
                    color: "#ef4056",
                    borderTop: "1px solid #f0f0f1",
                    paddingTop: 10,
                  }}
                >
                  <TextWithIcon
                    icon={<ExitToApp />}
                    text="خروج از حساب کاربری"
                  />
                </Link>
              </NextLink>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <NextLink href="/login" passHref>
          <Link>
            <Button
              variant="outlined"
              style={{ color: "white", border: "1px solid white" }}
            >
              <ExitToApp style={{ marginLeft: "10px" }} />
              <span>ورود | ثبت نام</span>
            </Button>
          </Link>
        </NextLink>
      )}
    </>
  );
};

export default Account;
