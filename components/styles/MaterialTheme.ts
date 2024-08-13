import {COLORS} from "./colors";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: COLORS.purple.rollover,
		},
		secondary: {
			main: COLORS.StoneCadenceGreen,
		},
	},
});

export default theme;