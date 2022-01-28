import { React } from "react";
import { useParams } from "react-router-dom";

import PagePresenter from "../presenters/PagePresenter";
import Page from "../components/Page";

const YieldTrialPage = () => {
	const { id } = useParams();

	const presenter = new PagePresenter("Yield Trial", id)
	return (
		<Page presenter = {presenter} />
	);
};

export default YieldTrialPage;
