import { useEffect, useState } from "react";

const STORAGE_KEY = "parking_data";

const emptyForm = {
  id: null,
  plate: "",
  owner: "",
  type: "Motor",
  timeIn: "",
  timeOut: "",
  status: "Masuk",
  duration: "",
  fee: "",
};

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setData(JSON.parse(saved));
  }, []);

 
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  
  const calculateParking = (form) => {
    if (!form.timeIn || !form.timeOut) return form;

    const masuk = new Date(form.timeIn);
    const keluar = new Date(form.timeOut);
    const diffMs = keluar - masuk;

    if (diffMs < 0) {
      alert("Jam keluar tidak boleh lebih awal dari jam masuk.");
      return form;
    }

    const hours = Math.ceil(diffMs / (1000 * 60 * 60)); 
    form.duration = hours + " jam";

    
    form.fee = form.type === "Motor" ? 2000 * hours : 3000 * hours;

    return form;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newForm = { ...form };

    
    if (form.status === "Keluar") {
      newForm = calculateParking(newForm);
    }

    if (form.id === null) {
      
      newForm.id = Date.now();
      setData([newForm, ...data]);
    } else {
      
      setData(data.map((item) => (item.id === form.id ? newForm : item)));
    }

    setForm(emptyForm);
  };

  const handleEdit = (item) => setForm(item);

  const handleDelete = (id) =>
    setData(data.filter((item) => item.id !== id));

  const filtered = data.filter((item) =>
    item.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Manajemen Parkir Kendaraan</h1>
      <p>Aflah Zain_50423065</p>

      <div className="card">
        <h2>{form.id ? "Edit Data Parkir" : "Tambah Kendaraan Masuk"}</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Plat Nomor</label>
            <input
              name="plate"
              value={form.plate}
              onChange={handleChange}
              placeholder="Contoh: B 1234 CD"
            />
          </div>

          <div className="form-group">
            <label>Nama Pemilik</label>
            <input
              name="owner"
              value={form.owner}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Jenis Kendaraan</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Motor</option>
              <option>Mobil</option>
            </select>
          </div>

          <div className="form-group">
            <label>Jam Masuk</label>
            <input
              type="datetime-local"
              name="timeIn"
              value={form.timeIn}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Masuk</option>
              <option>Keluar</option>
            </select>
          </div>

          {form.status === "Keluar" && (
            <div className="form-group">
              <label>Jam Keluar</label>
              <input
                type="datetime-local"
                name="timeOut"
                value={form.timeOut}
                onChange={handleChange}
              />
            </div>
          )}

          <button type="submit">
            {form.id ? "Update" : "Simpan"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Daftar Kendaraan Parkir</h2>

        <input
          placeholder="Cari plat nomor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table>
          <thead>
            <tr>
              <th>Plat</th>
              <th>Pemilik</th>
              <th>Jenis</th>
              <th>Masuk</th>
              <th>Status</th>
              <th>Keluar</th>
              <th>Durasi</th>
              <th>Biaya</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.plate}</td>
                <td>{item.owner}</td>
                <td>{item.type}</td>
                <td>{item.timeIn}</td>
                <td>{item.status}</td>
                <td>{item.timeOut || "-"}</td>
                <td>{item.duration || "-"}</td>
                <td>
                  {item.fee ? "Rp" + item.fee.toLocaleString() : "-"}
                </td>

                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="footer">Data tersimpan di localStorage</p>
    </div>
  );
}

export default App;
