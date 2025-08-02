// Fungsi pembulatan ke satuan terdekat
function keSatuanTerdekat(nilai) {
    let str = nilai.toString();
    let bil, des = 0;

    if (str.includes(".")) {
        let bagian = str.split(".");
        bil = bagian[0]; // bagian depan titik
        des = Number("0." + bagian[1]); // bagian setelah titik
    } else {
        return nilai; // sudah bulat
    }

    if (des >= 0.5) {
        return Number(bil) + 1;
    } else {
        return Number(bil);
    };
}
function keDesimalTertentu(nilai, desimal) {
    let rasio = nilai / desimal;
    let strRasio = rasio.toString();
    let bagianBulat = " ";
    let bagiandesimal = 0;
    if (strRasio.includes(".")) {
        letBagian = strRasio.split(".");
        bagianBulat = bagian[0]; // bagian depan titik
        bagiandesimal = Number("0." + bagian[1]); // bagian setelah titik
    } else {
        bagianBulat = strRasio; // sudah bulat
        bagianDesimal= 0;
    } 
    if (bagiandesimal >= 0.5) {
        return (Number(bagianBulat) + 1) * desimal;
    } else {
        return Number(bagianBulat) * desimal;}
    }

// Tampilkan input dinamis saat opsi berubah
document.querySelector('.calculator-select').addEventListener('change', function() {
    const opsi = this.value;
    const dynamicInput = document.querySelector('.dynamic-input');
    dynamicInput.innerHTML = '';

    if (opsi === 'Ke Desimal Tertentu') {
        dynamicInput.innerHTML = `
            <input type="number" min="0" class="calculator-input input-desimal" placeholder="Masukkan jumlah desimal" />
        `;
    } else if (opsi === 'Ke Angka Penting') {
        dynamicInput.innerHTML = `
            <input type="number" min="1" class="calculator-input input-signifikan" placeholder="Masukkan angka penting" />
        `;
    }
});

// Event listener tombol hitung
document.querySelector('.calculate-button').addEventListener('click', function() {
    const input = document.querySelector('.calculator-input').value;
    const opsi = document.querySelector('.calculator-select').value;
    let hasil = '';

    if (opsi === 'Kesatuan Terdekat') {
        hasil = keSatuanTerdekat(Number(input));
    } else if (opsi === 'Ke Desimal Tertentu') {
        const desimal = document.querySelector('.input-desimal')?.value || 0;
        hasil = Number(input).toFixed(Number(desimal));
    } else if (opsi === 'Ke Angka Penting') {
        const signifikan = document.querySelector('.input-signifikan')?.value || 1;
        hasil = keAngkaPenting(Number(input), Number(signifikan));
    }

    let resultBox = document.querySelector('.result-box');
    if (resultBox) resultBox.textContent = hasil;
});