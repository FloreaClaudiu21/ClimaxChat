import { Stack } from "@mui/system";
import Sidebar from "./Sidebar";
import { ref } from "firebase/database";
import React, { memo, useEffect, useState } from "react";
import { useDatabase, useFirestore, useStorage } from "reactfire";
import { UserStatus } from "../../helpers/UserStatus";
import { CreateUser } from "../../helpers/CreateUser";
import ChatPanel from "../ChatPanel/ChatPanel";

const Logged = ({ user, openInfo }) => {
	const uid = user.uid;
	const db = useDatabase();
	const fire = useFirestore();
	const store = useStorage();
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState({});
	const [chatPanel, setChatPanel] = useState(false);
	const [activeChat, setActiveChat] = useState(null);
	const [activeChatData, setActiveChatData] = useState({ msgs: [], chat: [] });
	let userStatusDB = ref(db, "/status/" + uid);
	useEffect(() => {
		setLoading(true);
		UserStatus(db, userStatusDB, setStatus);
		CreateUser(fire, user, setUserData, openInfo, setLoading);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (loading) return <span>Loading User</span>;
	return (
		<Stack className="h-full w-full flex-col sm:flex-row relative">
			<Sidebar
				user={userData}
				userStatus={status}
				openInfo={openInfo}
				setLoading={setLoading}
				activeChat={activeChat}
				chatPanel={chatPanel}
				setActiveChat={setActiveChat}
				setChatPanel={setChatPanel}
				activeChatData={activeChatData}
				setActiveChatData={setActiveChatData}
			/>
			<ChatPanel
				fire={fire}
				store={store}
				user={userData}
				chatPanel={chatPanel}
				activeChat={activeChat}
				setChatPanel={setChatPanel}
				activeChatData={activeChatData}
			/>
		</Stack>
	);
};

export default memo(Logged);
