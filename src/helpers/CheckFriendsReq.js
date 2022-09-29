import { useCallback } from "react";

export const CheckFriendReq = (send_req_data, target) => {
	const result = useCallback(() => {
		if (!target || !send_req_data) return false;
		const list = send_req_data.data;
		return list.includes(target.uid);
	}, [target, send_req_data]);
	return { result };
};
