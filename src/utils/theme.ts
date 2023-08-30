import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		vistaBlue: {
			900: "7F92FF", // vista blue
			800: "899AF6",
			700: "899AFD",
			600: "8A9CFF",
			500: "8B9DFF",
			400: "91A1FC",
			300: "92A2FF",
			200: "93A4FF",
			100: "94A6FF"
			
		},
		uranianBlue: {
			900: "C5E0FF",
			800: "C2DDFD",
			700: "C0DEFF",
			600: "BFDDFF",
			500: "BDDCFF",
			400: "B9DAFF",
			300: "B8D8FA",
			200: "B7D9FF",
			100: "B6D8FD"
		},
		neonBlue: {
			900: "5C61EF", //neon blue
			800: "5D64E5",
			700: "5E62EF",
			600: "5F63E7",
			500: "6065EE",
			400: "6065EA",
			300: "6166E7",
			200: "6266E7",
			100: "6367E7"
		}
	},
});

export default theme;
