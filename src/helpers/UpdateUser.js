import { updateDoc } from "firebase/firestore";
import { UserMap } from "./CreateUser";

export const UpdateUser = async (user, UserDoc) => {
	return updateDoc(UserDoc, UserMap(user));
};
