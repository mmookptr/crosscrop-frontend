import React from "react";

import Sidebar from "./sidebar/Definition/Sidebar";

import "../css/Layout.css";

const PageLayout = ({ children }) => {
	return (
		<div className="PageLayout">
			<Sidebar />
			<div className="PageContainer">{children}</div>
		</div>
	);
};

export default PageLayout;
