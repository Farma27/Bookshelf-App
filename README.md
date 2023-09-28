# Bookshelf-App
Dicoding Academy Submission for "Belajar Membuat Front-End Web untuk Pemula" Course

## Kriteria Bookshelf App
Membuat sebuah web yang dapat memasukan data buku ke dalam rak, memindahkan data buku antar rak, dan menghapus data buku dari rak.

### Kriteria 1 : Dapat menambahkan data buku
* Harus dapat **menambahkan data buku baru**.
* Data buku yang disimpan merupakan object dengan struktur sebagai berikut :
  ```
  {
    id: string | number,
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
  }
  ```
  contoh :
  ```
  {
  id: 3657848524,
  title: 'Harry Potter and the Philosopher\'s Stone',
  author: 'J.K Rowling',
  year: 1997,
  isComplete: false,
  }
  ```
  > Untuk id buku pada tiap buku yang disimpan haruslah unik. Tips dalam menetapkan nilai untuk adalah Anda bisa memanfaatkan nilai timestamp. Untuk mendapatkan nilai timestamp di JavaScript cukup mudah, cukup dengan menuliskan expressions ```+new Date()```.

### Kriteria 2 : 2 rak buku
* Bookshelf Apps harus memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
* Rak buku "Belum selesai dibaca" hanya menyimpan buku jika properti ```isComplete``` bernilai _false_.
* Rak buku "Selesai dibaca" hanya menyimpan buku jika properti ```isComplete``` bernilai _true_.

### Kriteria 3 : Dapat memindahkan buku antar rak
* Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.

### Kriteria 4 : Dapat menghapus data buku
* Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.

### Kriteria 5 : Menggunakan ```localStorage``` untuk menyimpan data buku
* Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.

### Kriteria Tambahan
* Tambahkan fitur pencarian untuk mem-filter buku yang ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.
* Menuliskan kode dengan bersih.
  * Bersihkan comment dan kode yang tidak digunakan.
  * Indentasi yang sesuai.
* Terdapat improvisasi fitur seperti (pilih satu):
  * Custom Dialog ketika menghapus buku.
  * Dapat edit buku.
