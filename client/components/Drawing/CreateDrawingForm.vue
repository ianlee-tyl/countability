<!-- from https://codepen.io/reiallenramos/pen/MWaEmpw -->

<template>
  <article id="app">
    <section>   
      <span class="button-3">
        Available drawing points: {{ tempPoints }}
      </span> 
    </section>
    <h3>Spend your productivity points</h3>
    <canvas
      id="myCanvas"
      width="350"
      height="350"
      @mousedown="drawDot"
    />
    <!-- <router-link to="/drawing"> -->
    <div>
      <button
        class="button-8"
        @click="submit"
      >
        Create drawing
      </button>
    </div>
  
    <!-- </router-link>  -->
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

<script lang="ts">

import router from '../../router';

export default {
  name: 'DrawingForm',
  components: 'router',
  data() {
    return {
      method: 'POST',
      height: 10, //TODO to be adjustable
      width: 10,
      tempPoints: this.$store.state.point,
      pixels: [],
      hasBody: true,
      // callback:null,
      // callback: () => {
      //   const message = 'Successfully created a post!';
      //   this.$set(this.alerts, message, 'success');
      //   // Delete this success message after 3 seconds
      //   setTimeout(() => this.$delete(this.alerts, message), 1000);
      // },
      alerts: {}, // Displays success/error messages encountered during form submission
    };
  },
  // watch:{
  //   '$route'(to, from): {
  //     if(to !== from ) {
  //       this.$forceUpdate();
  //     }
  //   }
  // }
  async mounted() {
    this.c = document.getElementById("myCanvas");
    this.context = this.c.getContext('2d');
    this.NUMBER_OF_POINTS = 10;
    this.CANVAS_SIZE = 350;
    this.BOX_SIZE = this.CANVAS_SIZE / this.NUMBER_OF_POINTS;
    this.drawGreyLines(this.c);
    this.pixels = (this.$route.params.drawingId)? (await fetch(`/api/drawings/${this.$route.params.drawingId}?author=${this.$store.state.username}`, {
       method: 'GET',
       headers: {
         'Content-type': 'application/json; charset=UTF-8',
       }}).then(async r => r.json())).pixels: [];
    this.$store.commit('refreshPoint');
    this.$store.commit('refreshDrawings'); 
    this.drawPixels();
    // }
  },
  methods: {
    // submit: function (e){
    //   this.onSubmit();
    // },
    drawPixels() {
      for (const i of this.pixels) {
        const context = this.context;
        context.save();
        const r = Math.floor(i/this.NUMBER_OF_POINTS);
        const c = i - this.NUMBER_OF_POINTS*r;
        const x = c*this.BOX_SIZE + this.BOX_SIZE/2
        const y = r*this.BOX_SIZE + this.BOX_SIZE/2
        context.lineWidth = 2;
        context.moveTo(x, y);
        // context.strokeRect(this.x-this.BOX_SIZE/2,this.y-this.BOX_SIZE/2, this.BOX_SIZE, this.BOX_SIZE);
        context.fillRect(x-this.BOX_SIZE/2+1,y-this.BOX_SIZE/2+1, this.BOX_SIZE-2, this.BOX_SIZE-2);
        context.save();
      }
    },
    async submit() {
      if (this.pixels.length != 0)
      {
      this.$store.commit('updatePoint', this.tempPoints - this.$store.state.point); //TODO
      this.$store.commit('refreshPoint');
      
      const url = `/api/drawings`;
      if (this.$route.params.drawingId){
        await fetch(url+`/${this.$route.params.drawingId}`, {
            method: 'PATCH',
            body: JSON.stringify({
              pixels: this.pixels,
              imageURL: this.c.toDataURL(), 
              height: this.height,
              width: this.width
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }})
            .then(async r => r.json());
        const e = 'Sucessfully edited your drawing!';
        this.$set(this.alerts, e, 'success');
        setTimeout(() => this.$delete(this.alerts, e), 1000);
        this.$router.push("/drawing");
      }
      else{
        if (this.method == 'POST')
        {
          await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              pixels: this.pixels,
              imageURL: this.c.toDataURL(),
              height: this.height,
              width: this.width
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }})
            .then(async r => r.json());
        }
        const e = 'Sucessfully created a drawing!';
        this.$set(this.alerts, e, 'success');
        setTimeout(() => this.$delete(this.alerts, e), 1000);
      }
      const r = await fetch('/api/drawings', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }});
      const res = await r.json();
      if (!r.ok) {
        throw new Error(res.error);
      } 
      this.$store.commit('updateDrawings', res);
      this.$store.commit('refreshDrawings'); 
      this.pixels = [];
      
      this.context.clearRect(0, 0, this.c.width, this.c.height);
      this.drawGreyLines(this.c);
      // if (this.callback)
      // {
      //   this.callback();
      // }
      // const message = 'Successfully created a post!';
      // this.$set(this.alerts, message, 'success');
      // // Delete this success message after 3 seconds
      // setTimeout(() => this.$delete(this.alerts, message), 1000);
      this.$router.push("/drawing");
    }
    else{
        const e = 'Cannot submit a drawing with no pixels colored in';
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 1000);
      }
    },
    drawGreyLines() {
      const context = this.context;
      context.fillStyle = "white";
      context.fillRect(0, 0, this.c.width, this.c.height);
      context.fillStyle = 'black';
      for (let r = 0.5; r < this.NUMBER_OF_POINTS; r++) { // draw grey lines
          for (let c = 0.5; c < this.NUMBER_OF_POINTS; c++) {
              context.save();
              context.translate(this.BOX_SIZE * c, this.BOX_SIZE * r);
              context.strokeStyle = 'grey';
              context.lineWidth = 1;
              context.strokeRect(-this.BOX_SIZE/2, -this.BOX_SIZE/2, this.BOX_SIZE, this.BOX_SIZE);
              context.restore();
          }
      }
      context.strokeRect(0, 0, this.c.width, this.c.height);
    },
    async drawDot(e) {
      // this.$store.commit('updatePoint', 30);
      this.$store.commit('refreshPoint');
      this.x = this.getCoord(e.offsetX);
      this.y = this.getCoord(e.offsetY);
      this.isDrawing = true;
      const context = this.context;
      // save original context settings before we translate and change colors
      context.save();
      
      // // get row, column
      const row = Math.round((this.y - this.BOX_SIZE/2)/this.BOX_SIZE); // 0-indexed
      const col = Math.round((this.x - this.BOX_SIZE/2)/this.BOX_SIZE); // 0-indexed
      const i = row*10 + col
      const delta = this.pixels.includes(i)? 1: -1
      
      if (this.pixels.includes(i)){
        this.tempPoints += 1;
        this.pixels.splice(this.pixels.indexOf(i), 1);
        context.fillStyle = 'white';
        // context.strokeStyle = 'grey';
        context.lineWidth = 2;
        context.moveTo(this.x, this.y);
        // context.strokeRect(this.x-this.BOX_SIZE/2,this.y-this.BOX_SIZE/2, this.BOX_SIZE, this.BOX_SIZE);
        context.fillRect(this.x-this.BOX_SIZE/2+1,this.y-this.BOX_SIZE/2+1, this.BOX_SIZE-2, this.BOX_SIZE-2);
        context.fillStyle = 'black';
      }
      else if (this.tempPoints + delta >= 0){
        this.tempPoints -= 1;
        this.pixels.push(i);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.moveTo(this.x, this.y);
        // context.strokeRect(this.x-this.BOX_SIZE/2,this.y-this.BOX_SIZE/2, this.BOX_SIZE, this.BOX_SIZE);
        context.fillRect(this.x-this.BOX_SIZE/2+1,this.y-this.BOX_SIZE/2+1, this.BOX_SIZE-2, this.BOX_SIZE-2);
      }
      else {
        e = 'Not Enough Points';
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 1000);
      }
    context.restore();
    },
    getCoord(coordinate) {
      const points = [];
      for (let i = 0.5; i < this.NUMBER_OF_POINTS; i++) {
          points.push(this.BOX_SIZE * i);
      }
      // https://stackoverflow.com/questions/8584902/get-the-closest-number-out-of-an-array
      const coord = points.reduce(function(prev, curr) {
          return (Math.abs(curr - coordinate) < Math.abs(prev - coordinate) ? curr : prev);
      });
      return coord;
  }
  }
};
</script>


<style scoped>
  #myCanvas {
  border: 1px solid grey;
}
  /* .alerts {
    
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
    
  } */

/* CSS from: https://getcssscan.com/css-buttons-examples */
/* CSS */
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
  text-align: left;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}
/* CSS from: https://getcssscan.com/css-buttons-examples*/
.button-8 {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.15385;
  outline: none;
  padding: 10px .8em;
  margin-top: 15px;
  position: relative;
  text-align: center;
}

.button-8:hover {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.button-8:focus {
  box-shadow: rgba(0, 0, 0, .3) 2px 8px 4px -6px;
}

</style>

