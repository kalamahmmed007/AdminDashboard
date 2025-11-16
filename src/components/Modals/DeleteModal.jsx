// DeleteModal.jsx
export default function DeleteModal({ open, onClose, onConfirm, message }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-96 animate-fadeIn">
                <h3 className="font-medium text-lg mb-4">{message || "Are you sure?"}</h3>
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => { onConfirm(); onClose(); }}>Delete</button>
                </div>
            </div>
        </div>
    );
}
