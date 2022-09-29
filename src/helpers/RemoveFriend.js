import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";

export const RemoveFriend = (
	fire,
	user,
	friends,
	friends_data,
	target,
	openInfo
) => {
	const ex = useCallback(async () => {
		if (!friends || !target || !friends_data) {
			return;
		}
		try {
			let list = friends_data.data;
			list = list.filter((v) => v !== target.uid);
			const target_friends_doc = doc(fire, "friends", target.uid);
			const target_friends_data = (await getDoc(target_friends_doc)).data();
			let tlist = target_friends_data.data;
			tlist = tlist.filter((v) => v !== user.uid);
			await updateDoc(friends, { data: list });
			await updateDoc(target_friends_doc, { data: tlist });
			openInfo(
				"User (" + target.email + ") have been removed from your friends list",
				"success"
			);
		} catch (e) {
            console.log(e)
			openInfo(
				"Unable to remove the user from the friend list! [Error: " +
					format_error_msg(e.message) +
					"]",
				"error"
			);
		}
	}, [fire, user, friends, friends_data, target, openInfo]);
	return { ex };
};
