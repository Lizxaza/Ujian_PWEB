# Aplikasi Manajemen Parkir Kampus

Project Ujian Praktikum Pemrograman Web (PTA 2025/2026).  
Aplikasi ini digunakan untuk mengelola data parkir kendaraan di area kampus.

## Teknologi yang Digunakan

- React (Vite)
- HTML, CSS, JavaScript
- Browser localStorage (Web Storage API)

## Fitur

- Tambah data kendaraan masuk (Create)
- Tampilkan daftar kendaraan parkir (Read)
- Edit data kendaraan (Update)
- Hapus data kendaraan (Delete)
- Pencarian berdasarkan plat nomor
- Perhitungan otomatis:
  - Durasi parkir (jam)
  - Biaya parkir:
    - Motor: Rp 2.000 / jam
    - Mobil: Rp 3.000 / jam

## Struktur Data

Setiap data kendaraan memiliki field:

- `id`
- `plate`
- `owner`
- `type` ("Motor" / "Mobil")
- `timeIn`
- `timeOut`
- `status` ("Masuk" / "Keluar")
- `duration`
- `fee`

## Cara Menjalankan

1. Clone repository ini
2. Jalankan perintah:

   ```bash
   npm install
   npm run dev
