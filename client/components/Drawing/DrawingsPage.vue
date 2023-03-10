<!-- Default page that also displays drawings -->

<template>
  <main>
    <section v-if="!$store.state.username">
      <article>
        <header>
          <h2 class="box">
            Welcome to Countability!
          </h2>
        </header>
        <h3>
          <router-link
            class="uniform-button"
            to="/login"
          >
            Sign in
          </router-link>
          to create, edit, and delete drawings.
        </h3>
      </article>
    </section>
    <section v-if="$store.state.username">
      <header>
        <div class="left">
          <h2 class="box">
            🎨  Productivity art in the community
          </h2>
        </div>
      </header>
      <h3>Explore a world of productive pixel art!</h3>
      <small class="left-small">
        Edit or remove your drawings here or under your profile.
        <br>
        You will earn back productivity points from drawings you removed!
      </small>
      <section
        v-if="$store.state.drawings.length && $store.state.username"
      >
        <DrawingComponent
          v-for="drawing in $store.state.drawings"
          :key="drawing.id"
          :drawing="drawing"
        />
      </section>
      <article
        v-else
      >
        <h3>No drawings found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
// Components
import DrawingComponent from '@/components/Drawing/DrawingComponent.vue';

export default {
  name: 'DrawingPage',
  components: 
  {
    DrawingComponent,
  },
  mounted() {
    // Primitive fix
    this.$store.commit('refreshPoint');
    this.$store.commit('refreshDrawings');
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

.left-small {
  margin-top: -10px;
  margin-bottom: 10px;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

.box {
  background-color: #c2fbd7;
  border-radius: 5px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  border: 0;
  font-size: 30px;
  margin-bottom: 10px;
}

/** Cross box */
.button-89 {
  --b: 3px;   /* border thickness */
  --s: .45em; /* size of the corner */
  --color: #373B44;
  
  padding: calc(.5em + var(--s)) calc(.9em + var(--s));
  color: var(--color);
  --_p: var(--s);
  background:
    conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
    var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
  transition: .3s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: .6em;
  font-size: 16px;

  border: 0;
  background-color: rgb(199, 193, 193, 0.45)
}

.uniform-button {
  text-decoration: none;
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

.button-55 {
  align-self: center;
  background-color: rgb(199, 193, 193, 0.45);
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, .2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1.5rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
}

.info {
  text-align: center;
}
</style>

