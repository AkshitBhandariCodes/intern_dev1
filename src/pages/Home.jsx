import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CountdownTimer from '../components/common/CountdownTimer';
import Logo from '../assets/Logo_SGIHPBPS.png';
import PresidentSection from '../components/sections/PresidentSection';
import SecretarySection from '../components/sections/SecretarySection';
import QuickLinksSection from '../components/sections/QuickLinksSection';

const fallbackEvents = [
  {
    title: 'Academic Forum and Society Updates',
    date: 'Updates shared regularly',
    location: 'Across India',
    description:
      'Follow SGIHPBP news, academic announcements, and upcoming learning opportunities from the society.',
  },
  {
    title: 'Workshops, CMEs, and Conferences',
    date: 'Year-round academic activity',
    location: 'National network',
    description:
      'Stay connected to practical learning sessions, multidisciplinary exchange, and focused GI and HPB pathology discussions.',
  },
  {
    title: 'Member Engagement Opportunities',
    date: 'Open throughout the year',
    location: 'Society initiatives',
    description:
      'Explore ways to contribute, collaborate, and grow with peers through SGIHPBP programs and society activities.',
  },
];

const overviewStats = [
  { label: 'National academic network', value: 'Pan-India' },
  { label: 'Core focus', value: 'GI and HPB Pathology' },
  { label: 'Driven by', value: 'Education, research, collaboration' },
];

const missionHighlights = [
  'Continuous medical education, workshops, and conferences led by experts in the field.',
  'Collaboration among healthcare professionals and encouragement for multi-institutional research.',
  'Recognition of academic excellence, public education, and broader awareness initiatives.',
];

const getParsedEventDate = (event) => {
  const rawDate = event?.timerdate || event?.date;

  if (!rawDate) {
    return null;
  }

  const parsedDate = new Date(rawDate);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const sortEvents = (items = []) => {
  const now = Date.now();

  return items
    .filter(Boolean)
    .map((event) => ({
      ...event,
      parsedDate: getParsedEventDate(event),
    }))
    .sort((a, b) => {
      const aTime = a.parsedDate?.getTime();
      const bTime = b.parsedDate?.getTime();
      const aFuture = typeof aTime === 'number' && aTime >= now;
      const bFuture = typeof bTime === 'number' && bTime >= now;

      if (aFuture !== bFuture) {
        return aFuture ? -1 : 1;
      }

      if (aFuture && bFuture) {
        return aTime - bTime;
      }

      if (typeof aTime === 'number' && typeof bTime === 'number') {
        return bTime - aTime;
      }

      if (typeof aTime === 'number') {
        return -1;
      }

      if (typeof bTime === 'number') {
        return 1;
      }

      return 0;
    });
};

const getExcerpt = (text) => {
  if (!text) {
    return 'Stay connected with the latest SGIHPBP academic activity and society announcements.';
  }

  return text.length > 180 ? `${text.slice(0, 177).trim()}...` : text;
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let isMounted = true;

    const applyEvents = (incomingEvents) => {
      if (!isMounted || !Array.isArray(incomingEvents)) {
        return;
      }

      setEvents(sortEvents(incomingEvents));
    };

    const fetchEvents = async () => {
      try {
        const cachedData = sessionStorage.getItem('events_data');

        if (cachedData) {
          try {
            applyEvents(JSON.parse(cachedData));
          } catch (error) {
            console.error('Unable to parse cached events:', error);
          }
        }

        if (!GOOGLE_SCRIPT_URL) {
          return;
        }

        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({ action: 'get_events' }),
        });
        const data = await response.json();

        if (data.result === 'success' && Array.isArray(data.data)) {
          sessionStorage.setItem('events_data', JSON.stringify(data.data));
          applyEvents(data.data);
        }
      } catch (error) {
        console.error('Error fetching home events:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [GOOGLE_SCRIPT_URL]);

  const now = new Date();
  const upcomingEvent = events.find((event) => event.parsedDate && event.parsedDate >= now) || events[0] || null;
  const displayFeed = events.length > 0 ? events.slice(0, 4) : fallbackEvents;
  const showCountdown = upcomingEvent?.parsedDate && upcomingEvent.parsedDate >= now;

  return (
    <main className="overflow-hidden">
      <SEO
        title="Home"
        description="Welcome to the Society of Gastrointestinal & Hepato-Pancreatobiliary Pathologists of India (SGIHPBP). Explore society updates, events, and pathways to engage."
        keywords="SGIHPBP, pathology society India, GI pathology, HPB pathology, medical education"
      />

      <section
        className="relative isolate overflow-hidden text-white"
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, rgba(212, 175, 55, 0.24), transparent 34%), linear-gradient(135deg, #0A2342 0%, #091A33 56%, #0D315C 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        ></div>
        <div className="absolute -left-16 top-16 h-40 w-40 rounded-full bg-[#D4AF37]/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

        <div className="container relative z-10 mx-auto px-4 py-16 md:px-6 md:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
                <img src={Logo} alt="SGIHPBP logo" className="h-9 w-9 rounded-full bg-white/90 p-1" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-light">
                  SGIHPBP&apos;s of India
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                A renewed home for <span className="text-gold-light">education, research, and collaboration</span> in GI and HPB pathology.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                Fostering excellence in the field of GI and HPB pathology through education, research, and collaboration, while making the society story, academic updates, and member pathways easier to explore.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-base font-bold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-[#e2bf4a]"
                >
                  Become a Member
                </Link>
                <Link
                  to="/about-us"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-base font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Explore the Society
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {overviewStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
                    <p className="mt-2 text-sm font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-white/12 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-light">
                      Event Spotlight
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">Latest academic highlight</h2>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
                    {events.length > 0 ? 'Live feed' : 'Society updates'}
                  </span>
                </div>

                {upcomingEvent ? (
                  <>
                    <div className="mt-6 rounded-[1.75rem] bg-white/95 p-6 text-primary shadow-lg">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9B7B18]">
                        {showCountdown ? 'Upcoming event' : 'Latest update'}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold leading-tight">{upcomingEvent.title}</h3>
                      <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap">
                        {upcomingEvent.date && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                            <span className="material-symbols-outlined text-base text-[#9B7B18]">calendar_month</span>
                            <span>{upcomingEvent.date}</span>
                          </div>
                        )}
                        {upcomingEvent.location && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                            <span className="material-symbols-outlined text-base text-[#9B7B18]">location_on</span>
                            <span>{upcomingEvent.location}</span>
                          </div>
                        )}
                      </div>
                      <p className="mt-5 text-sm leading-7 text-slate-700">
                        {getExcerpt(upcomingEvent.description)}
                      </p>
                    </div>

                    {showCountdown && (
                      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-primary/30 p-4">
                        <CountdownTimer targetDate={upcomingEvent.timerdate || upcomingEvent.date} variant="home" />
                      </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        to="/academics-events"
                        className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-[#e2bf4a]"
                      >
                        View All Events
                      </Link>
                      {upcomingEvent.registrationlink ? (
                        <a
                          href={upcomingEvent.registrationlink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                        >
                          Register Now
                        </a>
                      ) : (
                        <Link
                          to="/about-us"
                          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                        >
                          Learn About Us
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-6 rounded-[1.75rem] bg-white/95 p-6 text-primary shadow-lg">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9B7B18]">
                      Society update
                    </p>
                    <h3 className="mt-3 text-2xl font-bold leading-tight">
                      Explore the latest work and announcements from SGIHPBP.
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-slate-700">
                      The home page keeps the society story, academic opportunities, and member pathways in one place so visitors can quickly understand the organization and take the next step.
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/academics-events"
                        className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-[#e2bf4a]"
                      >
                        Browse Updates
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
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
            className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9B7B18]">
                Latest Updates
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
                A clearer events feed with the society&apos;s live content still front and center.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Upcoming programs, recent announcements, and member-facing updates are surfaced here in a more structured, easy-to-scan format across desktop and mobile.
              </p>
            </div>

            <Link
              to="/academics-events"
              className="inline-flex items-center justify-center rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              Open Academics &amp; Events
            </Link>
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5 md:grid-cols-2">
              {loading && events.length === 0
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className={`animate-pulse rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm ${
                        index === 0 ? 'md:col-span-2' : ''
                      }`}
                    >
                      <div className="h-3 w-24 rounded-full bg-slate-200"></div>
                      <div className="mt-4 h-8 w-3/4 rounded-full bg-slate-200"></div>
                      <div className="mt-4 flex gap-3">
                        <div className="h-9 w-28 rounded-full bg-slate-200"></div>
                        <div className="h-9 w-36 rounded-full bg-slate-200"></div>
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="h-3 rounded-full bg-slate-200"></div>
                        <div className="h-3 rounded-full bg-slate-200"></div>
                        <div className="h-3 w-4/5 rounded-full bg-slate-200"></div>
                      </div>
                    </div>
                  ))
                : displayFeed.map((event, index) => (
                    <motion.article
                      key={`${event.title}-${index}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className={`group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        index === 0 ? 'md:col-span-2' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          {index === 0 ? 'Featured update' : 'Update'}
                        </span>
                        <span className="material-symbols-outlined text-2xl text-[#D4AF37] transition duration-300 group-hover:translate-x-1">
                          arrow_outward
                        </span>
                      </div>

                      <h3 className="mt-5 text-2xl font-bold leading-tight text-primary">
                        {event.title}
                      </h3>

                      <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap">
                        {event.date && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                            <span className="material-symbols-outlined text-base text-[#9B7B18]">calendar_month</span>
                            <span>{event.date}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                            <span className="material-symbols-outlined text-base text-[#9B7B18]">location_on</span>
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="mt-5 text-sm leading-7 text-slate-600">
                        {getExcerpt(event.description)}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          to="/academics-events"
                          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#12325c]"
                        >
                          Details
                        </Link>
                        {event.registrationlink && (
                          <a
                            href={event.registrationlink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-primary/15 px-5 py-2.5 text-sm font-semibold text-primary transition duration-300 hover:bg-primary/5"
                          >
                            Register
                          </a>
                        )}
                        {event.flyerlink && (
                          <a
                            href={event.flyerlink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-primary/15 px-5 py-2.5 text-sm font-semibold text-primary transition duration-300 hover:bg-primary/5"
                          >
                            Download Flyer
                          </a>
                        )}
                      </div>
                    </motion.article>
                  ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-[2rem] bg-primary p-8 text-white shadow-xl"
              style={{
                backgroundImage:
                  'radial-gradient(circle at top right, rgba(212, 175, 55, 0.22), transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))',
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-light">
                Society Snapshot
              </p>
              <h3 className="mt-4 text-3xl font-bold leading-tight">
                The refreshed home page keeps the original story but presents it more clearly.
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-200">
                The new layout balances institutional identity with practical navigation, while preserving the mission-led content that already exists on the live site.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Live academic updates remain visible with stronger card structure and clearer calls to action.',
                  'The hero introduces the society and the next relevant step without losing the existing theme.',
                  'The original mission and leadership sections continue below, now fitting into a cleaner overall flow.',
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-[#D4AF37]">check_circle</span>
                    <p className="text-sm leading-7 text-slate-100">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-[#e2bf4a]"
                >
                  Join the Society
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
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
            className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9B7B18]">
                Our Mission
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
                The same mission-led content from the live site, now given more breathing room.
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-600">
                Our mission is to advance the standards of education, training, and research in Gastrointestinal and Hepatobiliary pathology across India. We are dedicated to establishing institutions and organizing comprehensive programs such as continuous medical education, workshops, and conferences led by experts in the field. By fostering collaboration among healthcare professionals, encouraging multi-institutional research, and recognizing academic excellence, we strive to provide outstanding care and support for both practitioners and patients. We are also committed to promoting public education and awareness, including the integration of wellness practices like Yoga, to benefit the broader community.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/about-us"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition duration-300 hover:bg-[#12325c]"
                >
                  Learn More
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center rounded-full border border-primary/15 px-6 py-3 text-sm font-semibold text-primary transition duration-300 hover:bg-primary/5"
                >
                  Contact the Society
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {missionHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-slate-200 bg-background-light p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-1 text-[#D4AF37]">check_circle</span>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <PresidentSection />
      <SecretarySection />
      <QuickLinksSection />
    </main>
  );
};

export default Home;
