import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';

type ReportFormProps = {
  onSubmitSuccess?: () => void;
}

const ReportForm = ({ onSubmitSuccess }: ReportFormProps) => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Trash');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    try {
      setLoading(true);
      
      // Get current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `reports/${Date.now()}-${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save report to Firestore
      await addDoc(collection(db, 'reports'), {
        description,
        type,
        imageUrl,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        timestamp: new Date().toISOString(),
      });

      // Reset form
      setDescription('');
      setType('Trash');
      setImage(null);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="type">
          Issue Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 bg-background border border-surface rounded-lg text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          required
        >
          <option value="Trash">Trash</option>
          <option value="Pollution">Pollution</option>
          <option value="Deforestation">Deforestation</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-background border border-surface rounded-lg text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          rows={4}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="image">
          Photo
        </label>
        <div className="relative">
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="hidden"
            required
          />
          <label
            htmlFor="image"
            className="w-full flex items-center justify-center p-4 bg-background border-2 border-dashed border-surface hover:border-primary rounded-lg cursor-pointer transition-all"
          >
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-1 text-sm text-gray-300">Click to upload a photo</p>
              {image && (
                <p className="mt-2 text-xs text-primary">{image.name}</p>
              )}
            </div>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          loading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02] hover:shadow-glow'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </div>
        ) : (
          'Submit Report'
        )}
      </button>
    </form>
  );
};

export default ReportForm;
