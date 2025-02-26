<template>
  <div class="q-pa-md">
    <div class="q-py-md">
      <q-btn icon="add" @click="onCreate" />
    </div>
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="product_id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat dense round icon="edit" @click="onEdit(props.row.product_id)" />
          <q-btn flat dense round icon="delete" @click="onDelete(props.row.product_id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import router from '../router'

const columns = [
  { name: 'product_id', align: 'center', label: 'product_id', field: 'product_id', sortable: true },
  { name: 'name', align: 'center', label: 'name', field: 'name', sortable: true },
  { name: 'price', align: 'center', label: 'price', field: 'price', sortable: true },
  { name: 'description', align: 'center', label: 'description', field: 'description', sortable: true },
  { name: 'image_url', align: 'center', label: 'image_url', field: 'image_url', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions', sortable: false }
]

const rows = ref([])

const fetchData = async () => {
  fetch('http://localhost:8800/api/v1/products')
    .then(res => res.json())
    .then(result => {
      rows.value = result
    })
}
fetchData()

const onCreate = () => {
  router.push('/createProduct')
}

const onEdit = (id) => {
  router.push("updateProduct/" + id)
  alert('Edit ' + id)
}

const onDelete = (id) => {
  const raw = JSON.stringify({});
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:8800/api/v1/products/" + id, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      if (result.status === "ok") {
        fetchData();
      }
    })
    .catch((error) => console.error(error));
}


</script >
