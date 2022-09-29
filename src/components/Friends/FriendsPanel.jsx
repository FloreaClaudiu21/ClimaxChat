import {
	ArrowBack,
	ArrowDropDown,
	ArrowDropUp,
	Search,
} from "@mui/icons-material";
import {
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	InputBase,
	List,
	ListSubheader,
	Slide,
	Tooltip,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { TermClass } from "../../helpers/TermSearch";
import { UserDocs } from "../../helpers/UserDocuments";
import { CPagination } from "../DirectMsgs/Pagination";
import { GhostPanel, load } from "../Logged/MainPanel";
import { FriendPanelI, ReceivePanelI, SendPanelI } from "./Panels";

const FriendsPanel = ({
	user,
	openInfo,
	friendsPanel,
	setFriendsPanel,
	setMainPanel,
}) => {
	const fire = useFirestore();
	const searchInput = useRef(null);
	const [data, setData] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [sendP, setSendP] = useState(false);
	const [receivedP, setReceivedP] = useState(false);
	const [termResults, setTermResults] = useState([]);
	const [displayResults, setDisplayResults] = useState([]);
	const { friends, send_req, received_req } = UserDocs(fire, user);
	const { status: s_f, data: friendsD } = useFirestoreDocData(friends);
	const { status: s_r, data: received_data } =
		useFirestoreDocData(received_req);
	const { status: s_s, data: send_data } = useFirestoreDocData(send_req);
	const { pagesSize, changePage, setResults, executeSearch } =
		new TermClass().TermSearch({
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
	const fetch_users = useCallback(
		async (friendsD) => {
			if (!friendsD) return;
			let f_list = friendsD.data;
			const promises = await f_list.map(async (v) => {
				const u_doc = doc(fire, "users", v);
				const user_d = Promise.resolve((await getDoc(u_doc)).data());
				return user_d;
			});
			const users_d = await Promise.all(promises);
			return users_d;
		},
		[fire]
	);
	useEffect(() => {
		fetch_users(friendsD).then((m) => {
			setData(m);
		});
	}, [friendsD, fetch_users]);
	useEffect(() => {
		setResults();
	}, [setResults]);
	const changeFriendsPanel = useCallback(() => {
		setFriendsPanel(false);
		setTimeout(() => setMainPanel(true), 150);
	}, [setFriendsPanel, setMainPanel]);
	const hasRes = useMemo(() => displayResults.length > 0, [displayResults]);
	const updateReceivedP = useCallback(() => {
		setSendP(false);
		setReceivedP(!receivedP);
	}, [setReceivedP, receivedP]);
	const updateSendP = useCallback(() => {
		setSendP((prev) => !prev);
		setReceivedP(false);
	}, [setSendP]);
	if (load(s_f) || load(s_s) || load(s_r)) return <GhostPanel />;
	return (
		<Slide
			mountOnEnter
			unmountOnExit
			direction="right"
			in={friendsPanel}
		>
			<Stack className="p-1 h-full w-full bg-slate-100 gap-1 shadow-md z-[130] mt-[110px] relative overflow-hidden">
				<Stack className="group absolute w-full h-[70px] z-[120] bg-white">
					<Stack className="flex-row gap-1 justify-start flex-shrink place-items-center rounded-sm group-hover:bg-slate-200 p-1 delay-75 transition-all">
						<Tooltip
							arrow
							title="Back to main panel"
						>
							<IconButton onClick={changeFriendsPanel}>
								<ArrowBack className="w-4 h-4 group-hover:text-black" />
							</IconButton>
						</Tooltip>
						<Typography
							variant="caption"
							className="font-bold"
						>
							Friends:
						</Typography>
					</Stack>
					<Divider />
				</Stack>
				<Stack className="justify-start min-h-[50px] h-auto max-h-[240px] mt-[70px] overflow-y-auto overflow-x-hidden">
					<List
						className={`p-1`}
						subheader={
							<ListSubheader
								component="div"
								className="text-black bg-slate-200 rounded-md"
							>
								<Stack className="flex-row w-full place-items-center gap-1">
									<Typography
										variant="caption"
										className="flex place-items-center justify-center"
									>
										Received Requests:{" "}
										<span className="text-xs p-1 text-red-400">
											{received_data?.data.length}
										</span>
									</Typography>
									<IconButton
										onClick={updateReceivedP}
										className="w-4 h-4"
									>
										{receivedP ? (
											<ArrowDropUp className="w-4 h-4" />
										) : (
											<ArrowDropDown className="w-4 h-4" />
										)}
									</IconButton>
								</Stack>
							</ListSubheader>
						}
					>
						<Collapse in={receivedP}>
							<ReceivePanelI
								user={user}
								openInfo={openInfo}
								received_data={received_data}
							/>
						</Collapse>
					</List>
				</Stack>
				<Divider />
				<Stack className="justify-start min-h-[50px] h-auto max-h-[250px] overflow-y-auto overflow-x-hidden">
					<List
						className="p-1"
						subheader={
							<ListSubheader
								component="div"
								className="text-black bg-slate-200 rounded-md"
							>
								<Stack className="flex-row w-full place-items-center">
									<Typography
										variant="caption"
										className="flex place-items-center justify-center"
									>
										Send Requests:{" "}
										<span className="text-xs p-1 text-red-400">
											{send_data?.data.length}
										</span>
										<IconButton
											onClick={updateSendP}
											className="w-4 h-4"
										>
											{sendP ? (
												<ArrowDropUp className="w-4 h-4" />
											) : (
												<ArrowDropDown className="w-4 h-4" />
											)}
										</IconButton>
									</Typography>
								</Stack>
							</ListSubheader>
						}
					>
						<Collapse in={sendP}>
							<SendPanelI
								user={user}
								openInfo={openInfo}
								send_data={send_data}
							/>
						</Collapse>
					</List>
				</Stack>
				<Divider />
				<Stack className="h-[60px] shadow-sm w-full flex-row justify-center place-items-center pb-1">
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
				<Stack
					className={`flex-1 mb-[60px] overflow-x-hidden ${
						hasRes ? "mb-[60px]" : "mb-0"
					}`}
				>
					<FriendPanelI
						fire={fire}
						hasRes={hasRes}
						main_user={user}
						openInfo={openInfo}
						friends_data={friendsD}
						friends_doc={friends}
						displayResults={displayResults}
					/>
					{hasRes && (
						<Stack className="absolute w-full bg-white bottom-0 min-h-[60px] h-auto px-2 place-items-end justify-center shadow-md">
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
					)}
				</Stack>
			</Stack>
		</Slide>
	);
};

export default memo(FriendsPanel);
