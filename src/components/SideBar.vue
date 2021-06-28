<template>
  <div class="sideBar">
    <div class="logo"><img :src="Logo" alt="Logo" /></div>
    <div class="sideColm">
      <div class="bottomBar">
        <button><i class="fas fa-moon"></i></button>
        <hr />
        <div class="user"><img :src="UserAvatar" alt="User Avatar" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "../assets/image-avatar.jpg";
import Logo from "../assets/logo.svg";

export default {
  name: "Sidebar",
  data() {
    return {
      UserAvatar: UserAvatar,
      Logo: Logo,
    };
  },
};
</script>

<style scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed !important;
  left: 0;
  background: #f8f8fb;
  width: 5.5rem;
  position: relative;
  z-index: 5;
  height: 100%;
  z-index: 11;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  background: #7c5dfa;
  height: 5.5rem;
  width: 100%;
  border-radius: 0 1.2rem 1.2rem 0;
}

.logo::before {
  content: "";
  width: 100%;
  height: 50%;
  position: absolute;
  top: 3rem;
  background: #9277ff;
  border-radius: 1.3rem 0 0 0;
  z-index: 1;
}

.logo img {
  width: 45%;
  z-index: 3;
}

.sideColm {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 95%;
  background: #373b53;
  border-radius: 0 0 1.2rem 0;
}

.bottomBar hr {
  border: 0px solid white;
  border-bottom: 1px solid rgba(151, 151, 151, 0.5);
}

.bottomBar button {
  background-color: transparent;
  border: none;
  width: 100%;
  height: 3rem;
  color: #7e88c3;
  font-size: 1.2rem;
  cursor: pointer;
}

.bottomBar .user {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
}

.bottomBar .user img {
  border-radius: 50rem;
  width: 50%;
}
</style>
