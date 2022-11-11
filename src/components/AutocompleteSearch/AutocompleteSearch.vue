<template>
  <div class="c-autocomplete" v-if="searchItem">
    <input
      v-focus
      ref="autocompleteInput"
      id="City search"
      :class="
        searchFilter.length >= this.searchCharacterLimit && filteredList?.length
          ? 'c-autocomplete__input c-autocomplete-input--has-list'
          : 'c-autocomplete__input'
      "
      v-model="searchFilter"
      type="text"
      placeholder="Search..."
    />

    <MessageBox
      v-if="
        searchFilter.length >= this.searchCharacterLimit &&
        !filteredList?.length
      "
      message="There is no results'
      "
    />

    <MessageBox
      v-if="searchFilter && searchFilter.length < searchCharacterLimit"
      :message="
        'You need to enter at least' +
        ' ' +
        searchCharacterLimit +
        ' ' +
        ' characters'
      "
    />
  </div>

  <ListItems
    v-if="
      searchFilter.length >= searchCharacterLimit &&
      autocompleteSearchList.length
    "
    :items="filteredList"
    @handleListItemClick="handleListItemClick"
  />

  <MessageBox
    v-if="filteredList && filteredList.length > 5 && searchFilter.length >= 3"
    :message="filteredList.length + ' ' + searchItem + ' total'"
    additionalClass="c-autocomplete__list-item-count"
  />
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import ListItems from "../ListItems/ListItems.vue";
import MessageBox from "../MessageBox/MessageBox.vue";
import { IListItem } from "@/interfaces";
import { autocompleteSearchConstants } from "./AutocompleteSearch.constants";

import "./AutocompleteSearch.css";

export default defineComponent({
  components: {
    ListItems,
    MessageBox,
  },
  data: () => ({
    searchFilter: "",
    searchFilterCharacterCount:
      autocompleteSearchConstants.searchFilterCharacterLimit,
  }),
  computed: {
    filteredList() {
      if (
        this.searchFilter.length < this.searchCharacterLimit ||
        !this.searchFilter
      ) {
        return toRaw(this.autocompleteSearchList);
      }

      return toRaw(
        this.autocompleteSearchList?.filter((item: IListItem) => {
          return item.value
            .trim()
            .toLowerCase()
            .startsWith(this.searchFilter.trim().toLowerCase());
        })
      );
    },
    searchCharacterLimit() {
      return this.searchFilterCharacterCount;
    },
  },
  directives: {
    focus: {
      updated(el) {
        el.focus();
      },
    },
  },
  methods: {
    handleListItemClick(item: IListItem) {
      this.$emit("handleListItemClick", item);

      this.searchFilter = "";
    },
  },
  name: "AutocompleteSearch",
  props: ["autocompleteSearchList", "searchItem"],
});
</script>
