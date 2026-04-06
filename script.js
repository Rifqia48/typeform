let currentStep = 1;
const scriptURL = 'URL_WEB_APP_ANDA'; 

function nextStep(step) {
    const container = document.getElementById(`step-${step}`);
    const inputs = container.querySelectorAll('input[required]');
    
    // Cek apakah input sudah diisi (khusus radio harus ada yang terpilih)
    let valid = true;
    inputs.forEach(input => {
        if (input.type === 'radio') {
            const name = input.name;
            if (!container.querySelector(`input[name="${name}"]:checked`)) valid = false;
        } else {
            if (!input.value) valid = false;
        }
    });

    if (valid) {
        document.getElementById(`step-${step}`).classList.remove('active');
        document.getElementById(`step-${step + 1}`).classList.add('active');
    } else {
        alert("Mohon jawab dulu pertanyaannya ya!");
    }
}

const form = document.getElementById('student-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            document.getElementById('student-form').style.display = 'none';
            document.getElementById('success-msg').style.display = 'block';
        })
        .catch(error => alert('Waduh, ada error! Coba lagi ya.'));
});
