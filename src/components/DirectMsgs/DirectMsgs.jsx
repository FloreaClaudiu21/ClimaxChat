import { AddCommentSharp } from "@mui/icons-material";
import {
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { memo, useMemo, useState } from "react";
import nomsgs from "../../assets/nomsgs.gif";
import { CPagination } from "./Pagination";

const DirectMsgs = ({ results }) => {
	const [curPage, setCurPage] = useState(1);
	const hasRes = useMemo(() => results.length > 0, [results]);
	return (
		<Stack
			className={`flex-1 overflow-x-hidden overflow-y-auto ${
				hasRes ? "mb-[60px]" : "mb-0"
			}`}
		>
			<List
				className="p-1 "
				subheader={
					<ListSubheader
						component="div"
						className="text-black bg-slate-200 rounded-md"
					>
						<Stack className="flex-row w-full place-items-center">
							<Typography
								variant="caption"
								className="flex-1"
							>
								Direct Messages:
							</Typography>
							<Tooltip
								arrow
								title="Start a new chat.."
							>
								<IconButton>
									<AddCommentSharp className="h-4 w-4" />
								</IconButton>
							</Tooltip>
						</Stack>
					</ListSubheader>
				}
			>
				{hasRes ? (
					results.map((chat) => {
						return (
							<ListItem
								divider
								key={chat.id}
								className="h-16"
							>
								{chat.name}
							</ListItem>
						);
					})
				) : (
					<ListItem className="justify-center mb-2">
						<Stack className="justify-center place-items-center flex-shrink">
							<img
								src={nomsgs}
								alt="Not found"
								className="h-[250px] w-[250px] object-cover"
							/>
							<Typography
								variant="caption"
								textAlign={"center"}
								className="max-w-[300px]"
							>
								You don't have any chats yet, start by searching for new
								friends...
							</Typography>
						</Stack>
					</ListItem>
				)}
			</List>
			{hasRes && (
				<Stack className="absolute w-full bg-white bottom-0 min-h-[60px] h-auto px-2 place-items-end justify-center shadow-md">
					<CPagination
						size="small"
						page={curPage}
						defaultPage={1}
						boundaryCount={2}
						//onChange={changePage}
						//count={pagesSize}
						className="text-xs"
					/>
				</Stack>
			)}
		</Stack>
	);
};

export default memo(DirectMsgs);
