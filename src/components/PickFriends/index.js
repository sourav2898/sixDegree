import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PickFriends = ({ names, allFriends, sixDegree, setFriendList }) => {
  const [fn, setFn] = useState("");
  const [sn, setSn] = useState("");
  const [nOne, setNOne] = useState([]);
  const [nTwo, setNTwo] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    setNOne(names);
    setNTwo(names);
  }, [names]);

  const handleChangeFn = (event) => {
    const value = event.target.value;
    setFn(value);
    const n1 = names.filter((val) => val !== value);
    setNTwo(n1);
  };

  const handleChangeSn = (event) => {
    const value = event.target.value;
    setSn(value);
    // const n2 = nTwo.filter((val) => val !== value);
    // setNOne(n2);
  };

  const search = () => {
    const res = sixDegree(fn, sn);
    console.log(res);
    setDegree(res);
    setFn("");
    setSn("");
    setFriendList();
  };

  return (
    <>
      <Box
        sx={{
          minWidth: 120,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin: "20px 10px",
        }}
      >
        <FormControl sx={{ width: 500 }}>
          <InputLabel id="demo-simple-select-label">First Friend</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fn}
            label="First Friend"
            onChange={handleChangeFn}
          >
            {nOne.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 500 }}>
          <InputLabel id="demo-simple-select-label">Second Friend</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sn}
            label="Second Friend"
            onChange={handleChangeSn}
          >
            {nTwo.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={2} textAlign="center">
          <Button variant="contained" onClick={search}>
            {" "}
            Get the degree{" "}
          </Button>
        </Box>
      </Box>
      <Typography ml="2%" mb="2%" color="#fff">
        Degree of seperations :
        {degree.map((value) => [
          value.map((val, index) => {
            return index === value.length - 1 ? ` ${val} ; ` : ` ${val} -> `;
          }),
        ])}
      </Typography>
    </>
  );
};

export default PickFriends;
