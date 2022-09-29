import {
	Block,
	HighlightOff,
	PersonAdd,
	PersonRemove,
} from "@mui/icons-material";
import {
	Avatar,
	CircularProgress,
	Divider,
	IconButton,
	ListItem,
	Tooltip,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { memo, useMemo, useState } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { CheckBlock } from "../../helpers/CheckBlock";
import { CheckFriend } from "../../helpers/CheckFriend";
import { CheckFriendReq } from "../../helpers/CheckFriendsReq";
import { RemoveBlockReq } from "../../helpers/RemoveBlockReq";
import { RemoveFriendReq } from "../../helpers/RemoveFriendReq";
import { SendBlockReq } from "../../helpers/SendBlockReq";
import { SendFriendReq } from "../../helpers/SendFriendReq";
import { UserDocs } from "../../helpers/UserDocuments";
import { GhostItem, load } from "../Logged/MainPanel";

const ComunityItem = ({ user, main_user, openInfo }) => {
	const fire = useFirestore();
	const [waitingBlock, setWaitingBlock] = useState(false);
	const [waitingFriend, setWaitingFriend] = useState(false);
	const { send_req, blocks, friends } = UserDocs(fire, main_user);
	const { status: block_s, data: blocks_data } = useFirestoreDocData(blocks);
	const { status: friend_s, data: friends_data } = useFirestoreDocData(friends);
	const { status: send_s, data: send_req_data } = useFirestoreDocData(send_req);
	const { ex: send_friend_req } = SendFriendReq(
		fire,
		main_user,
		send_req,
		send_req_data,
		user,
		openInfo,
		setWaitingFriend
	);
	const { ex: remove_friend_req } = RemoveFriendReq(
		fire,
		main_user,
		send_req,
		send_req_data,
		user,
		openInfo,
		setWaitingFriend
	);
	const { ex: send_block } = SendBlockReq(blocks, blocks_data, user, openInfo, setWaitingBlock);
	const { ex: remove_block } = RemoveBlockReq(
		blocks,
		blocks_data,
		user,
		openInfo,
		setWaitingBlock
	);
	const { result } = CheckFriendReq(send_req_data, user);
	const { result: sb } = CheckFriend(friends_data, user);
	const { result: rb } = CheckBlock(blocks_data, user);
	const isBlocked = useMemo(() => rb(), [rb]);
	const isFriend = useMemo(() => sb(), [sb]);
	const reqSended = useMemo(() => result(), [result]);
	if (load(send_s) || load(block_s) || load(friend_s)) return <GhostItem />;
	return (
		<ListItem
			dense
			divider
			className="flex-row px-1 gap-2 min-h-[70px] h-auto bg-white hover:bg-gray-200 transition-all delay-100 rounded-md shadow-sm mt-2 relative group"
		>
			<Stack>
				<Tooltip
					arrow
					placement="bottom"
					title={user.name}
				>
					<Avatar
						src={user.photo}
						className="w-8 h-8 sm:w-6 sm:h-6 transition-all delay-100 border-2 border-blue-500 group-hover:scale-110 group-hover:border-pink-700"
					/>
				</Tooltip>
			</Stack>
			<Stack className="flex-1 gap-1 overflow-hidden justify-center">
				<Typography
					variant="subtitle2"
					className="text-sm break-all text-blue-700 group-hover:text-blue-500 group-hover:underline transition-all delay-100"
				>
					{user.name}
				</Typography>
				<Divider />
				<Typography
					variant="subtitle1"
					className="text-xs overflow-hidden text-ellipsis"
				>
					{user.email}
				</Typography>
			</Stack>
			<Stack className="absolute flex-row right-2 gap-1 z-10 transform translate-x-32 group-hover:translate-x-0 transition-all delay-[150ms] ease-in-out">
				<Tooltip
					arrow
					placement="top"
					title={
						isFriend
							? "Already friends"
							: reqSended
							? "Remove friend request"
							: "Send a friend request"
					}
				>
					<span>
						<IconButton
							disabled={isFriend || waitingFriend}
							onClick={reqSended ? remove_friend_req : send_friend_req}
							className="bg-blue-300 hover:bg-blue-400  border-black group disabled:bg-slate-400"
						>
							{reqSended ? (
								<PersonRemove className="h-[20px] w-[20px] text-slate-100 group-hover:text-slate-50" />
							) : (
								<PersonAdd className="h-[20px] w-[20px] text-slate-100 group-hover:text-slate-50" />
							)}
							{waitingFriend && <CircularProgress size={30} className="absolute" />}
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip
					arrow
					placement="top"
					title={isBlocked ? "Unblock User" : "Block User"}
				>
					<span>
						<IconButton
							disabled={waitingBlock}
							onClick={isBlocked ? remove_block : send_block}
							className="bg-pink-300 hover:bg-pink-400 border-black group disabled:bg-slate-400"
						>
							{isBlocked ? (
								<HighlightOff className="h-[20px] w-[20px] text-slate-100 group-hover:text-slate-50" />
							) : (
								<Block className="h-[20px] w-[20px] text-slate-100 group-hover:text-slate-50" />
							)}
							{waitingBlock && <CircularProgress size={30} className="absolute" />}
						</IconButton>
					</span>
				</Tooltip>
			</Stack>
		</ListItem>
	);
};

export default memo(ComunityItem);
