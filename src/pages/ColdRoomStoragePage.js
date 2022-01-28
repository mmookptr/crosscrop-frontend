import { React } from "react";

import PagePresenter from "../presenters/PagePresenter";
import Page from "../components/Page";

const ColdRoomStoragePage = () => {
	const presenter = new PagePresenter("Cold Room Storage", "All germplasm")
	return (
		<Page presenter = {presenter} />
	);
};

export default ColdRoomStoragePage;
