<template>
  <div class="position-relative p-4 d-flex flex-column justify-content-between flex-md-row align-items-center home">
      <div v-if="welcomeScreen" class="position-absolute d-flex flex-column justify-content-center align-items-center admin">
          <h1 class="font-weight-bold mb-4">Welcome Players!</h1>
          <div class="d-flex justify-content-center align-items-center flex-wrap">
              <button class="btn btn-info btn-lg px-4 pb-3 mb-4" v-on:click="startGame">
                  <span class="display-4 font-weight-bold">Start</span>
              </button>
          </div>
      </div>
      <div class="w-100 text-center p-4">
          <h1 v-if="winner && winner !== 2" class="text-warning">{{ winnerTitle }}</h1>
          <h1 class="font-weight-bold" v-bind:class="{'text-primary': playerTurn === 1}">Player 1</h1>
          <svg viewBox="0 0 10 10" x="0" y="0" width="3rem" height="3rem" class="circle">
              <circle cx="5" cy="5" r="4.25" />
          </svg>
          <h3>Scores: {{ score1 }}</h3>
          <button v-if="!gameOn && !welcomeScreen" class="btn btn-info font-weight-bold"
                  v-on:click="startGame">{{ startTitle }}</button>
      </div>
      <div class="position-relative flex-shrink-0 embed-responsive embed-responsive-1by1 clickable">
          <div class="position-absolute embed-responsive-item d-flex flex-wrap">
              <div v-for="(player, index) in players" v-bind:key="index"
                   class="bg-light embed-responsive embed-responsive-1by1 cards">
                  <card v-bind:index="index"
                        v-bind:game-on="gameOn"
                        v-bind:player="player"
                        v-bind:player-turn="playerTurn"
                        v-bind:light="lights[index]"
                        v-on:tic-tac="ticTac"
                        class="embed-responsive-item"></card>
              </div>
          </div>
          <div class="position-absolute w-100 bg-primary rounded grids row-1"></div>
          <div class="position-absolute w-100 bg-primary rounded grids row-2"></div>
          <div class="position-absolute h-100 bg-primary rounded grids column-1"></div>
          <div class="position-absolute h-100 bg-primary rounded grids column-2"></div>
      </div>
      <div class="w-100 text-center p-4">
          <h1 v-if="winner && winner !== 1" class="text-warning">{{ winnerTitle }}</h1>
          <h1 class="font-weight-bold" v-bind:class="{'text-primary': playerTurn === 2}">Player 2</h1>
          <svg viewBox="0 0 10 10" width="3rem" height="2.5rem" class="cross">
              <line x1="0.5" y1="0.5" x2="9.5" y2="9.5" />
              <line x1="9.5" y1="0.5" x2="0.5" y2="9.5" />
          </svg>
          <h3>Scores: {{ score2 }}</h3>
          <button v-if="newGameBtn && !gameOn" class="btn btn-info font-weight-bold"
                  v-on:click="resetGame">New Game</button>
      </div>
  </div>
</template>

<script>
import card from "@/components/card";
import { winningPattern } from "@/util/win-pattern";

export default {
    name: 'Home',

    components: {
        card,
    },

    data() {
        return {
            lights: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            playerTurn: 0,
            score1: 0,
            score2: 0,
            welcomeScreen: true,
            gameOn: false,
            newGameBtn: false,
            startTitle: "Start",
            winner: 0,
            winnerTitle: "Winner!"
        }
    },

    methods: {
        ticTac(index) {
            this.players.splice(index, 1, this.playerTurn);
            const pattern = winningPattern(this.players, this.playerTurn, index, 3);
            const tie = !this.players.some(el => !el);

            if (pattern) {
                this.lights = pattern;
                this.winnerTitle = "Winner!";
                this.winner = this.playerTurn;
                this.playerTurn === 1 ? ++this.score1 : ++this.score2;
                this.gameOn = false;
            } else {
                if (tie) {
                    this.winnerTitle = "It's a Draw!"
                    this.winner = 3;
                    this.gameOn = false;
                } else {
                    this.playerTurn =  this.playerTurn === 1 ? 2 : 1;
                }
            }
        },

        startGame() {
            this.lights = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.players = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.gameOn = true;
            this.newGameBtn = true;
            this.startTitle = "Play Again";
            this.playerTurn = Math.random() > 0.5 ? 1 : 2;
            this.welcomeScreen = false;
            this.winner = 0;
        },

        resetGame() {
            this.playerTurn = 0;
            this.score1 = 0;
            this.score2 = 0;
            this.startGame();
        }
    }
}
</script>

<style lang="scss">
.home {
    .admin {
        top: 0;
	    left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, .9);
        z-index: 1;
    }

	.circle {
		fill: none;
		stroke: #AA42FBFF;
		stroke-width: 1px;
	}

	.cross {
		fill: none;
		stroke: #F94C0C;
		stroke-width: 1px;
		stroke-linecap: round;
	}

    .clickable {
        width: 80vh;
        max-width: 80vw;

        .cards {
            top: 0;
            width: 33.3%;
        }

        .grids {
	        padding: 4px;
	        opacity: .8;

	        &.row-1 {
		        top: calc(33.3% - 4px);
	        }

	        &.row-2 {
		        top: calc(66.65% - 4px);
	        }

	        &.column-1 {
		        top: 0;
		        left: calc(33.3% - 4px);
	        }

	        &.column-2 {
		        top: 0;
		        left: calc(66.6% - 4px);
	        }
        }
    }
}
</style>
