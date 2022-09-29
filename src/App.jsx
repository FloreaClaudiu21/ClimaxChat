import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import React from "react";
import {
	AuthProvider,
	DatabaseProvider,
	FirestoreProvider,
	useFirebaseApp,
} from "reactfire";
import { General } from "./General";

const App = () => {
	const APP = useFirebaseApp();
	const AuthInstance = getAuth(APP);
	const FirestoreInstance = getFirestore(APP);
	const DatabaseInstance = getDatabase(APP);
	return (
		<AuthProvider sdk={AuthInstance}>
			<FirestoreProvider sdk={FirestoreInstance}>
				<DatabaseProvider sdk={DatabaseInstance}>
					<General />
				</DatabaseProvider>
			</FirestoreProvider>
		</AuthProvider>
	);
};

export default App;
