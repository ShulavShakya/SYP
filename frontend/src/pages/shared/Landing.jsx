import React from "react";
import {
  Plus,
  Home,
  Heart,
  AlertCircle,
  Baby,
  Check,
  Pill,
  FlaskConical,
  Activity,
  BedDouble,
  ShieldCheck,
  MinusCircle,
  Headset,
  Globe,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const styles = {
  cardShadow: { boxShadow: "0 4px 20px -2px rgba(0, 137, 123, 0.08)" },
  heroImageContainer: { borderRadius: 40, overflow: "hidden" },
};

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F1F8F7] text-[#263238] font-sans min-h-screen">
      {/* BEGIN: Navigation */}
      <header className="bg-white border-b border-teal-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#00897B] p-1.5 rounded-md">
              <Plus className="w-6 h-6 text-white" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold text-[#263238] tracking-tight">
              Upachaar
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a className="hover:text-[#00897B] transition" href="#">
              Departments
            </a>
            <a className="hover:text-[#00897B] transition" href="#">
              Patient Info
            </a>
            <a className="hover:text-[#00897B] transition" href="#">
              Locations
            </a>
            <a className="hover:text-[#00897B] transition" href="#">
              About Us
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="text-sm font-semibold text-[#00897B] px-4 py-2 hover:bg-teal-50 rounded-lg transition hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-[#00897B] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-teal-700 shadow-md transition hover:cursor-pointer"
              onClick={() => navigate("/patient/signup")}
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>
      {/* END: Navigation */}

      <main>
        {/* BEGIN: Hero Section */}
        <section className="container mx-auto px-6 pt-16 pb-24 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-[#00897B] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              Trusted Community Healthcare
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#263238] leading-tight xl:text-7xl">
              Compassionate Care at{" "}
              <span className="text-[#00897B]">Upachaar</span>
            </h1>

            <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
              For over 50 years, we've provided world-class medical excellence
              to our community. Experience personalized healthcare delivered by
              our team of expert specialists.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#00897B] text-white font-bold px-8 py-4 rounded-xl hover:bg-teal-700 shadow-lg transition hover:cursor-pointer">
                Book an Appointment
              </button>
              <button className="bg-white text-[#263238] border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 shadow-sm transition hover:cursor-pointer">
                Find a Doctor
              </button>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#4DB6AC] border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-[#00897B] border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-teal-200 border-2 border-white" />
              </div>
              <p className="text-slate-500 text-sm italic">
                Voted #1 Hospital in the region for 5 consecutive years
              </p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div
              className="shadow-2xl bg-white p-4"
              style={styles.heroImageContainer}
            >
              <img
                alt="Medical professional"
                className="w-full h-full object-cover rounded-[32px]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDidNMB2sGmuyPzMrESHvFnb88WRa5SWhqORi3cAzFuHLGLv3RAHsqFFooJjzlv_9Yb_feU40FNSjkuS-I91FA3SvdMWBTrcLJwIx9Krk9O_21Aai8HOSzMTcpxjI7OlINUczTZGVHpqeRtJ90or4eWSbVs_dVjxEM21IQbGbHv_0000lm2tr00rIOdaCB3dlrZH3xZOw5lkiuD1dL-tePrAON4SLCPVpyzJzHmRgXpvRdA7dBqqs1R1FDWZn0KNAk5SFEGLB0TLATA"
              />
            </div>
          </div>
        </section>
        {/* END: Hero Section */}

        {/* BEGIN: Departments Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-[#263238] mb-4">
                Our Specialized Departments
              </h2>
              <p className="text-slate-500">
                Dedicated centers of excellence providing comprehensive care for
                every stage of life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Cardiology */}
              <div
                className="p-8 rounded-2xl border border-teal-50 bg-[#F9FBFA] hover:border-[#00897B] transition cursor-pointer group"
                style={styles.cardShadow}
              >
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-[#00897B] mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Cardiology Center</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Advanced heart care including diagnostics, surgery, and
                  rehabilitation with top cardiac specialists.
                </p>
                <a
                  className="text-[#00897B] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  href="#"
                >
                  View Department <span aria-hidden>→</span>
                </a>
              </div>

              {/* Emergency */}
              <div
                className="p-8 rounded-2xl border border-teal-50 bg-[#F9FBFA] hover:border-[#00897B] transition cursor-pointer group"
                style={styles.cardShadow}
              >
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-[#00897B] mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Emergency Care</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  24/7 Level II Trauma Center equipped with the latest
                  technology for critical care situations.
                </p>
                <a
                  className="text-[#00897B] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  href="#"
                >
                  Emergency Info <span aria-hidden>→</span>
                </a>
              </div>

              {/* Maternity */}
              <div
                className="p-8 rounded-2xl border border-teal-50 bg-[#F9FBFA] hover:border-[#00897B] transition cursor-pointer group"
                style={styles.cardShadow}
              >
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-[#00897B] mb-6">
                  <Baby className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Maternity &amp; Pediatrics
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Comprehensive family care from prenatal support to pediatric
                  emergencies in a nurturing environment.
                </p>
                <a
                  className="text-[#00897B] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  href="#"
                >
                  Family Care <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* END: Departments Section */}

        {/* BEGIN: Modern Care Excellence Section */}
        <section className="bg-[#F1F8F7] py-24">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-4xl font-extrabold text-[#263238] mb-6">
                Excellence in Modern Medical Care
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Providing our patients with the most advanced medical technology
                and compassionate professional staff.
              </p>

              <ul className="space-y-4">
                {[
                  "24/7 On-site Emergency Services",
                  "Advanced Diagnostic Imaging",
                  "Expert Specialist Teams",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="bg-[#00897B]/10 p-1 rounded-full text-[#00897B]">
                      <Check className="w-5 h-5" strokeWidth={3} />
                    </div>
                    <span className="font-bold text-[#263238]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pharmacy */}
              <div
                className="bg-white p-6 rounded-xl border border-teal-50"
                style={styles.cardShadow}
              >
                <div className="text-[#00897B] mb-4">
                  <Pill className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">Pharmacy Services</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Full-service on-site pharmacy with professional counseling and
                  medication management.
                </p>
              </div>

              {/* Laboratory */}
              <div
                className="bg-white p-6 rounded-xl border border-teal-50"
                style={styles.cardShadow}
              >
                <div className="text-[#00897B] mb-4">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">
                  Diagnostic Laboratory
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Fast, accurate testing and results delivered directly to your
                  physician&apos;s office.
                </p>
              </div>

              {/* Surgery */}
              <div
                className="bg-white p-6 rounded-xl border border-teal-50"
                style={styles.cardShadow}
              >
                <div className="text-[#00897B] mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">Advanced Surgery</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Minimally invasive surgical techniques for faster recovery and
                  better outcomes.
                </p>
              </div>

              {/* Inpatient */}
              <div
                className="bg-white p-6 rounded-xl border border-teal-50"
                style={styles.cardShadow}
              >
                <div className="text-[#00897B] mb-4">
                  <BedDouble className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">Inpatient Care</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Comfortable private rooms and 24-hour nursing care focused on
                  your recovery.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* END: Modern Care Excellence Section */}

        {/* BEGIN: Features Highlight */}
        <section className="py-20 bg-white bg-slate-50">
          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="HIPAA & GDPR Compliant"
              description="Your data is encrypted and stored according to the highest global healthcare standards."
            />
            <FeatureCard
              icon={<MinusCircle className="w-8 h-8" />}
              title="Seamless Integration"
              description="Easily connect with existing lab systems, imaging equipment, and pharmacy networks."
            />
            <FeatureCard
              icon={<Headset className="w-8 h-8" />}
              title="24/7 Expert Support"
              description="Dedicated account managers and technical support available around the clock."
            />
          </div>
        </section>
        {/* END: Features Highlight */}

        {/* BEGIN: CTA Section */}
        <section className="py-24 container mx-auto px-6">
          <div className="bg-[#00897B] rounded-[40px] p-12 lg:p-24 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Excellence in Healthcare for Our Community
              </h2>
              <p className="text-teal-50 text-xl font-light">
                Your health is our priority. Visit us today or book an online
                consultation with our leading medical experts.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <button className="bg-transparent border-2 border-white/40 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition  hover:cursor-pointer">
                  Login
                </button>
                <button className="bg-white text-[#00897B] font-extrabold px-10 py-4 rounded-xl hover:bg-teal-50 shadow-xl transition hover:cursor-pointer">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* END: CTA Section */}
      </main>

      {/* BEGIN: Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-[#00897B] p-1.5 rounded-md">
                  <Plus className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <span className="text-xl font-bold text-[#263238] tracking-tight">
                  Upachaar
                </span>
              </div>

              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Dedicated to providing high-quality healthcare services and
                improving the health of our community through excellence in
                care.
              </p>

              <div className="flex gap-4">
                <SocialIcon
                  href="#"
                  label="Website"
                  icon={<Globe className="w-5 h-5" />}
                />
                <SocialIcon
                  href="#"
                  label="Email"
                  icon={<Mail className="w-5 h-5" />}
                />
              </div>
            </div>

            <FooterCol
              title="Care"
              links={["Departments", "Emergency", "Find a Doctor", "Nursing"]}
            />
            <FooterCol
              title="Patients"
              links={[
                "Patient Portal",
                "Billing Info",
                "Visiting Hours",
                "Medical Records",
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                "Privacy Policy",
                "Terms of Service",
                "Security",
                "HIPAA Compliance",
              ]}
            />
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2024 St. Mary's General Hospital. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="hover:text-[#263238] transition" href="#">
                Cookie Settings
              </a>
              <a className="hover:text-[#263238] transition" href="#">
                Sitemap
              </a>
              <a className="hover:text-[#263238] transition" href="#">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col gap-4 items-center text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="text-[#00897B]">
        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-2 mx-auto">
          {icon}
        </div>
      </div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-slate-500 text-sm">{description}</p>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="space-y-6">
      <h5 className="font-bold text-[#263238] uppercase text-xs tracking-widest">
        {title}
      </h5>
      <ul className="space-y-4 text-sm text-slate-500">
        {links.map((t) => (
          <li key={t}>
            <a className="hover:text-[#00897B] transition" href="#">
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, icon, label }) {
  return (
    <a
      className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00897B] hover:border-[#00897B] transition"
      href={href}
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}
