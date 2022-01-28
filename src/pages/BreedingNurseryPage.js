import { React } from "react";
import { useParams } from "react-router-dom";

import PagePresenter from "../presenters/PagePresenter";
import Page from "../components/Page";

const BreedingNurseryPage = () => {
	const { id } = useParams();

	const presenter = new PagePresenter("Breeding Nursery", id)
	return (
		<Page presenter = {presenter} />
	);
};

export default BreedingNurseryPage;
