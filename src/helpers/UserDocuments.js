import { doc } from "firebase/firestore";

export const UserDocs = (fire, user) => {
	if (!user || !fire) {
		return;
	}
	const ID = user.uid;
	const UserDoc = doc(fire, "users", ID);
	const FriendsDoc = doc(fire, "friends", ID);
	const NotifyDoc = doc(fire, "notifications", ID);
	const FriendsSReqDoc = doc(fire, "send_requests", ID);
	const FriendsRReqDoc = doc(fire, "received_requests", ID);
	const BlockedDoc = doc(fire, "blocks", ID);
	const ChatsDoc = doc(fire, "chats", ID);
	return {
		user: UserDoc,
		friends: FriendsDoc,
		notify: NotifyDoc,
		received_req: FriendsRReqDoc,
		send_req: FriendsSReqDoc,
		blocks: BlockedDoc,
		chats: ChatsDoc,
	};
};
