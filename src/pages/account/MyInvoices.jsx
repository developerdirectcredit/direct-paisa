import DashboardLayout from "../../components/DashboardLayout";

export default function MyInvoices() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 min-h-[400px]">
        <h2 className="text-2xl font-bold text-blue-900">Download Your Invoice</h2>
        <p className="text-gray-500 mt-2">Get your detailed Invoice</p>

        <div className="mt-10 flex flex-col items-center justify-center text-center text-gray-400 py-16">
          <FileIcon />
          <p className="mt-4">No invoices available yet.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

function FileIcon() {
  return (
    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
      🧾
    </div>
  );
}