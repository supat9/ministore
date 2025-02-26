<template>
    <div class="q-pa-md" style="max-width: 400px;">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <q-input v-model="product_id" type="number" label="Product ID" disable />
            <q-input v-model="name" label="Name" />
            <q-input v-model="description" label="Description" />
            <q-input v-model="price" type="number" label="Price" />
            <q-input v-model="category" label="Category" />
            <q-input v-model="image_url" label="Image URL" />
            <q-btn type="submit" label="Update" color="primary" />
        </q-form>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const product_id = ref("");
const name = ref("");
const description = ref("");
const price = ref("");
const category = ref("");
const image_url = ref("");

const fetchData = async () => {
    try {
        const response = await fetch(`http://localhost:8800/api/v1/products/${route.params.id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product data");
        }
        const result = await response.json();
        
        if (result) {
            product_id.value = result.product_id;
            name.value = result.name;
            description.value = result.description;
            price.value = result.price;
            category.value = result.category;
            image_url.value = result.image_url;
        } else {
            alert("Product not found!");
            router.push("/");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        alert("Error fetching product data");
    }
};

onMounted(fetchData);

const onSubmit = async () => {
    try {
        const payload = {
            name: name.value.trim(),
            description: description.value.trim(),
            price: price.value ? parseFloat(price.value) : undefined,
            category: category.value.trim(),
            image_url: image_url.value.trim(),
        };

        const response = await fetch(`http://localhost:8800/api/v1/products/${product_id.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to update product");
        }

        const result = await response.json();
        alert(`Product ${product_id.value} updated successfully!`);
        router.push("/");
    } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product");
    }
};
</script>
