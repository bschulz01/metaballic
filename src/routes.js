/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  All of the routes for the Material Kit 2 React React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Activity pages
import Practice from "./pages/Activites/Practice";
import CompeteFriend from "./pages/Activites/CompeteFriend";
import CompeteSelf from "./pages/Activites/CompeteSelf";
// Stat pages
import AllActivities from "./pages/Stats/AllActivities";
import GameHistory from "./pages/Stats/GameHistory";
import Records from "./pages/Stats/Records";
import Sessions from "./pages/Stats/Sessions";
// Other Pages
import Friends from "./pages/User/Friends";
import Profile from "./pages/User/Profile";
import SignOut from "./pages/User/SignOut";
import SignIn from "./pages/User/SignIn";

import fire from "./pages/User/fire";

const routes = [
  {
    name: "Start Activity",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "Competition Mode",
        collapse: [
          {
            name: "With Friend",
            route: "/activities/live-competition",
            component: <CompeteFriend />,
          },
          {
            name: "Against Record",
            route: "/activites/competition",
            component: <CompeteSelf />,
          },
        ],
      },
      {
        name: "Practice Mode",
        collapse: [
          {
            name: "Timed Practice",
            route: "/activites/practice",
            component: <Practice />,
          },
        ],
      },
    ],
  },
  {
    name: "Stats",
    icon: <Icon>view_day</Icon>,
    collapse: [
      {
        name: "Game History",
        description: "See stats for previous games with friends",
        route: "/stats/gamehistory",
        component: <GameHistory />,
      },
      {
        name: "Personal Records",
        description: "See personal records for all game types",
        route: "/stats/records",
        component: <Records />,
      },
      {
        name: "Practice Sessions",
        description: "View logs from all non-competitive training sessions",
        route: "/stats/practice-sessions",
        component: <Sessions />,
      },
      {
        name: "All",
        description: "View all Activites",
        route: "/stats/full-history",
        component: <AllActivities />,
      },
    ],
  },
  {
    name: "Friends",
    // icon: <Icon>S</Icon>,
    route: "/user/friends",
    component: <Friends />,
  },
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
  // {
  //   name: "Sign in",
  //   // icon: <Icon>S</Icon>,
  //   route: "/authentication/sign-in",
  //   component:<SignIn/>,
  // }
];

// if (fire.auth().currentUser) {
//   routes.concat([
//     {
//       name: "account",
//       // icon: <Icon>A</Icon>,
//       collapse: [
//         {
//           name: "Profile",
//           route: "/user/profile",
//           description: "Update profile information",
//           component: <Profile/>
//         },
//         {
//           name: "Log Out",
//           route: "/user/signout",
//           description: "Sign out of your account",
//           component: <SignOut/>,
//         },
//       ],
//     },
//   ])
// } else {
//   routes.concat([
//   {
//     name: "Sign in",
//     // icon: <Icon>S</Icon>,
//     route: "/authentication/sign-in",
//     component:<SignIn/>,
//   }])
// }

export default routes;
