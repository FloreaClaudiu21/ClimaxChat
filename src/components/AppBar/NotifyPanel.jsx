import { ArrowBack, ClearAll } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Icon,
	IconButton,
	Slide,
	Tooltip,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { updateDoc } from "firebase/firestore";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { TermClass } from "../../helpers/TermSearch";
import { UserDocs } from "../../helpers/UserDocuments";
import { CPagination } from "../DirectMsgs/Pagination";
import { GhostPanel, load } from "../Logged/MainPanel";
import NotifyListItems from "./NotifyItemsList";

const NotifyPanel = ({
	user,
	openInfo,
	notifyPanel,
	setNotifyPanel,
	setMainPanel,
}) => {
	const fire = useFirestore();
	const { notify } = UserDocs(fire, user);
	const [curPage, setCurPage] = useState(1);
	const [clearDialog, setClearDialog] = useState(false);
	const [displayResults, setDisplayResults] = useState([]);
	const { status: n_s, data } = useFirestoreDocData(notify);
	const { pagesSize, changePage, setResults } = new TermClass().NotifyResults({
		data,
		curPage,
		setCurPage,
		setDisplayResults,
	});
	useEffect(() => {
		setResults();
	}, [setResults]);
	const clearList = useCallback(async () => {
		await updateDoc(notify, {
			new: false,
			data: [],
		});
	}, [notify]);
	const handleNoAnswer = useCallback(() => {
		setClearDialog(false);
	}, []);
	const handleYesAnswer = useCallback(() => {
		clearList().then(() => {
			setClearDialog(false);
			openInfo("Notifications list have been cleared", "success");
		});
	}, [clearList, openInfo]);
	const changeClearDialog = useCallback(() => {
		setClearDialog(true);
	}, [setClearDialog]);
	const changeNotifyPanel = useCallback(() => {
		setNotifyPanel(false);
		setTimeout(() => setMainPanel(true), 150);
	}, [setNotifyPanel, setMainPanel]);
	const hasRes = useMemo(() => displayResults.length > 0, [displayResults]);
	if (load(n_s)) return <GhostPanel />;
	return (
		<Slide
			mountOnEnter
			unmountOnExit
			direction="right"
			in={notifyPanel}
		>
			<Stack className="relative h-full w-full gap-1 shadow-md z-[330] bg-slate-100 overflow-x-hidden ">
				<Stack className="group w-full h-[70px] p-1 z-[120] bg-white">
					<Stack className="mb-1 flex-row gap-1 justify-start flex-shrink place-items-center rounded-sm group-hover:bg-slate-200 p-1 delay-75 transition-all">
						<Tooltip
							arrow
							title="Back to main panel"
						>
							<IconButton onClick={changeNotifyPanel}>
								<ArrowBack className="w-4 h-4 group-hover:text-black" />
							</IconButton>
						</Tooltip>
						<Typography
							variant="caption"
							className="font-bold"
						>
							Notifications:
						</Typography>
						<IconButton
							onClick={changeClearDialog}
							className="absolute right-2"
						>
							<Tooltip
								arrow
								title="Clear the notifications list"
							>
								<ClearAll className="w-4 h-4 group-hover:text-black" />
							</Tooltip>
						</IconButton>
					</Stack>
					<Divider />
				</Stack>
				<Stack className="flex-1">
					<NotifyListItems
						displayResults={displayResults}
						main_user={user}
						openInfo={openInfo}
						curPage={curPage}
						changePage={changePage}
						pagesSize={pagesSize}
					/>
					{hasRes && (
						<Stack className="relative sm:sticky w-full bg-white bottom-0 h-[70px] px-2 place-items-end justify-center">
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
				<Dialog
					maxWidth="xs"
					open={clearDialog}
				>
					<DialogTitle>Clear notifications list</DialogTitle>
					<DialogContent dividers>
						<Typography className="text-sm text-red-700 text-center">
							Are you sure you want to clear your notifications list?
						</Typography>
						<Typography className="text-sm text-red-700 text-center">
							This operation can't be undone!
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button
							autoFocus
							onClick={handleNoAnswer}
						>
							No
						</Button>
						<Button onClick={handleYesAnswer}>Yes</Button>
					</DialogActions>
				</Dialog>
			</Stack>
		</Slide>
	);
};

export default memo(NotifyPanel);
