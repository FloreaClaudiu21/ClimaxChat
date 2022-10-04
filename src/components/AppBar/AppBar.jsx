import { ArrowDropDown, ArrowDropUp, WbSunny } from "@mui/icons-material";
import {
	AppBar,
	Avatar,
	Box,
	Stack,
	Switch,
	Tooltip,
	Typography,
} from "@mui/material";
import React, {
	memo,
	useRef,
	useCallback,
	useMemo,
	useEffect,
	useState,
} from "react";
import { useFirestoreDocData } from "reactfire";
import logo from "../../assets/logo.gif";
import { UserDocs } from "../../helpers/UserDocuments";
import UserPanel from "./UserPanel";
import { load, GhostPanel } from "../Logged/MainPanel";

const AppBarC = ({
	fire,
	user,
	userStatus,
	openInfo,
	userPanel,
	setUserPanel,
	notifyPanel,
	chatPanel,
	setNotifyPanel,
	setMainPanel,
	setFriendsPanel,
	setComunityPanel,
}) => {
	const containerRef = useRef();
	const { notify } = UserDocs(fire, user);
	const [notifications, setNotifications] = useState(0);
	const { status: n_s, data: notify_data } = useFirestoreDocData(notify);
	const notifyNew = useMemo(() => notify_data?.new, [notify_data]);
	const changeStatePanel = useCallback(() => {
		setUserPanel(!userPanel);
	}, [userPanel, setUserPanel]);
	useEffect(() => {
		let count = 0;
		let list = notify_data?.data;
		list?.forEach((n) => {
			if (n.unread) count += 1;
		});
		setNotifications(count);
	}, [notify_data]);
	useEffect(() => {
		notifyNew &&
			notifications > 0 &&
			openInfo(
				`You have ` +
					notifications +
					` new notifications! Check the notifications panel...`,
				"info"
			);
	}, [notifyNew, notifications, openInfo]);
	if (load(n_s)) return <GhostPanel />;
	return (
		<AppBar
			position="sticky"
			id="appbar"
			className={`top-0 gap-2 left-0 w-full sm:w-[300px] h-[100px] flex-row bg-white shadow-md p-1`}
		>
			<Stack className="flex-row flex-wrap gap-1 flex-1 h-full justify-start place-items-center">
				<img
					src={logo}
					alt="Not found"
					className="h-5 w-5 sm:w-8 sm:h-8 ml-3 object-fill rounded-md"
				/>
				<Typography
					variant="h6"
					component="span"
					className="text-[14px] sm:text-xs text-center place-self-center text-blue-700"
				>
					ClimaxChat
				</Typography>
			</Stack>
			<Stack className="w-[150px] flex-row justify-end flex-wrap place-items-center">
				<WbSunny className="text-[#FCE570] text-right w-full max-w-[45px]" />
				<Tooltip
					arrow
					placement="top"
					title="Switch theme"
				>
					<Switch
						color="primary"
						className="w-[55px]"
					/>
				</Tooltip>
			</Stack>
			<Stack
				ref={containerRef}
				onClick={changeStatePanel}
				className="relative flex-row flex-wrap gap-2 group h-full place-items-center justify-center hover:cursor-pointer"
			>
				<Tooltip
					arrow
					placement="left"
					title={user.name + (userStatus ? " ✅" : " 🔴")}
				>
					<span className="relative">
						<Avatar
							src={user.photo}
							className={`h-6 w-6 sm:h-8 sm:w-8 border-2 ${
								userStatus ? "border-green-700" : "border-red-700"
							} group-hover:scale-110 delay-75 transition-all ease-out`}
						/>
						{notifyNew && (
							<Box className="absolute top-[-5px] left-[-5px] bg-red-400 group-hover:bg-red-500 min-w-4 w-auto px-1 h-3 text-center rounded-full text-[10px] border-[1px] border-black text-gray-100 font-bold ">
								{notifications}
							</Box>
						)}
					</span>
				</Tooltip>
				<Tooltip
					arrow
					placement="left"
					title="User Settings Panel"
				>
					<Typography
						variant="h5"
						component="span"
						className="flex flex-nowrap place-items-center text-xs sm:text-sm text-center text-blue-700 group-hover:underline group-hover:text-blue-800"
					>
						Me
						{userPanel ? (
							<ArrowDropUp className="text-base" />
						) : (
							<ArrowDropDown className="text-base" />
						)}
					</Typography>
				</Tooltip>
			</Stack>
			<UserPanel
				user={user}
				containerRef={containerRef}
				userPanel={userPanel}
				setUserPanel={setUserPanel}
				openInfo={openInfo}
				notifyDoc={notify}
				notifyNew={notifyNew}
				notifyPanel={notifyPanel}
				notifyData={notify_data}
				notifications={notifications}
				setNotifyPanel={setNotifyPanel}
				setMainPanel={setMainPanel}
				setFriendsPanel={setFriendsPanel}
				setComunityPanel={setComunityPanel}
			/>
		</AppBar>
	);
};

export default memo(AppBarC);
