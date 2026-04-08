import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const historyHighlights = [
  {
    title: 'A dedicated specialty forum',
    description:
      'The organization was shaped to give gastrointestinal and hepatopancreatobiliary pathology a focused academic home within India.',
  },
  {
    title: 'Built around shared learning',
    description:
      'Workshops, CMEs, conferences, and expert-led discussion have helped the society grow as a place for exchange and continuing education.',
  },
  {
    title: 'Collaboration across institutions',
    description:
      'The society continues to connect teachers, practitioners, and researchers so ideas and standards can move more effectively across centers.',
  },
  {
    title: 'Support for the next generation',
    description:
      'Its growth reflects an ongoing commitment to mentorship, academic development, and stronger pathways for young pathologists entering the field.',
  },
];

const objectives = [
  {
    icon: 'cast_for_education',
    title: 'Advance education and training',
    description:
      'Create meaningful learning opportunities through CMEs, workshops, conferences, and specialized academic programming.',
  },
  {
    icon: 'hub',
    title: 'Build a national professional platform',
    description:
      'Bring together specialists from across India to exchange ideas, update knowledge, and strengthen the discipline collectively.',
  },
  {
    icon: 'lab_profile',
    title: 'Encourage research and scholarship',
    description:
      'Promote collaborative studies, academic excellence, and a stronger culture of inquiry in GI and HPB pathology.',
  },
  {
    icon: 'public',
    title: 'Create international partnerships',
    description:
      'Work with allied global societies and experts to widen learning pathways and foster broader professional collaboration.',
  },
  {
    icon: 'award_star',
    title: 'Recognize excellence and leadership',
    description:
      'Support professionals who advance standards in training, service, and academic contribution within the specialty.',
  },
  {
    icon: 'volunteer_activism',
    title: 'Strengthen awareness and service',
    description:
      'Contribute to professional and public understanding while encouraging work that ultimately improves patient care.',
  },
];

const identityPoints = [
  'Mission-led and academically focused',
  'National in scope, collaborative in spirit',
  'Committed to training, research, and quality care',
];

const AboutUs = () => {
  return (
    <motion.main
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <SEO
        title="About Us"
        description="Learn about the mission, vision, objectives, and organizational history of the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India."
        keywords="about SGIHPBP, pathology mission, medical society goals, organization history"
      />

      <section
        className="relative isolate overflow-hidden text-white"
        style={{
          backgroundImage:
            'radial-gradient(circle at top right, rgba(212, 175, 55, 0.24), transparent 32%), linear-gradient(135deg, #0A2342 0%, #0A192F 58%, #12325C 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '44px 44px' }}></div>
        <div className="absolute -left-12 top-24 h-44 w-44 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-[#D4AF37]/20 blur-3xl"></div>

        <div className="container relative z-10 mx-auto px-4 py-16 md:px-6 md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-light">
                About the Society
              </p>
              <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                A refreshed story of who we are and what we are working toward.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                SGIHPBP&apos;s of India exists to strengthen education, research, and professional collaboration in gastrointestinal and hepatopancreatobiliary pathology. This page now presents that story with clearer structure while preserving the site&apos;s established visual identity.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-base font-bold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-[#e2bf4a]"
                >
                  Become a Member
                </Link>
                <a
                  href="/constitution_of_society.pdf"
                  download="SGIHPBPs_Constitution.pdf"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-base font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Download Constitution
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="rounded-[2rem] border border-white/12 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8"
            >
              <div className="rounded-[1.75rem] bg-white/95 p-6 text-primary shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9B7B18]">
                  Society Identity
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight">
                  Rooted in scholarship, connection, and service.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  The society brings together specialists who are committed to academic excellence and to advancing the quality of GI and HPB pathology practice through shared learning.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {identityPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-[#D4AF37]">check_circle</span>
                    <p className="text-sm leading-7 text-slate-100">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-background-light py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 lg:grid-cols-[1fr_1.05fr]"
          >
            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9B7B18]">
                History of the Organization
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
                A focused forum built around a growing specialty community.
              </h2>
              <div className="mt-6 space-y-5 text-sm leading-8 text-slate-600 md:text-base">
                <p>
                  SGIHPBP&apos;s of India emerged from a shared need for a dedicated national platform centered on gastrointestinal and hepatopancreatobiliary pathology. The aim was to create a space where specialists could learn from one another, strengthen training, and support progress in a highly focused area of practice.
                </p>
                <p>
                  As the organization developed, academic exchange became a defining thread of its identity. Meetings, workshops, conferences, and expert-led programs helped shape the society into a collaborative community where ideas, standards, and experience could be shared across institutions.
                </p>
                <p>
                  Today, that same foundation continues to guide the society: building professional connections, nurturing future talent, and raising the quality of education and research in the field across India.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {historyHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9B7B18]">
              Mission and Vision
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
              Clearer presentation for the society&apos;s central purpose.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="rounded-[2rem] bg-primary p-8 text-white shadow-xl"
              style={{
                backgroundImage:
                  'radial-gradient(circle at top right, rgba(212, 175, 55, 0.18), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))',
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-light">
                Our Mission
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-tight">
                Raise standards in education, training, and research.
              </h3>
              <p className="mt-5 text-sm leading-8 text-slate-200 md:text-base">
                Our mission is to advance the standards of education, training, and research in gastrointestinal and hepatobiliary pathology across India. We are committed to meaningful academic programming, stronger collaboration among professionals, support for multi-institutional research, and recognition of excellence that benefits both practitioners and patients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-[2rem] border border-slate-200 bg-background-light p-8 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9B7B18]">
                Our Vision
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-tight text-primary">
                Build a future defined by informed practice and stronger care.
              </h3>
              <p className="mt-5 text-sm leading-8 text-slate-600 md:text-base">
                Our vision is to foster a future where knowledge of gastrointestinal and hepatobiliary disorders is more widely shared, patient care is supported by a highly trained professional network, and collaboration with national and international partners continues to move the field forward.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-background-light py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9B7B18]">
              Objectives
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
              The goals that organize the society&apos;s work.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              These objectives translate the society&apos;s mission into practical academic, professional, and collaborative action.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {objectives.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] bg-primary p-8 text-white shadow-xl md:p-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at top left, rgba(212, 175, 55, 0.22), transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
            }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-light">
                  Governance and Structure
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight">
                  The constitution remains a key reference for members and future members.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-200 md:text-base">
                  It outlines the society&apos;s framework, objectives, governance structure, and membership-related guidance in a single document.
                </p>
              </div>

              <a
                href="/constitution_of_society.pdf"
                download="SGIHPBPs_Constitution.pdf"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-base font-bold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-[#e2bf4a]"
              >
                Download Constitution
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
};

export default AboutUs;
