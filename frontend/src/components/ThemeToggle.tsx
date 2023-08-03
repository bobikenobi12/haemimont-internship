import { IconButton, useColorMode } from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ThemeToggle() {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";

	return (
		<IconButton
			aria-label="Toggle color mode"
			icon={isDark ? <SunIcon /> : <MoonIcon />}
			onClick={toggleColorMode}
		/>
	);
}
