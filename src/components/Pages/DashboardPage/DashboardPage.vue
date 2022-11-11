<template>
  <div class="c-dashboard-page">
    <h1 class="c-dashboard-page__title">Search {{ searchItem }}</h1>

    <div class="c-dashboard-page__select-container">
      <span
        aria-label="Search select"
        class="c-dashboard-page__select-label"
        :aria-hidden="searchItem ? true : false"
        :style="[
          searchItem ? { visibility: 'hidden' } : { visibility: 'visible' },
        ]"
      >
        Please select your search category</span
      >

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

    <span
      v-if="searchItem && selectedListItemValue"
      class="c-dashboard-page__selected-item"
      >{{ selectedListItemValue }} selected</span
    >

    <AutocompleteSearch
      @handleListItemClick="handleListItemClick"
      :autocompleteSearchList="searchList"
      :isSearchItemSelected="this.isSearchItemSelected"
      :searchItem="searchItem"
      :searchFilterCharacterCount="searchFilterCharacterCount"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { IBook, IListItem } from "@/interfaces";
import "./DashboardPage.css";

import AutocompleteSearch from "@/components/AutocompleteSearch/AutocompleteSearch.vue";

export default defineComponent({
  components: {
    AutocompleteSearch,
  },
  data: () => ({
    searchList: [] as IListItem[],
    searchItem: "",
    searchFilterCharacterCount: Number,
    tags: [] as string[],
    selectedListItemValue: "",
  }),
  methods: {
    capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async getData() {
      if (!this.searchItem) {
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/${this.searchItem}`);
        const data = await res.json();

        const autocompleteSearchList = data.map(
          (item: IBook, index: number) => {
            if (typeof item === "string") {
              return {
                id: String((index += 1)),
                name: item,
                value: item,
              };
            } else {
              return {
                id: String((index += 1)),
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
    handleListItemClick({ name }: IListItem) {
      this.selectedListItemValue = name;
    },
  },
  name: "DashboardPage",
});
</script>
