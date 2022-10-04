import { Stack } from "@mui/system";
import AppBarC from "../AppBar/AppBar";
import React, { useState } from "react";
import ComunityPanel from "../ComunityPanel/ComunityPanel";
import FriendsPanel from "../Friends/FriendsPanel";
import MainPanel from "./MainPanel";
import { useFirestore } from "reactfire";
import NotifyPanel from "../AppBar/NotifyPanel";

const Sidebar = ({
	user,
	userStatus,
	openInfo,
	activeChat,
	setActiveChat,
	setActiveChatData,
	activeChatData,
	chatPanel,
	setChatPanel,
}) => {
	const fire = useFirestore();
	const [mainPanel, setMainPanel] = useState(true);
	const [userPanel, setUserPanel] = useState(false);
	const [notifyPanel, setNotifyPanel] = useState(false);
	const [friendsPanel, setFriendsPanel] = useState(false);
	const [comunityPanel, setComunityPanel] = useState(false);
	return (
		<Stack
			className={`relative flex-col w-full sm:w-[300px] sm:min-w-[300px] shadow-md h-screen overflow-y-auto overflow-x-hidden bg-slate-100 chatPanel ${
				chatPanel && "overflow-y-hidden sm:overflow-y-auto"
			}`}
		>
			<AppBarC
				fire={fire}
				user={user}
				chatPanel={chatPanel}
				openInfo={openInfo}
				userPanel={userPanel}
				userStatus={userStatus}
				notifyPanel={notifyPanel}
				setUserPanel={setUserPanel}
				setNotifyPanel={setNotifyPanel}
				setMainPanel={setMainPanel}
				setFriendsPanel={setFriendsPanel}
				setComunityPanel={setComunityPanel}
			/>
			<MainPanel
				fire={fire}
				user={user}
				openInfo={openInfo}
				mainPanel={mainPanel}
				setMainPanel={setMainPanel}
				setUserPanel={setUserPanel}
				setChatPanel={setChatPanel}
				setFriendsPanel={setFriendsPanel}
				setComunityPanel={setComunityPanel}
				activeChat={activeChat}
				setActiveChat={setActiveChat}
				setActiveChatData={setActiveChatData}
				activeChatData={activeChatData}
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
			<NotifyPanel
				user={user}
				openInfo={openInfo}
				notifyPanel={notifyPanel}
				setNotifyPanel={setNotifyPanel}
				setMainPanel={setMainPanel}
			/>
		</Stack>
	);
};

export default Sidebar;
