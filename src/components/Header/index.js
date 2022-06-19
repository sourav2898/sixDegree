import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";

const Header = ({ addPerson, list }) => {
  const [name, setName] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const add = () => {
    if (list.includes(name)) {
      alert(`${name} is alredy entered...`);
      setName("");
    } else if (name.trim() !== "") {
      addPerson(name);
      setName("");
    } else alert("Please enter name");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "35%",
        backgroundColor: `#78ceb3`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "40%",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" color="#25273c" pt={3} pb={3}>
          {" "}
          Six Degree Of Seperation{" "}
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={nameChange}
        />
        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={add}>
            {" "}
            Add person{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
