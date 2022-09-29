import { useCallback, useMemo } from "react";

class TermClass {
	constructor(fetch) {
		this.fetch = fetch;
	}
	TermSearch = ({
		user,
		data,
		openInfo,
		searchInput,
		curPage,
		setCurPage,
		termResults,
		setTermResults,
		setDisplayResults,
		ItemPerPage = 20,
	}) => {
		const pages_size = useCallback(() => {
			let result = 1;
			if (!data) return result;
			let dates = [];
			termResults.length > 0 ? (dates = termResults) : (dates = data);
			if (dates.length <= 0) return result;
			let s = dates.length / ItemPerPage;
			let t = s.toString();
			let st = t.split(".");
			st.length > 1
				? (result = parseInt(st[0]) + 1)
				: (result = parseInt(st[0]));
			return result;
		}, [data, termResults, ItemPerPage]);
		const setResults = useCallback(() => {
			if (!data) return;
			let dc = [];
			let dates = [];
			termResults.length > 0 ? (dates = termResults) : (dates = data);
			let startPoint = (curPage - 1) * ItemPerPage;
			let endPoint = startPoint + ItemPerPage;
			endPoint > dates.length && (endPoint = dates.length);
			for (let P = startPoint; P < endPoint; P++) {
				let u = dates[P];
				u !== undefined && u.email !== user.email && dc.push(u);
			}
			if (curPage > pages_size()) {
				setCurPage(1);
			}
			setDisplayResults(dc);
			return;
		}, [
			data,
			user,
			termResults,
			ItemPerPage,
			setCurPage,
			setDisplayResults,
			pages_size,
			curPage,
		]);
		const changePage = useCallback(
			(e, number) => {
				setCurPage(number);
			},
			[setCurPage]
		);
		const executeSearch = useCallback(() => {
			if (!data || data.length < 1) {
				setTermResults([]);
				return;
			}
			let term = searchInput.current.value + "";
			term = term.trim().toLowerCase();
			if (term.length <= 0 || term === "") {
				setTermResults([]);
				openInfo(
					"No search term have been provided, showing the initial results.",
					"info"
				);
				return;
			}
			const li = [];
			data.forEach((v) => {
				v !== undefined &&
					v.email !== user.email &&
					(v.name.toLowerCase().startsWith(term) ||
						v.name.toLowerCase().includes(term)) &&
					li.push(v);
			});
			li.length <= 0
				? openInfo(
						"No search results have been found for the term: " + term,
						"error"
				  )
				: openInfo(
						"We found " +
							li.length +
							" search results starting or containing the term: " +
							term,
						"success"
				  );
			setTermResults(li);
			return;
		}, [data, user, setTermResults, openInfo, searchInput]);
		const pagesSize = useMemo(() => pages_size(), [pages_size]);
		return { setResults, changePage, pagesSize, executeSearch };
	};
}

export { TermClass };
