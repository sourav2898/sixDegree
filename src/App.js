import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import Relations from "./components/Relations";
import { Typography } from "@mui/material";
import PickFriends from "./components/PickFriends";

function App() {
  const [listOfPerson, setListOfPerson] = useState([]);
  const [allFriends, setAllFriends] = useState([]);

  const addPerson = (name) => {
    setListOfPerson([...listOfPerson, name]);
    const obj = {};
    obj[name] = [];
    setAllFriends([...allFriends, obj]);
    console.log(allFriends);
  };

  const addFriend = (person, list) => {
    const tempObj = [...allFriends];

    // adding the friend list to the person.
    for (let val of tempObj) {
      if (Object.keys(val)[0] == person) val[person] = list;
    }
    // setting the allFriendlsit.
    setAllFriends(tempObj);
    factorFriends();
  };

  const factorFriends = () => {
    const tempFriends = [...allFriends];
    for (let friend of tempFriends) {
      const key = Object.keys(friend)[0];
      const friendList = [...Object.values(friend)[0]];

      for (let one of friendList) {
        for (let frnd of allFriends) {
          if (Object.keys(frnd)[0] == one) {
            if (!Object.values(frnd)[0].includes(key)) {
              Object.values(frnd)[0].push(key);
            }
          }
        }
      }
    }

    setAllFriends(tempFriends);
  };

  let visited = [];

  let friendList = [];

  const sixDegree = (first, second) => {
    getFriendList(first, second);
    visited = [];
    return friendList;
  };

  const setFriendList = () => {
    friendList = [];
  };

  const getFriendList = (first, second) => {
    visited.push(first);
    // console.log(visited);
    if (first == second) {
      const data = [...visited];
      friendList.push(data);
      console.log(friendList);
      // visited = [];
      return true;
    }
    let friends = [];
    for (let friend of allFriends) {
      if (Object.keys(friend)[0] === first) {
        friends = Object.values(friend)[0];
        break;
      }
    }
    // console.log(friends);
    for (let friend of friends) {
      if (!visited.includes(friend)) {
        getFriendList(friend, second);
        visited.pop();
      }
    }
  };

  return (
    <div className="App">
      <Header addPerson={addPerson} list={listOfPerson} />
      <PickFriends
        names={listOfPerson}
        allFriends={allFriends}
        sixDegree={sixDegree}
        setFriendList={setFriendList}
      />
      <Typography color="#fff" variant="h5" ml="10%">
        {" "}
        Select Frined List :{" "}
      </Typography>
      {listOfPerson.map((value, index) => {
        return (
          <Relations
            key={index}
            addFriend={addFriend}
            list={listOfPerson}
            name={value}
          />
        );
      })}
    </div>
  );
}

export default App;
