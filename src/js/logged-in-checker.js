import { store } from "../js/store.js";
import { actions } from "../js/login.js";

const data = JSON.parse(window.localStorage.getItem("data"));

if (data.email) {
  console.log(data)
  store.dispatch(
    actions.login({
      loggedIn: true,
      user: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        university: data.university,
      },
    }),
  );
}
