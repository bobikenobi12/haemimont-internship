import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { BrowserRouter } from "react-router-dom";

import theme from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>
);
