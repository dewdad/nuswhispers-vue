<template>
  <div :class="$style.container">
    <div :class="$style.heart" />
  </div>
</template>

<style module>
.container {
  margin: 2rem 1rem;
  text-align: center;
}

.heart {
  animation: heart-animate 2s ease-in-out infinite;
  box-sizing: border-box;
  display: inline-block;
  height: 48px;
  position: relative;
  width: 48px;
}

.heart:before {
  background-color: #eb68a1;
  border-radius: 12px 12px 0 0;
  box-sizing: border-box;
  content: " ";
  display: inline-block;
  height: 35px;
  left: 8px;
  position: absolute;
  top: 0;
  transform: rotate(-45deg);
  width: 24px;
}

.heart:after {
  background-color: #eb68a1;
  border-radius: 12px 12px 0 0;
  box-sizing: border-box;
  content: " ";
  display: inline-block;
  height: 35px;
  position: absolute;
  right: 8px;
  top: 0;
  transform: rotate(45deg);
  width: 24px;
}

@keyframes heart-animate {
  0% {
    transform: scale(.9);
    transform-origin: center;
  }
  15% {
    transform: scale(1.4);
    transform-origin: center;
  }
  30% {
    transform: scale(.9);
    transform-origin: center;
  }
  45% {
    transform: scale(1.4);
    transform-origin: center;
  }
  100%, 60% {
    transform: scale(.9);
    transform-origin: center;
  }
}
</style>
