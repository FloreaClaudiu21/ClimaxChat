import {
	Delete,
	Email,
	Logout,
	Notifications,
	Numbers,
	Person,
} from "@mui/icons-material";
import {
	CircularProgress,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Popover,
	Tooltip,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateDoc } from "firebase/firestore";
import React, { memo, useCallback, useState } from "react";
import { format_error_msg } from "../../helpers/SignInUser";
import SignOutUser from "../../helpers/SignOutUser";

//className="justify-center place-items-center bg-slate-50 min-h-[250px] sm:w-full w-[250px] max-w-[300px] border-2 rounded-sm sm:top-[110px] top-[100px] right-[2px] sm:left-[3rem] overflow-y-scroll shadow-md p-1 pt-0 z-[150]"
const UserPanel = ({
	user,
	userPanel,
	containerRef,
	openInfo,
	setUserPanel,
	notifyDoc,
	notifyNew,
	notifications,
	notifyPanel,
	notifyData,
	setNotifyPanel,
	setMainPanel,
	setFriendsPanel,
	setComunityPanel,
}) => {
	const { executeSignOut } = SignOutUser(openInfo);
	const [loadingNotify, setLoadingNotify] = useState(false);
	const changeStateNotify = useCallback(async () => {
		if (notifyPanel) {
			setUserPanel(false);
			setNotifyPanel(false);
			setTimeout(() => setMainPanel(true), 150);
		} else {
			try {
				setLoadingNotify(true);
				let list_c = [];
				let list_n = notifyData?.data;
				list_n.forEach((v) => {
					list_c.push({
						uid: v.uid,
						who: v.who,
						unread: false,
						photo: v.photo,
						date: v.date,
						message: v.message,
					});
				});
				await updateDoc(notifyDoc, {
					new: false,
					data: list_c,
				});
				setNotifyPanel(true);
				setMainPanel(false);
				setUserPanel(false);
				setFriendsPanel(false);
				setComunityPanel(false);
				setLoadingNotify(false);
				return;
			} catch (e) {
				setLoadingNotify(false);
				openInfo(
					"Couldn't open notify panel! Error: " + format_error_msg(e.message),
					"error"
				);
			}
		}
	}, [
		openInfo,
		notifyDoc,
		notifyData,
		notifyPanel,
		setNotifyPanel,
		setMainPanel,
		setUserPanel,
		setFriendsPanel,
		setComunityPanel,
	]);
	return (
		<Popover
			open={userPanel}
			anchorEl={containerRef.current}
			onClose={() => {
				setUserPanel(false);
			}}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			disableRestoreFocus
			className="min-w-[250px]"
		>
			<List
				dense
				className="max-w-[250px] sm:w-full sm:max-w-none"
				subheader={
					<ListSubheader
						component="div"
						id="nested-list-subheader"
						className="w-full bg-slate-100 underline"
					>
						USER INFO PANEL
					</ListSubheader>
				}
			>
				<ListItem divider>
					<ListItemButton onClick={changeStateNotify}>
						<ListItemIcon className="justify-start place-items-center">
							{loadingNotify && (
								<CircularProgress
									size={35}
									className="absolute"
								/>
							)}
							<Notifications className={`h-4 w-4 ${loadingNotify && "pl-1"}`} />
						</ListItemIcon>
						<ListItemText className="flex-1">
							<Tooltip
								arrow
								title="Access the notifications panel"
							>
								<Typography
									variant="subtitle2"
									className="group flex flex-row gap-1 break-words text-slate-700 text-xs place-items-center"
								>
									Notifications
									{notifyNew && (
										<Box className="bg-red-400 group-hover:bg-red-500 min-w-4 w-auto px-1 h-3 flex place-items-center rounded-full text-[10px] border-[1px] border-black text-gray-100 font-bold ">
											{notifications}
										</Box>
									)}
								</Typography>
							</Tooltip>
						</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem divider>
					<ListItemButton>
						<ListItemIcon>
							<Email className="h-4 w-4" />
						</ListItemIcon>
						<ListItemText>
							<Typography
								variant="subtitle2"
								className="break-words text-slate-700 text-xs"
							>
								Email:
							</Typography>
						</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Typography
							variant="subtitle2"
							className="break-words text-black text-[15px]"
						>
							{user.email}
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem divider>
					<ListItemButton>
						<ListItemIcon>
							<Person className="h-4 w-4" />
						</ListItemIcon>
						<ListItemText>
							<Typography
								variant="subtitle2"
								className="break-words text-slate-700 text-xs"
							>
								Username:
							</Typography>
						</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Typography
							variant="subtitle2"
							className="break-words text-black text-[15px]"
						>
							{user.name}
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem divider>
					<ListItemButton className="flex-row">
						<ListItemIcon>
							<Numbers className="h-4 w-4" />
						</ListItemIcon>
						<ListItemText>
							<Typography
								variant="subtitle2"
								className="break-words text-slate-700 text-xs"
							>
								User ID:
							</Typography>
						</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Typography
							variant="subtitle2"
							className="break-words text-black text-[15px]"
						>
							{user.uid}
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemButton
						onClick={executeSignOut}
						className="rounded-sm bg-slate-700 hover:bg-slate-900 "
					>
						<ListItemIcon>
							<Logout className="h-4 w-4 text-white" />
						</ListItemIcon>
						<ListItemText>
							<Typography
								variant="subtitle2"
								className="text-white text-xs hover:underline"
							>
								Sign out
							</Typography>
						</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton className="rounded-sm bg-red-700 hover:bg-red-900 ">
						<ListItemIcon>
							<Delete className="h-4 w-4 text-white" />
						</ListItemIcon>
						<ListItemText>
							<Typography
								variant="subtitle2"
								className="text-white text-xs hover:underline"
							>
								Delete Account
							</Typography>
						</ListItemText>
					</ListItemButton>
				</ListItem>
			</List>
		</Popover>
	);
};

export default memo(UserPanel);
