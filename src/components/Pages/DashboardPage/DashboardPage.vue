<template>
  <div class="c-dashboard-page">
    <h1>Autocomplete</h1>

    <div class="c-dashboard-page__select-container">
      <span
        aria-label="Search select"
        class="c-dashboard-page__select-label"
        :aria-hidden="searchItem ? true : false"
        :style="[
          searchItem ? { visibility: 'hidden' } : { visibility: 'visible' },
        ]"
      >
        Please select your search item</span
      >

      <div class="c-dashboard-page__search">
        <select
          aria-labelledby="Search select"
          class="c-dashboard-page__select"
          title="Search item"
          selected="Please select"
          @change="getData"
          v-model="searchItem"
        >
          <option value="">Please select</option>
          <option value="cities">Cities</option>
          <option value="books">Books</option>
        </select>
      </div>
    </div>

    <span> {{ selectedSearchItem }} </span>

    <AutocompleteSearch
      :autocompleteSearchList="searchList"
      :search-item="searchItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
// import ListItems from "../../ListItems/ListItems.vue";
// import ListItem from "../../ListItem/ListItem.vue";
import { IBook } from "@/interfaces";
import "./DashboardPage.css";

import { IAutocompleteSearchList } from "@/components/AutocompleteSearch/AutocompleteSearch.interfaces";

import AutocompleteSearch from "@/components/AutocompleteSearch/AutocompleteSearch.vue";

export default defineComponent({
  components: {
    AutocompleteSearch,
  },
  data: () => ({
    searchList: [] as IAutocompleteSearchList[],
    searchFilter: "",
    searchItem: "",
    selectedSearchItem: "",
  }),
  methods: {
    capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async getData() {
      if (!this.searchItem) {
        return;
      }

      this.searchFilter = "";

      try {
        const res = await fetch(`http://localhost:3000/${this.searchItem}`);
        const data = await res.json();

        const autocompleteSearchList = data.map(
          (item: IBook, index: number) => {
            if (typeof item === "string") {
              return {
                id: String(index + 1),
                name: item,
                value: item,
              };
            } else {
              return {
                id: String(index + 1),
                name: `${item.title} by ${item.author}`,
                value: item.title,
              };
            }
          }
        );

        this.searchList = toRaw(autocompleteSearchList);
      } catch (error) {
        console.log(error);
      }
    },
    setListItem(item: IAutocompleteSearchList) {
      this.selectedSearchItem = `${item.name}`;
    },
  },
  name: "DashboardPage",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
