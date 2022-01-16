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
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";

// Author page sections
// import Posts from "./sections/Posts";
import Footer from "../../layouts/sections/page-sections/footers/Footer";
import ActivityTile from "../../components/Tiles/Activity";

// Routes
import routes from "../../routes";

// Images
import bgImage from "../../assets/images/city-profile.jpg";
import activityImg from "../../assets/images/examples/blog2.jpg";

// Other imports
import Grid from "@mui/material/Grid";
import fire from "../User/fire";
import loggedInRoute from "../../loggedInRoute";
import loggedOutRoute from "../../loggedOutRoute";
import React, {useState} from "react";
import TransparentBlogCard from "../../examples/Cards/BlogCards/TransparentBlogCard";
import Container from "@mui/material/Container";
import {get, getDatabase, onValue, orderByValue, ref, child} from "firebase/database";
import MenuItem from "@mui/material/MenuItem";

function AllActivities() {

  const [sessionData, setData] = useState([]);


  function getState() {
    if (fire.auth().currentUser) {
      const uid = fire.auth().currentUser.uid;
      const dbRef = ref(getDatabase());

      // const sessionRefs = ref(db, 'users/'+uid+'/sessions');
      get(child(dbRef, "users/" + uid + "/sessions")).then((snapshot) => {
        let newData = []
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(function (value, index) {
            newData[value[0]] = value[1]
          })
        } else {
          console.log("No data available");
        }
        console.log(sessionData);
        setData(newData)
      }).catch((error) => {
        console.error(error);
      });
    }
  }



  return (
    <MKBox component="section" py={2}>
      <DefaultNavbar
        // routes={routes.concat(fire.auth().currentUser ? loggedInRoute : loggedOutRoute)}
        routes={routes}
        transparent
        light
      />
      <MKBox
        minHeight="25rem"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              All Past Activites
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >

        <Grid container item xs={12} lg={7} justifyContent="center" mx="auto" spacing={7}>
          {/*<Posts title="All Past Activites" />*/}
          {getState()}
          {sessionData.map((value, index) => {
            return (
              <ActivityTile
                image={activityImg}
                activityName={"Practice Session " + index}
                shotsMade={value['points']}
                shotsAttempted={value['shots']}
              />
            );
          })}
        </Grid>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <Footer />
      </MKBox>
    </MKBox>
  );
}

export default AllActivities;
