import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./services/firebase";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
	<FirebaseAppProvider firebaseConfig={firebaseConfig}>
		<StyledEngineProvider injectFirst>
			<App />
		</StyledEngineProvider>
	</FirebaseAppProvider>
);
