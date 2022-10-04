import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";
import dateFormat from "dateformat";
import { v4 as uuid } from "uuid";

export const RemoveFriendReq = (
	fire,
	user,
	send_req_doc,
	requests,
	target,
	openInfo,
	setWaitingFriend
) => {
	const ex = useCallback(async () => {
		if (!send_req_doc || !target || !requests) {
			return;
		}
		try {
			setWaitingFriend(true);
			let list = requests.data;
			list = list.filter((v) => v !== target.uid);
			const target_received_doc = doc(
				fire,
				"received_requests",
				target.uid ? target.uid : target
			);
			const target_notifications_doc = doc(fire, "notifications", target.uid);
			const target_received_data = (await getDoc(target_received_doc)).data();
			const target_notify_data = (
				await getDoc(target_notifications_doc)
			).data();
			let tlist = target_received_data.data;
			const target_notify_list = target_notify_data.data;
			tlist = tlist.filter((v) => v !== user.uid);
			target_notify_list.push({
				uid: uuid(),
				who: user.email,
				photo: user.photo,
				unread: true,
				date: dateFormat(new Date(), "mmmm dS yyyy, h:MM:ss TT"),
				message:
					"User removed your friend request 😔! You might try again later.",
			});
			await updateDoc(send_req_doc, { data: list });
			await updateDoc(target_received_doc, { data: tlist });
			await updateDoc(target_notifications_doc, {
				new: true,
				data: target_notify_list,
			});
			setWaitingFriend(false);
			openInfo(
				"Friend request send to the user (" +
					target.email +
					") have been removed.",
				"info"
			);
		} catch (e) {
			setWaitingFriend(false);
			openInfo(
				"Unable to remove friend request! [Error: " +
					format_error_msg(e.message) +
					"]",
				"error"
			);
		}
	}, [user, fire, send_req_doc, requests, target, openInfo, setWaitingFriend]);
	return { ex };
};
