import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../firebase/firebase";

const authService = {

  async loginWithGoogle() {

    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    return result.user;
  },

  async logout() {

    await signOut(auth);

  },

};

export default authService;