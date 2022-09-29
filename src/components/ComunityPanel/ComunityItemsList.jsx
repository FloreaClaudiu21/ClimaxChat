import { List, ListItem, Stack, Typography } from "@mui/material";
import { memo } from "react";
import ComunityItem from "./ComunityItem";
import nomsgs from "../../assets/nomsgs.gif";

const ComunityListItems = ({ displayResults, main_user, openInfo }) => {
	return (
		<List className="p-1">
			{displayResults.length > 0 ? (
				<Stack className="relative">
					{displayResults.map((u) => {
						return (
							<ComunityItem
								user={u}
								key={u.uid}
								main_user={main_user}
								openInfo={openInfo}
							/>
						);
					})}
				</Stack>
			) : (
				<ListItem className="justify-center mb-2">
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
							There's no other community member besides you `-`
						</Typography>
					</Stack>
				</ListItem>
			)}
		</List>
	);
};

export default memo(ComunityListItems);
