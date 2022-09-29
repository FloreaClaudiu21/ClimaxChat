import { useAuth } from "reactfire";

const SignOutUser = (openInfo) => {
	const AuthInstance = useAuth();
	const executeSignOut = () => {
		AuthInstance.signOut().then(openInfo("Successufully logged out!", "info"));
	};
	return { executeSignOut };
};

export default SignOutUser;
