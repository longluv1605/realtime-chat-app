const express = require("express");
const path = require("path");

// Config views engine and static files
const config = (app) => {
    // Config  template engine
    app.set("views", "./src/views");
    app.set("view engine", "ejs");

    // Config public files (static files)
    app.use(express.static("./src/public"));

    // Config json
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

module.exports = config;