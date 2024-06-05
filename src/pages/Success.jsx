import { Link } from "react-router-dom";

const Success = () => {
	return (
		<div
			style={{
				textAlign: "center",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<div style={{ fontSize: "2rem" }}>
				Your feedback has been successfully recorded.
				<Link
					to="/"
					style={{
						fontSize: "inherit",
					}}
				>
					Click here
				</Link>
			</div>
		</div>
	);
};

export default Success;
