import { updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { format_error_msg } from "./SignInUser";

export const SendBlockReq = (
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
			const list = blocks_data.data;
			list.push(target.uid);
			await updateDoc(blocks, { data: list });
			setWaitingBlock(false);
			openInfo(
				"User (" +
					target.email +
					") have been blocked, he is not gonna bother you anymore!",
				"success"
			);
		} catch ({ message }) {
			setWaitingBlock(false);
			openInfo(
				"Unable to block the user! [Error: " + format_error_msg(message) + "]",
				"error"
			);
		}
	}, [blocks_data, blocks, target, openInfo, setWaitingBlock]);
	return { ex };
};
