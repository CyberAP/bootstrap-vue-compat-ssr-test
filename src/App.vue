<template>
  <div>
    <div>
      <button v-if="prevName" @click="currentName = prevName">Prev</button>
      <select v-model="currentName">
        <option :value="null">None</option>
        <option
            v-for="option in Object.keys($options.componentMap)"
            :key="option"
            :selected="currentName === option"
        >
          {{ option }}
        </option>
      </select>
      <button v-if="nextName" @click="currentName = nextName">Next</button>
    </div>
    <hr />
    <div>
      <component
          class="m-2"
          :is="currentComponent"
          v-if="currentComponent"
      ></component>
    </div>
  </div>
</template>

<script>
import componentMap from './components'

const keys = Object.keys(componentMap);

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    let currentName = null;
    const params = new URLSearchParams(this.url.replace(/^\//, ''));
    const nameParam = params.get('name');
    if (nameParam !== 'null') currentName = nameParam;
    return {
      currentName,
    }
  },
  watch: {
    currentName(newName) {
      const newLocation = new URL(window.location);
      newLocation.searchParams.set('name', newName);
      window.location = newLocation;
    },
  },
  computed: {
    currentComponent() {
      if (!this.currentName) return null;
      return componentMap[this.currentName];
    },
    currentIndex() {
      return keys.indexOf(this.currentName);
    },
    nextName() {
      return keys[this.currentIndex + 1];
    },
    prevName() {
      return keys[this.currentIndex - 1];
    },
  },
  componentMap,
};
</script>
