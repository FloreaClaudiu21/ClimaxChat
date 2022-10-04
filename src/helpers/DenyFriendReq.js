import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";
import dateFormat from "dateformat";
import { v4 as uuid } from "uuid";

export const DenyFriendReq = (
	fire,
	user,
	receive_req_doc,
	receive,
	target,
	openInfo,
	setWaitingDeny
) => {
	const ex = useCallback(async () => {
		if (!receive_req_doc || !target || !receive) {
			return;
		}
		try {
			setWaitingDeny(true);
			let list = receive.data;
			list = list.filter((v) => v !== target.uid);
			const target_send_doc = doc(
				fire,
				"send_requests",
				target.uid ? target.uid : target
			);
			const target_notifications_doc = doc(fire, "notifications", target.uid);
			const target_send_data = (await getDoc(target_send_doc)).data();
			const target_notify_data = (
				await getDoc(target_notifications_doc)
			).data();
			let tlist = target_send_data.data;
			const target_notify_list = target_notify_data.data;
			tlist = tlist.filter((v) => v !== user.uid);
			target_notify_list.push({
				uid: uuid(),
				who: user.email,
				photo: user.photo,
				unread: true,
				date: dateFormat(new Date(), "mmmm dS yyyy, h:MM:ss TT"),
				message:
					"User denied your friend request 😔! You might try again later.",
			});
			await updateDoc(receive_req_doc, { data: list });
			await updateDoc(target_send_doc, { data: tlist });
			await updateDoc(target_notifications_doc, {
				new: true,
				data: target_notify_list,
			});
			setWaitingDeny(false);
			openInfo(
				"Friend request received from the user (" +
					target.email +
					") have been denied.",
				"info"
			);
		} catch (e) {
			setWaitingDeny(false);
			openInfo(
				"Unable to deny friend request! [Error: " +
					format_error_msg(e.message) +
					"]",
				"error"
			);
		}
	}, [user, fire, receive, receive_req_doc, target, openInfo, setWaitingDeny]);
	return { ex };
};
