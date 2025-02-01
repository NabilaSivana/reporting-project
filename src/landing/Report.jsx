import React, { useState, useRef } from "react";
import illustration from "../assets/images/animasi-home.png";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Report = ({ isSidebarOpen }) => {
  const [activePage, setActivePage] = useState("ReportService");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [taskAnswers, setTaskAnswers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const engineers = ["Nabila", "Ihza", "Annisa", "Budi", "Andi"];
  const [filteredEngineers, setFilteredEngineers] = useState(engineers);
  const sigCanvas = useRef(null);
  const [signature, setSignature] = useState(null);
  const [file, setFile] = useState(null);
  const categories = [
    "Pendaftaran",
    "Konsultasi",
    "Pembayaran",
    "Layanan Medis",
  ];

  const borderRadius = isSidebarOpen ? "rounded-sm" : "rounded-lg";
  const separatorWidth = isSidebarOpen ? "w-20" : "w-40";

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    if (keyword.trim() === "") {
      setFilteredEngineers([]);
    } else {
      const filtered = engineers.filter((name) =>
        name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredEngineers(filtered);
    }
  };

  const handleSelectEngineer = (name) => {
    setSearchTerm(name);
    setFilteredEngineers([]);
  };

  const tasks = ["Tugas1", "Tugas2", "Tugas3", "Tugas4", "Tugas5", "Tugas6"];
  const handleCheckboxChange = (task) => {
    setSelectedTasks((prevSelectedTasks) =>
      prevSelectedTasks.includes(task)
        ? prevSelectedTasks.filter((t) => t !== task)
        : [...prevSelectedTasks, task]
    );
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };
  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

  const handleFileChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleTaskAnswer = (task, answer) => {
    setTaskAnswers((prevAnswers) => ({
      ...prevAnswers,
      [task]: answer,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Report Preview", 20, 10);
    doc.autoTable({
      head: [["Field", "Value"]],
      body: Object.entries(reportData).map(([key, value]) => [key, value]),
    });
    doc.save("report.pdf");
  };

  const renderContent = () => {
    const containerClass = `relative ${
      isSidebarOpen ? "ml-64" : "ml-20"
    } pt-28`;
    const contentClass = `bg-white ${borderRadius} shadow-md p-6 md:p-12 mb-6`;

    switch (activePage) {
      case "ReportService":
        return (
          <div className={containerClass}>
            <div className={contentClass}>
              <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
                Report Service
              </h2>
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    Data Diri Customer
                  </span>
                </div>
                <div className={`h-px bg-purple-500 ${separatorWidth}`}></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-500">
                    Detail Permasalahan
                  </span>
                </div>
                <div className={`h-px bg-gray-300 ${separatorWidth}`}></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-500">
                    Jadwal Pelayanan
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-12 right-10">
              <img
                src={illustration}
                alt="Illustration"
                className="w-32 md:w-48 drop-shadow-lg"
              />
            </div>

            <div className="space-y-6">
              {[
                "Nama Perusahaan",
                "Alamat",
                "Nama Pelanggan",
                "Posisi",
                "Brand",
                "Model",
                "Serial Nomor",
              ].map((label, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-semibold">{label}</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full p-3 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  className="bg-purple-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
                  onClick={() => setActivePage("DetailPermasalahan")}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        );
      case "DetailPermasalahan":
        return (
          <div className={containerClass}>
            <div className={contentClass}>
              <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
                Detail Permasalahan
              </h2>
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    Data Diri Customer
                  </span>
                </div>
                <div className={`h-px bg-purple-500 ${separatorWidth}`}></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple -500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    Detail Permasalahan
                  </span>
                </div>
                <div className={`h-px bg-gray-300 ${separatorWidth}`}></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-500">
                    Jadwal Pelayanan
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-12 right-10">
              <img
                src={illustration}
                alt="Illustration"
                className="w-32 md:w-48 drop-shadow-lg"
              />
            </div>
            <div className="space-y-6">
              {["Masalah", "Kategori Pelayanan"].map((label, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-semibold">{label}</label>
                  {label === "Kategori Pelayanan" ? (
                    <select className="w-full p-3 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="w-full p-3 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400 transition"
                  onClick={() => setActivePage("ReportService")}
                >
                  Kembali
                </button>
                <button
                  className="bg-purple-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
                  onClick={() => setActivePage("JadwalPelayanan")}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        );

      case "JadwalPelayanan":
        return (
          <div className={containerClass}>
            <div className={contentClass}>
              <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
                Jadwal Pelayanan
              </h2>
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    Data Diri Customer
                  </span>
                </div>
                <div className={`h-px bg-purple-500 ${separatorWidth}`}></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    Detail Permasalahan
                  </span>
                </div>
                <div className={`h-px bg-purple-500 ${separatorWidth}`}></div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-purple-700">
                    Jadwal Pelayanan
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold">
                  Nama Engineer
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Cari Engineer..."
                  className="w-full p-3 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {filteredEngineers.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">
                    {filteredEngineers.map((name, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectEngineer(name)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">Reminder</label>
                <select className="w-full p-3 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Pilih Reminder</option>
                  <option value="1 Jam Sebelumnya">1 Jam Sebelumnya</option>
                  <option value="1 Hari Sebelumnya">1 Hari Sebelumnya</option>
                </select>
              </div>

              <div className="absolute top-6 right-10">
                <img
                  src={illustration}
                  alt="Illustration"
                  className="w-32 md:w-48 drop-shadow-lg"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400 transition"
                  onClick={() => setActivePage("DetailPermasalahan")}
                >
                  Kembali
                </button>
                <button
                  className="bg-purple-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
                  onClick={() => setActivePage("Checking")}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        );

      case "Checking":
        return (
          <div className={containerClass}>
            <div
              className={`bg-white ${borderRadius} shadow-md p-6 md:p-12 mb-6 space-y-10`}
            >
              <h2 className="text-2xl md:text-4xl font-semibold text-purple-700">
                Checking
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Tanggal Pengerjaan
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

        <div className="mb-4">
        <label className="block text-gray-700">Tugas yang Diberikan:</label>
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedTasks.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className="w-5 h-5 accent-purple-500"
            />
            <input
              type="text"
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              placeholder={`Tugas ${index + 1}`}
            />
            {selectedTasks.includes(index) && (
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg font-semibold transition ${taskAnswers[task] === "yes" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-700"}`}
                  onClick={() => handleTaskAnswer(task, "yes")}
                >
                  Yes
                </button>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold transition ${taskAnswers[task] === "no" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-700"}`}
                  onClick={() => handleTaskAnswer(task, "no")}
                >
                  No
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={addTask}
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Tambah Tugas
        </button>
      </div>
    </div>
                <div className="space-y-4">
                  <label className="block text-sm font-semibold">
                    Tanda Tangan
                  </label>
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{ className: "border w-full h-32 rounded-lg" }}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={saveSignature}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={clearSignature}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </div>
                  {signature && (
                    <img
                      src={signature}
                      alt="Tanda tangan"
                      className="mt-2 w-40 border"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold">
                    Upload Tanda Tangan
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {file && (
                    <img
                      src={file}
                      alt="Uploaded Signature"
                      className="mt-2 w-40 border"
                    />
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-semibold hover:bg-gray-400 transition"
                    onClick={() => setActivePage("JadwalPelayanan")}
                  >
                    Kembali
                  </button>
                  <button
                    className="bg-purple-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-purple-600 transition"
                    onClick={() => setActivePage("Preview")}
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
        );

      case "Preview":
        return (
          <div className={containerClass}>
            <div
              className={`bg-white ${borderRadius} shadow-md p-6 md:p-12 mb-6 space-y-10`}
            >
              <h2 className="text-xl md:text-2xl font-semibold text-purple-700">
                Preview Report
              </h2>
              {/* Add your preview content here */}
            </div>
            <div className="absolute top-12 right-10">
              <img
                src={illustration}
                alt="Illustration"
                className="w-32 md:w-48 drop-shadow-lg"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gray-100 min-h-screen">{renderContent()}</div>
  );
};

export default Report;
