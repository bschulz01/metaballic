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
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";
import fire from "../../User/fire";
import {child, get, getDatabase, ref} from "firebase/database";
import {useState} from "react";
import InputIcon from "../../../layouts/sections/input-areas/inputs/components/InputIcon";

function Counters() {

  const [numsessions, setSessions] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [totalShots, settotalShots] = useState(0)

  if (fire.auth().currentUser) {
    const uid = fire.auth().currentUser.uid;
    const dbRef = ref(getDatabase());

    // const sessionRefs = ref(db, 'users/'+uid+'/sessions');
    get(child(dbRef, "users/" + uid + "/sessions")).then((snapshot) => {
      let numSessions = 0;
      let shotsMade = 0;
      let shotsAttempted = 0;
      if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(function (value, index) {
          numSessions += 1;
          shotsMade += 'points' in value[1] ? value[1]['points'] : 0;
          shotsAttempted += 'shots' in value[1] ? value[1]['shots'] : 0;
        })
        setSessions(numSessions);
        setPercentage(shotsAttempted === 0 ? 0: 100 * shotsMade / shotsAttempted);
        settotalShots(shotsMade);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={numsessions}
              title="Number of Sessions"
              description="Number of training sessions you have completed"
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 0 }} />
            <DefaultCounterCard
              count={percentage}
              suffix="%"
              title="FG percentage"
              description="Average percentage of suffessful shots"
            />
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 0 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={totalShots}
              title="Shots Made"
              description="Total number of baskets over your lifetime"
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Counters;
