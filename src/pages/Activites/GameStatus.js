import MKTypography from "../../components/MKTypography";
import React, {useState} from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DefaultCounterCard from "../../examples/Cards/CounterCards/DefaultCounterCard";
import Divider from "@mui/material/Divider";
import MKBox from "../../components/MKBox";

import {getDatabase, ref, query, orderByKey, onValue, get, child, set} from "firebase/database";
import fire from "../User/fire";

function GameStatus({uid}) {

  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(0);

  const db = getDatabase();

  get(ref(db, 'users/'+uid+'/currentSession/'))
    .then((snapshot) => {
      const sessionIndex = snapshot.val();
      const sessionRef = ref(db, 'users/'+uid+"/sessions/"+sessionIndex);
      onValue(sessionRef, (snapshot) => {
        const data = snapshot.val();
        setScore(data['points']);
        setShots(data['shots']);
      });
    }
  );


  return (
      <MKBox component="section" py={3}>
        <Container>
          <Grid container item xs={12} lg={9} sx={{mx: "auto"}}>
            <Grid item xs={12} md={4}>
              <DefaultCounterCard
                count={score}
                title="Your Score"
              />
            </Grid>
            <Grid item xs={12} md={4} display="flex">
              <Divider orientation="vertical" sx={{display: {xs: "none", md: "block"}, mx: 0}}/>
              <DefaultCounterCard
                count={shots}
                title="Number of Shots"
              />
              <Divider orientation="vertical" sx={{display: {xs: "none", md: "block"}, ml: 0}}/>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
  );
};

export default GameStatus;
