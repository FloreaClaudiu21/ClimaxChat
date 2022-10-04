import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";
import dateFormat from "dateformat";
import { v4 as uuid } from "uuid";

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
			const target_notifications_doc = doc(fire, "notifications", target.uid);
			const target_friends_data = (await getDoc(target_friends_doc)).data();
			const target_notify_data = (
				await getDoc(target_notifications_doc)
			).data();
			let tlist = target_friends_data.data;
			const target_notify_list = target_notify_data.data;
			tlist = tlist.filter((v) => v !== user.uid);
			target_notify_list.push({
				uid: uuid(),
				who: user.email,
				photo: user.photo,
				unread: true,
				date: dateFormat(new Date(), "mmmm dS yyyy, h:MM:ss TT"),
				message:
					"User removed you from his friend list 😲! I'm sorry to see that :(",
			});
			await updateDoc(friends, { data: list });
			await updateDoc(target_friends_doc, { data: tlist });
			await updateDoc(target_notifications_doc, {
				new: true,
				data: target_notify_list,
			});
			openInfo(
				"User (" + target.email + ") have been removed from your friends list",
				"success"
			);
		} catch (e) {
			console.log(e);
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
