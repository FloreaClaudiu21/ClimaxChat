import { GroupWork, People, Search } from "@mui/icons-material";
import { Button, IconButton, InputBase, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import React, { memo, useCallback } from "react";

const UtilsPanel = ({
	setMainPanel,
	setComunityPanel,
	setFriendsPanel,
	executeSearch,
	searchInput,
	received_req_data,
	friends_data
}) => {
	const received_reqs = received_req_data?.data.length;
	const UpdateComunityPanel = useCallback(() => {
		setMainPanel(false);
		setComunityPanel(true);
	}, [setComunityPanel, setMainPanel]);
	const UpdateFriendsPanel = useCallback(() => {
		setMainPanel(false);
		setFriendsPanel(true);
	}, [setFriendsPanel, setMainPanel]);
	return (
		<Stack className="flex-row flex-wrap flex-shrink gap-2 p-2 pb-0 mt-[110px] h-auto justify-center">
			<Tooltip
				arrow
				placement="top"
				title="Show all the registered users"
			>
				<Button
					variant="contained"
					onClick={UpdateComunityPanel}
					startIcon={<GroupWork />}
					className="text-xs min-w-[100px] w-full max-w-[350px] bg-red-400 hover:bg-red-600 hover:underline hover:font-semibold"
				>
					Community
				</Button>
			</Tooltip>
			<Tooltip
				arrow
				title={`Show your friends list ${
					received_reqs > 0
						? " - " + received_reqs + " new friend requests"
						: ""
				}`}
			>
				<Button
					variant="contained"
					startIcon={<People />}
					onClick={UpdateFriendsPanel}
					className="relative text-xs min-w-[100px] max-w-[350px] w-full bg-purple-400 hover:bg-purple-600 hover:underline hover:font-semibold"
				>
					Friends - {friends_data?.data.length}
					{received_reqs > 0 ? (
						<Stack className="w-4 h-4 absolute right-[10px] justify-center border-2 border-[rgba(0,0,0,0.5)] place-items-center top-1/2 -translate-y-1/2 bg-red-300 hover:bg-red-400 rounded-full shadow-md">
							<span className="flex text-[12px] overflow-hidden text-ellipsis text-center place-items-center">
								{received_reqs}{" "}
							</span>
						</Stack>
					) : (
						<></>
					)}
				</Button>
			</Tooltip>
			<Stack className="w-full flex-row justify-center place-items-center gap-1">
				<InputBase
					inputRef={searchInput}
					onKeyDown={(e) => {
						e.key === "Enter" && executeSearch();
					}}
					placeholder="Search a conversation..."
					className="w-full text-[14px] h-[40px] text-black border-2 font-medium bg-gray-300 rounded-md px-2 pt-1 focus-within:bg-gray-200  focus-within:border-blue-600 focus-within:text-blue-600 delay-75 transition-all"
				/>
				<Tooltip
					arrow
					title="Search"
				>
					<IconButton
						type="button"
						onClick={executeSearch}
					>
						<Search className="h-6 w-6" />
					</IconButton>
				</Tooltip>
			</Stack>
		</Stack>
	);
};

export default memo(UtilsPanel);
