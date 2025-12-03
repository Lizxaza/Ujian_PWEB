import { useEffect, useState } from "react";

const STORAGE_KEY = "books_data";

const emptyForm = {
  id: null,
  title: "",
  author: "",
  year: "",
  category: "",
};

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");

  // Ambil data dari localStorage saat pertama kali load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);

  // Simpan ke localStorage setiap kali books berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.year || !form.category) {
      alert("Semua field wajib diisi.");
      return;
    }

    // CREATE
    if (form.id === null) {
      const newBook = {
        ...form,
        id: Date.now(), // id unik sederhana
      };
      setBooks((prev) => [newBook, ...prev]);
    } else {
      // UPDATE
      setBooks((prev) =>
        prev.map((b) => (b.id === form.id ? { ...form } : b))
      );
    }

    setForm(emptyForm);
  };

  const handleEdit = (book) => {
    setForm(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const ok = confirm("Yakin ingin menghapus buku ini?");
    if (!ok) return;

    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleCancel = () => setForm(emptyForm);

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container">
      <h1>Aplikasi Manajemen Buku</h1>
      <p className="subtitle">
        Contoh project CRUD dengan React + localStorage untuk Ujian Praktikum
        Pemrograman Web.
      </p>

      {/* FORM */}
      <div className="card">
        <h2>{form.id === null ? "Tambah Buku Baru" : "Edit Buku"}</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Judul Buku</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Misal: Pemrograman Web Dasar"
              />
            </div>

            <div className="form-group">
              <label>Penulis</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Nama Penulis"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tahun Terbit</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2025"
              />
            </div>

            <div className="form-group">
              <label>Kategori</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Pemrograman, Novel, dll"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">
              {form.id === null ? "Simpan Buku" : "Update Buku"}
            </button>
            {form.id !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* SEARCH */}
      <div className="card">
        <div className="search-row">
          <h2>Daftar Buku</h2>
          <input
            type="text"
            placeholder="Cari judul / penulis / kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredBooks.length === 0 ? (
          <p className="empty">Belum ada data buku.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Tahun</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                  <td>{book.category}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(book)}
                      className="btn-link"
                    >
                      Edit
                    </button>
                    {" | "}
                    <button
                      type="button"
                      onClick={() => handleDelete(book.id)}
                      className="btn-link danger"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer>
        <small>
          Data disimpan di <code>localStorage</code> browser. Jika ganti
          browser/clear storage, data akan hilang.
        </small>
      </footer>
    </div>
  );
}

export default App;
