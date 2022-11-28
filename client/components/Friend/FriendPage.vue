<!-- Default page that also displays posts -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2 class="box">
          Find friends!
        </h2>
      </header>
      <CreateFriendForm />
    </section>
    <section v-else>
      <header>
        <h2 class="box">
          Welcome to countAbility!
        </h2>
      </header>
      <article>
        <h3>
          <router-link
            to="/login"
            class="button-55"
          >
            Sign in
          </router-link>
          to add or remove friend.
        </h3>
      </article>
    </section>
    <section>
      <article>
        <h2 class="box">
          Users you friend
        </h2>
      </article>
      <section
        v-if="$store.state.friends.length"
      >
        <FriendComponent
          v-for="friend in $store.state.friends"
          :key="friend.id"
          :friend="friend"
        />
      </section>
      <article
        v-else
      >
        <h3>No friend found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
// Components
import FriendComponent from '@/components/Friend/FriendComponent.vue';
import CreateFriendForm from '@/components/Friend/CreateFriendForm.vue';

export default {
  name: 'FriendPage',
  components: {FriendComponent, CreateFriendForm},
  mounted() {
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

.button-55 {
  align-self: center;
  background-color: #fff;
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
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1.5rem;
  line-height: 23px;
  outline: none;
  padding: .75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-55:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-55:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}
</style>