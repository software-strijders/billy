const baseUrl =
  import.meta.env.MODE === "production"
    ? `https://${window.location.hostname}/api`
    : `http://${window.location.hostname}:3000/api`;

export function getArticles() {
  return fetch(`${baseUrl}/article`).then((response) => {
    if (response.ok) return response.json();
    else throw Error("Kon artikelen niet laden...");
  });
}

export function getArticleByTitle(title) {
  return fetch(`${baseUrl}/article/${title}`).then((response) => {
    if (response.ok) return response.json();
    else throw Error("Kon artikel niet laden...");
  });
}

export function logIn(user) {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then((response) => {
    if (response.ok) return response.json();
    else throw Error("U heeft geen geldige inloggegevens ingevuld.");
  });
}

export function sendArticle(article) {
  return fetch(`${baseUrl}/article`, {
    method: "POST",
    body: JSON.stringify(article),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then((response) => {
    if (response.ok) return response;
    else throw Error("Kon artikel niet opslaan");
  });
}

export function deleteArticle(title) {
  return fetch(`${baseUrl}/article/${title}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) return response;
    else console.log(response);
  });
}

export function updateArticle(article, oldTitle) {
  return fetch(`${baseUrl}/article/${oldTitle}`, {
    method: "PATCH",
    body: JSON.stringify(article),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }).then((response) => {
    if (response.ok) return response;
    else throw Error("Kon artikel niet opslaan");
  });
}
