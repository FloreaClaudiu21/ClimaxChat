import { Search } from "@mui/icons-material";
import {
	Avatar,
	Divider,
	IconButton,
	InputBase,
	List,
	ListItem,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useFirestore } from "reactfire";
import { TermClass } from "../../../helpers/TermSearch";
import { CPagination } from "../../DirectMsgs/Pagination";
import nomsgs from "../../../assets/nomsgs.gif";
import PartItem from "./PartItem";

const ChooseParticipants = ({
	user,
	openInfo,
	friends_data,
	parts,
	setParts,
	waiting,
}) => {
	const fire = useFirestore();
	const searchInput = useRef(null);
	const [data, setData] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [termResults, setTermResults] = useState([]);
	const [displayResults, setDisplayResults] = useState([]);
	const hasRes = useMemo(() => displayResults.length > 0, [displayResults]);
	const get_data_friends = useCallback(async () => {
		let list = [];
		let fl = friends_data?.data;
		await Promise.all(
			fl.map(async (v) => {
				let d = doc(fire, "users", v);
				let data = await getDoc(d);
				list.push(data.data());
			})
		);
		return list;
	}, [friends_data, fire]);
	const { pagesSize, changePage, setResults, executeSearch } =
		new TermClass().PartSearch({
			user,
			data,
			openInfo,
			searchInput,
			curPage,
			setCurPage,
			termResults,
			setTermResults,
			setDisplayResults,
		});
	useEffect(() => {
		setResults();
	}, [setResults]);
	useEffect(() => {
		get_data_friends().then((v) => setData(v));
	}, [get_data_friends]);
	return (
		<Stack
			className={`w-[320px] h-[350px] gap-1 ${
				waiting && "overflow-hidden pointer-events-none"
			}`}
		>
			<Stack className="flex-row">
				<Typography className="text-xs font-bold mt-2 flex-1">
					Choose Group Participants:
				</Typography>
				{hasRes && (
					<Tooltip
						arrow
						placement="top"
						title={
							`${parts.length} friends selected out of ` + displayResults.length
						}
					>
						<Typography className="text-xs font-bold mt-2">
							{parts.length + "/" + displayResults.length}
						</Typography>
					</Tooltip>
				)}
			</Stack>
			<Divider flexItem />
			<Stack className="w-full h-[80px] shadow-sm flex-row justify-center place-items-center pb-1">
				<InputBase
					inputRef={searchInput}
					placeholder="Search a user name..."
					onKeyDown={(e) => {
						e.key === "Enter" && executeSearch();
					}}
					className="w-full text-[14px] h-[40px] text-black border-2 font-medium bg-gray-300 rounded-md px-2 focus-within:bg-gray-200  focus-within:border-blue-600 focus-within:text-blue-600 delay-75 transition-all"
				/>
				<Tooltip
					arrow
					title="Search User"
				>
					<IconButton
						type="button"
						aria-label="search"
						onClick={executeSearch}
					>
						<Search className="h-6 w-6" />
					</IconButton>
				</Tooltip>
			</Stack>
			<List className="h-full">
				{hasRes ? (
					displayResults.map((u) => {
						return (
							<PartItem
								part={u}
								key={u.uid}
								participants={parts}
								setParticipants={setParts}
							/>
						);
					})
				) : (
					<ListItem className="justify-center place-items-start p-0">
						<Stack className="justify-center place-items-center">
							<img
								src={nomsgs}
								alt="Not found"
								className="h-[150px] w-[250px] object-cover"
							/>
							<Typography
								variant="caption"
								textAlign={"center"}
								className="max-w-[300px]"
							>
								You don't have any friends! So sad ;-;
							</Typography>
						</Stack>
					</ListItem>
				)}
			</List>
			{hasRes && (
				<>
					<Divider />
					<Stack className="relative sm:sticky w-full bg-white bottom-0 min-h-[50px] h-auto place-items-end justify-center">
						<CPagination
							size="small"
							page={curPage}
							defaultPage={1}
							boundaryCount={2}
							onChange={changePage}
							count={pagesSize}
							className="text-xs"
						/>
					</Stack>
				</>
			)}
			<Stack className="gap-1">
				<Typography className="text-xs font-bold mt-2 flex-1">
					Participants Choosed:
				</Typography>
				<Divider />
				<Stack className="my-2 gap-2 flex-wrap flex-row">
					{parts.length > 0 ? (
						parts.map((v) => {
							return (
								<Stack key={v.uid}>
									<Tooltip
										arrow
										title={v.email}
										placement="top"
									>
										<Avatar
											src={v.photo}
											className="border-2 border-blue-500 hover:scale-110 transition-all delay-100"
										/>
									</Tooltip>
								</Stack>
							);
						})
					) : (
						<Typography className="text-left text-xs">
							No participants have been selected yet
						</Typography>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default memo(ChooseParticipants);
