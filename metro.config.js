const { getDefaultConfig } = require("metro-config");

module.exports = async () => {
  const {
    resolver: { sourceExts },
    transformer: { assetPlugins },
  } = await getDefaultConfig();
  return {
    transformer: {
      assetPlugins: assetPlugins.filter(
        (plugin) => !plugin.__constructor.name.includes("SvgAssetPlugin")
      ),
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      sourceExts: [...sourceExts, "svg"],
    },
  };
};
