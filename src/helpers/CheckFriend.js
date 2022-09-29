import { useCallback } from "react";

export const CheckFriend = (friend_data, target) => {
	const result = useCallback(() => {
		if (!target || !friend_data) return false;
		const list = friend_data.data;
		return list.includes(target.uid);
	}, [target, friend_data]);
	return { result };
};
