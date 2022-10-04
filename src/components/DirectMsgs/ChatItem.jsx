import { ArrowDropDown } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	ListItem,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { memo, useEffect, useMemo } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { GhostItem, load } from "../Logged/MainPanel";
import { doc } from "firebase/firestore";
import chatgroup from "../../assets/chat-group.png";

const ChatItem = ({
	user,
	uid,
	activeChat,
	setActiveChatData,
	setActiveChat,
	setChatPanel,
}) => {
	const fire = useFirestore();
	const chat_doc = doc(fire, "chat", uid);
	const msgs_doc = doc(fire, "messages", uid);
	const { status: s1, data: msg_data } = useFirestoreDocData(msgs_doc);
	const { status: s, data: chat_data } = useFirestoreDocData(chat_doc);
	const messages = msg_data?.data;
	const get_last_msg = () => {
		if (!messages) return { msg: { text: "" } };
		let size = messages.length;
		if (size <= 0) {
			return { msg: { text: "No messages available here yet" } };
		}
		let msg = messages[size - 1];
		return { msg };
	};
	const hasUnreadMsgs = useMemo(() => {
		if (!messages) return { has: false, count: 0 };
		let count = 0;
		messages.forEach((m) => {
			let seenl = m.seenBy;
			if (!seenl?.includes(user.uid + "0")) {
				count += 1;
			}
		});
		return { has: count > 0 ? true : false, count: count };
	}, [messages, user]);
	const last_message = get_last_msg().msg;
	const hasMsgs = useMemo(() => messages?.length > 0, [messages]);
	const format_date = (string = "") => {
		let today = new Date().toLocaleString();
		let split_date = string.split(", ");
		let split_today = today.split(", ");
		if (split_today[0].match(split_date[0])) {
			return split_date[1];
		} else {
			return split_date[0];
		}
	};
	const changeActiveChat = () => {
		setActiveChat(uid);
		setChatPanel(true);
		return;
	};
	const isTyping = useMemo(() => chat_data?.typing !== "", [chat_data]);
	const isActiveChat = useMemo(() => uid === activeChat, [activeChat, uid]);
	useEffect(() => {
		isActiveChat &&
			setActiveChatData({
				msgs: messages,
				chat: chat_data,
				cdoc: chat_doc,
				mdoc: msgs_doc,
			});
	}, [
		isActiveChat,
		messages,
		chat_data,
		setActiveChatData,
		chat_doc,
		msgs_doc,
		setChatPanel,
	]);
	if (load(s) || load(s1) || !chat_data || !msg_data) return <GhostItem />;
	return (
		<ListItem
			dense
			divider
			onClick={changeActiveChat}
			className={`cursor-pointer flex-row px-1 gap-2 min-h-[80px] h-auto bg-white hover:bg-gray-200 transition-all delay-100 rounded-md shadow-sm relative group ${
				isActiveChat &&
				"bg-slate-200 border-2 border-gray-300 border-l-purple-500 border-r-purple-500"
			}`}
		>
			<Stack>
				<Avatar
					src={chat_data.photo === "" ? chatgroup : chat_data.photo}
					className={`relative w-10 h-10 sm:w-6 sm:h-6 transition-all delay-100 shadow-sm group-hover:scale-110 ${
						isActiveChat && "border-purple-500 border-[1px]"
					}`}
				/>
			</Stack>
			<Divider
				orientation="vertical"
				flexItem
				className={`sm:hidden ${isActiveChat && "bg-purple-500"}`}
			/>
			<Stack className="flex-1 gap-1 overflow-hidden justify-center">
				<Typography
					variant="subtitle2"
					className="relative text-sm break-all text-blue-700 group-hover:text-blue-500 group-hover:underline transition-all delay-100"
				>
					{chat_data.name}
				</Typography>
				{hasMsgs ? (
					<Stack className="flex-row gap-1 place-items-end">
						{isTyping ? (
							<Typography
								variant="subtitle2"
								className="relative text-[0.65rem] sm:text-[0.55rem] overflow-hidden text-ellipsis whitespace-nowrap text-blue-500 h-full"
							>
								{chat_data.typing} is typing...
							</Typography>
						) : (
							<>
								<Avatar
									src={last_message.sendByPhoto}
									className={`h-4 w-4`}
								/>
								<Typography
									variant="subtitle2"
									className="relative text-[0.65rem] sm:text-[0.55rem] whitespace-nowrap text-[#a3a7aa]"
								>
									{last_message.sendBy + ": "}
								</Typography>
								<Typography
									variant="subtitle2"
									className="relative text-[0.65rem] sm:text-[0.55rem] overflow-hidden text-ellipsis whitespace-nowrap text-[#a3a7aa]"
								>
									{last_message.text}
								</Typography>
							</>
						)}
					</Stack>
				) : (
					<Typography
						variant="subtitle2"
						className="relative text-[0.65rem]  sm:text-[0.55rem] overflow-hidden text-ellipsis whitespace-nowrap text-[#a3a7aa]"
					>
						{last_message.text}
					</Typography>
				)}
			</Stack>
			<Stack className="absolute gap-2 justify-start min-w-[80px] sm:min-w-[40px] right-0">
				{hasMsgs && (
					<Typography className="text-[0.5rem] font-bold text-right px-1 text-purple-400 group-hover:underline">
						{format_date(last_message.date)}
					</Typography>
				)}
				<Stack className="flex-row relative justify-end place-items-center gap-1 overflow-hidden">
					{!isActiveChat && hasUnreadMsgs.has && (
						<Box className="absolute right-1 group-hover:right-6 flex bg-purple-400 w-auto min-w-[1rem] h-4 p-1 rounded-full text-white text-[0.5rem] place-items-center justify-center transition-all ease-in-out delay-100">
							{hasUnreadMsgs.count}
						</Box>
					)}
					<IconButton className="h-4 w-4 p-1 invisible -right-20 group-hover:visible group-hover:right-1 transition-all ease-in-out delay-100 shadow-sm bg-slate-100 hover:bg-slate-50">
						<ArrowDropDown />
					</IconButton>
				</Stack>
			</Stack>
		</ListItem>
	);
};

export default memo(ChatItem);
