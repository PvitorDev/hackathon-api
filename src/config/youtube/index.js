import fetch from "node-fetch";
const fcamara = "UCHsQ04xha1YKv48dSzQFlpw"; //ID DOS CANAIS
const orange = "UCQWG9_9bap_FmKKX5LUHD5g";
const rocket = "UCSfwM5u0Kce6Cce8_S72olg";
const alura = "UCo7EHzKF2zDFWszw7Dg4mPw";
const API_KEY = "API"; //API KEY do google
import ytdl from "ytdl-core";

async function buscarId() {
  try {
    const ytb = await ytdl.getBasicInfo(
      //Link de video de algum canal escolhido
      "https://www.youtube.com/watch?v=HZPS_uxT6sw&t=1s",
    );
    console.log(ytb.channelId);
  } catch (error) {}
}
async function fetchYoutube() {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${rocket}&maxResults=15&key=${API_KEY}`,
    );
    const data = await response.json();
    let objVideos = [];

    const videos = await data.items;
    for (const video of videos) {
      objVideos.push({
        id: `https://www.youtube.com/embed/videoseries?list=${video.id}`,
        titulo: video.snippet.title,
        thumbnails: video.snippet.thumbnails.standard.url,
      });
    }

    console.log(objVideos);
  } catch (error) {
    console.error(error);
  }
}
fetchYoutube();
