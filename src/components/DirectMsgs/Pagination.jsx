import styled from "@emotion/styled";
import { Pagination, Stack } from "@mui/material";
import React, { memo } from "react";

export const CPagination = styled(Pagination)({
	".MuiPagination-ul": {
		minHeight: "30px",
	},
	".MuiPagination-ul li button": {
		fontSize: "14px",
	},
});

const PaginationNav = ({ curPage, changePage, chatsSize }) => {
	return (
		<Stack className="min-h-[50px] h-auto px-2 mb-1 place-items-end justify-start">
			<CPagination
				size="small"
				page={curPage}
				defaultPage={1}
				className="text-xs"
				boundaryCount={2}
				onChange={changePage}
				count={chatsSize > 1 ? chatsSize : 1}
			/>
		</Stack>
	);
};

export default memo(PaginationNav);
