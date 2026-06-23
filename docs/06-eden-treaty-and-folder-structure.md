# Eden Treaty Contract Plan dan Struktur Folder Backend

## Eden Treaty Contract Plan

Backend ElysiaJS harus mengekspor type `App` agar dapat digunakan oleh Eden Treaty pada frontend VueJS dan Svelte. Tujuannya adalah agar kedua frontend mendapatkan type-safe API client dari kontrak backend yang sama.

Contoh konsep backend:

```ts
export const app = new Elysia()
  .use(propertyRoutes)
  .use(locationRoutes)
  .use(amenityRoutes)

export type App = typeof app
```

Frontend VueJS dan Svelte dapat menggunakan type `App` tersebut untuk membuat client API.

Contoh konsep penggunaan di frontend:

```ts
import { treaty } from '@elysiajs/eden'
import type { App } from '@repo/api'

export const api = treaty<App>('http://localhost:3000')
```

Dokumen ini tidak mendefinisikan implementasi penuh. Potongan di atas hanya menjelaskan kontrak arsitektur yang harus dijaga saat backend mulai dikembangkan.

## Implikasi untuk Monorepo

Agar Eden Treaty dapat digunakan dengan baik, package backend perlu mengekspos type `App` melalui entry package. Dengan demikian, frontend dapat melakukan import type dari package API tanpa perlu mengakses file internal secara langsung.

Prinsip yang perlu dijaga:

- Backend menjadi sumber kebenaran kontrak API.
- Frontend hanya mengonsumsi type public dari package API.
- Struktur package harus stabil agar import antar workspace tidak mudah rusak.
- Perubahan endpoint harus dianggap sebagai perubahan kontrak yang berdampak pada dua frontend.

## Rekomendasi Struktur Folder Backend

```txt
apps/api/
├─ src/
│  ├─ index.ts
│  ├─ app.ts
│  ├─ routes/
│  │  ├─ health.route.ts
│  │  ├─ property.route.ts
│  │  ├─ location.route.ts
│  │  ├─ property-type.route.ts
│  │  └─ amenity.route.ts
│  ├─ services/
│  │  ├─ property.service.ts
│  │  ├─ location.service.ts
│  │  ├─ property-type.service.ts
│  │  └─ amenity.service.ts
│  ├─ schemas/
│  │  ├─ property.schema.ts
│  │  ├─ query.schema.ts
│  │  └─ error.schema.ts
│  ├─ data/
│  │  ├─ properties.ts
│  │  ├─ locations.ts
│  │  ├─ property-types.ts
│  │  └─ amenities.ts
│  └─ types/
│     ├─ property.type.ts
│     └─ api-response.type.ts
├─ package.json
└─ tsconfig.json
```

## Fungsi Tiap Folder

### src/index.ts

Entry point runtime Bun. File ini bertanggung jawab menjalankan server, menentukan port, dan memanggil app Elysia yang sudah didefinisikan di `app.ts`.

### src/app.ts

Tempat komposisi utama Elysia app. File ini menggabungkan route module dan mengekspor `app` serta type `App` untuk Eden Treaty.

### src/routes

Berisi definisi endpoint HTTP. Route sebaiknya hanya menangani request, validasi input, response status, dan pemanggilan service.

### src/services

Berisi business logic ringan untuk data dummy, seperti search, filter, sorting, pagination, dan mapping entity menjadi response model.

### src/schemas

Berisi schema validasi request, query parameter, response, dan error. Schema ini penting untuk menjaga kontrak API tetap eksplisit dan konsisten.

### src/data

Berisi dataset dummy lokal. Pada tahap awal, data dapat berbentuk array TypeScript atau JSON yang diimpor oleh service.

### src/types

Berisi type TypeScript yang digunakan lintas route, service, dan frontend melalui Eden Treaty.

## Catatan Implementasi Tahap Berikutnya

Implementasi backend sebaiknya dimulai dari health route, kemudian data referensi seperti locations, property-types, dan amenities. Setelah itu, implementasikan listing properties dengan query behavior yang sudah didefinisikan, lalu detail property berdasarkan ID.