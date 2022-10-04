import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";
import dateFormat from "dateformat";
import { v4 as uuid } from "uuid";

export const AcceptFriendReq = (
	fire,
	user,
	received_req_doc,
	received,
	target,
	openInfo,
	setWaitingAccept
) => {
	const ex = useCallback(async () => {
		if (!received_req_doc || !target || !received) {
			return;
		}
		try {
			setWaitingAccept(true);
			const friends_doc = doc(fire, "friends", user.uid);
			const target_friends_doc = doc(fire, "friends", target.uid);
			const target_send_doc = doc(fire, "send_requests", target.uid);
			const target_notifications_doc = doc(fire, "notifications", target.uid);
			////////////////////////////////////////////////////////////////////////
			const friends_data = (await getDoc(friends_doc)).data();
			const target_send_data = (await getDoc(target_send_doc)).data();
			const friends_target_data = (await getDoc(target_friends_doc)).data();
			const target_notify_data = (
				await getDoc(target_notifications_doc)
			).data();
			///////////////////////////////////////////////////////////////////////////
			let tlist = target_send_data.data;
			let received_reqs = received.data;
			const friends_list = friends_data.data;
			const target_notify_list = target_notify_data.data;
			const friends_target_list = friends_target_data.data;
			/////////////////////////////////////////////////////
			tlist = tlist.filter((v) => v !== user.uid);
			friends_list.push(target.uid);
			received_reqs = received_reqs.filter((v) => v !== target.uid);
			friends_target_list.push(user.uid);
			target_notify_list.push({
				uid: uuid(),
				who: user.email,
				photo: user.photo,
				unread: true,
				date: dateFormat(new Date(), "mmmm dS yyyy, h:MM:ss TT"),
				message:
					"User accepted your friend request 🥳! You can now start chatting with him :)",
			});
			///////////////////////////////////
			await updateDoc(target_send_doc, { data: tlist });
			await updateDoc(friends_doc, { data: friends_list });
			await updateDoc(received_req_doc, { data: received_reqs });
			await updateDoc(target_friends_doc, { data: friends_target_list });
			await updateDoc(target_notifications_doc, {
				new: true,
				data: target_notify_list,
			});
			setWaitingAccept(false);
			openInfo(
				"Friend request have been accepted for the user: " + target.email,
				"success"
			);
		} catch (e) {
			setWaitingAccept(false);
			openInfo(
				"Unable to accept friend request! [Error: " +
					format_error_msg(e.message) +
					"]",
				"error"
			);
		}
	}, [
		fire,
		user,
		received_req_doc,
		received,
		target,
		openInfo,
		setWaitingAccept,
	]);
	return { ex };
};
