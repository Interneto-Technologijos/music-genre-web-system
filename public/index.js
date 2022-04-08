(function () {
  document.getElementById("submitButton").addEventListener("click", () => {
    //   getTrackGenreDetails(document.getElementById("fragmentInput").value)
    getTracks(document.getElementById("fragmentInput").value);
  });

  function getTracks(fragment) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (httpRequest.status !== 200) {
        alert("There was a problem getting tracks");
        return;
      }
      displayTracks(JSON.parse(httpRequest.responseText));
    };
    httpRequest.open("GET", `/track?fragment=${fragment}`);
    httpRequest.send();
  }

  function displayTracks(tracks) {
    const listElement = document.getElementById("trackList");
    listElement.innerHTML = "";
    tracks.forEach((track) => {
      const listItemElement = document.createElement("li");
      const anchorElement = document.createElement("a");
      anchorElement.setAttribute("href", "#");
      anchorElement.innerHTML = `${track.artist} - ${track.title}`;
      anchorElement.addEventListener("click", () => {
        getTrackGenreDetails(track.id);
      });
      listItemElement.appendChild(anchorElement);
      listElement.appendChild(listItemElement);
    });
  }

  function getTrackGenreDetails(trackId) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (httpRequest.status !== 200) {
        alert("There was a problem getting track genre details");
        return;
      }
      displayTrackGenreDetails(trackId, JSON.parse(httpRequest.responseText));
    };
    httpRequest.open("GET", `/track/${trackId}/genre-details`);
    httpRequest.send();
  }

  function suggestTrackGenre(trackId, details) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      if (httpRequest.status !== 200) {
        alert("There was a problem getting tracks");
        return;
      }
    };
    httpRequest.open("POST", `/track/genre/suggestion`);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(
      JSON.stringify({
        trackId,
        details,
      })
    );
  }

  function displayTrackGenreDetails(trackId, details) {
    const rockAnchorElement = document.createElement("a");
    rockAnchorElement.setAttribute("href", "#");
    rockAnchorElement.innerHTML = getPercent(details.rock);
    rockAnchorElement.addEventListener("click", () => {
      suggestTrackGenre(trackId, [1, 0, 0, 0]);
    });
    const popAnchorElement = document.createElement("a");
    popAnchorElement.setAttribute("href", "#");
    popAnchorElement.innerHTML = getPercent(details.pop);
    popAnchorElement.addEventListener("click", () => {
      suggestTrackGenre(trackId, [0, 1, 0, 0]);
    });
    const rnbAnchorElement = document.createElement("a");
    rnbAnchorElement.setAttribute("href", "#");
    rnbAnchorElement.innerHTML = getPercent(details.rnb);
    rnbAnchorElement.addEventListener("click", () => {
      suggestTrackGenre(trackId, [0, 0, 1, 0]);
    });
    const edmAnchorElement = document.createElement("a");
    edmAnchorElement.setAttribute("href", "#");
    edmAnchorElement.innerHTML = getPercent(details.edm);
    edmAnchorElement.addEventListener("click", () => {
      suggestTrackGenre(trackId, [0, 0, 0, 1]);
    });
    document.getElementById("rockTd").innerHTML = "";
    document.getElementById("rockTd").appendChild(rockAnchorElement);
    document.getElementById("popTd").innerHTML = "";
    document.getElementById("popTd").appendChild(popAnchorElement);
    document.getElementById("rnbTd").innerHTML = "";
    document.getElementById("rnbTd").appendChild(rnbAnchorElement);
    document.getElementById("edmTd").innerHTML = "";
    document.getElementById("edmTd").appendChild(edmAnchorElement);
  }

  function getPercent(value) {
    return Math.round(value * 100) + "%";
  }
})();
