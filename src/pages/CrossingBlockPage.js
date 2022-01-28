import { React } from "react";
import { useParams } from "react-router-dom";

import PagePresenter from "../presenters/PagePresenter";
import Page from "../components/Page";

const CrossingBlockPage = () => {
	const { id } = useParams();

	const presenter = new PagePresenter("Crossing Block", id)
	return (
		<Page presenter = {presenter} />
	);
};

export default CrossingBlockPage;
