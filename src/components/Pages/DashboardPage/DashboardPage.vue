<template>
  <div class="c-dashboard-page">
    <header class="c-dashboard-page__header">
      <h1 class="c-dashboard-page__title">Search your category</h1>
    </header>

    <main class="c-dashboard-page__main">
      <AutocompleteSearch
        @handleListItemClick="handleListItemClick"
        @handleChangeAutocompleteSearchValue="
          handleChangeAutocompleteSearchValue
        "
        @handleSetAutocompleteSearchCategory="
          handleSetAutocompleteSearchCategory
        "
        :autocompleteSearchList="searchList"
        searchCategory="cities"
        :searchFilterCharacterCount="searchFilterCharacterCount"
      />

      <Tags :items="selectedCitiesList" />

      <AutocompleteSearch
        @handleListItemClick="handleListItemClick"
        @handleChangeAutocompleteSearchValue="
          handleChangeAutocompleteSearchValue
        "
        @handleSetAutocompleteSearchCategory="
          handleSetAutocompleteSearchCategory
        "
        :autocompleteSearchList="searchList"
        searchCategory="books"
        :searchFilterCharacterCount="searchFilterCharacterCount"
      />

      <Tags :items="selectedBooksList" />
    </main>

    <Footer
      creator="Burak Seyhan"
      creatorLink="https://github.com/di0nys1s/story-frontend-challenge"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { IBook, IListItem } from "@/interfaces";
import "./DashboardPage.css";
import AutocompleteSearch from "@/components/AutocompleteSearch/AutocompleteSearch.vue";
import Footer from "@/components/Footer/Footer.vue";
import Tags from "@/components/Tags/Tags.vue";
import _ from "lodash";

export default defineComponent({
  components: {
    AutocompleteSearch,
    Footer,
    Tags,
  },
  data: () => ({
    searchList: [] as IListItem[],
    searchItem: "",
    searchFilter: "",
    searchFilterCharacterCount: Number,
    selectedCitiesList: [],
    selectedBooksList: [],
  }),
  methods: {
    async getData(searchItem: string) {
      // http://localhost:3000
      await fetch(`${process.env.VUE_APP_DATA_PORT}/${searchItem}`)
        .then((response) => response.json())
        .then((data) => {
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleFindMatchedItemInStringArray(array: string[], value: string) {
      return array.find((item) => item === value);
    },
    handleListItemClick({ name }: IListItem) {
      switch (this.searchItem) {
        case "cities":
          if (
            this.handleFindMatchedItemInStringArray(
              toRaw(this.selectedCitiesList),
              name
            )
          ) {
            return;
          }

          this.selectedCitiesList.push(name);
          break;
        case "books":
          if (
            this.handleFindMatchedItemInStringArray(
              toRaw(this.selectedBooksList),
              name
            )
          ) {
            return;
          }

          this.selectedBooksList.push(name);
          break;
        default:
          break;
      }
    },
    handleChangeAutocompleteSearchValue(value: string) {
      this.searchFilter = value;

      if (value.length < 3) {
        return;
      }

      _.debounce(this.getData, 1000)(this.searchItem);
    },
    handleSetAutocompleteSearchCategory(category: string) {
      this.searchItem = category;
    },
  },
  name: "DashboardPage",
});
</script>
