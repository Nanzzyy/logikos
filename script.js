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

// Event listener tombol hitung
document.querySelector('.calculate-button').addEventListener('click', function() {
    // Ambil nilai input dan opsi
    const input = document.querySelector('.calculator-input').value;
    const opsi = document.querySelector('.calculator-select').value;
    let hasil = '';

    // Jalankan fungsi jika opsi "Kesatuan Terdekat"
    if (opsi === 'Kesatuan Terdekat') {
        hasil = keSatuanTerdekat(Number(input));
    } else if (opsi === 'Ke Desimal Tertentu') {
        hasil = keDesimalTertentu(Number(input), Number(opsi));
    } 

    // Tampilkan hasil ke .result-box
    let resultBox = document.querySelector('.result-box');
    if (resultBox) resultBox.textContent = hasil;
});

// Buat kesalahan

function hitungUkuranTerkecil(angka){
    const angkaStr = angka.toString();  // ini inputan dari penggunanya di ubah dlu jadi string
    if (angkaStr.includes('.')) {  // disini diperiksa apakah ada titik desimal, kalau tidak ada berarti langsung ke return 1
        // Jika ada desimal, kita hitung jumlah digit setelah titik 
        const jumlahDesimal = angkaStr.split('.')[1].length; // memeriksa ada berapa angka setelah titik desimal   

        let pangkat10 = 1;
        for (let i = 0; i < jumlahDesimal; i++) {  // ini untuk menentukan pangkat dari 10
            pangkat10 *= 10;                       // misal desimalnya ada 2 digit, maka nilai pangkat10 = 100
        }

        return 1 / pangkat10;       // nah disini kita bagi 1 dengan nilai pangkat10 yang sudah kita dapat contohnya 1/100 = 0.01
    } else {                        
        return 1;               // jika tidak ada desimal, ukuran terkecil adalah 1
    }
}



// sudah selesai htung ukuran terkecil, sekarang kita buat fungsi untuk menghitung kesalahan dari nilai yang diberikan
function hitungKesalahanDariNilai(nilai) {
    const ukuranTerkecil = hitungUkuranTerkecil(nilai); // ini untuk dapetin hasil dari satuan terkecil yang dihitung tadi
    const salahMutlak = Math.abs(0.5 * ukuranTerkecil); // ini untuk dapetin nilai kesalahan mutlak, yaitu 0.5 * ukuran terkecil
    const salahRelatif = salahMutlak / nilai; // ini untuk dapetin nilai kesalahan relatif  
    const persenKesalahan = salahRelatif * (100 / 1); // ini untuk dapetin nilai persentase kesalahan
    const batasAtas = nilai + salahMutlak; // ini untuk dapetin nilai batas atas, yaitu nilai + kesalahan mutlak
    const batasBawah = nilai - salahMutlak; // ini untuk dapetin nilai batas bawah, yaitu nilai - kesalahan mutlak

    // terus semua hasil tadi kita kembalikan dalam bentuk objek
    // supaya bisa diakses nanti di fungsi hitungKesalahan
    return {
        nilai,
        salahMutlak,
        salahRelatif,
        persenKesalahan,
        batasAtas,
        batasBawah,
    };
}


function hitungKesalahan() {
    let nilai1 = parseFloat(document.querySelector(".kesalahan-input").value);
    let nilai2 = parseFloat(document.querySelector(".kesalahan-input2").value);

    if (isNaN(nilai1) && isNaN(nilai2)) {
        alert("Silahkan masukkan minimal 1 nilai");
        return;
    }

    const hasil1 = isNaN(nilai1) ? null : hitungKesalahanDariNilai(nilai1);
    const hasil2 = isNaN(nilai2) ? null : hitungKesalahanDariNilai(nilai2);

    let hasilHTML = "";

    if (hasil1) {
        hasilHTML += `
        <h3>Hasil Pengukuran 1:</h3>
        <p>Angka: ${hasil1.nilai}</p>
        <p>Salah Mutlak: ${hasil1.salahMutlak.toFixed(2)}</p>
        <p>Salah Relatif: ${hasil1.salahRelatif.toFixed(4)}</p>
        <p>Persentase Kesalahan: ${hasil1.persenKesalahan.toFixed(4)}%</p>
        <p>Batas Atas: ${hasil1.batasAtas.toFixed(2)}</p>
        <p>Batas Bawah: ${hasil1.batasBawah.toFixed(2)}</p>
        <br>`;
    }

    if (hasil2) {
        hasilHTML += `
        <h3>Hasil Pengukuran 2:</h3>
        <p>Angka: ${hasil2.nilai}</p>
        <p>Salah Mutlak: ${hasil2.salahMutlak.toFixed(2)}</p>
        <p>Salah Relatif: ${hasil2.salahRelatif.toFixed(4)}</p>
        <p>Persentase Kesalahan: ${hasil2.persenKesalahan.toFixed(4)}%</p>
        <p>Batas Atas: ${hasil2.batasAtas.toFixed(2)}</p>
        <p>Batas Bawah: ${hasil2.batasBawah.toFixed(2)}</p>
        <br>`;
    }

    if (hasil1 && hasil2) {
        const hasilKaliMaks = hasil1.batasAtas * hasil2.batasAtas;
        const hasilKaliMin = hasil1.batasBawah * hasil2.batasBawah;

        hasilHTML += `
        <p>Hasil Kali Maksimal: ${hasilKaliMaks.toFixed(4)}</p>
        <p>Hasil Kali Minimal: ${hasilKaliMin.toFixed(4)}</p>`;
    }

    const box = document.querySelector('.kesalahan-result-box');
    console.log("box ditemukan:", box); // pastikan ini bukan null
    box.innerHTML = hasilHTML;

    document.querySelector('.kesalahan-input').value = "";
    document.querySelector('.kesalahan-input2').value = "";
}

// buat ganti tab-content

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    // Ganti tombol aktif
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Ganti konten aktif
    tabContents.forEach((content) => {
      if (content.getAttribute("data-tab") === target) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });
  });
});