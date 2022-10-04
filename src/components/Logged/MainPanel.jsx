import { Box, CircularProgress, Divider, Skeleton, Slide } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useFirestoreDocData } from "reactfire";
import { TermClass } from "../../helpers/TermSearch";
import { UserDocs } from "../../helpers/UserDocuments";
import DirectMsgs from "../DirectMsgs/DirectMsgs";
import UtilsPanel from "../UtilsPanel/UtilsPanel";
import CreateChatModal from "./Create/CreateChat";

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
	openInfo,
	mainPanel,
	setMainPanel,
	setUserPanel,
	setFriendsPanel,
	setComunityPanel,
	setActiveChat,
	setChatPanel,
	setActiveChatData,
	activeChat,
}) => {
	const searchInput = useRef(null);
	const [curPage, setCurPage] = useState(1);
	const [newChat, setnewChat] = useState(false);
	const [termResults, setTermResults] = useState([]);
	const [displayResults, setDisplayResults] = useState([]);
	const { chats: chatDoc, received_req, friends } = UserDocs(fire, user);
	//////////////////////////////////////////////////////////////
	const { status, data } = useFirestoreDocData(chatDoc);
	const { status: friends_s, data: friends_data } =
		useFirestoreDocData(friends);
	const { status: req_s, data: received_req_data } =
		useFirestoreDocData(received_req);
	const { pagesSize, changePage, setResults, executeSearch } =
		new TermClass().ChatSearch({
			user,
			data,
			openInfo,
			searchInput,
			curPage,
			setCurPage,
			termResults,
			setTermResults,
			setDisplayResults,
		});
	useEffect(() => {
		setResults();
	}, [setResults]);
	if (load(status) || load(req_s) || load(friends_s)) return <GhostPanel />;
	return (
		<Slide
			mountOnEnter
			unmountOnExit
			direction="right"
			in={mainPanel}
		>
			<Stack className="h-full w-full gap-1 z-[130] bg-slate-100">
				<UtilsPanel
					user={user}
					openInfo={openInfo}
					searchInput={searchInput}
					setUserPanel={setUserPanel}
					executeSearch={executeSearch}
					setMainPanel={setMainPanel}
					setFriendsPanel={setFriendsPanel}
					setComunityPanel={setComunityPanel}
					friends_data={friends_data}
					received_req_data={received_req_data}
				/>
				<Divider />
				<DirectMsgs
					user={user}
					results={displayResults}
					curPage={curPage}
					changePage={changePage}
					pagesSize={pagesSize}
					setnewChat={setnewChat}
					activeChat={activeChat}
					setChatPanel={setChatPanel}
					setActiveChat={setActiveChat}
					setActiveChatData={setActiveChatData}
				/>
				<CreateChatModal
					user={user}
					openInfo={openInfo}
					newChat={newChat}
					setnewChat={setnewChat}
					chat_data={data}
					friends_data={friends_data}
				/>
			</Stack>
		</Slide>
	);
};

export default MainPanel;
