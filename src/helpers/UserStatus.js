import { onDisconnect, onValue, ref, set } from "firebase/database";

const isOfflineForDatabase = {
	state: "offline",
};
const isOnlineForDatabase = {
	state: "online",
};

export const UserStatus = (db, userStatus, setStatus) => {
	onValue(ref(db, ".info/connected"), (snapshot) => {
		let val = snapshot.val();
		if (!val) {
			setStatus(false);
			return;
		}
		onDisconnect(userStatus)
			.set(isOfflineForDatabase)
			.then(() => {
				setStatus(true);
				set(userStatus, isOnlineForDatabase);
			});
	});
};
