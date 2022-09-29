import { useCallback } from "react";

export const CheckBlock = (block_data, target) => {
	const result = useCallback(() => {
		if (!target || !block_data) return false;
		const list = block_data.data;
		return list.includes(target.uid);
	}, [target, block_data]);
	return { result };
};
