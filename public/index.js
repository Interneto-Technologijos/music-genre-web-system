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
      displayTrackGenreDetails(JSON.parse(httpRequest.responseText));
    };
    httpRequest.open("GET", `/track/${trackId}/genre-details`);
    httpRequest.send();
  }

  function displayTrackGenreDetails(details) {
    document.getElementById("rockTd").innerHTML = getPercent(details.rock);
    document.getElementById("popTd").innerHTML = getPercent(details.pop);
    document.getElementById("rnbTd").innerHTML = getPercent(details.rnb);
    document.getElementById("edmTd").innerHTML = getPercent(details.edm);
  }

  function getPercent(value) {
    return Math.round(value * 100) + "%";
  }
})();
