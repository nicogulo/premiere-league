const API_KEY = "26a41a12b187477aa61704c6f9f02140";
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2021;
const score = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const team = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
var dataTeam;

const fetchAPI = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
};

function getScore() {
  if ("caches" in window) {
    caches.match(score).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showScore(data);
        })
      }
    })
  }

  fetchAPI(score)
    .then(data => {
      showScore(data);
    })
    .catch(error => {
      console.log(error)
    })
}

function showScore(data) {
  showLoader();
  let standings = "";
  let standingElement = document.getElementById("main-content");
  hideLoader();

  data.standings[0].table.forEach(function (standing) {
    standings += `
                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getTeam() {
  if ("caches" in window) {
    caches.match(team).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          showTeam(data);
        })
      }
    })
  }

  fetchAPI(team)
    .then(data => {
      showTeam(data);
    })
    .catch(error => {
      console.log(error)
    })
}

function showTeam(data) {
  showLoader();
  dataTeam = data;
  var teams = "";
  data.teams.forEach(function (team) {
    teams += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
            <div class="center flow-text">${team.name}</div>
            <div class="center">${team.area.name}</div>
          </div>
          <div class="card-action center-align">
              <a class="waves-effect waves-light btn-small #1a237e indigo darken-4" onclick="insertTeamListener(${team.id})">Add to Your Favorite</a>
          </div>
        </div>
      </div>
        `;
  });
  document.getElementById("main-content").innerHTML = teams;
  hideLoader();
}


var elTeamFavorit = () => {
  var teams = getTeamfav()
  showLoader();

  teams.then(data => {
    dataTeam = data;
    var html = ' '
    html += '<div class="row">'
    data.forEach(team => {
      html += `
      <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div class="center"><img width="64" height="64" src="${team.crestUrl || 'img/empty_badge.svg'}"></div>
            <div class="center flow-text">${team.name}</div>
            <div class="center">${team.area.name}</div>
          </div>
          <div class="card-action center-align">
              <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${team.id})">Delete</a>
          </div>
        </div>
      </div>
    `
    })

    if (data.length == 0) html += '<h6 class="Kamu tidak memiliki team favorit!</6>'

    html += "</div>"
    let doc = document.getElementById('main-content');
    doc.innerHTML = html;
    hideLoader();
  })
}

// database operations
var dbPromised = idb.open('football', 1, upgradeDb => {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('team', { keyPath: 'id' })
  }
});



function insertTeam(team) {
  dbPromised.then(db => {
    var tx = db.transaction('team', 'readwrite');
    var store = tx.objectStore('team');
    team.createdAt = new Date().getTime();
    store.put(team);
    return tx.complete;
  }).then(() => {
    M.toast({ html: `team ${team.name} berhasil disimpan!` });
    console.log('Team berhasil disimpan');
  }).catch(err => {
    console.error('Team gagal disimpan', err);
  });
}

var deleteTeam = (idTeam) => {
  dbPromised.then(db => {
    var tx = db.transaction('team', 'readwrite');
    var store = tx.objectStore('team');
    store.delete(idTeam);
    return tx.complete;
  }).then(() => {
    M.toast({ html: 'Team Sudah Di Hapus!' });
    elTeamFavorit();
  }).catch(err => {
    console.error('Error: ', err);
  });
}

var getTeamfav = () => {
  return dbPromised.then(db => {
    var tx = db.transaction('team', 'readonly');
    var store = tx.objectStore('team');
    return store.getAll();
  })
}



var insertTeamListener = idTeam => {
  var team = dataTeam.teams.filter(el => el.id == idTeam)[0]
  insertTeam(team);
}

var deleteTeamListener = idTeam => {
  var c = confirm("Yakin Mau Hapus?")
  if (c == true) {
    deleteTeam(idTeam);
  }
}

var showLoader = () => {
  var html = `<div class="preloader-wrapper medium active">
              <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
              </div>`
  let doc = document.getElementById('loader');
  doc.innerHTML = html;
}

var hideLoader = () => {
  let doc = document.getElementById('loader');
  doc.innerHTML = '';
}