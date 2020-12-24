const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode.js");

const app = express();
const port = process.env.PORT || 3000


//DEFINING PATHS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebar engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Harshit Goyal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App Help",
    name: "Harshit Goyal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App About",
    name: "Harshit Goyal",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help 404 not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "No city found",
    });
  }
  geocode(req.query.search, (error, { latitude, longitude, location} = {} ) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      latitude: latitude,
      logitude: longitude,
      location: location,
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404 not found" });
});

//joining css js files with hbs folder (templates/views)
app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
