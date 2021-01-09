const baseUrl = import.meta.env.MODE === "production" 
  ? `https://${window.location.hostname}/api` 
  : `http://${window.location.hostname}:3000/api`;

export function getArticles() {
  return fetch(`${baseUrl}/article`)
    .then(response => {
      if (response.ok) return response.json();
      else throw Error("Kon artikelen niet laden...");
    });
}

export function getArticleByTitle(title) {
  return fetch(`${baseUrl}/article/${title}`)
    .then(response => {
      if (response.ok) return response.json();
      else throw Error("Kon artikel niet laden...");
    });
}

export function logIn(user) {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then(response => {
    if (response.ok) return response.json();
    else throw Error("Inloggen mislukt");
  })
}

export function sendArticle(article) {
  return fetch(`${baseUrl}/article`, { 
    method: "POST",
    body: JSON.stringify(article), 
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then(response => {
      if (response.ok) return response;
      else throw Error("Kon artikel niet opslaan");
    })
}
