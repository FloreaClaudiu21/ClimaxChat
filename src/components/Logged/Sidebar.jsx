import { Divider, Slide } from "@mui/material";
import { Stack } from "@mui/system";
import AppBarC from "../AppBar/AppBar";
import DirectMsgs from "../DirectMsgs/DirectMsgs";
import UtilsPanel from "../UtilsPanel/UtilsPanel";
import PaginationNav from "../DirectMsgs/Pagination";
import React, { useState, useEffect, useRef, useInsertionEffect } from "react";
import ComunityPanel from "../ComunityPanel/ComunityPanel";
import { TermSearch } from "../../helpers/TermSearch";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";
import { UserDocs } from "../../helpers/UserDocuments";
import FriendsPanel from "../Friends/FriendsPanel";
import MainPanel from "./MainPanel";

const Sidebar = ({ user, userStatus, openInfo }) => {
	const fire = useFirestore();
	const [mainPanel, setMainPanel] = useState(true);
	const [userPanel, setUserPanel] = useState(false);
	const [friendsPanel, setFriendsPanel] = useState(false);
	const [comunityPanel, setComunityPanel] = useState(false);
	return (
		<>
			<AppBarC
				user={user}
				openInfo={openInfo}
				userPanel={userPanel}
				userStatus={userStatus}
				setUserPanel={setUserPanel}
			/>
			<Stack className="relative flex-col w-full sm:w-[300px] sm:min-w-[300px] shadow-md h-screen bg-slate-100">
				<MainPanel
					fire={fire}
					user={user}
					mainPanel={mainPanel}
					setMainPanel={setMainPanel}
					setUserPanel={setUserPanel}
					setFriendsPanel={setFriendsPanel}
					setComunityPanel={setComunityPanel}
				/>
				<ComunityPanel
					user={user}
					openInfo={openInfo}
					comunityPanel={comunityPanel}
					setMainPanel={setMainPanel}
					setComunityPanel={setComunityPanel}
				/>
				<FriendsPanel
					user={user}
					openInfo={openInfo}
					friendsPanel={friendsPanel}
					setMainPanel={setMainPanel}
					setFriendsPanel={setFriendsPanel}
				/>
			</Stack>
		</>
	);
};

export default Sidebar;
