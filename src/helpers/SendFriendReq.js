import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";
import dateFormat from "dateformat";
import { v4 as uuid } from "uuid";

export const SendFriendReq = (
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
			const list = requests.data;
			list.push(target.uid);
			const target_received_doc = doc(fire, "received_requests", target.uid);
			const target_notifications_doc = doc(fire, "notifications", target.uid);
			const target_received_data = (await getDoc(target_received_doc)).data();
			const target_notify_data = (
				await getDoc(target_notifications_doc)
			).data();
			const tlist = target_received_data.data;
			const target_notify_list = target_notify_data.data;
			tlist.push(user.uid);
			target_notify_list.push({
				uid: uuid(),
				who: user.email,
				photo: user.photo,
				unread: true,
				date: dateFormat(new Date(), "mmmm dS yyyy, h:MM:ss TT"),
				message:
					"User send you a friend request 🖖! Open the friends panel to deny or accept his request.",
			});
			await updateDoc(send_req_doc, { data: list });
			await updateDoc(target_received_doc, { data: tlist });
			await updateDoc(target_notifications_doc, {
				new: true,
				data: target_notify_list,
			});
			setWaitingFriend(false);
			openInfo(
				"Friend request have been send to the user: " + target.email,
				"success"
			);
		} catch ({ message }) {
			setWaitingFriend(false);
			openInfo(
				"Unable to send friend request! [Error: " +
					format_error_msg(message) +
					"]",
				"error"
			);
		}
	}, [fire, user, send_req_doc, requests, target, openInfo, setWaitingFriend]);
	return { ex };
};
