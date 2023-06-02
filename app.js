const form = document.getElementById('newsletter-form')

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('newsletter-email')

        console.log('FORM SUBMIT', email.value)
    })
}