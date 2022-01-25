import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar/Definition/Sidebar";
import ColdRoomStoragePage from "./pages/ColdRoomStoragePage";
import BreedingNurseryPage from "./pages/BreedingNurseryPage";
import CrossingBlockPage from "./pages/CrossingBlockPage";
import YieldTrialPage from "./pages/YieldTrialPage";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Sidebar />} />
				<Route path="/cold-room-storage" element={<ColdRoomStoragePage />} />
				<Route path="/breeding-nursery/:id" element={<BreedingNurseryPage />} />
				<Route path="/crossing-block/:id" element={<CrossingBlockPage />} />
				<Route path="/yield-trial/:id" element={<YieldTrialPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
