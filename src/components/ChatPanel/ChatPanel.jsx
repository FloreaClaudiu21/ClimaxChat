import { isEmpty } from "@firebase/util";
import { AttachFile } from "@mui/icons-material";
import {
	Avatar,
	CircularProgress,
	Divider,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { updateDoc } from "firebase/firestore";
import React, { memo, useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import chatbg from "../../assets/chatbg.jpg";
import BottomChat from "./BottomChat";
import MsgBox from "./MsgBox";
import TopChat from "./TopChat";

const ChatPanel = ({
	fire,
	user,
	chatPanel,
	setChatPanel,
	activeChatData: { msgs, chat, mdoc, cdoc },
}) => {
	const [text, setText] = useState("");
	const sendMessage = useCallback(async () => {
		let msg = text;
		if (isEmpty(msg)) {
			return;
		}
		let msgl = msgs;
		msgl.push({
			text: msg,
			tag: "",
			type: "text",
			uid: uuid(),
			seenBy: [user.uid],
			sendBy: user.name,
			sendByID: user.uid,
			sendByPhoto: user.photo,
			sendByEmail: user.email,
			date: new Date().toLocaleString(),
		});
		await updateDoc(mdoc, { data: msgl });
		return;
	}, [user, msgs, mdoc, text]);
	const handle_close_panel = useCallback(() => {
		setChatPanel(false);
		return;
	}, [setChatPanel]);
	if (!chat || !msgs) return <CircularProgress />;
	return (
		<Stack
			className={`absolute sm:relative left-0 w-full h-[calc(100vh-100px)] overflow-hidden sm:h-screen overflow-x-hidden top-[100px] sm:top-[0px] z-[140] sm:z-[100] transition-transform delay-300 ease-in-out ${
				!chatPanel && "-translate-x-[100%] sm:-translate-x-0 sm:delay-75"
			}`}
		>
			<img
				src={chatbg}
				alt="noimg"
				className="absolute h-full w-full object-cover -z-10"
			/>
			<TopChat
				fire={fire}
				chat={chat}
				messages={msgs}
				handle_close_panel={handle_close_panel}
			/>
			<Stack className="h-full overflow-y-auto px-3 py-4 gap-1">
				{msgs.map((msg, index) => {
					return (
						<MsgBox
							key={msg.uid}
							chat={chat}
							user={user}
							msg={msg}
							msgs={msgs}
							index={index}
						/>
					);
				})}
			</Stack>
			<BottomChat
				fire={fire}
				user={user}
				chatdoc={cdoc}
				chat={chat}
				text={text}
				setText={setText}
				sendMessage={sendMessage}
			/>
		</Stack>
	);
};

export default memo(ChatPanel);
