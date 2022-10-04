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
import React, { memo, useEffect, useMemo } from "react";
import nomsgs from "../../assets/nomsgs.gif";
import ChatItem from "./ChatItem";
import { CPagination } from "./Pagination";

const DirectMsgs = ({
	user,
	results,
	curPage,
	pagesSize,
	changePage,
	setnewChat,
	activeChat,
	setActiveChat,
	setChatPanel,
	setActiveChatData,
}) => {
	const hasRes = useMemo(() => results.length > 0, [results]);
	// SET THE DEFAULT ACTIVE CHAT
	useEffect(() => {
		activeChat === null && hasRes && setActiveChat(results[0].uid);
	}, [hasRes, activeChat, results, setActiveChat]);
	useEffect(() => {
		activeChat && setChatPanel(true);
	}, [activeChat, setChatPanel]);
	return (
		<Stack className="flex-1">
			<List
				className="p-1 h-full mb-2 gap-2 flex flex-col"
				subheader={
					<ListSubheader
						disableSticky
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
								onClick={() => setnewChat(true)}
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
							<ChatItem
								key={chat.uid}
								user={user}
								uid={chat.uid}
								setChatPanel={setChatPanel}
								activeChat={activeChat}
								setActiveChat={setActiveChat}
								setActiveChatData={setActiveChatData}
							/>
						);
					})
				) : (
					<ListItem className="justify-center place-items-start p-0">
						<Stack className="justify-center place-items-center">
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
				<Stack className="relative sm:sticky w-full bg-white bottom-0 h-[70px] px-2 place-items-end justify-center">
					<CPagination
						size="small"
						page={curPage}
						defaultPage={1}
						boundaryCount={2}
						onChange={changePage}
						count={pagesSize}
						className="text-xs"
					/>
				</Stack>
			)}
		</Stack>
	);
};

export default memo(DirectMsgs);
