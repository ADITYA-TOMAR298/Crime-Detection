import api from "./api";

const userService = {
  saveOnboarding(profile) {
    return api.post("/users/onboarding", profile);
  },
  getProfile(firebaseUid) {
    return api.get(`/users/${firebaseUid}`);
  },
};

export default userService;
