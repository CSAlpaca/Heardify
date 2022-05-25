const Heardify = require("../Models/heardifyDb");
const playlistDb = require("../Models/playlistDb");

var SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi({
  clientId: "0a9829432e2c4df1acae5df180f278ae", // Your client id
  clientSecret: "72342689cd1a40c186f08f5a307967c1",
  redirectUri: "hhttp://localhost:3000/heardify",
});

function homePage(req, res, next) {
  res.render("heardify.ejs");
}

function playlist(req, res, next) {
  res.render("playlist.ejs");
}

function getPlaylist(req, res, next) {
  console.log("hi");
  // let getPlaylistData = spotifyApi
  //   .getPlaylist("5eAOyYLXtzQCHq1IAvatmO?si=d13b937fd5ba4375&nd=1")
  //   .then(
  //     function (data) {
  //       console.log("Some information about this playlist", data.body);
  //     },
  //     function (err) {
  //       console.log("Something went wrong!", err);
  //     }
  //   );

  spotifyApi.getAlbum("5U4W9E5WsYb2jUQWePT8Xm").then(
    function (data) {
      console.log("Album information", data.body);
    },
    function (err) {
      console.error(err);
    }
  );
  res.render("heardify.ejs", {});
}

module.exports = { homePage, playlist, getPlaylist };
