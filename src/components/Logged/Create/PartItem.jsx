import {
	Avatar,
	Checkbox,
	Divider,
	ListItem,
	Tooltip,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { onValue, ref } from "firebase/database";
import React, { memo, useEffect, useState } from "react";
import { useDatabase } from "reactfire";

const PartItem = ({ part, participants, setParticipants }) => {
	const db = useDatabase();
	const [online, setOnline] = useState(false);
	let userStatusDB = ref(db, "/status/" + part?.uid);
	useEffect(() => {
		onValue(userStatusDB, (v) => {
			const value = v.val();
			if (value.state === "offline") {
				setOnline(false);
			} else {
				setOnline(true);
			}
		});
	}, [userStatusDB]);
	const HandleCheckbox = (e) => {
		let nl = [];
		let checked = e.target.checked;
		participants?.forEach((v) => {
			nl.push(v);
		});
		if (checked) {
			nl.push({
				uid: part.uid,
				photo: part.photo,
				email: part.email,
			});
		} else {
			nl = nl.filter((v) => v.uid !== part.uid);
		}
		setParticipants(nl);
		return;
	};
	return (
		<ListItem
			dense
			divider
			className="flex-row px-1 gap-2 min-h-[70px] h-auto bg-white hover:bg-gray-200 transition-all delay-100 rounded-md shadow-sm mt-2 relative group"
		>
			<Stack>
				<Checkbox
					size="small"
					className="p-1"
					onChange={HandleCheckbox}
				/>
			</Stack>
			<Divider
				orientation="vertical"
				flexItem
			/>
			<Stack>
				<Tooltip
					arrow
					placement="bottom"
					title={part.name + (online ? " ✅" : " 🔴")}
				>
					<span className="relative">
						<Avatar
							src={part.photo}
							className=" relative w-8 h-8 sm:w-6 sm:h-6 transition-all delay-100 border-2 border-blue-500 group-hover:scale-110"
						/>
						<Tooltip
							arrow
							placement="right"
							title={online ? "Online" : "Offline"}
						>
							<div
								className={`absolute ${
									online ? "bg-green-500 animate-pulse" : "bg-red-500"
								} translate-y-1/2 left-0 -top-1/2 rounded-lg border-2 border-[rgba(0,0,0,0.2)] h-2 w-2`}
							/>
						</Tooltip>
					</span>
				</Tooltip>
			</Stack>
			<Stack className="flex-1 gap-1 overflow-hidden justify-center">
				<Typography
					variant="subtitle2"
					className="relative text-sm break-all text-blue-700 group-hover:text-blue-500 group-hover:underline transition-all delay-100"
				>
					{part.name}
				</Typography>
				<Divider />
				<Tooltip
					arrow
					placement="top"
					title={part.email}
				>
					<Typography
						variant="subtitle1"
						className="text-xs overflow-hidden text-ellipsis"
					>
						{part.email}
					</Typography>
				</Tooltip>
			</Stack>
		</ListItem>
	);
};

export default memo(PartItem);
