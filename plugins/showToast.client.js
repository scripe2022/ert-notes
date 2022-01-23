import {defineNuxtPlugin} from '#app'
import Toast, {useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Toast, {
        transition: "Vue-Toastification__bounce",
        maxToasts: 10,
        newestOnTop: true
    });
    nuxtApp.provide('showToast', (msg, type, time = 5000) => 
        toast[type](msg, {
            position: "top-center",
            timeout: time,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        })
    );
})