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
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKButton from "../../components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";
import Footer from "../../layouts/sections/page-sections/footers/Footer";


// Routes
import routes from "../../routes";

// Images
import bgImage from "../../assets/images/bg-about-us.jpg";
import fire from "../User/fire";
import loggedInRoute from "../../loggedInRoute";
import loggedOutRoute from "../../loggedOutRoute";
import React, {useState} from "react";

import {
  getDatabase,
  ref,
  child,
  set,
  get,
  query,
  orderByKey
} from "firebase/database";

import GameStatus from "./GameStatus";

function Practice() {

  const [active, setActive] = useState(false);
  const [session, setSession] = useState("0");


  const uid = fire.auth().currentUser.uid;

  //
  // function getSessionStatus() {
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `users/${fire.auth().currentUser.uid}`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         if ('session' in snapshot.val()) {
  //           return snapshot.val()['session']
  //         } else {
  //           return
  //         }
  //         return snapshot.val()
  //       } else
  //     }).catch((error) => {
  //     console.error(error)
  //   });
  // }

  function addNewSession(uid) {
    const db = getDatabase();
    // console.log(ref(db, 'users/'+uid+'/sessions').get());

    get(ref(db, 'users/'+uid+'/currentSession'))
      .then((snapshot) => {
        let newNumber = (parseInt(snapshot.val()? snapshot.val() : 0)+1).toString();
        set(ref(db, 'users/'+uid+'/sessions/'+newNumber), {
          "points": 0,
          "shots": 0
        });
        set(ref(db, 'users/'+uid+'/currentSession'), newNumber);
        setSession(newNumber);
    });
  }

  function startSession() {
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
              Start your personal practice session
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              No pressure, no stakes shoot session. This will track the number of attempted shots
              and number of completed shots
            </MKTypography>
            <MKButton
              color={active ? "warning" : "success"}
              size="large" /*sx={{ color: ({ palette: { dark } }) => dark.main }}*/
              onClick={startSession}
            >
              {active ? "End session" : "Begin session" }
            </MKButton>
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
          ><GameStatus uid={uid}/>
          </Card>) : null}
      <MKBox pt={6} px={1} mt={6}>
        <Footer/>
      </MKBox>
    </>
  );
}

export default Practice;
