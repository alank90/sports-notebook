<template>
  <div class="toggle-button-container">
    <div class="switch-button" @click="$emit('toggleClicked', checked)">
      <input class="switch-button-checkbox" type="checkbox" v-model="checked" />
      <label class="switch-button-label" for=""
        ><span class="switch-button-label-span">Conference</span></label
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checked = ref(false);
</script>

<style scoped>
.toggle-button-container {
  width: 75%;
}
.switch-button {
  background: #81a4cdd7;
  border-radius: 30px;
  overflow: hidden;
  width: 240px;
  margin: 0 auto 30px 10vw;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  color: #054a91;
  padding-right: 120px;
  position: relative;
}
.switch-button:before {
  content: "Divisional";
  position: absolute;
  font-weight: 550;
  top: 0;
  bottom: 0;
  right: 0;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  pointer-events: none;
}
.switch-button-checkbox {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
}
.switch-button-checkbox:checked + .switch-button-label:before {
  transform: translateX(180px);
  transition: transform 300ms linear;
}
.switch-button-checkbox + .switch-button-label {
  position: relative;
  padding: 15px 0;
  display: block;
  user-select: none;
  pointer-events: none;
}
.switch-button-checkbox + .switch-button-label:before {
  content: "";
  background: #fff;
  border-bottom: 1px solid #fff;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 30px;
  transform: translateX(0);
  transition: transform 300ms;
}
.switch-button-checkbox + .switch-button-label .switch-button-label-span {
  position: relative;
  font-weight: 550;
}
</style>
