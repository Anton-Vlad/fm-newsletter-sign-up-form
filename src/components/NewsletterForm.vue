<script setup>
import { ref, reactive, computed } from 'vue';
import checkIcon from "@/assets/images/icon-list.svg";
import successIcon from "@/assets/images/icon-success.svg";
import { useFormStore } from '@/stores/form';

const form1 = useFormStore();
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const error = ref(null);
const showRequired = ref(false);

const onInput = function ($event) {
    const newVal = $event.target.value;
    if (!newVal || newVal.length === 0) {
        error.value = null;
    }
    if (emailRegex.test(newVal)) {
        error.value = null;
    } else {
        error.value = "Invalid email address";
    }
}
const displayErrors = computed(() => {
    if (showRequired.value) {
        return (form1.email && !error.value ? false : true);
    }
    return error.value ?? false;
})
const sumitForm = function () {
    let error = displayErrors;
    if (!error.value) {
        form1.submitForm();

        // console.log('Submit the form!', [form1.email, form1.sub]);
    } else {
        // console.log("Can't submit!");
    }
}
const resetForm = function () {
    form1.resetForm();
}
</script>

<template>
    <Transition name="slide-fade" mode="out-in"> <!--Very important to select mode-->
        <div v-if="!form1.sub" class="card">
            <div class="card__left">
                <div class="newsletter__content">
                    <h1>
                        Stay updated!
                    </h1>
                    <p>
                        Join 60,000+ product managers receiving monthly updates on:
                    </p>
                    <ul>
                        <li>
                            <img :src="checkIcon" alt="list-icon">
                            Product discovery and building what matters
                        </li>
                        <li>
                            <img :src="checkIcon" alt="list-icon">
                            Measuring to ensure updates are a success
                        </li>
                        <li>
                            <img :src="checkIcon" alt="list-icon">
                            And much more!
                        </li>
                    </ul>

                    <form @submit.prevent="sumitForm" class="newsletter__form">
                        <div :class="{ 'form-input': true, 'form-input--error': displayErrors }">
                            <label for="newsletter-email">
                                Email address

                                <span class="error-text">
                                    {{ (showRequired ? (form1.email && !error ? "" : "This field is required") : error) }}
                                </span>
                            </label>
                            <input id="newsletter-email" name="newsletter-email" type="text" placeholder="email@company.com"
                                v-model="form1.email" @input="onInput">
                        </div>

                        <button type="submit" class="btn btn-submit">
                            Subscribe to monthly newsletter
                        </button>
                    </form>
                </div>
            </div>
            <div class="card__right"></div>
        </div>

        <div v-else class="card card--success">
            <img :src="successIcon" alt="Form Success Icon">
            <h1>
                Thanks for subscribing!
            </h1>
            <p>
                A confirmation email has been sent to <b>{{ form1.email }}</b>. Please open it and click the button
                inside to
                confirm your subscription.
            </p>
            <button type="button" class="btn btn-submit" @click="resetForm">
                Dismiss message
            </button>
        </div>
    </Transition>
</template>