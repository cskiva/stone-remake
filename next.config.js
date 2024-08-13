// eslint-disable-next-line
const withImages = require("next-images");
// eslint-disable-next-line
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// eslint-disable-next-line
module.exports = 
withImages({
	fileExtensions: ["jpg", "jpeg", "png", "gif"],
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// if (dev) {
		// 	config.plugins.push(
		// 		new BundleAnalyzerPlugin({
		// 			analyzerMode: "server",
		// 			analyzerPort: 8888,
		// 			openAnalyzer: true,
		// 		})
		// 	);
		// }
		config.module.rules.push(
			{
				test: /\.svg$/,
				issuer: {
					test: /\.(js|ts)x?$/,
				},
				use: ["@svgr/webpack"],
			},
			{
				test: /\.md$/,
				use: "raw-loader",
			}
		);
		return config;
	},
});
