import { useNavigate } from "react-router-dom";
import { useState } from "react";

// MUI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Home({ setGameConfig }) {
  const navigate = useNavigate();

  const [region, setRegion] = useState("europe");
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("nameflag");

  // Start game function
  const startGame = () => {
    setGameConfig({region, difficulty, mode});
    navigate("/play");
};

return (
    <Container>
      <Box sx={{ bgcolor: "gray", mt: 2 }}>
      <Typography variant="h4" sx={{ py: 4 }}>
        CountryGuesser
      </Typography>

      {/* REGION */}
      <FormControl component="fieldset">
        <FormLabel> Region </FormLabel>
          <RadioGroup
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            >
            
            <FormControlLabel value="europe" control={<Radio />} label="Europe" />
            <FormControlLabel value="africa" control={<Radio />} label="Africa" />
            <FormControlLabel value="asia" control={<Radio />} label="Asia" />
          </RadioGroup>
      </FormControl>

      {/* Difficulty */}
      <FormControl component="fieldset">
        <FormLabel> Difficulty </FormLabel>
          <RadioGroup
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            >
            
            <FormControlLabel value="easy" control={<Radio />} label="Easy" />
            <FormControlLabel value="hard" control={<Radio />} label="Hard" />
          </RadioGroup>
      </FormControl>

      {/* Mode */}
      <FormControl component="fieldset">
        <FormLabel> Mode </FormLabel>
          <RadioGroup
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            >
            
            <FormControlLabel value="nameflag" control={<Radio />} label="Name and flag" />
            <FormControlLabel value="flag" control={<Radio />} label="Flag only" />
          </RadioGroup>
      </FormControl>
      </Box>
      
      <Box sx={{ bgcolor: "gray", p:2 }}>
      <Button variant="contained" onClick={startGame} sx={{ bgcolor: "#ffff00", color: "black"}}>
        Start
      </Button>
      </Box>
    </Container>
    
  );
}

export default Home;