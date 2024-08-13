const baseHue = 211;
const baseSaturation = 22;
const baseLightness = 20;
const darkShift = 5;

const StoneClassyDarkColor = `hsl(${baseHue}, ${baseSaturation}%, ${baseLightness}%)`;
const StoneClassyDarkColorDarkened = `hsl(${baseHue}, ${baseSaturation}%, ${baseLightness - darkShift}%)`;
const StoneClassyDarkColorBG = `hsl(${baseHue}, ${baseSaturation}%, ${baseLightness - darkShift * 2.4}%)`;

//HSL TO HEX function TODO:

// function hslToHex(h, s, l) {
//     l /= 100;
//     const a = s * Math.min(l, 1 - l) / 100;
//     const f = n => {
//         const k = (n + h / 30) % 12;
//         const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//         return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
//     };
//     return `#${f(0)}${f(8)}${f(4)}`;
// }

export const COLORS = {
	purple: {
		default: "#5a4e70",
		DeepPurple: "#5a4e70",
		rollover: "#5a4ecc",
		cadenceLavender: "#CACde0",
	},
	StoneClassyDarkColor: StoneClassyDarkColor,
	StoneClassyDarkColorBG: StoneClassyDarkColorBG,
	StoneClassyDarkColorDarkened: StoneClassyDarkColorDarkened,
	StoneLightWhiteGrey: `hsl(${baseHue}, 9%, 93%)`,
	StoneCadenceGreen: "#6c887a",
	mellowYellow: "#f9d670",
	mellowYellowTrans50: "#f9d67030",
	StoneMediumGreyColor: `hsl(${baseHue}, 0%, 20%)`,
	IndianRed: "#CD5C5C",
	NiceGreen: "#359E2C",
	ForensicNewsColor: "hsl(212, 43%, 37%)",
	heroGradient: `  hsl(261deg 18% 37%) 0%,
  hsl(261deg 20% 38%) 1%,
  hsl(260deg 21% 39%) 3%,
  hsl(259deg 23% 40%) 5%,
  hsl(259deg 25% 40%) 8%,
  hsl(258deg 26% 41%) 10%,
  hsl(257deg 28% 42%) 13%,
  hsl(257deg 29% 43%) 17%,
  hsl(256deg 30% 44%) 21%,
  hsl(255deg 32% 45%) 26%,
  hsl(255deg 33% 45%) 33%,
  hsl(254deg 34% 46%) 40%,
  hsl(253deg 35% 47%) 48%,
  hsl(252deg 37% 48%) 57%,
  hsl(252deg 38% 49%) 66%,
  hsl(251deg 39% 50%) 75%,
  hsl(250deg 41% 51%) 82%,
  hsl(249deg 44% 52%) 87%,
  hsl(248deg 46% 53%) 91%,
  hsl(248deg 49% 53%) 95%,
  hsl(247deg 52% 54%) 98%,
  hsl(246deg 55% 55%) 100%`
} as const;

export function renderSwitch(color: string): string {
	switch (color) {
		case "kelly green":
			return "green";
		case "royal blue":
			return "#4169E1";
		case "sun yellow":
			return "#f9d71c";
		case "purple":
			return "purple";
		case "heather grey":
			return "grey";
		case "heather gray":
			return "#A9A9A9";
		case "lime green":
			return "#89db46";
		case "navy":
			return "#2a2f75";
		case "forest green" :
			return "#165916";
		case "pink":
			return "LightPink";
		case "heather oatmeal":
			return "#F8F8DC";
		case "heather denim":
			return "#32464f";
		case "heather ice blue":
			return "cornflowerBlue";
		case "heather burgundy":
			return "#800020";
		case "burgundy":
			return "#99334D";
		case "asphalt gray":
			return "#505050";
		case "natural": 
			return "#f2e2c6";
		case "charcoal":
			return "#555555";
		case "charcoal grey":
			return "darkgrey";
		case "dark pink":
			return "#E75480";
		case "deep navy":
			return "#000052";
		case "heather blue":
			return "#32527b";
		case "olive green":
			return "#3c472d";
		case "teal":
			return "#0e7183";
		case "steel blue":
			return "#40476e";
		case "steel green":
			return "#749186";
		case "khaki" :
			return "#dccba0";
		default:
			return color;
	}
}
