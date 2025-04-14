const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home list
app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
});

// Work list
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// Add new item
app.post("/", function (req, res) {
    let newItem = req.body.newItem;

    if (req.body.list === "work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
});

// Delete item
app.post("/delete", function (req, res) {
    const itemIndex = req.body.itemIndex;
    const list = req.body.list;

    if (list === "work") {
        workItems.splice(itemIndex, 1);
        res.redirect("/work");
    } else {
        items.splice(itemIndex, 1);
        res.redirect("/");
    }
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});