<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          MiniStore
        </q-toolbar-title>


        <q-tabs align="left">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/create" label="Create" />
          <q-route-tab to="/about" label="Product" />
          <q-route-tab to="/createProduct" label="Create Product" />
        </q-tabs>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>