<template>
    <div>
        <Navbar></Navbar>
        <Documentation></Documentation>
    </div>
</template>

<script setup>
    import config from '~/config/config.js';

    const single = useSingle();
    const nuxtApp = useNuxtApp();
    const route = useRoute()
    const nid = route.params.nid;

    const throwError = () => {
        const error = new Error();
        error.statusCode = 404;
        nuxtApp.ssrContext.error = error;
    }

    const { data } = await useFetch(`${config.baseurl}/api/getnote`, {
        method: 'POST',
        body: {
            nid: nid,
        }
    });

    if (data.value.code == '404') {
        throwError();
    }
    else if (data.value.code == '200') {
        single.value = {
            nid: data.value.nid,
            name: data.value.name,
            content: data.value.content,
            players: data.value.players,
        }
    }
</script>