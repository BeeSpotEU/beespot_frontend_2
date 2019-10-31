const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#62D271",
        "@font-family": "Rubik, sans-serif",
        "@font-size-base": "16px",
        "@text-color": "#393E47",
        "@border-radius-base": "5px"
      }
    })
  )
};
