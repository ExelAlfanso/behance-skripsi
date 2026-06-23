# Architecture Decision Records

# ADR-001: Menggunakan ElysiaJS sebagai Backend API

## Status
Accepted

## Context
Backend perlu ringan, cepat, TypeScript-friendly, dan cocok digunakan dalam arsitektur monorepo. Backend juga harus dapat menyediakan API yang stabil bagi dua frontend penelitian, yaitu VueJS dan Svelte.

## Decision
Backend menggunakan ElysiaJS dengan Bun runtime sebagai backend API. ElysiaJS dipilih karena berorientasi pada TypeScript, memiliki performa tinggi, dan menyediakan integrasi yang baik dengan Eden Treaty.

## Consequences
Dampak positif:

- Setup ringan.
- Cocok dengan TypeScript.
- Performa tinggi.
- Terintegrasi dengan Eden Treaty.

Dampak negatif:

- Ekosistem lebih muda dibanding Express atau NestJS.
- Perlu memastikan kompatibilitas deployment.

# ADR-002: Menggunakan Eden Treaty untuk Type-Safe API Client

## Status
Accepted

## Context
Frontend VueJS dan Svelte harus mengonsumsi API yang sama dengan type safety. Karena kedua frontend digunakan untuk eksperimen perbandingan, struktur kontrak API perlu dijaga agar tidak terjadi perbedaan implementasi konsumsi data.

## Decision
Backend menggunakan Eden Treaty agar frontend mendapatkan contract API secara type-safe dari backend Elysia. Type `App` dari backend akan diekspor dan digunakan oleh frontend sebagai dasar pembuatan client API.

## Consequences
Dampak positif:

- Mengurangi mismatch antara backend dan frontend.
- Autocomplete dan inference TypeScript lebih baik.
- Tidak perlu code generation manual.

Dampak negatif:

- Coupling antara frontend dan backend lebih kuat.
- Perlu struktur monorepo yang rapi.

# ADR-003: Menggunakan Data Dummy Lokal

## Status
Accepted

## Context
Penelitian berfokus pada performa frontend, bukan pada database atau backend production. Penggunaan database eksternal dapat menambah variabel pengganggu seperti latency database, konfigurasi koneksi, indexing, dan variasi performa query.

## Decision
Backend menggunakan dataset dummy lokal berbentuk TypeScript atau JSON. Dataset ini digunakan untuk mensimulasikan data properti, lokasi, tipe properti, host, fasilitas, dan gambar properti.

## Consequences
Dampak positif:

- Mudah direplikasi.
- Tidak tergantung database eksternal.
- Query dan filter logic lebih mudah dikontrol.

Dampak negatif:

- Tidak merepresentasikan performa database nyata.
- Skalabilitas backend tidak menjadi fokus.

# ADR-004: Backend sebagai Variabel Kontrol Penelitian

## Status
Accepted

## Context
Penelitian membandingkan VueJS dan Svelte. Agar perbandingan lebih adil, backend harus menyediakan kondisi data yang konsisten bagi kedua frontend.

## Decision
Backend Elysia digunakan sebagai data provider yang sama untuk kedua frontend. Endpoint, dataset, response shape, filtering logic, sorting logic, dan pagination logic harus sama.

## Consequences
Dampak positif:

- Perbandingan frontend lebih adil.
- Dataset dan endpoint konsisten.
- Response shape seragam.

Dampak negatif:

- Performa backend tetap dapat memengaruhi hasil network.
- Perlu menjaga environment pengujian tetap sama.

# ADR-005: Menggunakan REST-like Endpoint dengan JSON Response

## Status
Accepted

## Context
Frontend membutuhkan data listing dan detail properti secara sederhana, stabil, dan mudah diukur. REST-like endpoint dengan JSON response cukup untuk kebutuhan prototipe dan lebih mudah digunakan dalam eksperimen frontend.

## Decision
Backend menggunakan endpoint REST-like dengan JSON response. Endpoint utama mencakup health check, daftar properti, detail properti, lokasi, tipe properti, dan fasilitas.

## Consequences
Dampak positif:

- Mudah dipahami.
- Mudah diuji.
- Cocok untuk fetch dari frontend Vue dan Svelte.

Dampak negatif:

- Tidak sefleksibel GraphQL.
- Beberapa response bisa mengalami overfetching jika tidak dirancang dengan baik.