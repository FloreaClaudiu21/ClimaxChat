import { Block, Clear, HighlightOff } from "@mui/icons-material";
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
import { UserDocs } from "../../helpers/UserDocuments";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useDatabase, useFirestore, useFirestoreDocData } from "reactfire";
import { onValue, ref } from "firebase/database";
import { SendBlockReq } from "../../helpers/SendBlockReq";
import { RemoveBlockReq } from "../../helpers/RemoveBlockReq";
import { CheckBlock } from "../../helpers/CheckBlock";
import { GhostItem, load } from "../Logged/MainPanel";

const FriendItem = ({
	user,
	main_user,
	openInfo,
	removeDialog,
	removeUser,
}) => {
	const db = useDatabase();
	const fire = useFirestore();
	const [online, setOnline] = useState(false);
	const { blocks } = UserDocs(fire, main_user);
	let userStatusDB = ref(db, "/status/" + user?.uid);
	const [waitingBlock, setWaitingBlock] = useState(false);
	const { status: block_s, data: blocks_data } = useFirestoreDocData(blocks);
	const { ex: send_block } = SendBlockReq(
		blocks,
		blocks_data,
		user,
		openInfo,
		setWaitingBlock
	);
	const { ex: remove_block } = RemoveBlockReq(
		blocks,
		blocks_data,
		user,
		openInfo,
		setWaitingBlock
	);
	useEffect(() => {
		onValue(userStatusDB, (v) => {
			const value = v.val();
			if (value.state === "offline") {
				setOnline(false);
			} else {
				setOnline(true);
			}
		});
	}, [userStatusDB]);
	const { result: rb } = CheckBlock(blocks_data, user);
	const isBlocked = useMemo(() => rb(), [rb]);
	if (load(block_s) || !main_user) return <GhostItem />;
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
					title={user.name + (online ? " ✅" : " 🔴")}
				>
					<span className="relative">
						<Avatar
							src={user.photo}
							className=" relative w-8 h-8 sm:w-6 sm:h-6 transition-all delay-100 border-2 border-blue-500 group-hover:scale-110"
						></Avatar>
						<Tooltip
							arrow
							placement="right"
							title={online ? "Online" : "Offline"}
						>
							<div
								className={`absolute ${
									online ? "bg-green-500 animate-pulse" : "bg-red-500"
								} translate-y-1/2 left-0 -top-1/2 rounded-lg border-2 border-[rgba(0,0,0,0.2)] h-2 w-2 z-30`}
							/>
						</Tooltip>
					</span>
				</Tooltip>
			</Stack>
			<Stack className="flex-1 gap-1 overflow-hidden justify-center">
				<Typography
					variant="subtitle2"
					className="relative text-sm break-all text-blue-700 group-hover:text-blue-500 group-hover:underline transition-all delay-100"
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
					title={"Remove friend"}
					onClick={() => {
						removeDialog(true);
						removeUser(user);
					}}
				>
					<span>
						<IconButton className="bg-red-400 hover:bg-red-500 border-black group shadow-sm disabled:bg-slate-400">
							<Clear className="h-[20px] w-[20px] text-slate-100 group-hover:text-slate-50" />
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
							{waitingBlock && (
								<CircularProgress
									size={30}
									className="absolute"
								/>
							)}
						</IconButton>
					</span>
				</Tooltip>
			</Stack>
		</ListItem>
	);
};

export default memo(FriendItem);
