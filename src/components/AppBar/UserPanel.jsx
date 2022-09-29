import { Delete, Email, Logout, Numbers, Person } from "@mui/icons-material";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Slide,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { memo } from "react";
import SignOutUser from "../../helpers/SignOutUser";

const UserPanel = ({ userPanel, user, containerRef, openInfo }) => {
	const { executeSignOut } = SignOutUser(openInfo);
	return (
		<Slide
			in={userPanel}
			direction="down"
			mountOnEnter
			unmountOnExit
			container={containerRef.current}
		>
			<Stack className="absolute justify-center place-items-center bg-slate-50 min-h-[250px] h-auto sm:w-full w-[250px] border-2 rounded-sm sm:top-[110px] top-[85px] right-[2px] shadow-md p-1 pt-0 z-[130]">
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
						<ListItemButton>
							<ListItemIcon>
								<Email className="h-4 w-4" />
							</ListItemIcon>
							<ListItemText>
								<Typography
									variant="subtitle2"
									className="break-words text-black text-xs"
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
								className="break-words text-black text-[14px]"
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
									className="break-words text-black text-[14px]"
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
								className="break-words text-black text-[14px]"
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
									className="break-words text-black text-[14px]"
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
								className="break-words text-black text-[14px]"
							>
								{user.id}
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
			</Stack>
		</Slide>
	);
};

export default memo(UserPanel);
