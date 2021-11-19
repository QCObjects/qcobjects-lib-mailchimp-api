#!/usr/bin/env node
console.log("Initializing tests...");
describe("QCObjects Integrity", function () {
  const path = require("path");
  const {execSync} = require("child_process");
  const absolutePath = path.resolve( __dirname, "./" );
  const package_config = require(absolutePath+"/../package.json");

  it("Verifying the version of CLI Tool", function () {

    expect(typeof execSync("node ./qcobjects-cli.js --version").toString().split("\n").reverse()[1]).toEqual("string");
    console.log("Verifying the version of CLI Tool... OK");
  });


});
