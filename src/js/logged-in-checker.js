import { store } from "../js/store.js";
import { actions } from "../js/login.js";

const email = window.localStorage.getItem("email");

if (email) {
  store.dispatch(
    actions.login({
      loggedIn: true,
      user: {
        email: email,
      },
    }),
  );
}
