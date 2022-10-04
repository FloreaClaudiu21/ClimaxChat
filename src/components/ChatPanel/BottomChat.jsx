import { isEmpty } from "@firebase/util";
import { AttachFile } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { updateDoc } from "firebase/firestore";
import React, { memo } from "react";
import InputEmoji from "react-input-emoji";

const BottomChat = ({ user, chatdoc, chat, text, setText, sendMessage }) => {
	let Task = 0;
	const setTyping = async () => {
		if (!chat || !chatdoc) return;
		let msg = text.trim()
		console.log(msg)
		if (chat.typing === "" && msg.length > 0 && msg !== "") {
			await updateDoc(chatdoc, {
				typing: user.name,
			});
			Task = setTimeout(async () => {
				if (chat.typing.match(user.name)) {
					await updateDoc(chatdoc, {
						typing: "",
					});
				}
			}, 10000);
		}
	};
	return (
		<Stack className="h-[60px] bg-gray-100 flex-row p-1">
			<InputEmoji
				cleanOnEnter
				value={text}
				onChange={(e) => {
					setText(e);
					setTyping();
				}}
				onEnter={async () => {
					sendMessage();
					if (chat.typing.match(user.name)) {
						await updateDoc(chatdoc, {
							typing: "",
						});
					}
				}}
				placeholder="Type a message..."
			/>
			<IconButton>
				<AttachFile className="w-4 h-4" />
			</IconButton>
		</Stack>
	);
};

export default memo(BottomChat);
