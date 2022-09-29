import { Stack } from "@mui/system";
import Sidebar from "./Sidebar";
import ChatPanel from "./ChatPanel";
import { ref } from "firebase/database";
import React, { memo, useEffect, useState } from "react";
import { useDatabase, useFirestore } from "reactfire";
import { UserStatus } from "../../helpers/UserStatus";
import { CreateUser } from "../../helpers/CreateUser";

const Logged = ({ user, openInfo }) => {
	const uid = user.uid;
	const fire = useFirestore();
	const db = useDatabase();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState({});
	const [status, setStatus] = useState(false);
	let userStatusDB = ref(db, "/status/" + uid);
	useEffect(() => {
		setLoading(true)
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
			/>
			<ChatPanel />
		</Stack>
	);
};

export default memo(Logged);
