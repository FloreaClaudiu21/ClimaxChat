import { Info } from "@mui/icons-material";
import {
	Avatar,
	Divider,
	List,
	ListItem,
	Stack,
	Typography,
} from "@mui/material";
import { memo } from "react";
import nomsgs from "../../assets/nomsgs.gif";

const NotifyItem = ({ notify }) => {
	return (
		<ListItem
			dense
			divider
			className="max-w-[450px] p-0 flex-row mt-2 min-h-[70px] h-auto max-h-[150px] bg-white hover:bg-gray-200 transition-all delay-100 rounded-md shadow-md relative group"
		>
			<Stack className="p-1 justify-center place-items-center">
				<Info className="text-blue-300 rounded-full animate-pulse" />
			</Stack>
			<Stack className="absolute top-0 min-w-full px-1">
				<Typography
					variant="subtitle2"
					className="text-[12px] break-all text-right underline text-gray-700 group-hover:text-gray-500transition-all delay-100"
				>
					{notify.date}
				</Typography>
			</Stack>

			<Stack className="p-2 pt-3 gap-1 overflow-hidden justify-center">
				<Stack className="gap-2 flex-row pt-2">
					<Avatar src={notify.photo} />
					<Typography
						variant="subtitle2"
						className="text-xs break-all text-blue-700 group-hover:text-blue-500 group-hover:underline transition-all delay-100"
					>
						{notify.who}
					</Typography>
				</Stack>
				<Divider />
				<Typography
					variant="subtitle2"
					className="text-[0.5rem] break-all text-gray-700 group-hover:text-slate-500 transition-all delay-100"
				>
					{notify.message}
				</Typography>
			</Stack>
		</ListItem>
	);
};

const NotifyItemI = memo(NotifyItem);

const NotifyListItems = ({ displayResults, main_user, openInfo }) => {
	return (
		<List className="flex p-1 pt-0 h-full mb-2 place-items-center flex-col">
			{displayResults.length > 0 ? (
				displayResults.map((v) => {
					return (
						<NotifyItemI
							notify={v}
							key={v.uid}
							main_user={main_user}
							openInfo={openInfo}
						/>
					);
				})
			) : (
				<ListItem className="h-full justify-center place-items-start p-0">
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
							You don't have any new notifications...
						</Typography>
					</Stack>
				</ListItem>
			)}
		</List>
	);
};

export default memo(NotifyListItems);
