import { React } from "react";

import PagePresenter from "../presenters/PagePresenter";
import Page from "../components/Page";
import { mockData } from "../data/mockData";

const ColdRoomStoragePage = () => {
	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "name", headerName: "Name" },
		{ field: "total", headerName: "Total", editable: true, type: "number" },
		{ field: "xlevel", headerName: "X-level", editable: true, type: "number" },
		{ field: "ylevel", headerName: "Y-level", editable: true, type: "number" },
		{ field: "zlevel", headerName: "Z-level", editable: true, type: "number" },
		{ field: "test1", headerName: "Test-1", editable: true },
		{ field: "test2", headerName: "Test-2", editable: true },
		{ field: "test3", headerName: "Test-3", editable: true },
		{ field: "abc_test", headerName: "ABC-Test", editable: true, type: "number" },
		{ field: "kfc_test", headerName: "KFC-Test", editable: true, type: "number" },
		{ field: "bgk_test", headerName: "BGK-Test", editable: true, type: "number" },
	];
	
	const rows = mockData;
	
	const presenter = new PagePresenter("Cold Room Storage", "All germplasm", rows, columns)
	return (
		<Page presenter = {presenter} />
	);
};

export default ColdRoomStoragePage;