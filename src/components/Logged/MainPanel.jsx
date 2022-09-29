import { Box, CircularProgress, Divider, Skeleton, Slide } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useRef, useState } from "react";
import { useFirestoreDocData } from "reactfire";
import { UserDocs } from "../../helpers/UserDocuments";
import DirectMsgs from "../DirectMsgs/DirectMsgs";
import UtilsPanel from "../UtilsPanel/UtilsPanel";

export const load = (status) => {
	return status === "loading";
};

export const GhostPanel = () => {
	return (
		<Stack className="w-full h-full place-items-center justify-center z-[130]">
			<CircularProgress />
		</Stack>
	);
};

export const GhostItem = () => {
	return (
		<Box className="relative flex flex-row h-[80px] place-items-center rounded-md overflow-hidden">
			<Skeleton
				variant="rectangular"
				className="absolute h-full w-full"
			/>
			<Stack className="w-full h-full px-1 place-items-end">
				<Skeleton className="w-[calc(100%-48px)] relative" />
				<Skeleton className="w-[calc(100%-48px)] relative" />
			</Stack>
			<Skeleton
				variant="rounded"
				className="absolute w-8 h-8 sm:w-6 sm:h-6 left-1 rounded-full"
			/>
		</Box>
	);
};

const MainPanel = ({
	fire,
	user,
	mainPanel,
	setMainPanel,
	setUserPanel,
	setFriendsPanel,
	setComunityPanel,
}) => {
	const searchInput = useRef(null);
	const [termResults, setTermResults] = useState([]);
	const [displayResults, setDisplayResults] = useState([]);
	const { chats: chatDoc, received_req, friends } = UserDocs(fire, user);
	//////////////////////////////////////////////////////////////
	const { status, data: chats_data } = useFirestoreDocData(chatDoc);
	const { status: friends_s, data: friends_data } =
		useFirestoreDocData(friends);
	const { status: req_s, data: received_req_data } =
		useFirestoreDocData(received_req);
	if (load(status) || load(req_s) || load(friends_s)) return <GhostPanel />;
	/*const { pagesSize, changePage, setResults, executeSearch } = TermSearch({
		user,
		data,
		openInfo,
		searchInput,
		ItemPerPage,
		curPage,
		setCurPage,
		termResults,
		setTermResults,
		setDisplayResults,
	});
	useEffect(() => {
		//setResults();
	}, [setResults]);
	*/
	return (
		<Slide
			mountOnEnter
			unmountOnExit
			direction="right"
			in={mainPanel}
		>
			<Stack className="absolute h-full w-full bg-slate-100 gap-1 shadow-md z-[130] overflow-hidden">
				<UtilsPanel
					user={user}
					searchInput={searchInput}
					setUserPanel={setUserPanel}
					//executeSearch={executeSearch}
					setMainPanel={setMainPanel}
					setFriendsPanel={setFriendsPanel}
					setComunityPanel={setComunityPanel}
					friends_data={friends_data}
					received_req_data={received_req_data}
				/>
				<Divider className="w-[95%] mx-auto" />
				<DirectMsgs
					user={user}
					results={displayResults}
				/>
			</Stack>
		</Slide>
	);
};

export default MainPanel;
