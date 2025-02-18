import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://next.goowrite.com/api/jobs');
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch jobs');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h2>
          <p className="text-gray-600 mb-2">{job.company}</p>
          <p className="text-gray-500 mb-4">{job.location}</p>
          <div className="flex justify-between items-center">
            <span className="text-green-600 font-semibold">
              ${job.salary.toLocaleString()}
            </span>
            <Link
              to={`/jobs/${job._id}`}
              className="text-blue-500 hover:text-blue-600"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobsList;