import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useAuth } from "reactfire";

export const format_error_msg = (emsg) => {
	return emsg.replace("Firebase:", "").replace("/", "");
};

const SignInWithGoogle = (openInfo) => {
	const AuthInstance = useAuth();
	const signGoogle = () => {
		signInWithPopup(AuthInstance, new GoogleAuthProvider()).catch(
			({ message }) => {
				openInfo(format_error_msg(message), "error");
			}
		);
		return;
	};
	return { signGoogle };
};

const SignInWithFacebook = (openInfo) => {
	const AuthInstance = useAuth();
	const signFB = () => {
		signInWithPopup(AuthInstance, new FacebookAuthProvider()).catch(
			({ message }) => {
				openInfo(format_error_msg(message), "error");
			}
		);
		return;
	};
	return { signFB };
};

export { SignInWithFacebook, SignInWithGoogle };
