import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

type Report = {
  id: string;
  type: string;
  description: string;
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
};

const ReportList = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    const q = query(
      collection(db, 'reports'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newReports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Report[];
      setReports(newReports);
    });

    return () => unsubscribe();
  }, []);

  const filteredReports = selectedType
    ? reports.filter((report) => report.type === selectedType)
    : reports;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center bg-background rounded-lg p-2">
          <label htmlFor="report-type-filter" className="text-gray-300 text-sm font-medium mr-3">
            Filter by type:
          </label>
          <select
            id="report-type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-surface text-gray-100 p-2 rounded-lg border border-surface-light focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="">All Types</option>
            <option value="Trash">Trash</option>
            <option value="Pollution">Pollution</option>
            <option value="Deforestation">Deforestation</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>Total Reports: {reports.length}</span>
          <span>Filtered: {filteredReports.length}</span>
        </div>
      </div>      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-background rounded-xl overflow-hidden shadow-xl hover:shadow-glow transition-shadow duration-300"
          >
            <div className="aspect-video relative">
              <img
                src={report.imageUrl}
                alt={report.type}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium text-white shadow-lg">
                  {report.type}
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-3">{report.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  {new Date(report.timestamp).toLocaleDateString()} at{' '}
                  {new Date(report.timestamp).toLocaleTimeString()}
                </div>
                <div className="text-primary">
                  {report.location.latitude.toFixed(4)}, {report.location.longitude.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">
            {selectedType ? `No reports found for type "${selectedType}"` : 'No reports yet'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList;
