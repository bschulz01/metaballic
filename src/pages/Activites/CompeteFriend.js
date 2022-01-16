/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// About Us page sections
import Information from "pages/LandingPages/AboutUs/sections/Information";
import Team from "pages/LandingPages/AboutUs/sections/Team";
import Featuring from "pages/LandingPages/AboutUs/sections/Featuring";
import Newsletter from "pages/LandingPages/AboutUs/sections/Newsletter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Firebase
import "firebase/database"

// Images
import bgImage from "assets/images/bg-about-us.jpg";
import fire from "../User/fire";
import loggedInRoute from "../../loggedInRoute";
import loggedOutRoute from "../../loggedOutRoute";
import React, {useState} from "react";
import {child, get, getDatabase, ref, set} from "firebase/database";
import GameStatus from "./GameStatus";
import GameHistory from "../Stats/GameHistory";

import Dropdown from "../../components/Dropdown/Dropdown";

function CompeteFriend() {

  const [active, setActive] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const [userFriendMap, setFriendMap] = useState({});
  const [friend, setFriend] = useState("Select Friend");

  let uid = fire.auth().currentUser.uid;
  // if (fire.auth().currentUser) {
  //   uid = fire.auth().currentUser.uid;
  // }

  loadData();

  function addNewSession(id) {
    const db = getDatabase();
    get(ref(db, 'users/'+id+'/currentSession'))
      .then((snapshot) => {
        let newNumber = (parseInt(snapshot.val()? snapshot.val() : 0)+1).toString();
        set(ref(db, 'users/'+id+'/sessions/'+newNumber), {
          "points": 0,
          "shots": 0
        });
        set(ref(db, 'users/'+id+'/currentSession'), newNumber);
    });
  }

  function startGame() {
    // if (uid == '' && fire.auth().currentUser) {
    //   uid = fire.auth().currentUser.uid;
    // }
    if (friend == '' || friend == 'Select User') {
      console.log('Friend not specified');
      return
    }
    const dbRef = ref(getDatabase());
    // Write the new post's data simultaneously in the posts list and the user's post list.
    get(child(dbRef, 'users/'+uid))
      .then((snapshot) => {
        let newStatus = false;
        if (snapshot.exists() && 'active' in snapshot.val()) {
            newStatus = !snapshot.val()['active'];
        }
        set(ref(getDatabase(), 'users/'+uid+'/active'), newStatus);
        setActive(newStatus);
        if (newStatus) {
          addNewSession(uid);
        }
      }).catch((error) => {
        console.error(error);
    });
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const friendId = userFriendMap[friend];
    get(child(dbRef, 'users/'+friendId))
      .then((snapshot) => {
        let newStatus = false;
        if (snapshot.exists() && 'active' in snapshot.val()) {
            newStatus = !snapshot.val()['active'];
        }
        set(ref(getDatabase(), 'users/'+friendId+'/active'), newStatus);
        if (newStatus) {
          addNewSession(friendId);
        }
      }).catch((error) => {
        console.error(error);
    });
  }

  function loadData() {
    if (fire.auth().currentUser) {
      const uid = fire.auth().currentUser.uid;
      const dbRef = ref(getDatabase());

      // const sessionRefs = ref(db, 'users/'+uid+'/sessions');
      get(child(dbRef, "users/" + uid + "/friends")).then((snapshot) => {
        // let friendList = [];
        // let friendMap = {};
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(function (value, index) {
            const friendId = value[1];
            get(child(dbRef, "users/" + friendId + "/info/name")).then((snapshot2) => {
              const name = snapshot2.val()
              if (!userFriends.includes(name)) {
                let currFriends = userFriends;
                currFriends.push(name);
                setUserFriends(currFriends);
                let currMap = userFriendMap;
                currMap[name] = friendId;
                setFriendMap(currMap)
              }
            });
          });
          // setUserFriends(friendList);
          // setFriendMap(friendMap);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    console.log(userFriends, userFriendMap);
  }


  return (
    <>
      <DefaultNavbar
        // routes={routes.concat(fire.auth().currentUser ? loggedInRoute : loggedOutRoute)}
        routes={routes}
        transparent
        light
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Compete with a Friend in real time
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              A real time competition with a friend! Your stats will update live as you both play
            </MKTypography>
            <Grid alignItems="center">
            <Dropdown
              items={userFriends}
              title={friend}
              cb={setFriend}
            />
            </Grid>
            <Grid alignItems="center">
            {friend == '' || friend == "Select Friend" ?
              (<MKButton color="warning" size="large" disabled /*sx={{ color: ({ palette: { dark } }) => dark.main }}*/>
                Select competitor
              </MKButton>)
              : (<MKButton color={active ? "warning" : "success"}
                           size="large"
                           onClick={startGame}/*sx={{ color: ({ palette: { dark } }) => dark.main }}*/>
                {active ? "End Game" : "Begin Game" }
              </MKButton>)
            }
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      {active ?
        (<Card
            sx={{
              p: 2,
              mx: {xs: 2, lg: 3},
              mt: -8,
              mb: 4,
              backgroundColor: ({palette: {white}, functions: {rgba}}) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({boxShadows: {xxl}}) => xxl,
            }}
          >
          <MKTypography
          >
            Your Score
          </MKTypography>
          <GameStatus uid={uid}/>
          <MKTypography
          >
            {friend}&apos;s Score
          </MKTypography>
          <GameStatus uid={userFriendMap[friend]}/>
          </Card>) : null}
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default CompeteFriend;
