import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Modal,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { memo, useMemo, useRef, useState } from "react";
import ChooseParticipants from "./ChooseParticipants";
import GroupDetails from "./GroupDetails";
import { useFirestore, useStorage } from "reactfire";
import { CreateChatMethod } from "../../../helpers/CreateChatMethod";

const CreateChatModal = ({
	user,
	openInfo,
	newChat,
	setnewChat,
	chat_data,
	friends_data,
}) => {
	const fire = useFirestore();
	const store = useStorage();
	const avatarInput = useRef(null);
	const chatnameInput = useRef(null);
	const [error, setError] = useState("");
	const [parts, setParts] = useState([]);
	const [waiting, setWaiting] = useState(false);
	const [sucName, setSucName] = useState(false);
	const [chatName, setChatName] = useState("");
	const [chatAvatar, setChatAvatar] = useState(null);
	const [uploadAvatar, setUploadAvatar] = useState(null);
	const hasChatAvatar = useMemo(
		() => chatAvatar !== null && chatAvatar?.src !== null,
		[chatAvatar]
	);
	const hasError = useMemo(() => error.length > 0, [error]);
	const handle_close_modal = () => {
		setError("");
		setParts([]);
		setChatName("");
		setSucName(false);
		setnewChat(false);
		setWaiting(false);
		setChatAvatar(null);
		return;
	};
	const handle_create_modal = () => {
		CreateChatMethod({
			fire,
			store,
			user,
			chatName,
			setWaiting,
			hasChatAvatar,
			uploadAvatar,
			openInfo,
			error,
			parts,
			hasError,
			execute_name,
			handle_close_modal,
		});
		return;
	};
	const execute_name = () => {
		let name = chatnameInput.current.value + "";
		name = name.trim();
		if (name === undefined || name.length <= 0) {
			setSucName(false);
			setError("Error: Please specify the chat name..");
			return;
		}
		setError("");
		let found = false;
		let chats = chat_data.data;
		chats.forEach((el) => {
			let cname = (el.name + "").toLowerCase();
			if (cname.match(name.toLowerCase())) {
				found = true;
				setSucName(false);
				setError("Error: Chat with this name already exists!");
				return;
			}
		});
		if (!found) {
			setSucName(true);
			setChatName(name);
		}
		return;
	};
	return (
		<Modal
			open={newChat}
			className="flex justify-center place-items-center"
		>
			<Dialog
				maxWidth="xs"
				open={newChat}
				onClose={handle_close_modal}
			>
				<DialogTitle>Create a new chat</DialogTitle>
				<DialogContent
					dividers
					className={`relative flex flex-col gap-1 pb-1 min-h-[300px] justify-center place-items-center`}
				>
					<GroupDetails
						openInfo={openInfo}
						avatarInput={avatarInput}
						chatnameInput={chatnameInput}
						hasError={hasError}
						error={error}
						hasChatAvatar={hasChatAvatar}
						chatAvatar={chatAvatar}
						setChatAvatar={setChatAvatar}
						sucName={sucName}
						execute_name={execute_name}
						setUploadAvatar={setUploadAvatar}
					/>
					<ChooseParticipants
						user={user}
						openInfo={openInfo}
						friends_data={friends_data}
						parts={parts}
						setParts={setParts}
						waiting={waiting}
					/>
					{waiting && (
						<Stack className="absolute h-full w-full bg-[rgba(0,0,0,0.5)] justify-center place-items-center">
							<CircularProgress size={80} />
						</Stack>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={handle_close_modal}
					>
						CANCEL
					</Button>
					<Button onClick={handle_create_modal}>CREATE</Button>
				</DialogActions>
			</Dialog>
		</Modal>
	);
};

export default memo(CreateChatModal);
