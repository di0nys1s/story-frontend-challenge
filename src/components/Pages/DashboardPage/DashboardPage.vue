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

    <div class="c-autocomplete" v-if="searchItem">
      <label class="c-autocomplete__label"
        >{{ capitalizeFirstLetter(searchItem) }} search</label
      >
      <input
        autofocus
        ref="autocompleteInput"
        id="City search"
        :class="
          searchFilter.length > 2 && filteredList.length
            ? 'c-autocomplete__input c-autocomplete-input--has-list'
            : 'c-autocomplete__input'
        "
        v-model="searchFilter"
        type="text"
        placeholder="Search..."
      />

      <span
        class="c-autocomplete__list-item"
        v-if="searchFilter.length >= 3 && !filteredList.length"
        >There is no results</span
      >

      <span
        class="c-autocomplete__list-item"
        v-if="searchFilter && searchFilter.length < 3"
      >
        You need to enter at least 3 characters
      </span>
    </div>

    <div
      role="list"
      v-if="searchItem === 'books' && searchFilter.length >= 3"
      class="c-autocomplete__list"
    >
      <button
        role="listitem"
        class="c-autocomplete__list-item"
        v-for="item in filteredList"
        :key="item.title"
      >
        {{ item.title }} - {{ item.author }}
      </button>
    </div>

    <div
      v-if="searchItem === 'cities' && searchFilter.length >= 3"
      class="c-autocomplete__list"
    >
      <button
        class="c-autocomplete__list-item"
        v-for="(item, key) in filteredList"
        :key="`${item}-${key}`"
      >
        {{ item }}
      </button>
    </div>

    <div
      v-if="filteredList.length > 5 && searchFilter.length >= 3"
      class="c-autocomplete__list-item-count"
    >
      {{ filteredList.length }} {{ searchItem }} results
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import ListItems from "../../ListItems/ListItems.vue";
// import ListItem from "../../ListItem/ListItem.vue";
import { IBook } from "@/interfaces";
import "./DashboardPage.css";
import { ref } from "vue";

export default defineComponent({
  // components: {
  //   ListItem,
  //   ListItems,
  // },
  setup() {
    const autocompleteInput = ref(null);

    const handleSelectSearchItem = () => {
      console.log("handleSelectSearchItem");
    };

    return {
      autocompleteInput,
      handleSelectSearchItem,
    };
  },
  data: () => ({
    searchList: [] as IBook[],
    searchFilter: "",
    searchItem: "",
  }),
  computed: {
    filteredList() {
      if (this.searchFilter.length < 3 || !this.searchFilter) {
        return this.searchList;
      }

      return this.searchList.filter((item: string | IBook) => {
        if (typeof item === "string") {
          return item.toLowerCase().includes(this.searchFilter.toLowerCase());
        } else {
          return item.title
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase());
        }
      });
    },
    updatedSearchFilter() {
      return this.searchFilter;
    },
  },
  methods: {
    capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async getData() {
      this.handleSelectSearchItem();

      if (!this.searchItem) {
        return;
      }

      this.searchFilter = "";

      try {
        const res = await fetch(`http://localhost:3000/${this.searchItem}`);
        const data = await res.json();
        this.searchList = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  name: "DashboardPage",
  props: {
    msg: String,
  },
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
