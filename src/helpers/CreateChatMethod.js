import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { format_error_msg } from "./SignInUser";
import { v4 as uuid } from "uuid";

export const CreateChatMethod = async ({
	fire,
	store,
	user,
	chatName,
	setWaiting,
	hasChatAvatar,
	uploadAvatar,
	openInfo,
	error,
	parts,
	hasError,
	execute_name,
	handle_close_modal,
}) => {
	try {
		setWaiting(true);
		execute_name();
		if (hasError) {
			setWaiting(false);
			openInfo(error, "error");
			return;
		}
		if (parts.length <= 0) {
			setWaiting(false);
			openInfo(
				"Error: You must select at least 1 participant in order to create a new group!",
				"error"
			);
			return;
		}
		let dl = "";
		let refs = "";
		// UPLOAD CHAT AVATAR
		if (hasChatAvatar) {
			const metadata = {
				contentType: "image/jpeg",
			};
			const storageRef = ref(store, "chats/" + uuid());
			let data_u = await uploadBytes(storageRef, uploadAvatar, metadata);
			let download_url = await getDownloadURL(data_u.ref);
			dl = download_url;
			refs = data_u.ref.name;
		}
		let all_parts = [];
		parts.forEach((v) => all_parts.push(v.uid));
		all_parts.push(user.uid);
		// CREATE THE CHAT
		const chat_id = uuid();
		let chat_template = {
			photo: dl,
			typing: "",
			uid: chat_id,
			name: chatName,
			photoref: refs,
			participants: all_parts,
		};
		let chat_doc = doc(fire, "chat", chat_id);
		await setDoc(chat_doc, chat_template);
		// ADD THE CHAT ID TO ALL THE PARTICIPANTS
		await Promise.all(
			all_parts.map(async (v) => {
				let user_doc = doc(fire, "chats", v);
				let chats = (await getDoc(user_doc)).data().data;
				chats.push({
					uid: chat_id,
					name: chatName,
				});
				await updateDoc(user_doc, { data: chats });
			})
		);
		// CREATE THE MESSAGES DOC
		let msg_doc = doc(fire, "messages", chat_id);
		await setDoc(msg_doc, { data: [] });
		openInfo(
			`Chat with id [${chat_id}] and name [${chatName}] have been created succesufully.`,
			"success"
		);
		handle_close_modal();
		return;
	} catch (e) {
		console.log(e)
		setWaiting(false);
		openInfo("Error: " + format_error_msg(e.message), "error");
		return;
	}
};
