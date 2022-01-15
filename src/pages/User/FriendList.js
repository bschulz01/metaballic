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

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "../../examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "../../assets/images/team-5.jpg";
import team2 from "../../assets/images/bruce-mars.jpg";
import team3 from "../../assets/images/ivana-squares.jpg";
import team4 from "../../assets/images/ivana-square.jpg";

function FriendList() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="info">
              The Executive Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              There&apos;s nothing I really wanted to do in life that I wasn&apos;t able to get good
              at. That&apos;s my skill.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team1}
                name="Friend 1"
                position={{ color: "info", label: "A Real One" }}
                description="Congrats! You have a friend"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="Friend 2"
                position={{ color: "info", label: "Boss" }}
                description="Two friends is pretty nice"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team3}
                name="Friend 3"
                position={{ color: "info", label: "Athlete" }}
                description="Third time's a charm"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name="Friend 4"
                position={{ color: "info", label: "CS Major" }}
                description="You keep this one around to help you deal with Eggert"
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default FriendList;
