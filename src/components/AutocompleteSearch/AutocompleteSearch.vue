<template>
  <div class="c-autocomplete">
    <label class="c-autocomplete__label" :for="searchCategory">
      {{ capitaliseFirstLetter(searchCategory) }}
    </label>
    <input
      autofocus
      @input="handleChangeAutocompleteInput"
      @blur="handleCloseAutocompleteList"
      @focus="handleFocusAutocompleteInput"
      @keyup="handleKeyUpAutocompleteInput"
      :name="searchCategory"
      ref="autocompleteInput"
      :id="searchCategory"
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
      message="There is no results"
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

    <ListItems
      additionalClass="c-autocomplete__list"
      v-if="searchFilter.length >= searchCharacterLimit"
      :items="filteredList"
      @handleListItemClick="handleListItemClick"
    />

    <MessageBox
      v-if="
        filteredList &&
        filteredList.length > 5 &&
        searchFilter.length >= searchFilterCharacterCount
      "
      :message="filteredList.length + ' ' + ' total'"
      additionalClass="c-autocomplete__list-item-count"
    />
  </div>
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
    searchList: [] as IListItem[],
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
  methods: {
    capitaliseFirstLetter(value: string) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    handleListItemClick(item: IListItem) {
      this.$emit("handleListItemClick", item);

      this.searchFilter = "";
    },
    handleChangeAutocompleteInput() {
      this.$emit("handleChangeAutocompleteSearchValue", this.searchFilter);
    },
    handleFocusAutocompleteInput(event: FocusEvent) {
      const inputName = (event.target as HTMLInputElement).name;

      this.$emit("handleSetAutocompleteSearchCategory", inputName);
    },
    handleCloseAutocompleteList() {
      this.searchFilter = "";
      this.filteredList = [];
    },
    handleKeyUpAutocompleteInput(event: KeyboardEvent) {
      console.log("Pressed", event.key);

      if (event.key !== "Escape") {
        return;
      }

      this.handleCloseAutocompleteList();
    },
  },
  name: "AutocompleteSearch",
  props: ["autocompleteSearchList", "searchCategory"],
});
</script>
