<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->
<template>
  <nav>
    <div class="left">
      <img src="../../public/stopwatch.png"> <!--Logo credit: https://emojiterra.com/beaver/ -->
      
      
      <router-link to="/">
        <span class="title">
          Countability
        </span>
      </router-link>
    </div>

    <div class="right">
      <router-link to="/">
        <button
          class="uniform-button"
        >
          Productivity feed
        </button>
      </router-link>
      <!-- TODO In router.ts, add session link if not there, create a SessionPage under client/WorkSession-->
      <router-link to="/session">
        <button
          class="uniform-button"
        >
          Manage work session
        </button>
      </router-link>

      <!-- TODO In router.ts, add profile link if not there, create a ProfilePage under client/Profile-->
      <router-link to="/drawing">
        <button
          class="uniform-button"
        >
          Gallery
        </button>
      </router-link><router-link to="/draw">
        <button
          class="uniform-button"
        >
          Draw
        </button>
      </router-link>
      <router-link to="/profile">
        <button
          class="uniform-button"
        >
          Profile
        </button>
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding: 0.3vw 0.1vw;

    background-image: radial-gradient(100% 100% at 100% 0, #00c8ff 0, #288352 100%);
    border: 0;
    box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

a { text-decoration: none; }
a:visited { color: #6c6a6a; }
/*
a:visited {color:#eceef6;}  Visited link   
a:hover {color:#5564b9;}    Mouse over link 
*/

.title {
    color:#ffffff;
    font-size: 40px;
    margin: 0 20px;
    font: Akshar;
    font-weight: 400;
}

img {
    height: 70px;
}

.left {
	display: flex;
	align-items: center;
  margin: 0 20px;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.alerts {
    width: 25%;
}
/* CSS 
Code reference: https://getcssscan.com/css-buttons-examples
*/

.uniform-button {
  align-self: center;
  border-style: solid;
  background-color: white;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color:#41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1.5rem;
  line-height: 23px;
  padding: .75rem;
  margin-right: 0.35rem;
}

.uniform-button:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.uniform-button:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
</style>