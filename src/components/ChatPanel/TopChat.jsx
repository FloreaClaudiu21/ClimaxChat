import { ArrowBack, MoreHoriz, Search } from "@mui/icons-material";
import {
	Avatar,
	Divider,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { memo, useMemo, } from "react";
import chatgroup from "../../assets/chat-group.png";

const TopChat = ({ chat, messages, handle_close_panel }) => {
	const get_last_msg = () => {
		if (!messages) return { msg: { text: "" } };
		let size = messages.length;
		if (size <= 0) {
			return { msg: { text: "No messages available here yet" } };
		}
		let msg = messages[size - 1];
		return { msg };
	};
	const last_message = get_last_msg().msg;
	const hasMsgs = useMemo(() => messages?.length > 0, [messages]);
	return (
		<Stack className="h-12 sm:h-[100px] w-full bg-gray-100 shadow-lg justify-center place-items-center flex-row">
			<Tooltip
				arrow
				title="Back to main panel"
			>
				<IconButton
					className="ml-[3px]"
					onClick={handle_close_panel}
				>
					<ArrowBack className="w-3 h-3 visible sm:hidden group-hover:text-black" />
				</IconButton>
			</Tooltip>
			<Stack className="justify-center px-1">
				<Avatar
					src={chat.photo === "" ? chatgroup : chat.photo}
					className="w-4 h-4 sm:w-8 sm:h-8"
				/>
			</Stack>
			<Stack className="flex-1 flex-col p-1 sm:p-2 overflow-hidden">
				<Stack className="flex-row place-items-end">
					<Typography className="text-blue-700 text-[0.6rem] sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden">
						{chat.name}
					</Typography>
				</Stack>
				<Divider />
				<Typography className="text-[0.45rem] sm:text-xs font-bold py-1 whitespace-nowrap overflow-hidden text-ellipsis">
					{!hasMsgs
						? last_message.text
						: "Last activity by " +
						  last_message.sendBy +
						  " at " +
						  last_message.date}
				</Typography>
			</Stack>
			<Divider
				orientation="vertical"
				flexItem
				className="h-[90%] mt-[1%] sm:h-full"
			/>
			<Stack className="sm:min-w-[135px] w-[100px] sm:w-[135px] flex-row gap-2 p-1 place-items-center justify-center">
				<IconButton>
					<Search className="w-3 h-3 sm:w-6 sm:h-6" />
				</IconButton>
				<IconButton>
					<MoreHoriz className="w-3 h-3 sm:w-6 sm:h-6" />
				</IconButton>
			</Stack>
		</Stack>
	);
};

export default memo(TopChat);
