import { Card, List, ListItem, ListItemText } from "@material-ui/core";
import useStyles from "../../styles/styles";
import NextLink from "next/link";
import {
  AddShoppingCart,
  HomeOutlined,
  PeopleOutline,
  Storefront,
} from "@material-ui/icons";
import TextWithIcon from "../common/TextWithIcon";

const sidebarData = [
  {
    id: 1,
    text: "داشبورد",
    name: "dashboard",
    href: "/admin/dashboard",
    icon: <HomeOutlined />,
  },
  {
    id: 2,
    text: "سفارشات",
    name: "orders",
    href: "/admin/orders",
    icon: <AddShoppingCart />,
  },
  {
    id: 3,
    text: "محصولات",
    name: "products",
    href: "/admin/products",
    icon: <Storefront />,
  },
  {
    id: 4,
    text: "کاربران",
    name: "users",
    href: "/admin/users",
    icon: <PeopleOutline />,
  },
];

const Sidebar = ({ activeItem }) => {
  const classes = useStyles();
  return (
    <Card className={classes.section}>
      <List>
        {sidebarData.map((item) => (
          <NextLink href={item.href} passHref key={item.id}>
            <ListItem
              selected={activeItem === item.name ? true : false}
              button
              component="a"
              classes={{ selected: classes.selected }}
            >
              <ListItemText
                primary={<TextWithIcon icon={item.icon} text={item.text} />}
              />
            </ListItem>
          </NextLink>
        ))}
      </List>
    </Card>
  );
};

export default Sidebar;
