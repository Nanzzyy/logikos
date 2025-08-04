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
    }
}

function keDesimalTertentu(nilai, desimal) {
    let rasio = nilai / desimal;
    let strRasio = rasio.toString();
    let bagianBulat = " ";
    let bagiandesimal = 0;
    if (strRasio.includes(".")) {
        let bagian = strRasio.split(".");
        bagianBulat = bagian[0]; // bagian depan titik
        bagiandesimal = Number("0." + bagian[1]); // bagian setelah titik
    } else {
        bagianBulat = strRasio; // sudah bulat
        bagiandesimal = 0;
    }
    if (bagiandesimal >= 0.5) {
        return (Number(bagianBulat) + 1) * desimal;
    } else {
        return Number(bagianBulat) * desimal;
    }
}

// Fungsi pembulatan ke angka penting (contoh sederhana)
function keAngkaPenting(nilai, angkaPenting) {
    if (nilai === 0) return 0;
    const digit = Math.floor(Math.log10(Math.abs(nilai))) + 1;
    const factor = Math.pow(10, angkaPenting - digit);
    return Math.round(nilai * factor) / factor;
}

// Fungsi untuk menghitung ukuran terkecil
function hitungUkuranTerkecil(angka){
    const angkaStr = angka.toString();
    if (angkaStr.includes('.')) {
        const jumlahDesimal = angkaStr.split('.')[1].length;
        let pangkat10 = 1;
        for (let i = 0; i < jumlahDesimal; i++) {
            pangkat10 *= 10;
        }
        return 1 / pangkat10;
    } else {
        return 1;
    }
}

// Fungsi untuk menghitung kesalahan dari nilai yang diberikan
function hitungKesalahanDariNilai(nilai) {
    const ukuranTerkecil = hitungUkuranTerkecil(nilai);
    const salahMutlak = 0.5 * ukuranTerkecil;
    const salahRelatif = salahMutlak / nilai;
    const persenKesalahan = salahRelatif * 100;
    const batasAtas = nilai + salahMutlak;
    const batasBawah = nilai - salahMutlak;

    return {
        nilai,
        salahMutlak,
        salahRelatif,
        persenKesalahan,
        batasAtas,
        batasBawah,
    };
}

function hitungJumlahDesimal(nilai){
    const nilaiStr = nilai.toString();
    if (nilaiStr.includes('.')) {
        return nilaiStr.split('.')[1].length;
    }
    return 0;
}

function desimalMaks5(nilai) {
    const desimal = hitungJumlahDesimal(nilai);
    return desimal > 5 ? 5 : desimal;
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
        <h4>Hasil Pengukuran 1:</h4>
        <p>Angka: ${hasil1.nilai}</p>
        <p>Salah Mutlak: ${hasil1.salahMutlak.toFixed(desimalMaks5(hasil1.salahMutlak))}</p>
        <p>Salah Relatif: ${hasil1.salahRelatif.toFixed(desimalMaks5(hasil1.salahRelatif))}</p>
        <p>Persentase Kesalahan: ${hasil1.persenKesalahan.toFixed(desimalMaks5(hasil1.persenKesalahan))}%</p>
        <p>Batas Atas: ${hasil1.batasAtas.toFixed(desimalMaks5(hasil1.batasAtas))}</p>
        <p>Batas Bawah: ${hasil1.batasBawah.toFixed(desimalMaks5(hasil1.batasBawah))}</p>
        <br>`;
    }

    if (hasil2) {
        hasilHTML += `
        <h4>Hasil Pengukuran 1:</h4>
        <p>Angka: ${hasil2.nilai}</p>
        <p>Salah Mutlak: ${hasil1.salahMutlak.toFixed(desimalMaks5(hasil2.salahMutlak))}</p>
        <p>Salah Relatif: ${hasil1.salahRelatif.toFixed(desimalMaks5(hasil2.salahRelatif))}</p>
        <p>Persentase Kesalahan: ${hasil1.persenKesalahan.toFixed(desimalMaks5(hasil2.persenKesalahan))}%</p>
        <p>Batas Atas: ${hasil1.batasAtas.toFixed(desimalMaks5(hasil2.batasAtas))}</p>
        <p>Batas Bawah: ${hasil1.batasBawah.toFixed(desimalMaks5(hasil2.batasBawah))}</p>
        <br>`;
    }

    if (hasil1 && hasil2) {
        const hasilKaliMaks = hasil1.batasAtas * hasil2.batasAtas;
        const hasilKaliMin = hasil1.batasBawah * hasil2.batasBawah;

        const hasilBagiMaks = hasil1.batasAtas / hasil2.batasAtas;
        const hasilBagiMin = hasil1.batasBawah / hasil2.batasBawah;

        const hasilTambahMaks = hasil1.batasAtas + hasil2.batasAtas;
        const hasilTambahMin = hasil1.batasBawah + hasil2.batasBawah;

        const hasilKurangMaks = hasil1.batasAtas - hasil2.batasAtas;
        const hasilKurangMin = hasil1.batasBawah - hasil2.batasBawah;

        hasilHTML += `
        <h4>Hasil Operasi:</h4>
        <p>Hasil Kali Maksimal: ${hasilKaliMaks.toFixed(desimalMaks5(hasilKaliMaks))}</p>
        <p>Hasil Kali Minimal: ${hasilKaliMin.toFixed(desimalMaks5(hasilKaliMin))}</p>
        <p>Hasil Bagi Maksimal: ${hasilBagiMaks.toFixed(desimalMaks5(hasilBagiMaks))}</p>
        <p>Hasil Bagi Minimal: ${hasilBagiMin.toFixed(desimalMaks5(hasilBagiMin))}</p>
        <p>Hasil Tambah Maksimal: ${hasilTambahMaks.toFixed(desimalMaks5(hasilTambahMaks))}</p>
        <p>Hasil Tambah Minimal: ${hasilTambahMin.toFixed(desimalMaks5(hasilTambahMin))}</p>
        <p>Hasil Kurang Maksimal: ${hasilKurangMaks.toFixed(desimalMaks5(hasilKurangMaks))}</p>
        <p>Hasil Kurang Minimal: ${hasilKurangMin.toFixed(desimalMaks5(hasilKurangMin))}</p>
        <br>`;
    }

    const box = document.querySelector('.kesalahan-result-box');
    box.innerHTML = hasilHTML;

    document.querySelector('.kesalahan-input').value = "";
    document.querySelector('.kesalahan-input2').value = "";
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

// Tab kalkulator (tab-button dan tab-content)
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
      content.classList.toggle("active", content.getAttribute("data-tab") === target);
    });
  });
});

// Dropdown Kalkulator interaktif & navigasi tab
document.querySelectorAll('.calc-option').forEach(option => {
  option.addEventListener('click', function(e) {
    e.preventDefault();

    // Ambil nama tab dari data-tab
    const tab = this.getAttribute('data-tab');

    // Aktifkan tab-button yang sesuai
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    // Aktifkan tab-content yang sesuai
    document.querySelectorAll('.tab-content').forEach(tc => {
      tc.classList.toggle('active', tc.getAttribute('data-tab') === tab);
    });

    // Scroll ke kalkulator
    const kalkulatorSection = document.getElementById('kalkulator');
    if (kalkulatorSection) {
      kalkulatorSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Tutup dropdown
    const calcDropdown = document.querySelector('.calc-dropdown');
    if (calcDropdown) calcDropdown.classList.remove('open');
  });
});

// Dropdown Kalkulator buka/tutup
const calcDropdown = document.querySelector('.calc-dropdown');
const calcDropdownBtn = document.querySelector('.calc-dropdown-btn');

if (calcDropdown && calcDropdownBtn) {
  calcDropdownBtn.addEventListener('click', function(e) {
    e.preventDefault();
    calcDropdown.classList.toggle('open');
    e.stopPropagation();
  });

  // Tutup dropdown jika klik di luar
  document.addEventListener('click', function() {
    calcDropdown.classList.remove('open');
  });
}
// Smooth scroll untuk link footer (dan nav) yang menuju anchor di halaman
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});