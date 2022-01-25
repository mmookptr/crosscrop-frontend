import { React } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/Layout";

const CrossingBlockPage = () => {
	const { id } = useParams();

	return (
		<PageLayout>
			<h1>{id}</h1>
		</PageLayout>
	);
};

export default CrossingBlockPage;
