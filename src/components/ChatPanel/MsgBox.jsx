import { ArrowDropDown, DoneAll } from "@mui/icons-material";
import {
	Avatar,
	Divider,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { memo, useMemo } from "react";

const MsgBox = ({ user, chat, msg, msgs, index }) => {
	const prevByUser = useMemo(() => {
		if (!msgs) return false;
		let prev_index = index - 1;
		if (prev_index < 0) return false;
		let prevmsg = msgs[prev_index];
		if (prevmsg.sendByID === msg.sendByID) return true;
		return false;
	}, [msgs, index, msg]);
	const msgWasReadByAll = useMemo(() => {
		let all = true;
		if (!chat || !msg) return false;
		chat.participants?.forEach((part) => {
			if (!msg.seenBy.includes(part)) all = false;
		});
		return all;
	}, [chat, msg]);
	const sendByUser = useMemo(() => msg.sendByID === user.uid, [user, msg]);
	return (
		<Stack
			className={`${
				sendByUser ? "place-self-end" : "place-self-start"
			} relative min-w-[300px] w-[auto] max-w-[320px] sm:max-w-[640px] bg-gray-100 hover:bg-slate-100 group transition-all delay-75 p-1 rounded-md ${
				!prevByUser && "mt-6"
			}`}
		>
			{!prevByUser && (
				<>
					<Tooltip
						arrow
						placement="top-start"
						title={msg.sendByEmail === undefined ? "" : msg.sendByEmail}
					>
						<Stack className="relative flex-row gap-2 place-items-end py-1">
							<Avatar
								src={msg.sendByPhoto}
								className="w-4 h-4"
							/>
							<Typography className="text-xs overflow-hidden whitespace-nowrap text-ellipsis">
								{msg.sendBy}
							</Typography>
							<IconButton className="absolute h-4 w-4 p-1 invisible -right-2 group-hover:visible group-hover:right-1 transition-all ease-in-out delay-100 shadow-sm bg-slate-100 hover:bg-slate-50">
								<ArrowDropDown />
							</IconButton>
						</Stack>
					</Tooltip>
					<Divider flexItem />
				</>
			)}
			<Stack className="p-1 break-words">{msg.text}</Stack>
			<Stack className="py-2 h-3 justify-center place-items-end">
				<DoneAll className={`w-4 h-4 text-gray-500 ${msgWasReadByAll && "text-blue-400"}`} />
			</Stack>
		</Stack>
	);
};

export default memo(MsgBox);
