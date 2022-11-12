<template>
  <div class="c-autocomplete">
    <label class="c-autocomplete__label" :for="searchCategory">
      {{ capitaliseFirstLetter(searchCategory) }}
    </label>
    <input
      autofocus
      @input="handleChangeAutocompleteInput"
      @focus="handleFocusAutocompleteInput"
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

    <ListItems
      additionalClass="c-autocomplete__list"
      v-if="
        searchFilter.length >= searchCharacterLimit &&
        autocompleteSearchList.length
      "
      :items="filteredList"
      @handleListItemClick="handleListItemClick"
    />

    <MessageBox
      v-if="filteredList && filteredList.length > 5 && searchFilter.length >= 3"
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
  },
  name: "AutocompleteSearch",
  props: ["autocompleteSearchList", "searchCategory"],
});
</script>
