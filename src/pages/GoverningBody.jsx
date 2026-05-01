import { motion } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

import PresidentPhoto from '../assets/Dr Sonal Sharma, President.jpg';
import VicePresidentPhoto from '../images/Dr Arvind Ahuja,Vice President.JPG';
import SecretaryPhoto from '../assets/Dr-Prasenjit-Das,-Secrertary-General.jpg';
import JointSecretaryPhoto from '../images/Dr Nadeem Tanveer, Joint-Secretary.webp';
import TreasurerPhoto from '../images/Dr Priti, Treasurer.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const officeBearers = [
  { name: 'Prof Sonal Sharma', position: 'President', image: PresidentPhoto },
  { name: 'Prof Arvind Ahuja', position: 'Vice-President', image: VicePresidentPhoto },
  { name: 'Prof Prasenjit Das', position: 'Secretary-General', image: SecretaryPhoto },
  { name: 'Prof. Nadeem Tanveer', position: 'Joint Secretary', image: JointSecretaryPhoto },
  { name: 'Prof Priti', position: 'Treasurer', image: TreasurerPhoto },
];

const governingBodyMembers = [
  { name: 'Prof Puja Sakhuja', position: 'EC Member' },
  { name: 'Professor VK Iyer', position: 'EC Member' },
  { name: 'Prof Kiran Agarwal', position: 'EC Member' },
  { name: 'Prof Nita Khurana', position: 'EC Member' },
  { name: 'Brig (Dr) Umesh Kapoor', position: 'EC Member' },
  { name: 'Prof Mukul Singh', position: 'EC Member' },
  { name: 'Col (Dr) Vandana Rana', position: 'EC Member' },
  { name: 'Col (Dr) Paresh Singhal', position: 'EC Member' },
];

const OfficerCard = ({ member }) => (
  <motion.div
    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center shadow-sm"
    whileHover={{ scale: 1.02, y: -4, boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="w-32 h-32 mx-auto mb-4">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full rounded-full object-cover border-2 border-gold"
      />
    </div>
    <h3 className="text-primary dark:text-white text-lg font-bold mb-1">{member.name}</h3>
    <p className="text-gray-700 dark:text-gray-300 text-sm">{member.position}</p>
    <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1">DC-IAPM</p>
  </motion.div>
);

const BodyMemberCard = ({ member }) => (
  <motion.div
    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-center shadow-sm"
    whileHover={{ scale: 1.02, y: -3, boxShadow: '0px 8px 12px -3px rgba(0,0,0,0.08)' }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-600">
      <UserCircle2 size={44} className="text-gray-400 dark:text-gray-300" aria-hidden="true" />
    </div>
    <h3 className="text-primary dark:text-white text-base font-bold mb-1">{member.name}</h3>
    <p className="text-gray-700 dark:text-gray-300 text-sm">{member.position}</p>
  </motion.div>
);

const GoverningBody = () => {
  return (
    <motion.div
      className="bg-background-light dark:bg-background-dark min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="Governing Body"
        description="Meet the office bearers and governing body members of DC-IAPM."
        keywords="DC-IAPM governing body, pathology leadership, IAPM Delhi"
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mb-16">
              <motion.div
                className="relative mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-primary dark:text-white text-3xl md:text-4xl font-bold tracking-tight">
                  Office Bearers
                </h1>
                <div className="absolute inset-x-0 bottom-[-8px] mx-auto h-0.5 w-20 bg-gold-DEFAULT"></div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {officeBearers.map((member) => (
                  <motion.div key={member.name} variants={itemVariants}>
                    <OfficerCard member={member} />
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section>
              <div className="relative mb-8 text-center">
                <h2 className="text-primary dark:text-white text-3xl md:text-4xl font-bold tracking-tight">
                  Governing Body Members
                </h2>
                <div className="absolute inset-x-0 bottom-[-8px] mx-auto h-0.5 w-20 bg-gold-DEFAULT"></div>
              </div>

              <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {governingBodyMembers.map((member) => (
                  <motion.div key={member.name} variants={itemVariants}>
                    <BodyMemberCard member={member} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default GoverningBody;
