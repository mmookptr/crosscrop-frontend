import { React } from "react";
import { useParams } from "react-router-dom";

import Page from "../components/Page";

const BreedingNurseryPage = () => {
	const { id } = useParams();

	return (
		<Page>
			<h1>{id}</h1>
		</Page>
	);
};

export default BreedingNurseryPage;
