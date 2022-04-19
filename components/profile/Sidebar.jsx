import NextLink from "next/link";

import TextWithIcon from "../common/TextWithIcon";
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import {
  AccountCircle,
  EditOutlined,
  ExitToApp,
  PersonOutlineOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

const sidebarData = [
  {
    id: 1,
    text: "اطلاعات حساب کاربری",
    name: "personal-info",
    href: "/profile/personal-info",
    icon: <PersonOutlineOutlined />,
  },
  {
    id: 2,
    text: "سفارش ها",
    name: "orders",
    href: "/profile/orders",
    icon: <ShoppingBasketOutlined />,
  },
];

const Sidebar = ({ activeItem }) => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Card className="profile-sidebar">
      <List className="profile-sidebar__userInfo">
        <AccountCircle className="userIcon" />
        {userInfo && (
          <div className="userInfo">
            <h3>{userInfo.name}</h3>
            {userInfo.phone && <p>{userInfo.phone}</p>}
          </div>
        )}
        <Tooltip title="ویرایش حساب کاربری" arrow>
          <IconButton aria-label="edit" className="editIcon" size="small">
            <EditOutlined />
          </IconButton>
        </Tooltip>
      </List>
      <List>
        {sidebarData.map((item) => (
          <NextLink href={item.href} passHref key={item.id}>
            <ListItem
              selected={activeItem === item.name ? true : false}
              button
              component="a"
            >
              <ListItemText
                primary={<TextWithIcon icon={item.icon} text={item.text} />}
              />
            </ListItem>
          </NextLink>
        ))}
        <NextLink href="/logout" passHref>
          <ListItem
            button
            component="a"
            style={{
              color: "#ef4056",
              borderTop: "1px solid #f0f0f1",
            }}
          >
            <ListItemText
              primary={
                <TextWithIcon icon={<ExitToApp />} text="خروج از حساب کاربری" />
              }
            />
          </ListItem>
        </NextLink>
      </List>
    </Card>
  );
};

export default Sidebar;
