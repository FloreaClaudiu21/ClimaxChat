import { Clear, Done } from "@mui/icons-material";
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
import { doc, getDoc } from "firebase/firestore";
import { UserDocs } from "../../helpers/UserDocuments";
import React, { memo, useEffect, useState } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { AcceptFriendReq } from "../../helpers/AcceptFriendReq";
import { DenyFriendReq } from "../../helpers/DenyFriendReq";
import { GhostItem, load } from "../Logged/MainPanel";

const ReceivedItem = ({ user, main_user, openInfo }) => {
	const fire = useFirestore();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const { received_req } = UserDocs(fire, main_user);
	const [waitingAccept, setWaitingAccept] = useState(false);
	const [waitingDeny, setWaitingDeny] = useState(false);
	const { status: send_s, data: received_req_data } =
		useFirestoreDocData(received_req);
	const { ex: accept_friend_req } = AcceptFriendReq(
		fire,
		main_user,
		received_req,
		received_req_data,
		data,
		openInfo,
		setWaitingAccept
	);
	const { ex: deny_friend_req } = DenyFriendReq(
		fire,
		main_user,
		received_req,
		received_req_data,
		data,
		openInfo,
		setWaitingDeny
	);
	useEffect(() => {
		getDoc(doc(fire, "users", user)).then((d) => {
			setData(d.data());
			setLoading(false);
		});
	}, [user, fire]);
	if (loading || load(send_s)) return <GhostItem />;
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
					title={data.name}
				>
					<Avatar
						src={data.photo}
						className="w-8 h-8 sm:w-6 sm:h-6 transition-all delay-100 border-2 border-blue-500 group-hover:scale-110 group-hover:border-pink-700"
					/>
				</Tooltip>
			</Stack>
			<Stack className="flex-1 gap-1 overflow-hidden justify-center">
				<Typography
					variant="subtitle2"
					className="text-sm break-all text-blue-700 group-hover:text-blue-500 group-hover:underline transition-all delay-100"
				>
					{data.name}
				</Typography>
				<Divider />
				<Typography
					variant="subtitle1"
					className="text-xs overflow-hidden text-ellipsis"
				>
					{data.email}
				</Typography>
			</Stack>
			<Stack className="absolute flex-row right-2 gap-1 z-10 transform translate-x-32 group-hover:translate-x-0 transition-all delay-[150ms] ease-in-out">
				<Tooltip
					arrow
					placement="top"
					title={"Accept friend request"}
				>
					<span>
						<IconButton
							disabled={waitingAccept}
							onClick={accept_friend_req}
							className="bg-green-300 hover:bg-green-400  border-black group shadow-sm disabled:bg-slate-400"
						>
							<Done className="h-[20px] w-[20px] text-slate-100 group-hover:text-slate-50" />
							{waitingAccept && (
								<CircularProgress
									size={30}
									className="absolute"
								/>
							)}
						</IconButton>
					</span>
				</Tooltip>
				<Tooltip
					arrow
					placement="top"
					title={"Deny friend request"}
				>
					<span>
						<IconButton
							disabled={waitingDeny}
							onClick={deny_friend_req}
							className="bg-red-400 hover:bg-red-500 border-black group shadow-sm disabled:bg-slate-400"
						>
							<Clear className="h-[20px] w-[20px] text-slate-100 group-hover:text-slate-50" />
							{waitingDeny && (
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

export default memo(ReceivedItem);
