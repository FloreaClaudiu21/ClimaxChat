import { setDoc } from "firebase/firestore";
import { UpdateUser } from "./UpdateUser";
import { UserDocs } from "./UserDocuments";

export const UserMap = (user) => {
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		photo: user.photoURL,
		lastOnline: Date.now().toString(),
	};
};

export const CreateUser = (fire, user, setUserData, openInfo, setLoading) => {
	const {
		user: userD,
		friends,
		send_req,
		blocks,
		received_req,
		chats,
	} = UserDocs(fire, user);
	setLoading(true);
	const user_map = UserMap(user);
	UpdateUser(user, userD)
		.then(() => {
			setUserData(user_map);
		})
		.catch(() => {
			setDoc(userD, user_map).then(() => {
				setDoc(friends, { data: [] });
				setDoc(send_req, { data: [] });
				setDoc(received_req, { data: [] });
				setDoc(blocks, { data: [] });
				setDoc(chats, { data: [] });
			});
			setUserData(user_map);
		})
		.finally(() => {
			setLoading(false);
			openInfo("Successufully logged in as the user: " + user.email, "success");
		});
};
