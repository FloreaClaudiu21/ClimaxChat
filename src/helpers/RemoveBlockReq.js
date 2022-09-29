import { updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";

export const RemoveBlockReq = (
	blocks,
	blocks_data,
	target,
	openInfo,
	setWaitingBlock
) => {
	const ex = useCallback(async () => {
		if (!blocks || !target || !blocks_data) {
			return;
		}
		try {
			setWaitingBlock(true);
			let list = blocks_data.data;
			list = list.filter((v) => v !== target.uid);
			await updateDoc(blocks, { data: list });
			openInfo(
				"User (" +
					target.email +
					") have been unblocked, you can start sending him message again.",
				"info"
			);
			setWaitingBlock(false);
		} catch ({ message }) {
			setWaitingBlock(false);
			openInfo(
				"Unable to unblock the user! [Error: " +
					format_error_msg(message) +
					"]",
				"error"
			);
		}
	}, [blocks, blocks_data, target, openInfo, setWaitingBlock]);
	return { ex };
};
