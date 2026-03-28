const express = require('express');
const User = require('../model/users');

function handleUploadPage(req, res) {
    res.render('test.ejs');
}

function handleFileUpload(req, res) {
    console.log("Uploaded File:", req.file);

    return res.send("File Uploaded Successfully ✅");
}

module.exports = {
    handleUploadPage,
    handleFileUpload
};