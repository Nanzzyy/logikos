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

// Event listener tombol hitung
document.querySelector('.calculate-button').addEventListener('click', function() {
    // Ambil nilai input dan opsi
    const input = document.querySelector('.calculator-input').value;
    const opsi = document.querySelector('.calculator-select').value;
    let hasil = '';

    // Jalankan fungsi jika opsi "Kesatuan Terdekat"
    if (opsi === 'Kesatuan Terdekat') {
        hasil = keSatuanTerdekat(Number(input));
    }

    // Tampilkan hasil ke .result-box
    let resultBox = document.querySelector('.result-box');
    if (resultBox) resultBox.textContent = hasil;
});