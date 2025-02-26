<template>
    <div class="q-gutter-md" style="max-width: 400px;">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input v-model="product_id" type="number" label="Product ID" />
            <q-input v-model="name" label="Name" />
            <q-input v-model="description" label="Description" />
            <q-input v-model="price" type="number" label="Price" />
            <q-input v-model="category" label="Category" />
            <q-input v-model="image_url" label="Image URL" />
            <q-btn type="submit" label="Submit" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const product_id = ref("");
const name = ref("");
const description = ref("");
const price = ref("");
const category = ref("");
const image_url = ref("");

const onSubmit = async () => {
    try {
        const payload = {
            name: name.value.trim(),
            description: description.value.trim(),
            category: category.value.trim(),
            image_url: image_url.value.trim(),
        };

        if (product_id.value) payload.product_id = parseInt(product_id.value, 10);
        if (price.value) payload.price = parseFloat(price.value);

        const response = await fetch("http://localhost:8800/api/v1/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Product ${result.product_id} created successfully!`);
            // รีเซ็ตค่าฟอร์ม
            product_id.value = "";
            name.value = "";
            description.value = "";
            price.value = "";
            category.value = "";
            image_url.value = "";
        } else {
            throw new Error(result.message || "Failed to create product");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Fetch error:", error);
    }
};
</script>
