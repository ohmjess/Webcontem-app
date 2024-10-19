<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";

    interface Prefix {
        id: number;
        name: string;
    }

    let isLoading = false;
    let data = [] as Prefix[];
    let id = -1;
    let name = '';

    $: {
        name = name.trim();
    }

    function clearData() {
        id = -1;
        name = '';
    }

    async function getData() {
        isLoading = true;
        try {
            const response = await axios.get('http://10.80.6.165:3000/prefixes');
            data = response.data.data;
        } catch (error) {
            console.error(error);
        }
        isLoading = false;
    }

    onMount(getData);

    async function insertData() {
        isLoading = true;
        try {
            const response = await axios.post('http://10.80.6.165:3000/prefix', 
            { 
                name: name 
            });

            data = [...data, response.data.data];
        } catch (error) {
            console.error(error);
        }
        isLoading = false;
    }

    async function updateData() {
        isLoading = true;
        try {
            await axios.put('http://10.80.6.165:3000/prefix',
            {
                id: id,
                name: name
            });

            data = data.map(item => {
                if (item.id === id) {
                    return {
                        id: id,
                        name: name
                    };
                }
                return item;
            });

            clearData();
        } catch (error) {
            console.error(error);
        }
        isLoading = false;
    }

    function putData(putId: number) {
        id = putId;
        const item = data.find(item => item.id === id);
        if (item) {
            name = item.name;
        }
    }

    async function deleteData(id: number) {
        isLoading = true;
        try {
            await axios.delete('http://10.80.6.165:3000/prefix',
            {
                data: {
                    id: id
                }
            });
        } catch (error) {
            console.error(error);
        }
        isLoading = false;
    }
</script>

<main>
    <h1>Prefixes</h1>
    <input class="form-control mb-2" bind:value={name} type="text" />
    {#if id != -1}
        <button class="btn btn-secondary" on:click={()=>clearData()}>Cancel</button>
        <button class="btn btn-primary ms-2" on:click={()=>updateData()}>Edit prefix</button>
    {:else}
        <button class="btn btn-primary" on:click={()=>insertData()}>Insert prefix</button>
    {/if}
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Tools</th>
            </tr>
        </thead>
        {#if isLoading}
        <tbody>
            <tr>
                <td colSpan="3" class="text-center">Loading...</td>
            </tr>
        </tbody>
        {:else}
        <tbody>
            {#each data as item, index}
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                        <button class="btn btn-warning" on:click={()=>putData(item.id)}>Edit</button>
                        <button class="btn btn-danger ms-2" on:click={()=>deleteData(item.id)}>Delete</button>
                    </td>
                </tr>
            {/each}
        </tbody>
        {/if}
    </table>
</main>