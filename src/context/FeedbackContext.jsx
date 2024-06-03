import { createContext, useContext, useReducer } from "react";

const initialState = {
	name: "",
	department: "",
	level: "",
	feedBacks: [],
	email: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "feedback/name":
			return { ...state, name: action.payload };
		case "feedback/email":
			return { ...state, email: action.payload };
		case "feedback/department":
			return { ...state, department: action.payload };
		case "feedback/feedback":
			return { ...state, feedBacks: [...state.feedBacks, action.payload] };
		case "feedback/level":
			return { ...state, level: action.payload };
		default:
			throw new Error(`No action for the specified action type ${action.type}`);
	}
};
const Feedback = createContext();

const FeedbackProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Feedback.Provider value={[state, dispatch]}>{children}</Feedback.Provider>
	);
};

const useFeedBack = () => {
	const context = useContext(Feedback);

	const [state, dispatch] = context;
	return { state, dispatch };
};

export default FeedbackProvider;

export { useFeedBack };
