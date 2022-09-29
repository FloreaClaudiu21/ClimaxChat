import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";

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
			const target_send_data = (await getDoc(target_send_doc)).data();
			let tlist = target_send_data.data;
			tlist = tlist.filter((v) => v !== user.uid);
			await updateDoc(receive_req_doc, { data: list });
			await updateDoc(target_send_doc, { data: tlist });
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
