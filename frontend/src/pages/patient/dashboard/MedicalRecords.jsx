import React, { useState, useEffect } from "react";
import { privateAPI } from "../../../auth/config/api";
import {
  FolderOpen,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  X,
  Activity,
  Stethoscope,
  FileText,
  Star,
  Send,
} from "lucide-react";

const formatDateTime = (isoString) => {
  const dateObj = new Date(isoString);
  return {
    date: dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    time: dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const parsePrescriptions = (record) => {
  if (!record.medicine_name) return [];
  const names = record.medicine_name.split(", ");
  const dosages = record.dosage ? record.dosage.split(", ") : [];
  const frequencies = record.frequency ? record.frequency.split(", ") : [];
  const durations = record.duration ? record.duration.split(", ") : [];

  return names.map((name, i) => ({
    medicineName: name,
    dosage: dosages[i] || "-",
    frequency: frequencies[i] || "-",
    duration: durations[i] || "-",
  }));
};

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [ratingRecord, setRatingRecord] = useState(null);

  // Rating Form States
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  // Pagination & Filter States
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);
      const response = await privateAPI.get("/patient/consultations/");
      console.log(response.data);
      const mappedRecords = response.data.map((item) => {
        const { date, time } = formatDateTime(item.created_at);

        const getSymptomsFromNotes = (notes) => {
          if (!notes) return "No complaint recorded.";
          if (notes.includes("Symptoms:")) {
            return notes.split("Symptoms:")[1].split("\n\n")[0].trim();
          }
          return "See clinical notes.";
        };

        const getCleanNotes = (notes) => {
          if (!notes) return "No detailed notes recorded.";

          if (notes.includes("Notes:")) {
            return notes.split("Notes:")[1].trim();
          }

          if (notes.includes("Symptoms:")) {
            const parts = notes.split("\n\n");
            return parts.length > 1 ? parts[1].trim() : notes;
          }

          return notes;
        };

        return {
          ...item,
          date,
          time,

          doctorDisplay: item.doctor_name
            ? `Dr. ${item.doctor_name}`
            : item.doctor_id
              ? `Dr. ${item.doctor_id}`
              : "Dr. n/a",

          diagnosis: item.clinic_diagnosis || "General Observation",
          diagnosisClass: "bg-teal-100 text-teal-700",

          notesSummary: item.detailed_notes
            ? getCleanNotes(item.detailed_notes)
            : "No summary available",

          fullNotes: getCleanNotes(item.detailed_notes),

          fullSymptoms:
            item.symptoms || getSymptomsFromNotes(item.detailed_notes),

          prescriptions: parsePrescriptions(item),
        };
      });

      setRecords(mappedRecords);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    if (selectedRating === 0) return alert("Please select a star rating.");

    try {
      setIsSubmittingRating(true);

      const payload = {
        consultation: ratingRecord.id,
        doctor_id: ratingRecord.doctor_id,
        star: selectedRating,
        comment: ratingComment,
      };

      await privateAPI.post("/patient/rate-doctor/", payload);

      alert("Thank you for your feedback!");
      closeRatingModal();

      fetchMedicalRecords();
    } catch (error) {
      console.error("Error submitting rating:", error);

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        "Failed to submit rating. Please try again.";

      alert(errorMessage);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const closeRatingModal = () => {
    setRatingRecord(null);
    setSelectedRating(0);
    setRatingComment("");
  };

  const filteredRecords = records.filter(
    (r) =>
      selectedDept === "All Departments" || r.department_name === selectedDept,
  );

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage,
  );

  const departments = [
    "All Departments",
    ...new Set(records.map((r) => r.department_name).filter(Boolean)),
  ];

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 bg-[#f8fafc]">
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
          {/* Filters */}
          <div className="mb-6 flex gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2">
              <FolderOpen size={16} className="text-[#008080]" />
              <select
                value={selectedDept}
                onChange={(e) => {
                  setSelectedDept(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-sm text-slate-600 outline-none"
              >
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Notes Summary</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-slate-400"
                    >
                      Loading records...
                    </td>
                  </tr>
                ) : (
                  paginatedRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold">{record.date}</p>
                        <p className="text-xs text-slate-400">{record.time}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {record.doctorDisplay}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700">
                          {record.diagnosis}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {record.notesSummary}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setSelectedRecord(record)}
                            className="text-sm font-bold text-[#008080] hover:underline"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => setRatingRecord(record)}
                            disabled={record.is_rated}
                            className={`text-sm font-bold flex items-center gap-1 ${
                              record.is_rated
                                ? "text-slate-400 cursor-not-allowed"
                                : "text-amber-600 hover:underline"
                            }`}
                          >
                            <Star size={14} fill="currentColor" />
                            {record.is_rated ? "Rated" : "Rate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <p className="text-sm text-slate-400">
                Total {filteredRecords.length} records
              </p>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 border rounded-lg disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 border rounded-lg disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- DETAILS MODAL --- */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Consultation Record Details
                </h2>
                <p className="text-sm text-slate-400 font-medium">
                  Clinical summary of your visit
                </p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Date
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedRecord.date}
                  </p>
                </div>
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Doctor
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedRecord.doctorDisplay}
                  </p>
                </div>
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Diagnosis
                  </p>
                  <p className="text-sm font-bold text-[#008080]">
                    {selectedRecord.diagnosis}
                  </p>
                </div>
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Consult ID
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    #CR-{selectedRecord.id}
                  </p>
                </div>
              </div>

              {/* Symptoms Section */}
              <section className="rounded-2xl border border-slate-100 p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#008080]">
                  <Activity size={20} strokeWidth={2.5} />
                  <h3 className="font-bold text-lg">
                    Symptoms / Chief Complaint
                  </h3>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {selectedRecord.fullSymptoms}
                </p>
              </section>

              {/* Diagnosis & Clinical Notes Section */}
              <section className="rounded-2xl border border-slate-100 p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#008080]">
                  <Stethoscope size={20} strokeWidth={2.5} />
                  <h3 className="font-bold text-lg">
                    Diagnosis & Clinical Notes
                  </h3>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Detailed Doctor Notes
                  </p>
                  <p className="text-sm text-slate-700 font-medium whitespace-pre-line leading-relaxed">
                    {selectedRecord.fullNotes}
                  </p>
                </div>
              </section>

              {/* Prescriptions Section */}
              <section className="rounded-2xl border border-slate-100 p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#008080]">
                  <FileText size={20} strokeWidth={2.5} />
                  <h3 className="font-bold text-lg">Prescriptions</h3>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr className="text-slate-400 font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Medicine</th>
                        <th className="px-6 py-4">Dosage</th>
                        <th className="px-6 py-4">Frequency</th>
                        <th className="px-6 py-4">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {selectedRecord.prescriptions.length > 0 ? (
                        selectedRecord.prescriptions.map((med, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-slate-50/30 transition-colors"
                          >
                            <td className="px-6 py-4 font-bold text-slate-900">
                              {med.medicineName}
                            </td>
                            <td className="px-6 py-4 text-slate-600 font-medium">
                              {med.dosage}
                            </td>
                            <td className="px-6 py-4 text-slate-600 font-medium">
                              {med.frequency}
                            </td>
                            <td className="px-6 py-4 text-slate-600 font-medium">
                              {med.duration}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-8 text-center text-slate-400 italic"
                          >
                            No medications prescribed for this visit.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* --- RATING MODAL --- */}
      {ratingRecord && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Rate Your Doctor</h2>
              <button onClick={closeRatingModal} className="text-slate-400">
                <X size={20} />
              </button>
            </div>
            <div className="flex h-16 w-16 bg-amber-50 text-amber-500 rounded-full items-center justify-center mx-auto mb-4">
              <Star size={32} fill="currentColor" />
            </div>
            <h3 className="font-bold text-lg">{ratingRecord.doctorDisplay}</h3>
            <div className="flex justify-center gap-2 my-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={36}
                    className={
                      (hoverRating || selectedRating) >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200"
                    }
                  />
                </button>
              ))}
            </div>
            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Write a brief review..."
              className="w-full border rounded-2xl p-4 text-sm mb-6 outline-none focus:ring-2 focus:ring-amber-400/20"
              rows={3}
            />
            <button
              disabled={isSubmittingRating || !selectedRating}
              onClick={handleSubmitRating}
              className="w-full bg-amber-500 py-4 rounded-2xl font-bold text-white shadow-lg hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send size={18} />{" "}
              {isSubmittingRating ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
