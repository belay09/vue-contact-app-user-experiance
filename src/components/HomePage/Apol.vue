<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'


    const { error,loading,result } = useQuery(gql`
    query getUsers {
countries {
  name
  capital
  currency
  languages {
      name
    }
}
}
    `)



</script>

<template>


  <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="country of result.countries" >
  <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{{ country.name }}</div>
    <p v-for="lang of country.languages" class="text-gray-700 text-base">

      language:{{ lang.name }}
    </p>
    <p >capital:
{{ country.capital }}
      </p>

  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>
</template>