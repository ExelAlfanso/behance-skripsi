# Dokumentasi Teknis Backend Tahap Awal

## Backend Overview

Backend prototipe website listing properti Airbnb-like dirancang menggunakan ElysiaJS, Bun runtime, TypeScript, Eden Treaty, data dummy lokal, dan arsitektur monorepo. Pada tahap awal, backend berperan sebagai data provider yang sama untuk dua frontend penelitian, yaitu VueJS dan Svelte.

Backend menyediakan data properti, lokasi, tipe properti, fasilitas, host, gambar properti, dan detail properti. Backend juga mendukung kebutuhan interaksi listing seperti pencarian, filter, sorting, dan pagination.

Dalam konteks penelitian skripsi, backend bukan objek utama yang dibandingkan. Objek utama penelitian adalah performa dan efisiensi sumber daya frontend framework VueJS dan Svelte. Oleh karena itu, backend diposisikan sebagai variabel kontrol agar kedua frontend menggunakan kondisi akses data yang sama.

Backend harus memastikan kedua frontend memperoleh:

- Dataset yang sama.
- Endpoint yang sama.
- Response shape yang sama.
- Filtering logic yang sama.
- Sorting logic yang sama.
- Pagination logic yang sama.

Dengan pendekatan ini, perbedaan hasil pengukuran diharapkan lebih merepresentasikan karakteristik frontend framework, bukan variasi dari sumber data atau perilaku backend.

## Scope Backend

### In Scope

Backend tahap awal mencakup:

- Data properti.
- Data detail properti.
- Data lokasi.
- Data tipe properti.
- Data fasilitas.
- Data host.
- Search properti berdasarkan keyword atau lokasi.
- Filter properti berdasarkan lokasi.
- Filter properti berdasarkan tipe properti.
- Filter properti berdasarkan harga minimum.
- Filter properti berdasarkan harga maksimum.
- Filter properti berdasarkan jumlah tamu.
- Filter properti berdasarkan jumlah kamar tidur.
- Filter properti berdasarkan jumlah tempat tidur.
- Filter properti berdasarkan jumlah kamar mandi.
- Filter properti berdasarkan fasilitas.
- Sorting berdasarkan rekomendasi.
- Sorting berdasarkan harga termurah.
- Sorting berdasarkan harga termahal.
- Sorting berdasarkan rating tertinggi.
- Pagination.
- Response format yang konsisten.
- Error response yang konsisten.
- API contract untuk digunakan oleh Eden Treaty.

### Out of Scope

Backend tahap awal tidak mencakup:

- Authentication.
- Authorization.
- Payment.
- Real booking transaction.
- Chat.
- Host dashboard.
- Admin dashboard.
- Review submission.
- Real-time availability calendar.
- Real map integration.
- Recommendation algorithm kompleks.
- Database production.
- Email notification.

## Prinsip Pengembangan Tahap Awal

Backend pada tahap ini harus diperlakukan sebagai blueprint implementasi. Fokus utamanya adalah mendefinisikan struktur data, kontrak API, perilaku query, dan keputusan arsitektur sebelum kode backend dikembangkan lebih lanjut.

Implementasi backend pada tahap berikutnya sebaiknya mengikuti dokumen ini agar kontrak antara backend, frontend VueJS, dan frontend Svelte tetap stabil selama proses eksperimen penelitian.