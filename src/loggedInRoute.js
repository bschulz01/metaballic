import Profile from "./pages/User/Profile";
import SignOut from "./pages/User/SignOut";

const loggedInRoute = [
  {
    name: "account",
    // icon: <Icon>A</Icon>,
    collapse: [
      {
        name: "Profile",
        route: "/user/profile",
        description: "Update profile information",
        component: <Profile/>
      },
      {
        name: "Log Out",
        route: "/user/signout",
        description: "Sign out of your account",
        component: <SignOut/>,
      },
    ],
  },
];

export default loggedInRoute;
