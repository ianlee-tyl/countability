<!-- Default page that also displays sessions -->
<template>
  <main>
    <section v-if="$store.state.username">
      <header class="position">
        <h2 class="box">
          My profile @{{ $store.state.username }}
        </h2>
      </header>
    </section>
    <section v-else>
      <header>
        <h2 class="box">
          Welcome to Countability!
        </h2>
      </header>
      <article>
        <h3>
          <router-link
            class="uniform-button"
            to="/login"
          >
            Sign in
          </router-link>
          to create, edit, and delete your own unique profile.
        </h3>
      </article>
    </section>

    <section v-if="$store.state.username">
      <header class="position">
        <div>
          <img
            src="../../public/luffy2.png"
            height="300"
            width="300"
          >
        </div>
      </header>
      <div class="position">
        <h2 class="button-3">
          {{ $store.state.friends.length }} Friends 
        </h2>
        <h2 class="button-3">
          {{ $store.state.point }} Points 
        </h2>
      </div>
      <header class="position">
        <div>
          <tabs>
            <tab title="Work sessions">
              <section
                v-if="$store.state.posts.length && $store.state.username"
              >
                <PostComponent
                  v-for="post in $store.state.posts"
                  v-if="$store.state.username === post.author"
                  :key="post.id"
                  :post="post"
                />
              </section>
              <article
                v-else
              >
                <h3 class="center">
                  No posts found.
                </h3>
              </article>
            </tab>
            <tab title="Drawings">
              <section
                v-if="$store.state.userDrawings.length && $store.state.username"
              >
                <DrawingComponent
                  v-for="drawing in $store.state.userDrawings"
                  :key="drawing.id"
                  :drawing="drawing"
                />
              </section>
              <article
                v-else
              >
                <h3 class="center">
                  No drawings found.
                </h3>
              </article>
            </tab>
            <tab title="Friends">
              <FriendPage />
            </tab>
            <tab title="Account Management">
              <div class="shiftPage">
                <AccountPage />
              </div>
            </tab>
          </tabs>
        </div>
      </header>
    </section>
  </main>
</template>

<script>
// Components

import PostComponent from '@/components/Post/PostComponent.vue';
import FriendPage from '@/components/Friend/FriendPage.vue';
import AccountPage from '@/components/Account/AccountPage.vue';
import DrawingComponent from '@/components/Drawing/DrawingComponent.vue';
import Tab from './ProfileTab.vue'
import Tabs from './ProfileTabs.vue'
export default {

  name: 'PostPage',
  components: {PostComponent, Tab, Tabs, FriendPage, AccountPage, DrawingComponent},
  mounted() {
    
    this.$store.commit('refreshUserDrawings');
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
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

img {
  border: 3px solid #555;
  border-radius: 50%;
}

.shiftPage {
  margin-left: 50px;
}
.position {
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
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
.button-3 {
  margin-top: 10px;
  appearance: none;
  background-color: #2ea44f;
  border: 2px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  display: inline-block;
  font-size: 20px;
  font-weight: 200;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  margin-right: 5px;
}
</style>
