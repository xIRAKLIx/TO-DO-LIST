const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Main list route
app.get("/", function(req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
});

// Post route for adding new items
app.post("/", function(req, res) {
    let newItem = req.body.newItem;

    if (req.body.list === "work") {
        workItems.push(newItem);  // Corrected: Push new item to workItems
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
});

// Work list route
app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});