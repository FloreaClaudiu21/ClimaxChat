import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { memo, useCallback, useState } from "react";
import FriendItem from "./FriendItem";
import ReceivedItem from "./ReceivedItem";
import SendItem from "./SendItem";
import nomsgs from "../../assets/nomsgs.gif";
import { RemoveFriend } from "../../helpers/RemoveFriend";

const FriendsPanelItems = ({
	fire,
	main_user,
	hasRes,
	displayResults,
	friends_data,
	friends_doc,
	openInfo,
}) => {
	const [removeDialog, setRemoveDialog] = useState(false);
	const [removeFriend, setRemoveFriend] = useState({ name: "default" });
	const { ex: remove_friend } = RemoveFriend(
		fire,
		main_user,
		friends_doc,
		friends_data,
		removeFriend,
		openInfo
	);
	const handleNoAnswer = useCallback(() => {
		setRemoveDialog(false);
		setRemoveFriend({ name: "" });
	}, []);
	const handleYesAnswer = useCallback(() => {
		setRemoveDialog(false);
		remove_friend();
	}, [remove_friend]);
	return (
		<List className="p-1 h-full mb-2">
			{hasRes ? (
				displayResults.map((u) => {
					return (
						<FriendItem
							user={u}
							main_user={main_user}
							key={Math.random()}
							openInfo={openInfo}
							removeDialog={setRemoveDialog}
							removeUser={setRemoveFriend}
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
							You don't have any friends! So sad ;-;
						</Typography>
					</Stack>
				</ListItem>
			)}
			<Dialog
				maxWidth="xs"
				open={removeDialog}
			>
				<DialogTitle>Remove friend</DialogTitle>
				<DialogContent dividers>
					<Typography className="text-sm text-red-700 text-center">
						Are you sure you want to remove{" "}
						<span className="underline font-bold">{removeFriend.name}</span>{" "}
						from your friend list?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						onClick={handleNoAnswer}
					>
						No
					</Button>
					<Button onClick={handleYesAnswer}>Yes</Button>
				</DialogActions>
			</Dialog>
		</List>
	);
};

const ReceivePanelItems = ({ user, openInfo, received_data }) => {
	return (
		<Stack>
			<List className="p-1 h-full">
				{received_data?.data.length > 0 ? (
					received_data.data.map((v) => {
						return (
							<ReceivedItem
								user={v}
								main_user={user}
								openInfo={openInfo}
								key={Math.random()}
							/>
						);
					})
				) : (
					<Typography
						variant="subtitle1"
						className="text-gray-700 text-center text-xs p-2"
					>
						No friend request received
					</Typography>
				)}
			</List>
		</Stack>
	);
};

const SendPanelItems = ({ user, openInfo, send_data }) => {
	return (
		<Stack>
			<List className="p-1 h-full">
				{send_data?.data.length > 0 ? (
					send_data.data.map((v) => {
						return (
							<SendItem
								user={v}
								main_user={user}
								openInfo={openInfo}
								key={Math.random()}
							/>
						);
					})
				) : (
					<Typography
						variant="subtitle1"
						className="text-gray-700 text-center text-xs p-2"
					>
						No friend request send
					</Typography>
				)}
			</List>
		</Stack>
	);
};

const FriendPanelI = memo(FriendsPanelItems);
const SendPanelI = memo(SendPanelItems);
const ReceivePanelI = memo(ReceivePanelItems);

export { SendPanelI, ReceivePanelI, FriendPanelI };
