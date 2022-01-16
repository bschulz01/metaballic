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

import React from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKSocialButton from "../../components/MKSocialButton";

import { Line } from "react-chartjs-2";
import LineChart from "./components/LineChart";

// Material Kit 2 React examples
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";
import DefaultFooter from "../../examples/Footers/DefaultFooter";
import FilledInfoCard from "../../examples/Cards/InfoCards/FilledInfoCard";

// Homepage page sections
import Counters from "../../pages/Homepage/sections/Counters";
import Information from "../../pages/Homepage/sections/Information";
import DesignBlocks from "../../pages/Homepage/sections/DesignBlocks";
import Pages from "../../pages/Homepage/sections/Pages";
import Testimonials from "../../pages/Homepage/sections/Testimonials";
import Download from "../../pages/Homepage/sections/Download";

// Homepage page components
import BuiltByDevelopers from "../../pages/Homepage/components/BuiltByDevelopers";

// Firebase
import fire from "../User/fire";
import "firebase/database"

// import {
//   dashboardPanelChart,
//   dashboardShippedProductsChart,
//   dashboardAllProductsChart,
//   dashboard24HoursPerformanceChart,
// } from "./components/Charts"

// Routes
import routes from "../../routes";
import loggedInRoute from "../../loggedInRoute";
import loggedOutRoute from "../../loggedOutRoute";
import UserInfo from "../User/UserInfo";
import SignOut from "../User/SignOut";
import SignIn from "../User/SignIn";
import footerRoutes from "../../footer.routes";

// Images
import bgImage from "../../assets/images/bg-presentation.jpg";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
    }
  ]
};

function Homepage() {

  // let navRoutes = routes.concat(fire.auth().currentUser ? loggedInRoute : loggedOutRoute);
  let navRoutes = routes;
  // console.log(navRoutes);



  return (
    <>
      <DefaultNavbar
        // routes={routes.concat(fire.auth().currentUser ? loggedInRoute : loggedOutRoute)}
        routes={routes}
        sticky
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
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
              Metaballic{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Basketball tracking made easy and efficient.
              Bringing a classic game into the 21st century with virtual gameplay
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
        <Counters/>
        <MKBox
          bgColor="light"
          sx={5}
          sy={5}
        >
          <LineChart/>
        </MKBox>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Homepage;
