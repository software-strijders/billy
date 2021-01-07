module.exports = {
  mount: {
    // Routes every request to the src/ directory
    "public": "/",
    "src": "/dist",
  },
  plugins: [["@snowpack/plugin-webpack"]],
};
