import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React from "react";
import {
	AuthProvider,
	DatabaseProvider,
	FirestoreProvider,
	StorageProvider,
	useFirebaseApp,
} from "reactfire";
import { General } from "./General";

const App = () => {
	const APP = useFirebaseApp();
	const AuthInstance = getAuth(APP);
	const FirestoreInstance = getFirestore(APP);
	const DatabaseInstance = getDatabase(APP);
	const StorageInstance = getStorage(APP);
	return (
		<AuthProvider sdk={AuthInstance}>
			<FirestoreProvider sdk={FirestoreInstance}>
				<DatabaseProvider sdk={DatabaseInstance}>
					<StorageProvider sdk={StorageInstance}>
						<General />
					</StorageProvider>
				</DatabaseProvider>
			</FirestoreProvider>
		</AuthProvider>
	);
};

export default App;
