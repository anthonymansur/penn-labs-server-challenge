const fs = require("fs");
const path = require("path");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send('Welcome to the PennClubReview API!');
  });

  app.post("/", (req, res) => {
    res.send("The request body is: " + req.body);
  });

  // Gets all the users
  app.get("/api/users", (req, res) => {
    const rawdata = fs.readFileSync("./models/users.json");
    const users = JSON.parse(rawdata);
    res.json({
      success: true,
      item: users
    });
  });

  // Adds new user
  app.post("/api/user", (req, res) => {
    if (
      req.body.name &&
      req.body.email &&
      req.body.id &&
      req.body.password &&
      req.body.year
    ) {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        id: req.body.id,
        password: req.body.password,
        year: req.body.year
      };
      const rawdata = fs.readFileSync("./models/users.json");
      const users = JSON.parse(rawdata);
      users.push(newUser);
      fs.writeFileSync("./models/users.json", JSON.stringify(users));
      res.json({
        success: true
      });
    } else {
      res.json({
        success: false,
        message: "Body is missing parameters"
      });
    }
  });

  // Gets all the clubs
  app.get("/api/clubs", (req, res) => {
    const rawdata = fs.readFileSync("./models/club_list.json"); 
    const clubs = JSON.parse(rawdata);
    res.json({
      success: true,
      item: clubs
    });
  });

  // Adds new club
  app.post("/api/clubs", (req, res) => {
    if (req.body.name && req.body.size) { 
      newClub = {
        name: req.body.name,
        size: req.body.size
      };
      const rawdata = fs.readFileSync("./models/club_list.json");
      const clubs = JSON.parse(rawdata);
      clubs.push(newClub);
      fs.writeFileSync("./models/club_list.json", JSON.stringify(clubs));

      //add club to the end of everyone's ranking by default
      const rankings = JSON.parse(fs.readFileSync("./models/rankings.json"));
      for (let i = 0; i < rankings.length; i++) {
        rankings[i].rankings.push(newClub.name);
      }
      fs.writeFileSync("./models/rankings.json", JSON.stringify(rankings));
      res.json({ success: true, item: clubs});
    } else {
      res.json({ success: false, message: "Body is missing parameters" })
    }
  });

  // Updates a user's ranking
  app.post("/api/rankings/:id", (req, res) => {
    if (req.body.clubs && req.body.clubs.constructor === Array) {

      const clubs = JSON.parse(fs.readFileSync("./models/club_list.json"));

      if (req.body.clubs.length !== clubs.length) {
        res.json({
          success: false,
          message: "All clubs must be ranked!"
        })
      }

      const clubsSeen = [];
      const isUnique = true;
      req.body.clubs.forEach(club => {
        if (clubsSeen.includes(club)) {
          isUnique = false;
        } else {
          clubsSeen.push(club);
        }
      });

      if (!isUnique) {
        res.json({
          success: false,
          message: "Club rankings must be unique!"
        })
      }

      const userRankings = JSON.parse(fs.readFileSync("./models/rankings.json"));
      let userIndex = -1;
      for (let i = 0; i < userRankings.length; i++) {
        if (userRankings[i].user_id === req.params.id) {
          userIndex = i;
        }
      }
      if (userIndex !== -1) {
        userRankings[userIndex].rankings = req.body.clubs
        fs.writeFileSync("./models/rankings.json", JSON.stringify(userRankings));
        res.json({success: true, item: userRankings[userIndex].rankings});
      } else {
        userRankings.push({
          user_id: req.params.id,
          rankings: req.body.clubs
        });
        fs.writeFileSync("./models/rankings.json", JSON.stringify(userRankings));
        res.json({
          success: true,
          item: req.body.clubs
        });
      }
    } else {
      res.json({
        success: false,
        message: "Incorrect parameters"
      });
    }
  });

  // Gets a user's rankings
  app.get("/api/rankings/:id", (req, res) => {
    const rawdata = fs.readFileSync("./models/rankings.json");
    const userRankings = JSON.parse(rawdata);
    let userIndex = -1;
    for (let i = 0; i < userRankings.length; i++) {
      if (userRankings[i].user_id === req.params.id) {
        userIndex = i;
      }
    }
    if (userIndex !== -1) {
      res.json({success: true, item: userRankings[userIndex].rankings});
    } else {
      res.json({ success: false });
    }
  });

  // Gets a user via id 
  app.get("/api/user/:id", (req, res) => {
    const rawdata = fs.readFileSync("./models/users.json");
    const users = JSON.parse(rawdata);
    let userIndex = -1;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === req.params.id) {
        userIndex = i;
      }
    }
    userIndex !== -1 && res.json({ success: true, item: users[userIndex] });
  });

  // Extra: Returns the clubs in sorted order of popularity
  app.get("/api/clubs/sorted", (req, res) => {
    const clubs = JSON.parse(fs.readFileSync("./models/club_list.json"));
    const rankings = JSON.parse(fs.readFileSync("./models/rankings.json"));
    const rankMap = new Map();
    for (let i = 0; i < clubs.length; i++) {
      rankMap.set(clubs[i].name, 0);
    }
    for (let i = 0; i < rankings.length; i++) {
      for (let j = 0; j < rankings[i].rankings.length; j++) {
        rankMap.set(
          rankings[i].rankings[j],
          rankMap.get(rankings[i].rankings[j]) + j
        );
      }
    }
    const sortedClubs = clubs.sort((a, b) => {
      return rankMap.get(a.name) - rankMap.get(b.name);
    });
    res.json({ success: true, item: sortedClubs });
  });
};
