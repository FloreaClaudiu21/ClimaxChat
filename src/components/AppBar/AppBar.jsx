import { ArrowDropDown, ArrowDropUp, WbSunny } from "@mui/icons-material";
import {
	AppBar,
	Avatar,
	Stack,
	Switch,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { memo, useRef, useCallback } from "react";
import logo from "../../assets/logo.gif";
import UserPanel from "./UserPanel";

const AppBarC = ({ children, user, userStatus, openInfo, userPanel, setUserPanel, setComunityPanel }) => {
	const containerRef = useRef();
	const changeStatePanel = useCallback(() => {
		setUserPanel(!userPanel);
	}, [userPanel, setUserPanel]);
	return (
		<AppBar className="fixed top-0 gap-2 w-full sm:w-[300px] left-0 h-[110px] flex-row bg-white shadow-md p-1">
			<Stack className="flex-row flex-wrap gap-1 flex-1 h-full justify-start place-items-center">
				<img
					src={logo}
					alt="Not found"
					className="h-8 w-8 border-[2px] ml-2 border-blue-700 object-fill rounded-md"
				/>
				<Typography
					variant="h6"
					component="span"
					className="text-[15px] text-center place-self-center text-blue-700"
				>
					ClimaxChat
				</Typography>
			</Stack>
			<Stack className="w-[150px] flex-row mr-1 justify-end flex-wrap place-items-center">
				<WbSunny className="text-[#FCE570] text-right w-full max-w-[45px]" />
				<Tooltip
					arrow
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
					<Avatar
						src={user.photo}
						className={`h-8 w-8 border-2 ${
							userStatus ? "border-green-700" : "border-red-700"
						} group-hover:scale-110 delay-75 transition-all ease-out`}
					/>
				</Tooltip>
				<Tooltip
					arrow
					placement="left"
					title="User Settings Panel"
				>
					<Typography
						variant="h5"
						component="span"
						className="flex flex-nowrap place-items-center text-sm text-center text-blue-700 group-hover:underline group-hover:text-blue-800"
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
			{children}
			<UserPanel
				user={user}
				containerRef={containerRef}
				userPanel={userPanel}
				openInfo={openInfo}
			/>
		</AppBar>
	);
};

export default memo(AppBarC);
