import { Alert, CircularProgress, Slide, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSigninCheck } from "reactfire";
import Logged from "./components/Logged/Logged";
import Login from "./components/Login/Login";

export const General = () => {
    const [InfoMsg, setInfoMsg] = useState("");
    const [InfoOpen, setInfoOpen] = useState(false);
	const [InfoSev, setInfoSev] = useState("success");
	const { status, data: userresult } = useSigninCheck();
	const closeInfo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
		setInfoOpen(false);
        return
    };
	const openInfo = useCallback((msg, severity = "success") => {
		setInfoOpen(true);
		setInfoMsg(msg);
		setInfoSev(severity);
        return
	}, []);
	if (status === "loading") {
		return <CircularProgress />
	}
	return (
		<>
			<Snackbar
				open={InfoOpen}
				onClose={closeInfo}
				autoHideDuration={4000}
				TransitionComponent={(props) => (
					<Slide
						{...props}
						direction="up"
					/>
				)}
			>
				<Alert
					severity={InfoSev}
					onClose={closeInfo}
					sx={{ width: "100%" }}
				>
					{InfoMsg}
				</Alert>
			</Snackbar>
			{userresult.signedIn ? <Logged user={userresult.user} openInfo={openInfo} /> : <Login openInfo={openInfo} />}
		</>
	);
};
