# CSS Refactoring & Design System Cleanup

Lakukan refactoring CSS pada project ini untuk membuat styling lebih terstruktur, terdokumentasi, reusable, dan konsisten.

## Objective

Saat ini CSS tersebar di beberapa file dan banyak element memiliki class name berbeda meskipun memiliki styling atau fungsi visual yang sama.

Contoh duplicate class:

- `btn-primarry`
- `btn-property-primarry`

Keduanya memiliki style button primary yang serupa tetapi didefinisikan secara terpisah.

Custom styling juga tersebar di berbagai file, termasuk `custom.css`, tanpa klasifikasi dan standardisasi yang jelas.

Tugas kamu adalah melakukan refactoring CSS untuk mengurangi duplication dan membangun struktur styling yang mudah dipelihara.

## 1. Audit CSS Existing

Sebelum melakukan perubahan:

- Scan seluruh file CSS, SCSS, CSS Modules, dan styling yang digunakan project.
- Identifikasi duplicate atau redundant CSS declarations.
- Identifikasi class name dengan fungsi visual yang sama tetapi nama berbeda.
- Identifikasi style yang memiliki perbedaan kecil tetapi sebenarnya dapat menggunakan shared class dan modifier.
- Identifikasi custom style yang tersebar di beberapa file.
- Identifikasi class yang tidak digunakan, tetapi pastikan tidak menghapus class sebelum memverifikasi usage-nya.
- Identifikasi inline styles yang berpotensi menggunakan reusable class.

Jangan langsung melakukan perubahan sebelum memahami penggunaan CSS dan class name pada komponen terkait.

## 2. Standardisasi Class Naming

Buat konvensi class name yang konsisten dan mudah dipahami.

Gunakan pendekatan naming yang terstruktur, misalnya:

- `btn`
- `btn-primary`
- `btn-secondary`
- `btn-danger`
- `btn-icon`
- `btn-sm`
- `btn-lg`

Contoh lainnya:

- `input`
- `input-primary`
- `input-error`
- `input-disabled`

- `panel`
- `panel-header`
- `panel-body`

- `toolbar`
- `toolbar-item`
- `toolbar-group`

Hindari class name yang memiliki arti ambigu, typo, atau naming yang hanya mengacu kepada lokasi komponen, jika styling tersebut sebenarnya reusable.

Jangan memaksakan satu naming convention ke seluruh project tanpa mempertimbangkan struktur komponen existing.

## 3. Refactor Duplicate CSS

Refactor CSS yang duplicate saja dengan mengutamakan reusable styles.

Contoh existing:

```css
.btn-primarry {
    background: #084D42;
    color: white;
    border-radius: 6px;
    padding: 8px 16px;
}

.btn-property-primarry {
    background: #084D42;
    color: white;
    border-radius: 6px;
    padding: 8px 16px;
}
```

Refactor menjadi:

```css
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary {
    background: #084D42;
    color: #fff;
    padding: 8px 16px;
}
```

Lalu gunakan class yang sama pada seluruh komponen yang membutuhkan styling serupa.

Jika terdapat perbedaan behavior atau layout khusus, gunakan modifier atau variant class tanpa menduplikasi seluruh styling.

Contoh:

```css
.btn-property {
    width: 100%;
}

.btn-icon {
    width: 36px;
    height: 36px;
    padding: 0;
}

.btn-sm {
    padding: 4px 8px;
}
```

**Jangan melakukan refactoring dengan hanya memindahkan duplicate CSS ke file baru.** Tujuannya adalah benar-benar menghilangkan duplication dan membuat class reusable.

## 4. CSS Architecture & File Organization

Rapihkan struktur file CSS yang existing agar memiliki klasifikasi yang jelas.

Gunakan struktur existing project sebagai baseline. Jika memang diperlukan, reorganisasi menjadi kategori seperti:

```text
styles/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── global.css
│
├── tokens/
│   ├── colors.css
│   ├── spacing.css
│   └── variables.css
│
├── components/
│   ├── buttons.css
│   ├── inputs.css
│   ├── panels.css
│   ├── toolbar.css
│   └── dropdown.css
│
├── utilities/
│   ├── spacing.css
│   ├── layout.css
│   └── helpers.css
│
└── custom.css
```

Struktur di atas merupakan referensi, bukan keharusan untuk membuat semua file.

Pertahankan `custom.css` untuk custom styling yang memang dibutuhkan, tetapi jangan menjadikannya tempat menampung seluruh CSS yang tidak terklasifikasi.

Pindahkan custom style ke kategori yang sesuai apabila style tersebut sebenarnya merupakan shared component, utility, base style, atau design token.

Hindari membuat terlalu banyak file CSS kecil tanpa kebutuhan yang jelas.

## 5. Reusable CSS

Prioritaskan reusable styling untuk element yang sering digunakan, seperti:

- Button
- Icon button
- Input
- Select
- Checkbox
- Dropdown
- Modal
- Tooltip
- Toolbar
- Panel
- Card
- Badge
- Typography
- Flex & grid utilities
- Spacing
- Common states

Gunakan base class, variant, modifier, dan utility secara proporsional.

Contoh:

```css
/* Base */
.btn {}

/* Variants */
.btn-primary {}
.btn-secondary {}
.btn-danger {}
.btn-outline {}

/* Modifiers */
.btn-sm {}
.btn-lg {}
.btn-icon {}
.btn-full-width {}

/* States */
.btn:hover {}
.btn:disabled {}
.btn.active {}
```

Jangan membuat class untuk setiap kombinasi styling jika kombinasi tersebut bisa menggunakan class yang sudah tersedia.

## 6. CSS Documentation

Berikan dokumentasi singkat pada setiap kategori CSS dan shared component.

Contoh:

```css
/* ==================================================
   BUTTONS
   Shared button styles used throughout the application.

   Variants:
   - .btn-primary
   - .btn-secondary
   - .btn-danger

   Modifiers:
   - .btn-sm
   - .btn-lg
   - .btn-icon
   ================================================== */
```

Dokumentasi harus membantu developer memahami tujuan class, kategori, dan cara menggunakannya.

Hindari komentar yang menjelaskan hal obvious pada setiap baris CSS.

## 7. Design Tokens

Identifikasi value yang sering berulang dan jadikan CSS variables apabila memang relevan.

Contoh:

```css
:root {
    /* Colors */
    --color-primary: #084D42;
    --color-danger: #dc2626;
    --color-text: #1f2937;
    --color-border: #e5e7eb;
    --color-surface: #ffffff;

    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 10px;

    /* Spacing */
    --spacing-1: 4px;
    --spacing-2: 8px;
    --spacing-3: 12px;
    --spacing-4: 16px;

    /* Component sizing */
    --button-height: 36px;
}
```

Jangan membuat token untuk setiap value yang hanya digunakan sekali dan tidak memiliki nilai standardisasi.

Prioritaskan token yang membantu konsistensi visual dan memudahkan perubahan design system.

## 8. Compatibility & Visual Preservation

Refactoring ini harus mempertahankan tampilan dan behavior existing.

Rules:

- Jangan mengubah layout.
- Jangan mengubah warna kecuali untuk menghilangkan inconsistency yang memang duplicate dan memiliki value yang sama.
- Jangan mengubah ukuran, padding, margin, font, border, radius, atau positioning tanpa alasan yang jelas.
- Jangan mengubah logic JavaScript atau React behavior.
- Jangan menghapus class yang masih digunakan.
- Jangan melakukan refactoring component structure kecuali diperlukan untuk penggunaan CSS yang lebih baik.
- Pastikan semua selector setelah refactoring tetap berfungsi.
- Pertahankan responsive behavior.
- Pertahankan hover, focus, active, disabled, selected, dan state lainnya.

Jika terdapat style serupa tetapi value-nya berbeda karena kebutuhan layout, jangan dipaksakan menjadi satu style yang menyebabkan regression.

## 9. Implementation Strategy

Lakukan pekerjaan secara bertahap:

1. Audit CSS seluruh project.
2. Buat mapping duplicate styles dan class name.
3. Tentukan shared classes dan naming convention.
4. Tentukan kategori/file CSS yang tepat.
5. Refactor duplicate CSS.
6. Update class name pada seluruh component yang terdampak.
7. Rapihkan `custom.css`.
8. Hapus CSS duplicate yang sudah tidak diperlukan.
9. Verifikasi tidak ada broken styling atau class yang tertinggal.
10. Jalankan build/lint/test yang tersedia.

Lakukan perubahan langsung pada source code project, bukan hanya memberikan rekomendasi atau contoh.

## 10. Constraints

- Refactor hanya CSS yang duplicate atau memiliki tujuan styling yang sama.
- Jangan melakukan redesign.
- Jangan melakukan refactoring unrelated code.
- Jangan mengubah behavior aplikasi.
- Jangan menghapus style hanya karena terlihat tidak digunakan sebelum memastikan tidak ada dynamic usage.
- Jangan menambahkan dependency baru.
- Jangan membuat abstraksi berlebihan.
- Jangan membuat utility class baru jika class existing dapat digunakan kembali.
- Prioritaskan maintainability dan readability.
- Pastikan class naming konsisten dan tidak ada typo seperti `primarry`.
- Jangan membuat satu class yang memiliki terlalu banyak responsibility.

## 11. Final Report

Setelah selesai, berikan ringkasan:

1. CSS files yang diperiksa.
2. CSS files yang dibuat, digabung, atau diubah.
3. Duplicate class yang berhasil direfactor.
4. Mapping class lama ke class baru.
5. Reusable classes yang ditambahkan.
6. CSS yang dihapus.
7. Potensi breaking changes atau visual regression.
8. Hasil build/test.

Fokus utama: **clean CSS architecture, reusable styling, consistent naming, documentation, dan mengurangi duplicate CSS tanpa mengubah UI aplikasi.**