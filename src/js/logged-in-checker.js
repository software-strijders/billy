import { store } from "../js/state/store.js";
import { actions } from "../js/state/login.js";

const data = JSON.parse(window.localStorage.getItem("data"));

// NOTE: This is for demonstration purposes only! 
// This can very easily be circumvented
if (data && data.email) {
  store.dispatch(
    actions.login({
      loggedIn: true,
      user: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        link: data.link,
        organization: data.organization,
      },
    }),
  );
}
