import { AppBar, Badge, Button, Link, Toolbar } from "@material-ui/core";
import Image from "next/image";
import NextLink from "next/link";
import { useSelector } from "react-redux";
import { NavbarWrapper } from "../../../styles/components/navbar/navbar";
import Account from "./sub/Account";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.order);

  const myLoader = ({ src, width, quality }) => {
    return `https://shop.jsworld.ir/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <NavbarWrapper>
      <AppBar position="static" className="navbar">
        <Toolbar>
          {/* Logo */}
          <NextLink href="/" passHref>
            <Link>
              <Image
                loader={myLoader}
                src="images/logo.png"
                width={80}
                height={50}
                alt="alan-market"
              />
            </Link>
          </NextLink>

          {/* Cart */}
          <NextLink href="/cart" passHref>
            <Link>
              <Button
                variant="outlined"
                style={{ color: "white", border: "1px solid white" }}
              >
                <span>سبد خرید</span>
                {cart.cartItems.length > 0 && (
                  <Badge
                    color="secondary"
                    badgeContent={cart.cartItems.length}
                    style={{ marginRight: "15px" }}
                  />
                )}
              </Button>
            </Link>
          </NextLink>

          <div className="grow"></div>

          <div>
            {/* User Account */}
            <Account userInfo={userInfo} />
          </div>
        </Toolbar>
      </AppBar>
    </NavbarWrapper>
  );
};
export default Navbar;
