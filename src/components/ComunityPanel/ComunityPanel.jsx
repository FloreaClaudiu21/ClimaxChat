import { ArrowBack, Search } from "@mui/icons-material";
import {
	Divider,
	IconButton,
	InputBase,
	Slide,
	Tooltip,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { collection } from "firebase/firestore";
import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { TermClass } from "../../helpers/TermSearch";
import { CPagination } from "../DirectMsgs/Pagination";
import { GhostPanel, load } from "../Logged/MainPanel";
import ComunityListItems from "./ComunityItemsList";

const ComunityPanel = ({
	user,
	openInfo,
	comunityPanel,
	setComunityPanel,
	setMainPanel,
}) => {
	const fire = useFirestore();
	const searchInput = useRef(null);
	const [curPage, setCurPage] = useState(1);
	const colection = collection(fire, "users");
	const [termResults, setTermResults] = useState([]);
	const [displayResults, setDisplayResults] = useState([]);
	const { status, data } = useFirestoreCollectionData(colection);
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
	useEffect(() => {
		setResults();
	}, [setResults]);
	const changeComunityPanel = useCallback(() => {
		setComunityPanel(false);
		setTimeout(() => setMainPanel(true), 150);
	}, [setComunityPanel, setMainPanel]);
	const hasRes = useMemo(() => displayResults.length > 0, [displayResults]);
	if (load(status)) return <GhostPanel />;
	return (
		<Slide
			mountOnEnter
			unmountOnExit
			direction="right"
			in={comunityPanel}
		>
			<Stack className="relative h-full w-full gap-1 shadow-md z-[130] bg-slate-100 overflow-x-hidden">
				<Stack className="group w-full h-[140px] p-1 z-[120] bg-white">
					<Stack className="flex-row gap-1 justify-start flex-shrink place-items-center rounded-sm group-hover:bg-slate-200 p-1 delay-75 transition-all">
						<Tooltip
							arrow
							title="Back to main panel"
						>
							<IconButton onClick={changeComunityPanel}>
								<ArrowBack className="w-4 h-4 group-hover:text-black" />
							</IconButton>
						</Tooltip>
						<Typography
							variant="caption"
							className="font-bold"
						>
							Community:
						</Typography>
					</Stack>
					<Stack className="h-[80px] shadow-sm w-full flex-row justify-center place-items-center pb-1">
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
					<Divider />
				</Stack>
				<Stack className="flex-1">
					<ComunityListItems
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
			</Stack>
		</Slide>
	);
};

export default memo(ComunityPanel);
