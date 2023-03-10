<template>
  <article
    v-if="$store.state.username === friend.friendRequestReceiverName"
    class="post"
  >
    <header>
      <!-- USER SEES THIS WHEN THEY SIGN IN-->
      <!-- Friend request-->
      <h2>
        Friend request from @{{ friend.friendRequestSenderName }}
      </h2>
      <div
        class="actions"
      >
        <button @click="deleteFriendRequest">
          ❌ Decline friend request
        </button>
        <button @click="addFriend">
          ✅ Accept friend request
        </button>
      </div>
    </header>
    <!-- End of Added descriptive post -->
    <p class="info">
      Request received on: {{ friend.dateCreated }}
    </p>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  name: 'FriendRequestOut',
  props: {
    // Data from the stored post
    friend: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {}
    };
  },
  methods: {
    async deleteFriendRequest() {
      /**
       * Deletes a friend request.
       */
      this.$store.commit('refreshInFriendRequest');
      const options = {
        method: 'DELETE', headers: {'Content-Type': 'application/json'}
      };
      try {
      const r = await fetch(`/api/friendRequest/${this.friend._id}`, options);
      if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        // Refresh on-screen display
        this.$store.commit('refreshInFriendRequest');
        this.$store.commit('alert', {
          message: 'Successfully removed friend request!', status: 'success'
        });
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 1000);
      }
      this.$store.commit('refreshInFriendRequest');
    },
    async addFriend() {
      /**
       * Accept the friend request received and add the request sender as friend
       * 
       * Also delete the incoming friend request as they are already friends now
       */
      this.$store.commit('refreshInFriendRequest');
      await this.deleteFriendRequest();
      const options = {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: this.friend.friendRequestSenderName})
      };
      try {
      const r = await fetch(`/api/friendship`, options);
      if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        // Refresh on-screen display
        console.log('Call refreshFriend from ADD In friendsrequest');
        this.$store.commit('refreshFriends');
        this.$store.commit('alert', {
          message: 'Successfully added new friend!', status: 'success'
        });
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 1000);
      } 
    }
}};
</script>

<style scoped>
.friend {
  background-color: #13aa52;
  border: 1px solid #13aa52;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
}

.post {
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  color: #000;
  box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px,  rgb(255, 217, 19)0px 0px 0px 12px;
  padding: 0.25em 0.5em;
  margin-bottom: 5px;
  margin-top: 15px;
  background-color: rgb(199, 193, 193, 0.35)
}
</style>
