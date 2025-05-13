import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icons in React Leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

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

const MapView = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
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
    : reports;  return (
    <div className="h-[calc(100vh-13rem)] w-full">
      <div className="mb-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 bg-background rounded-lg p-2">
          <label htmlFor="report-type-select" className="text-gray-300 text-sm font-medium sm:mr-3">
            Filter by type:
          </label>
          <select
            id="report-type-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto bg-surface text-gray-100 p-2 rounded-lg border border-surface-light focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
      </div>
      <div className="rounded-xl overflow-hidden shadow-xl">        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: 'calc(100vh - 16rem)', width: '100%' }}
          className="bg-background"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredReports.map((report) => (
            <Marker
              key={report.id}
              position={[report.location.latitude, report.location.longitude]}
              icon={defaultIcon}
            >
              <Popup className="leaflet-popup-dark">
                <div className="max-w-xs bg-background text-gray-100 -m-1">
                  <img
                    src={report.imageUrl}
                    alt={report.type}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-primary">{report.type}</h3>
                      <span className="text-xs text-gray-400">
                        {new Date(report.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{report.description}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
