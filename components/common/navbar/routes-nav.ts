export const navRoute = [
  {
    path: "/",
    page: "Home",
  },
  {
    path: "/menu",
    page: "Menu",
  },
  {
    path: "/about",
    page: "About",
  },
  {
    path: "/shop",
    page: "Shop",
  },
  {
    path: "/contact",
    page: "Contact",
  },
  {
    path: "/admin",
    page: "Admin",
    requiredLogin: true,
    isAdmin: true,
  },
];
