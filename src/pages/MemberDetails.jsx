import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const EMAIL_TABS = [
  { id: 'all', label: 'All Members' },
  { id: 'with_email', label: 'With Email' },
  { id: 'without_email', label: 'Without Email' },
];

const DIRECTORY_HEADERS = ['Member Name', 'Hospital', 'Registration Number'];

const normalizeKey = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const prettifyHeader = (value) => {
  if (!value) return '';
  const text = String(value).trim();
  if (!text) return '';
  return text
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
};

const isOldMembershipKey = (key) => {
  const normalized = normalizeKey(key);
  return normalized.includes('oldmembership') || normalized === 'oldmembershipno';
};

const valueToText = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  return String(value).trim();
};

const MembersDetails = () => {
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_API_URL;

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailTab, setEmailTab] = useState('all');

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'get_members',
            page: 1,
            limit: 5000,
          }),
        });

        const data = await response.json();

        const rawMembers = Array.isArray(data?.members)
          ? data.members
          : Array.isArray(data?.data)
            ? data.data
            : [];

        const normalizedMembers = rawMembers.map((row, index) => {
          const safeRow = row && typeof row === 'object' ? row : {};
          const memberName = valueToText(safeRow['Member Name']) || '-';
          const hospital = valueToText(safeRow['Hospital']) || '-';
          const registrationNumber = valueToText(safeRow['Registration Number']) || '-';

          return {
            serialNo: index + 1,
            memberName,
            hospital,
            registrationNumber,
          };
        });

        setMembers(normalizedMembers);
      } catch (fetchError) {
        console.error('Error fetching member directory:', fetchError);
        setError('Unable to load member directory right now. Please try again shortly.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [GOOGLE_SCRIPT_URL]);

  const detailHeaders = useMemo(() => DIRECTORY_HEADERS, []);

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return members.filter((member) => {
      if (emailTab === 'with_email' || emailTab === 'without_email') return true;

      if (!query) return true;

      const inName = member.memberName.toLowerCase().includes(query);
      const inHospital = member.hospital.toLowerCase().includes(query);
      const inReg = member.registrationNumber.toLowerCase().includes(query);
      return inName || inHospital || inReg;
    });
  }, [members, searchQuery, emailTab]);

  const valueForHeader = (member, header) => {
    if (header === 'Member Name') return member.memberName;
    if (header === 'Hospital') return member.hospital;
    if (header === 'Registration Number') return member.registrationNumber;
    return '-';
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <SEO
        title="Member Directory"
        description="Search and view the member directory of DC-IAPM."
        keywords="DC-IAPM members, member directory, pathology members Delhi"
      />

      <section className="bg-primary text-white pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Member Directory</h1>
          <p className="opacity-90 max-w-3xl mx-auto text-sm md:text-base">
            Directory data is synced from the configured Google Script source. New entries appear automatically when the sheet is updated.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">
                Search by Name, Hospital, or Registration Number
              </label>
              <input
                type="text"
                placeholder="Type name, hospital, or registration number"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full h-[56px] px-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-gray-700 dark:text-white"
              />
            </div>

            <div className="md:col-span-4">
              <p className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">Email Tab</p>
              <div className="grid grid-cols-3 gap-2">
                {EMAIL_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setEmailTab(tab.id)}
                    className={`h-[56px] rounded-lg text-xs font-bold border transition-colors ${
                      emailTab === tab.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Showing <span className="font-bold text-primary dark:text-white">{filteredMembers.length}</span> of {members.length} members
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 dark:text-white">Directory Records</h3>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
              {loading ? 'Loading...' : `${filteredMembers.length} Rows`}
            </span>
          </div>

          {error && (
            <div className="p-6 text-red-600 dark:text-red-400 text-sm border-b border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20">
              {error}
            </div>
          )}

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4 border-b dark:border-gray-600">S.No</th>
                  {detailHeaders.map((header) => (
                    <th key={header} className="px-6 py-4 border-b dark:border-gray-600">
                      {prettifyHeader(header)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-10"></div></td>
                      {detailHeaders.map((header) => (
                        <td key={`${header}-${index}`} className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div></td>
                      ))}
                    </tr>
                  ))
                ) : filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={`${member.registrationNumber}-${member.serialNo}`} className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{member.serialNo}</td>
                      {detailHeaders.map((header) => (
                        <td key={`${member.registrationNumber}-${header}`} className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {valueForHeader(member, header) || '-'}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={1 + detailHeaders.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No matching members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={`mobile-skeleton-${index}`} className="p-5 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36"></div>
                </div>
              ))
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div key={`mobile-${member.registrationNumber}-${member.serialNo}`} className="p-5">
                  <p className="text-xs font-mono text-gray-500 mb-1">{member.registrationNumber}</p>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{member.memberName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Hospital: {member.hospital}</p>
                  <div className="mt-3 grid grid-cols-1 gap-1 text-sm text-gray-600 dark:text-gray-300">
                    {detailHeaders.map((header) => (
                      <p key={`mobile-${member.registrationNumber}-${header}`}>
                        <span className="font-semibold">{prettifyHeader(header)}:</span> {valueForHeader(member, header) || '-'}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">No matching members found.</div>
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default MembersDetails;
