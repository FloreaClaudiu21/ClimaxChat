import { PhotoCamera } from "@mui/icons-material";
import {
	Avatar,
	Divider,
	IconButton,
	InputBase,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { memo } from "react";

const GroupDetails = ({
	openInfo,
	chatnameInput,
	avatarInput,
	chatAvatar,
	hasChatAvatar,
	setChatAvatar,
	setUploadAvatar,
	hasError,
	error,
	sucName,
	execute_name,
}) => {
	return (
		<Stack className="flex-row gap-1 h-[100px] w-[320px] justify-center place-items-start pt-1 flex-wrap">
			<Stack className="min-w-full gap-1">
				<Typography className="text-xs font-bold">Group Details:</Typography>
				<Divider flexItem />
			</Stack>
			<Stack className="my-1 flex-row gap-1 place-items-start">
				<Avatar
					className="mr-1"
					src={hasChatAvatar ? chatAvatar.src : ""}
				/>
				<Stack className="gap-1">
					<InputBase
						inputRef={chatnameInput}
						placeholder="Enter the chat name..."
						onKeyDown={(e) => {
							e.key === "Enter" && execute_name();
						}}
						onFocus={execute_name}
						onMouseLeave={execute_name}
						className={`w-full text-[14px] h-[40px] text-black border-2 font-medium bg-gray-300 rounded-md px-2 focus-within:bg-gray-200  focus-within:border-blue-600 focus-within:text-blue-600 delay-75 transition-all ${
							hasError && "border-red-400 focus-within:border-red-500"
						} ${
							sucName &&
							"border-green-400 focus-within:border-green-500 focus-within:text-green-600"
						}`}
					/>
					{hasError && (
						<Typography className="text-[12px] text-red-500">
							{error}
						</Typography>
					)}
				</Stack>
				<Tooltip
					arrow
					placement="top"
					title="Choose the chat avatar image"
				>
					<IconButton
						color="primary"
						component="label"
						className="p-0 px-1"
					>
						<input
							hidden
							type="file"
							accept="image/*"
							ref={avatarInput}
							onChange={() => {
								let reader = new FileReader();
								let sfile = avatarInput.current.files[0];
								if (!sfile.type.startsWith("image/")) {
									openInfo(
										"You must select a image file for the chat avatar!",
										"error"
									);
									return;
								}
								reader.readAsDataURL(sfile);
								reader.onload = () => {
									let img = new Image();
									img.src = reader.result;
									setChatAvatar(img);
									setUploadAvatar(sfile);
									openInfo(
										"Chat avatar image selected successfully",
										"success"
									);
								};
							}}
						/>
						<PhotoCamera />
					</IconButton>
				</Tooltip>
			</Stack>
		</Stack>
	);
};

export default memo(GroupDetails);
