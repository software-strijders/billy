import { store } from "../js/store.js";
import { actions } from "../js/login.js";

const email = window.localStorage.getItem("email");
const firstName = window.localStorage.getItem("firstName");
const lastName = window.localStorage.getItem("lastName");
const role = window.localStorage.getItem("role");
const university = window.localStorage.getItem("university");

if (email) {
  store.dispatch(
    actions.login({
      loggedIn: true,
      user: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        university: university,
      },
    }),
  );
}
