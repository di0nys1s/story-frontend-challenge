<template>
  <div class="c-autocomplete" v-if="searchItem">
    <input
      v-focus
      ref="autocompleteInput"
      id="City search"
      :class="
        searchFilter.length > 2 && filteredList?.length
          ? 'c-autocomplete__input c-autocomplete-input--has-list'
          : 'c-autocomplete__input'
      "
      v-model="searchFilter"
      type="text"
      placeholder="Search..."
    />

    <span
      class="c-autocomplete__list-item"
      v-if="searchFilter.length >= 3 && !filteredList?.length"
      >There is no results</span
    >

    <span
      class="c-autocomplete__list-item"
      v-if="searchFilter && searchFilter.length < 3"
    >
      You need to enter at least 3 characters
    </span>
  </div>

  <div role="list" v-if="searchFilter.length >= 3" class="c-autocomplete__list">
    <button
      role="listitem"
      class="c-autocomplete__list-item"
      v-for="item in filteredList"
      :key="item.value"
    >
      {{ item.name }}
    </button>
  </div>

  <div
    v-if="filteredList && filteredList.length > 5 && searchFilter.length >= 3"
    class="c-autocomplete__list-item-count"
  >
    {{ filteredList.length }} {{ searchItem }} results
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";

import { IAutocompleteSearchList } from "./AutocompleteSearch.interfaces";

import "./AutocompleteSearch.css";

export default defineComponent({
  data: () => ({
    searchFilter: "",
  }),
  computed: {
    filteredList() {
      if (this.searchFilter.length < 3 || !this.searchFilter) {
        return toRaw(this.autocompleteSearchList);
      }

      return toRaw(
        this.autocompleteSearchList?.filter((item: IAutocompleteSearchList) => {
          return item.value
            .trim()
            .toLowerCase()
            .startsWith(this.searchFilter.trim().toLowerCase());
        })
      );
    },
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
  name: "AutocompleteSearch",
  props: {
    autocompleteSearchList: Array as () => IAutocompleteSearchList[],
    searchItem: String,
  },
});
</script>
