<template>
    <div class="card">
        <div v-if="player" class="w-100 h-100 text-info d-flex justify-content-center align-items-center rounded p-2"
             v-bind:class="{'bg-winning': light}">
            <svg v-if="player === 1" viewBox="0 0 10 10" x="0" y="0" width="100%" class="circle">
                <circle cx="5" cy="5" r="4.25" />
            </svg>
            <svg v-else viewBox="0 0 10 10" width="90%" height="90%" class="cross">
                <line x1="0.5" y1="0.5" x2="9.5" y2="9.5" />
                <line x1="9.5" y1="0.5" x2="0.5" y2="9.5" />
            </svg>
        </div>
        <button v-else-if="gameOn && playerTurn" class="btn p-2 shadow-none border-0 rounded-0 w-100 h-100"
                v-on:click="$emit('tic-tac', index)">
            <svg v-if="playerTurn === 1" viewBox="0 0 10 10" x="0" y="0" width="100%" class="circle">
                <circle cx="5" cy="5" r="4.25" />
            </svg>
            <svg v-else viewBox="0 0 10 10" width="90%" height="90%" class="cross">
                <line x1="0.5" y1="0.5" x2="9.5" y2="9.5" />
                <line x1="9.5" y1="0.5" x2="0.5" y2="9.5" />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "card",

    props: {
        index: {
            type: Number,
            required: true,
        },

        gameOn: {
            type: Boolean,
            required: true,
        },

        player: {
            type: Number,
            required: true,
        },

        playerTurn: {
            type: Number,
            required: true,
        },

        light: {
            type: Number,
            required: true
        }
    },

    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>
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

.btn {
    opacity: 0;
    transition: opacity .5s;

    &:hover {
        opacity: .5;
    }
}

.bg-winning {
    background-color: rgba(255, 208, 121, .5);
}
</style>