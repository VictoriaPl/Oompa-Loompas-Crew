module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
  plugins: ["@babel/plugin-transform-react-jsx"],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"],
    },
  },
};
