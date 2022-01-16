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

import Dropdown from "../../components/Dropdown/Dropdown";

// Firebase

// Images
import bgImage from "assets/images/bg-about-us.jpg";
import fire from "../User/fire";
import loggedInRoute from "../../loggedInRoute";
import loggedOutRoute from "../../loggedOutRoute";
import React, {useState} from "react";

function CompeteSelf() {

  const [selected, selectVal] = useState("");

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
              Compete against a record
            </MKTypography>
          </Grid>
        </Container>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <MKTypography variant="h4" color="default" opacity={0.8} mt={1} mb={3}>
            Choose the record to compete with
          </MKTypography>
          <Grid container spacing={3}>
            <Grid item alignItems="center">
              <MKTypography variant="paragraph" color="default" opacity={0.8}>
                Select User
              </MKTypography>
              <Dropdown
                items={['Myself', "TP", "Aditya", "James"]}
                title={"User"}
                cb={selectVal}
              />
            </Grid>
            <Grid item alignItems="center">
              <MKTypography variant="paragraph" color="default" opacity={0.8}>
                Select Event
              </MKTypography>
              <Dropdown
                items={['Event 1', "Event 2", "Practice", "9000"]}
                title={"Event"}
                cb={selectVal}
              />
            </Grid>
          </Grid>
        </Card>
        <MKButton color="success" size="large" /*sx={{ color: ({ palette: { dark } }) => dark.main }}*/>
          Begin session
        </MKButton>
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default CompeteSelf;
